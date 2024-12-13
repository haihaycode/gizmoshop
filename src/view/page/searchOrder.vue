<template>
    <div class="p-2 sm:p-6 min-h-screen flex flex-col items-center ">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Tra cứu thông tin đơn hàng của bạn</h2>
        <p class="text-gray-600 text-center max-w-lg mb-8">
            Nhập số điện thoại và mã đơn hàng của bạn để tra cứu tình trạng vận chuyển. Hãy chắc chắn rằng bạn nhập đúng
            thông tin để chúng tôi có thể tìm thấy đơn hàng của bạn.
        </p>
        <div class="rounded-lg w-full mx-auto">
            <!-- Phone Number Input -->
            <InputField label="Số điện thoại" v-model="phoneNumber" :error="errors.phoneNumber"
                message="Số điện thoại bạn đã sử dụng để đặt hàng." />

            <!-- Order Code Input -->
            <InputField label="Mã đơn hàng" v-model="orderCode" :error="errors.orderCode"
                message="Mã đơn hàng đã được cung cấp khi bạn mua hàng." />

            <!-- Search Button -->
            <Button :text="'Tìm kiếm đơn hàng'" :isLoading="isLoading" @click="validateAndSearch"
                class="w-full p-4 bg-red-600 text-white font-semibold rounded-sm hover:bg-red-600 transition-colors mt-6">
            </Button>

            <!-- Search Result -->
            <div v-if="searchResult" class="mt-8 bg-green-50 p-6 rounded-lg text-green-900 w-full mx-auto shadow-lg">
                <h3 class="text-2xl font-bold mb-6 text-center">Thông tin đơn hàng của bạn</h3>

                <div class="space-y-4 mb-8">
                    <p><strong class="text-gray-700">Họ và tên:</strong> {{ searchResult.addressAccount.fullname }}</p>
                    <p><strong class="text-gray-700">Số điện thoại:</strong> {{ searchResult.addressAccount.sdt }}</p>
                    <p><strong class="text-gray-700">Địa chỉ giao hàng :</strong> {{
                        searchResult.addressAccount.specificAddress
                    }} -
                        {{ searchResult.addressAccount.city }}
                        -
                        {{ searchResult.addressAccount.district }} - {{ searchResult.addressAccount.commune }} - VN </p>
                    <p><strong class="text-gray-700">Mã đơn hàng:</strong> {{ searchResult.orderCode }}</p>
                    <p><strong class="text-gray-700">Trạng thái:</strong> <span class="text-green-600">{{
                        searchResult.orderStatus.status }}</span></p>
                    <p><strong class="text-gray-700">Ngày đặt hàng:</strong> {{ formatDate(searchResult.createOderTime)
                        }}</p>
                    <p><strong class="text-gray-700">Phương thức thanh toán:</strong> {{ searchResult.paymentMethods ?
                        'Thanh toán bằng tiền mặt khi nhận hàng ' : 'Thanh toán trực tuyến' ||
                        'Không có thông tin' }}</p>
                    <p><strong class="text-gray-700">Tổng tiền:</strong> <span class="text-red-600 font-semibold">{{
                        formatCurrency(searchResult.totalPrice) }}</span></p>
                </div>

                <!-- Order Products List -->
                <div class="mt-6">
                    <h4 class="font-semibold text-lg mb-4 border-b border-gray-200 pb-2">Chi tiết sản phẩm</h4>
                    <ul class="space-y-4">
                        <li v-for="(item, index) in searchResult.orderDetails" :key="item.id"
                            class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <p><strong class="text-gray-700">Sản phẩm {{ index + 1 }}:</strong> {{
                                item.product.productName }}</p>
                            <p><strong class="text-gray-700">Số lượng:</strong> {{ item.quantity }}</p>
                            <p><strong class="text-gray-700">Giá:</strong> {{ formatCurrency(item.price) }}</p>
                            <p><strong class="text-gray-700">Thành tiền:</strong> <span class="font-semibold">{{
                                formatCurrency(item.total) }}</span></p>
                        </li>
                    </ul>
                </div>

                <!-- Vouchers Information -->
                <div v-if="searchResult.vouchers && searchResult.vouchers.length > 0" class="mt-8">
                    <h4 class="font-semibold text-lg mb-4 border-b border-gray-200 pb-2">Voucher đã sử dụng</h4>
                    <ul class="space-y-4">
                        <li v-for="(voucherItem) in searchResult.vouchers" :key="voucherItem.id"
                            class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <p class="text-gray-700">{{ voucherItem.voucher.description }}</p>
                            <p>
                                <strong class="text-gray-700">Giảm giá:</strong>
                                <span v-if="voucherItem.voucher.discountAmount > 0">
                                    {{ formatCurrency(voucherItem.voucher.discountAmount) }}
                                </span>
                                <span v-else-if="voucherItem.voucher.discountPercent > 0">
                                    {{ voucherItem.voucher.discountPercent }}%
                                </span>
                            </p>
                        </li>
                    </ul>
                </div>

                <p class="text-sm mt-6 text-gray-600 text-center">
                    Nếu có bất kỳ thắc mắc nào về đơn hàng của bạn, vui lòng liên hệ với bộ phận chăm sóc khách hàng của
                    chúng tôi để được hỗ trợ thêm.
                </p>
            </div>


        </div>
    </div>
</template>

<script>
import InputField from '@/components/containers/input/CustomInputComponent.vue';
import * as yup from 'yup';
import { getOrderByCodeAndPhone } from '@/api/orderForCustomerApi';
import { mapGetters } from 'vuex';
import Button from '@/components/containers/buttons/button.vue';
import { Domain } from '@/api/config';
export default {
    name: 'SearchOrder',
    components: {
        InputField,
        Button
    },
    created() {
        const url = window.location.href;
        const urlParts = url.split('/');

        if (urlParts[urlParts.length - 2].includes(Domain) && urlParts[urlParts.length - 1].includes('search-order')) {
            this.phoneNumber = '0';
            this.orderCode = 'ORD_';
        } else {
            this.phoneNumber = urlParts[urlParts.length - 2] || '';
            this.orderCode = urlParts[urlParts.length - 1] || '';
        }
    },
    data() {
        return {
            phoneNumber: '',
            orderCode: '',
            errors: {
                phoneNumber: null,
                orderCode: null,
            },
            searchResult: null,
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        async validateAndSearch() {
            const schema = yup.object().shape({
                phoneNumber: yup
                    .string()
                    .required('Số điện thoại không được để trống.')
                    .matches(/^\d+$/, 'Số điện thoại chỉ chứa số.')
                    .min(9, 'Số điện thoại phải có ít nhất 10 chữ số.'),
                orderCode: yup.string().required('Mã đơn hàng không được để trống.'),
            });

            this.errors.phoneNumber = null;
            this.errors.orderCode = null;

            try {
                await schema.validate({
                    phoneNumber: this.phoneNumber,
                    orderCode: this.orderCode,
                });
                this.searchOrder();
            } catch (err) {
                if (err.path) {
                    this.errors[err.path] = err.message;
                }
            }
        },
        async searchOrder() {
            try {
                const res = await getOrderByCodeAndPhone(this.orderCode.trim(), this.phoneNumber.trim());
                this.searchResult = res.data;
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(date).toLocaleDateString('vi-VN', options);
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value);
        },
    },
};
</script>

<style scoped></style>
