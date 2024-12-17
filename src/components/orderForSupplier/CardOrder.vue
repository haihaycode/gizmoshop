<template>
    <div class="border rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer"
        @click="$emit('view-order', order)">
        <!-- Header: Tên và trạng thái đơn hàng -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h3 class="text-2xl font-bold text-gray-800">
                    {{ order.name || order.orderCode || "Đơn hàng không tên" }}
                </h3>
                <p class="text-sm text-gray-600">
                    Trạng thái:
                    <span :class="[bgColorClass, 'font-semibold']">{{
                        order.orderStatus.status }}</span>
                </p>

            </div>
            <div v-if="!isViewOnly" class="flex space-x-2">
                <button v-if="isApprovable(order.status || order.orderStatus.id)" @click="$emit('approve-order', order)"
                    @click.stop class="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600">
                    Chấp nhận
                </button>
                <button v-if="isRejectable(order.status || order.orderStatus.id)" @click="$emit('reject-order', order)"
                    @click.stop class="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600">
                    Từ chối
                </button>
            </div>
        </div>

        <!-- Thông tin chi tiết -->
        <div class="space-y-4">
            <!-- Địa chỉ giao hàng -->
            <div class="text-gray-700">
                <strong class="block text-gray-800">Địa chỉ giao hàng:</strong>
                <span>
                    {{ order.addressAccount?.specificAddress || "Không xác định" }},
                    {{ order.addressAccount?.commune || "" }},
                    {{ order.addressAccount?.district || "" }},
                    {{ order.addressAccount?.city || "" }}
                </span>
            </div>

            <!-- Tổng giá trị -->
            <div class="text-gray-700">
                <strong class="block text-gray-800">Tổng giá trị đơn hàng :</strong>
                <span class="text-lg font-semibold">{{ currencyFormat(calculateTotalPrice(order.orderDetails)) }}</span>
            </div>

            <!-- Ghi chú -->
            <div class="text-gray-700">
                <strong class="block text-gray-800">Ghi chú đơn hàng :</strong>
                <span>{{ order.note || "Không có ghi chú" }}</span>
            </div>

            <!-- Hợp đồng -->
            <div class="bg-gray-50 p-4 rounded-sm shadow-inner text-gray-700">
                <strong class="block text-blue-500 font-semibold mb-2">Hợp đồng Giao dịch </strong>
                <p><span class="font-semibold">Ghi chú:</span> {{ order.contractresponse?.notes || "Không có ghi chú" }}
                </p>
                <p><span class="font-semibold">Ngày bắt đầu:</span> {{ formatDate(order.contractresponse?.start_date) }}
                </p>
                <p><span class="font-semibold">Ngày hết hạn:</span> {{
                    formatDate(order.contractresponse?.expirationDate) }}</p>
                <p>
                    <span class="font-semibold ">Phí duy trì đơn hàng:</span>

                    <span class="text-red-500 text-xl"> {{
                        currencyFormat(order.contractresponse?.contractMaintenanceFee) }}</span>
                </p>
                <button v-if="order.orderStatus.id == 12" @click="renewContract(order)" @click.stop
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-sm shadow hover:bg-blue-600">
                    Gia hạn hợp đồng
                </button>
                <span class="p-2"></span>
                <button v-if="order.orderStatus.id == 12" @click="cancelContract(order)" @click.stop
                    class="mt-4 px-4 py-2 bg-red-500 text-white rounded-sm shadow hover:bg-gray-600">
                    Hủy hợp đồng
                </button>
            </div>
        </div>
    </div>
    <OrderCardRenewContractModal :is-extend="isExtend" :isOpen="selectedOrder ? true : false" :order="selectedOrder"
        @close-modal="selectedOrder = null, isExtend = false" @load="$emit('load')">
    </OrderCardRenewContractModal>
</template>


<script>
import OrderCardRenewContractModal from './orderCardRenewContractModal.vue';

export default {
    name: "CardOrder",
    components: {
        OrderCardRenewContractModal
    },
    data() {
        return {
            selectedOrder: null,
            isExtend: false,
        }
    },
    props: {
        order: {
            type: Object,
            required: true,
        },
        getStatusText: {
            type: Function,
            required: true,
        },
        isApprovable: {
            type: Function,
            required: true,
        },
        isRejectable: {
            type: Function,
            required: true,
        },
        isViewOnly: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        bgColorClass() {
            const colorMap = {
                9: "bg-blue-100",
                18: "bg-yellow-100",
                20: "bg-orange-100",
                26: "bg-yellow-100",
                27: "bg-gray-100",
                10: "bg-green-100",
                11: "bg-pink-100",
                12: "bg-indigo-100",
                28: "bg-red-100",
                19: "bg-red-100",
                21: "bg-yellow-200",
            };
            return colorMap[this.order.orderStatus.id] || "bg-gray-100";
        },
    },
    methods: {
        renewContract(order) {
            if (!order) return;
            this.isExtend = true
            this.selectedOrder = order
            console.log("Gia hạn " + order);

        },
        cancelContract(order) {
            if (!order) return;
            this.isExtend = false
            this.selectedOrder = order
            console.log("Hủy Gia hạn " + order);
        },
        formatDate(date) {
            if (!date) return "Không xác định";
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(date).toLocaleDateString("vi-VN", options);
        },
        currencyFormat(value) {
            if (!value) return "0 đ";
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value);
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
        }
    },
};
</script>

<style scoped>
/* Điều chỉnh khoảng cách giữa các phần thông tin */
.space-y-2>*+* {
    margin-top: 0.5rem;
}
</style>
