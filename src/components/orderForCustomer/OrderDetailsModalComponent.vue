<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative overflow-auto max-h-[90vh]">
            <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl">
                &times;
            </button>
            <!-- Modal Title -->
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">Chi tiết đơn hàng #{{ order.orderCode || 'null' }}
            </h3>
            <!-- Order Information Section -->
            <div class="mb-4 space-y-2">
                <p><strong>Ngày đặt:</strong> {{ formatDate(order.createOderTime) || 'null' }}</p>
                <p><strong>Trạng thái:</strong>
                    <span class="px-3 py-1 rounded-full text-sm">
                        {{ order.orderStatus?.status || 'null' }}
                    </span>
                </p>
                <p><strong>Phương thức đặt hàng :</strong>
                    <span class="px-3 py-1 rounded-full text-sm">
                        {{ order.paymentMethods ? 'Thanh toán khi nhận hàng' : 'Thanh toán trực tuyến' }}
                    </span>
                </p>
                <p><strong>Ghi chú :</strong>
                    <span class="px-3 py-1 rounded-full text-sm">
                        {{ order.note || 'không có' }}
                    </span>
                </p>
                <!-- <p><strong>Tổng tiền:</strong> <span class="text-red-500 text-xl">{{ formatCurrencyVN(order.totalPrice)
                    || '0 đ' }}</span></p> -->
                <div v-if="order.vouchers.length > 0" class="border-t pt-4 space-y-2">
                    <p><strong>Voucher áp dụng :</strong> {{ order.vouchers[0].voucher.description || 'null' }}</p>

                    <!-- Check if discount is a fixed amount -->
                    <p v-if="order.vouchers[0].voucher.discountAmount !== 0">
                        <strong>Giảm :</strong> <span class="text-red-500 text-xl"> {{
                            formatCurrencyVN(order.vouchers[0].voucher.discountAmount)
                            }}</span>
                    </p>

                    <!-- Check if discount is a percentage, and display max discount if applicable -->
                    <p v-else-if="order.vouchers[0].voucher.discountPercent">
                        <strong>Giảm : </strong> {{ order.vouchers[0].voucher.discountPercent }}%
                        <span v-if="order.vouchers[0].voucher.maxDiscountAmount">
                            (tối đa <span class="text-red-500 text-xl">{{
                                formatCurrencyVN(order.vouchers[0].voucher.maxDiscountAmount) }}</span> )
                        </span>
                    </p>
                </div>

            </div>

            <!-- Shipping Information Section -->
            <div class="border-t pt-4 space-y-2">
                <h4 class="text-lg font-semibold text-gray-700">Thông tin người nhận</h4>
                <p><strong>Họ tên :</strong> {{ order.addressAccount?.fullname || 'null' }}</p>
                <p><strong>Địa chỉ :</strong> {{ order.addressAccount?.specificAddress || 'null' }}, {{
                    order.addressAccount?.district || 'null' }}, {{ order.addressAccount?.city || 'null' }}</p>
                <p><strong>Số điện thoại :</strong> {{ order.addressAccount?.sdt || 'null' }}</p>
            </div>

            <!-- Product Details Table -->
            <div class="mt-6 ">
                <h4 class="text-lg font-semibold text-gray-700 mb-2">Chi tiết sản phẩm</h4>
                <table class="min-w-full border-collapse overflow-auto hidden md:table">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="p-2 text-left text-gray-600 font-semibold border-b">Sản phẩm</th>
                            <th class="p-2 text-right text-gray-600 font-semibold border-b">Số lượng</th>
                            <th class="p-2 text-right text-gray-600 font-semibold border-b">Giá</th>
                            <th class="p-2 text-right text-gray-600 font-semibold border-b">Giảm</th>
                            <th class="p-2 text-right text-gray-600 font-semibold border-b">Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.orderDetails" :key="item.id" class="border-t">
                            <td class="p-2 text-gray-700">
                                <div class="flex items-center space-x-3">
                                    <img :src="loadImage(item.product.thumbnail, 'product')" alt="product image"
                                        class="w-12 h-12 object-cover rounded-md" @error="handleImageError">

                                    <span class="text-sm">{{ item.product.productName || 'không có tên' }}</span>
                                    <span v-if="item.product.discountProduct" class="text-xl text-red-500 "> ({{
                                        item.product.discountProduct + '%' || 'không có' }})</span>
                                </div>
                            </td>
                            <td class="p-2 text-right text-gray-700">{{ item.quantity || '0' }}</td>
                            <td class="p-2 text-right text-gray-700">{{ formatCurrencyVN(item.price) || '0' }}</td>
                            <td class="p-2 text-right text-gray-700">{{ item.product.discountProduct || '0' }} %</td>
                            <td class="p-2 text-right text-gray-700">{{ formatCurrencyVN(item.price * (1 -
                                item.product.discountProduct / 100) * (item.quantity || 1)) || '0' }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="md:hidden">
                    <div v-for="item in order.orderDetails" :key="item.id"
                        class="bg-white shadow-md rounded-lg mb-4 p-4">
                        <img :src="loadImage(item.product.thumbnail, 'product')" alt="product image"
                            class="w-12 h-12 object-cover rounded-md" @error="handleImageError">
                        <div class="flex justify-between">
                            <span class="font-semibold text-gray-700">Sản phẩm:</span>
                            <span class="text-gray-600">{{ item.product.productName || 'không có tên' }}</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span class="font-semibold text-gray-700">Số lượng:</span>
                            <span class="text-gray-600">{{ item.quantity }}</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span class="font-semibold text-gray-700">Giá:</span>
                            <span class="text-gray-600">{{ formatCurrencyVN(item.price) || '0' }}</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span class="font-semibold text-gray-700">Giảm:</span>
                            <span class="text-gray-600">{{ item.product.discountProduct || '0' }} %</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span class="font-semibold text-gray-700">Tổng:</span>
                            <span class="text-gray-600">{{ formatCurrencyVN(item.price * (1 -
                                item.product.discountProduct / 100) * (item.quantity || 1)) || '0' }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order Total Section -->
            <div class="mt-4 text-right font-semibold text-lg">
                <p><strong>Tổng cộng : </strong> <span class="text-red-500">{{ formatCurrencyVN(order.totalPrice) ||
                    '0 đ' }}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import { loadImage } from '@/services/imageService';
import { formatCurrencyVN } from '@/utils/currencyUtils';

export default {
    name: 'OrderDetailsModal',
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        order: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formatCurrencyVN,
        loadImage,
        handleImageError(event) {
            event.target.src = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
        },
        formatDate(date) {
            if (!date) return 'null';
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Date(date).toLocaleDateString('vi-VN', options);
        },
    },
};
</script>

<style scoped>
/* Modal styling for a cleaner and responsive layout */
.bg-white {
    background-color: #fff;
}

.table {
    margin-top: 16px;
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 12px;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
}

.table th {
    text-align: left;
}

.table img {
    object-fit: cover;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: #88888800;
    border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

::-webkit-scrollbar-track {
    background: #f1f1f12c;
}
</style>