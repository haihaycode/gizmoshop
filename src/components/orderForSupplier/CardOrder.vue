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
                <button v-if="isExpired(order.contractresponse?.expirationDate) && order.orderStatus.id == 10"
                    @click="renewContract(order.contractresponse?.contractId)"
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
                    Gia hạn hợp đồng
                </button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "CardOrder",
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

        isExpired(expirationDate) {
            // Duyệt qua tất cả các orderDetails
            for (let orderDetail of this.order.orderDetails) {
                const product = orderDetail.product;
                const quantity = product.productInventoryResponse.quantity;

                if (quantity > 0 && this.isNearExpiration(expirationDate)) {
                    return true;
                }
            }

            return false;
        },
        isNearExpiration(expirationDate) {
            if (!expirationDate) return false; // Nếu không có ngày hết hạn, trả về false

            const currentDate = new Date();
            const expDate = new Date(expirationDate);

            // Tính toán sự khác biệt giữa ngày hết hạn và ngày hiện tại
            const timeDifference = expDate - currentDate;
            const daysToExpire = timeDifference / (1000 * 3600 * 24);  // Chuyển đổi từ ms sang ngày

            // Nếu ngày hiện tại cách ngày hết hạn <= 2 ngày (nghĩa là trong vòng 2 ngày nữa)
            return daysToExpire <= 2 && daysToExpire >= 0;
        },
        renewContract(contractId) {
            if (!contractId) return;
            this.$emit("renew-contract", contractId);
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
                const price = item.price || 0;
                const quantity = item.quantity || 0;
                const discount = item.product?.discountProduct || 0; // Giảm giá theo %
                // Tính tổng giá trị của sản phẩm trước giảm giá
                const originalTotal = price * quantity;
                // Tính giá trị sau giảm giá
                const discountedTotal = originalTotal * (1 - discount / 100);
                // Cộng dồn vào tổng
                return total + discountedTotal;
            }, 0);
        },
    },
};
</script>

<style scoped>
/* Điều chỉnh khoảng cách giữa các phần thông tin */
.space-y-2>*+* {
    margin-top: 0.5rem;
}
</style>
