<template>
    <div class="container mx-auto p-2 bg-white ">
        <!-- Header -->
        <h1 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500">&nbsp; Danh Sách Đơn
            Hàng Cần Gia Hạn</h1>

        <!-- Order List -->
        <div v-if="orders.length > 0">
            <div v-for="(order) in orders" :key="order.orderNumber" class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Thông Tin Đơn Hàng #{{ order.orderNumber }}</h3>

                <p class="text-sm text-gray-600 mb-2"><strong>Sản phẩm:</strong> {{ order.productName }}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Ngày hết hạn:</strong> {{ formatDate(order.expiryDate) }}
                </p>
                <p class="text-sm text-gray-600 mb-2"><strong>Giá trị đơn hàng:</strong> {{ formatCurrency(order.amount)
                    }}</p>

                <!-- Renewal Information -->
                <div class="bg-yellow-50 p-4 rounded-lg mt-4">
                    <p class="text-sm text-gray-600 mb-2"><strong>Ngày gia hạn:</strong> {{
                        formatDate(order.renewalDate) }}</p>
                    <p class="text-sm text-gray-600 mb-2"><strong>Phí gia hạn:</strong> {{
                        formatCurrency(order.renewalFee) }}</p>
                    <p class="text-sm text-gray-600 mb-2"><strong>Tình trạng:</strong> {{ order.renewalStatus }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-4 mt-6">
                    <button @click="renewOrder(order)" :disabled="order.renewalStatus === 'Đã gia hạn'"
                        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-gray-400">
                        Gia Hạn
                    </button>
                    <button @click="cancelRenewal(order)"
                        class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none">
                        Hủy Gia Hạn
                    </button>
                </div>
            </div>
        </div>

        <div v-else>
            <p class="text-center text-gray-500">Không có đơn hàng nào cần gia hạn.</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders: [
                {
                    orderNumber: 'ORD001',
                    productName: 'Sản phẩm 1',
                    expiryDate: '2024-12-20',
                    amount: 2000000,
                    renewalDate: '2024-12-21',
                    renewalFee: 50000,
                    renewalStatus: 'Chưa gia hạn'
                },
                {
                    orderNumber: 'ORD002',
                    productName: 'Sản phẩm 2',
                    expiryDate: '2024-12-22',
                    amount: 1500000,
                    renewalDate: '2024-12-23',
                    renewalFee: 60000,
                    renewalStatus: 'Chưa gia hạn'
                }
                // More orders...
            ]
        }
    },
    methods: {
        // Format Date function
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('vi-VN', options);
        },
        // Format Currency function
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        },
        // Renew Order Function
        renewOrder(order) {
            // Logic to renew order (example)
            alert(`Gia hạn đơn hàng #${order.orderNumber} thành công!`);
            order.renewalStatus = 'Đã gia hạn';
        },
        // Cancel Renewal Function
        cancelRenewal(order) {
            // Logic to cancel renewal (example)
            alert(`Hủy gia hạn đơn hàng #${order.orderNumber}`);
            order.renewalStatus = 'Chưa gia hạn';
        }
    }
}
</script>

<style scoped>
/* Additional styling if necessary */
</style>