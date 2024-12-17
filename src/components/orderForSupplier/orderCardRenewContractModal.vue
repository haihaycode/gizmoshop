<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative overflow-auto max-h-[90vh]">
            <h2 class="text-2xl font-bold mb-4">{{ isExtend ? 'Hợp đồng gia hạn ' : 'Hủy hợp đồng' }}</h2>

            <!-- GIA HẠN HỢP ĐỒNG  -->
            <div>
                <div v-if="isExtend">
                    <p class="text-blue-500">Để gia hạn đơn hàng bạn sẽ phải chi trả một khoản phí duy trì theo đúng
                        công
                        thức như lúc đầu chúng tôi đã đưa ra :</p>
                    <div>
                        <p class="underline"> Điều khoản và Chi phí</p>
                        - Chi phí lưu trữ: (Tổng diện tích đơn hàng * 200,000)/30 * số ngày lưu trữ. <br>
                        - Đơn giá thuê: 200,000 VNĐ/m²/tháng.
                    </div>

                </div>
            </div>

            <!-- HỦY HỢP ĐỒNG  -->
            <div>
                <p v-if="!isExtend"><strong>Tên Đơn hàng :</strong> {{ order.name || order.orderCode || "Không có tên"
                    }}
                </p>
                <p v-if="!isExtend"><strong>Trạng thái :</strong> {{ order.orderStatus?.status }}</p>

                <div v-if="!isExtend" class="text-black flex">
                    <strong class="block text-black">Địa chỉ nhận hàng : &nbsp;</strong>
                    <span>
                        {{ order.addressAccount?.specificAddress || "Không xác định" }},
                        {{ order.addressAccount?.commune || "" }},
                        {{ order.addressAccount?.district || "" }},
                        {{ order.addressAccount?.city || "" }}
                    </span>
                </div>
            </div>


            <!-- PRODUCTS IN ORDER OLD  -->
            <div v-if="order.orderDetails?.length" class="mt-4">
                <strong class="block text-lg font-semibold mb-2">Sản phẩm đã cung cấp :</strong>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full text-sm border-collapse border border-gray-200 ">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 px-4 py-2 text-left">Tên sản phẩm</th>
                                <!-- <th class="border border-gray-300 px-4 py-2 text-left w-14">Trạng thái</th> -->
                                <th class="border border-gray-300 px-4 py-2 text-right">Sl cung cấp ban đầu</th>
                                <th class="border border-gray-300 px-4 py-2 text-right"
                                    v-if="order.orderStatus.id === 10 || order.orderStatus.id === 12">Sl còn lại
                                </th>
                                <!-- <th class="border border-gray-300 px-4 py-2 text-right"
                                    v-if="order.orderStatus.id === 10 || order.orderStatus.id === 12">Sl Bán ra
                                </th> -->
                                <th class="border border-gray-300 px-4 py-2 text-right">Giá</th>
                                <th class="border border-gray-300 px-4 py-2 text-right">Giảm giá</th>
                                <th class="border border-gray-300 px-4 py-2 text-right">Giá sau giảm</th>

                                <th class="border border-gray-300 px-4 py-2 text-right">Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.orderDetails" :key="item.id" class="odd:bg-white even:bg-gray-50">
                                <td class="border border-gray-300 px-4 py-2">{{ item.product.productName }}</td>
                                <!-- <td class="border border-gray-300 px-4 py-2 w-7">
                                    {{ item.product.productStatusResponse?.name || "Không xác định" }}
                                </td> -->

                                <td class="border border-gray-300 px-4 py-2 text-right">{{ item.quantity }} &nbsp;
                                    &nbsp; </td>
                                <td class="border border-gray-300 px-4 py-2 text-right"
                                    v-if="order.orderStatus.id === 10 || order.orderStatus.id === 12">
                                    {{ item?.product.productInventoryResponse?.quantity }} &nbsp; &nbsp;
                                </td>
                                <!-- <td class="border border-gray-300 px-4 py-2 text-right"
                                    v-if="order.orderStatus.id === 10 || order.orderStatus.id === 12">
                                    {{ item.quantity - item?.product.productInventoryResponse?.quantity }} &nbsp; &nbsp;
                                </td> -->
                                <td class="border border-gray-300 px-4 py-2 text-right">
                                    {{ currencyFormat(item.product.productPrice) }}
                                </td>
                                <td class="border border-gray-300 px-4 py-2 text-right">
                                    {{ item.product.discountProduct }}%
                                </td>
                                <td class="border border-gray-300 px-4 py-2 text-right">
                                    {{ currencyFormat(calculateDiscountedPrice(item.product.productPrice,
                                        item.product.discountProduct)) }}
                                </td>
                                <td class="border border-gray-300 px-4 py-2 text-right">
                                    {{ currencyFormat(
                                        calculateDiscountedPrice(item.product.productPrice, item.product.discountProduct) *
                                        item.quantity
                                    ) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>


            <!-- HỢP ĐỒNG MỚI  -->
            <div v-if="isExtend" class="bg-gray-50 p-4 rounded-sm shadow-inner text-gray-700">
                <strong class="block text-blue-500 font-semibold mb-2">Hợp đồng Gia hạn </strong>
                <p><span class="font-semibold">Ghi chú:</span> {{ order.contractresponse?.notes || "Không có ghi chú" }}
                </p>
                <p><span class="font-semibold">Ngày bắt đầu mới :</span> {{
                    formatDate(order.contractresponse?.expirationDate) }}
                </p>
                <p><span class="font-semibold">Ngày kết thúc mới :</span> {{
                    formatDate(
                        new Date(order.contractresponse?.expirationDate).getTime() +
                        (new Date(order.contractresponse?.expirationDate).getTime() -
                            new Date(order.contractresponse?.start_date).getTime())
                    ) }}
                </p>
                <p>
                    <span class="font-semibold ">Phí duy trì đơn hàng :</span>
                    <span class="text-red-500 text-xl"> {{
                        currencyFormat(feeNewContract()) }}</span>
                </p>

            </div>



            <p v-if="isExtend" class="font-thin ">* Hãy chắc chắn rằng trong số dư của bạn đủ để thanh toán cho lần gia
                hạn này
            </p>

            <!-- HỦY HỢP ĐỒNG -->
            <div class="mt-2">
                <p v-if="!isExtend" class="font-mono">* Khi hủy hợp đồng chúng tôi sẽ đóng gói đơn hàng và chuyển về nơi
                    bạn
                    đã cung cấp đơn hàng
                </p>
                <p v-if="!isExtend" class="font-thin ">* Khi bạn hủy đơn hàng chúng tôi sẽ trừ <span
                        class="text-red-500 font-serif">{{ currencyFormat(feeCancelContract()) }} </span> cho phí vận
                    chuyển và
                    các loại phí khác .Hãy chắc chắn rằng trong số dư của bạn đủ để thanh toán cho lần hoàn trả này !
                </p>

            </div>

            <div class="mt-6 flex justify-end">
                <Button :text="' Xác nhận Hủy hợp đồng'" v-if="!isExtend" :isLoading="isLoadingSendExtendContract"
                    @click="extendContractSend(isExtend)"
                    class="bg-gray-500 text-white px-4 py-2 rounded-sm hover:bg-gray-600">

                </Button>
                <Button :text="'Gia hạn hợp đồng'" :isLoading="isLoadingSendExtendContract" v-if="isExtend"
                    @click="extendContractSend(isExtend)"
                    class="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600">

                </Button>
                <span class="p-1" />
                <button @click="$emit('close-modal')"
                    class="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600">
                    Đóng
                </button>
            </div>
        </div>
    </div>

</template>

<script>
import { extendContract } from '@/api/supplierApi';
import notificationService from '@/services/notificationService';
import Button from '../containers/buttons/button.vue';

export default {
    name: "orderCardRenewContractModal",
    components: {
        Button
    },
    data() {
        return {
            isLoadingSendExtendContract: false
        }
    },
    props: {
        isExtend: {
            type: Boolean,
            required: true,
        },
        order: {
            type: Object,
            required: true,
        },
        isOpen: {
            type: Boolean,
            required: true,
        },
    },

    methods: {
        calculateStorageCost(totalSize, duration) {
            const unitCost = 200000;
            const dailyCost = unitCost / 30;
            return Math.round(totalSize * dailyCost * duration).toLocaleString("vi-VN");
        },
        calculateRenewalDate(duration) {
            if (!duration) return "N/A";
            const today = new Date();
            const renewalDate = new Date(today);
            renewalDate.setDate(today.getDate() + duration);
            const day = String(renewalDate.getDate()).padStart(2, "0");
            const month = String(renewalDate.getMonth() + 1).padStart(2, "0");
            const year = renewalDate.getFullYear();
            return `${day}/${month}/${year}`;
        },
        calculateTotalSizeM3(order) {
            const validOrderDetails = order?.orderDetails?.filter(detail => detail.product?.productInventoryResponse?.quantity !== 0);
            const totalVolume = validOrderDetails?.orderDetails?.reduce((total, detail) => {
                const quantity = detail.product?.productInventoryResponse?.quantity || 0;
                if (quantity === 0) return total;
                const volume =
                    (detail.product.productWidth / 100) *
                    (detail.product.productHeight / 100) *
                    (detail.product.productLength / 100);

                return total + (volume * quantity);
            }, 0);

            return totalVolume.toFixed(3);
        },
        calculateTotalSizeM2(order) {
            const validOrderDetails = order?.orderDetails?.filter(detail => detail.product?.productInventoryResponse?.quantity !== 0);
            const totalArea = validOrderDetails?.reduce((total, detail) => {
                const quantity = detail.product?.productInventoryResponse?.quantity || 0;
                const area =
                    (detail.product.productWidth / 100) *
                    (detail.product.productLength / 100); // cm² -> m²

                return total + (area * quantity);
            }, 0);
            return totalArea ? totalArea.toFixed(2) : "0.00";
        },
        calculateTotalWeight(order) {
            if (!order.products || !Array.isArray(order.products)) return "0.00";
            const totalWeight = order.products.reduce((total, product) => {
                const weight = parseFloat(product.productWeight) || 0;
                return total + (weight * (product.quantity || 1));
            }, 0);
            return totalWeight.toFixed(2);
        },
        convertContractMaintenanceFee(contractMaintenanceFeeOrder) {
            var formattedFee = contractMaintenanceFeeOrder.replace(/\./g, '');
            var contractMaintenanceFee = parseInt(formattedFee);
            return contractMaintenanceFee;
        },
        feeNewContract() {
            const expirationDate = new Date(this.order.contractresponse?.expirationDate);
            const startDate = new Date(this.order.contractresponse?.start_date);
            const timeDifference = expirationDate.getTime() - startDate.getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            console.log(daysDifference);

            return this.convertContractMaintenanceFee(this.calculateStorageCost(this.calculateTotalSizeM2(this.order), daysDifference));
        },
        feeCancelContract() {
            const feeService = 20000;
            const fixedFee = 30000;
            const totalSize = this.calculateTotalSizeM2(this.order);
            const areaFee = (totalSize < 1 ? 1 : totalSize) * feeService;
            const totalFee = areaFee + fixedFee + feeService;
            return totalFee;

        },
        currencyFormat(value) {
            if (!value) return "0 đ";
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value);
        },
        calculateDiscountedPrice(price, discount) {
            if (!price || !discount) return price || 0;
            return price * (1 - discount / 100);
        },
        formatDate(date) {
            if (!date) return "Không xác định";
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(date).toLocaleDateString("vi-VN", options);
        },
        calculateTotalPrice(orderDetails) {
            if (!orderDetails || orderDetails.length === 0) return 0;
            return orderDetails.reduce((total, item) => {
                if (item.product.productStatusResponse?.id !== 3) {
                    const price = item.product.productPrice || 0;
                    const quantity = item.quantity || 0;
                    const discount = item.product?.discountProduct || 0;
                    const originalTotal = price * quantity;
                    const discountedTotal = originalTotal * (1 - discount / 100);
                    return total + discountedTotal;
                }
                return total;
            }, 0);
        },
        async extendContractSend(isExtend) {
            this.isLoadingSendExtendContract = true
            try {
                const res = await extendContract(this.order.id, isExtend)
                notificationService.success(res.message)
                this.$emit('close-modal')
                this.$emit('load')
            } catch (error) {
                notificationService.error(error.message)
                console.error(error);
            } finally {
                this.isLoadingSendExtendContract = false
            }

        }
    },
}
</script>

<style scoped>
td {
    white-space: nowrap;
    /* Ngừng việc xuống dòng tự động */
    overflow: hidden;
    text-overflow: ellipsis;
    /* Thêm dấu '...' nếu văn bản quá dài */
}

th,
td {
    word-wrap: normal;
    /* Ngừng wrap chữ */
    overflow: hidden;
    /* Đảm bảo văn bản không bị tràn ra ngoài */
    text-overflow: ellipsis;
    /* Thêm dấu '...' nếu văn bản quá dài */
}


/*(Chrome, Safari) */
::-webkit-scrollbar {
    width: 8px;
    /* Độ rộng của scrollbar */
    height: 1px;
    /* Chiều cao của scrollbar cho cuộn ngang */
}

::-webkit-scrollbar-thumb {
    background-color: #88888855;
    /* Màu của thanh cuộn */
    border-radius: 2px;
    /* Bo tròn góc thanh cuộn */
}

::-webkit-scrollbar-thumb:hover {
    background-color: #55555593;
    /* Màu khi hover thanh cuộn */
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}
</style>