<template>
    <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
        <div v-for="order in orders" :key="order.id" class="bg-white p-4 rounded-sm shadow-sm border hover:shadow-lg"
            @click="$emit('viewOrderDetails', order)">
            <!-- Order Code -->
            <div class="text-base font-semibold text-gray-500 mb-2">
                <strong>Mã đơn hàng :</strong> {{ order.orderCode || 'null' }}
            </div>

            <!-- Order Date -->
            <div class="text-base text-gray-500 mb-2">
                <strong>Ngày đặt :</strong> {{ formatDate(order.createOderTime) || 'null' }}
            </div>

            <!-- Order Status -->
            <div class="mb-2">
                <strong class="text-gray-500">Trạng thái : &nbsp;</strong>
                <span class="px-2 py-1 rounded">
                    {{ order.orderStatus?.status || 'null' }}
                </span>
            </div>

            <!-- Voucher Description -->
            <div class="mb-2">
                <strong class="text-gray-500">Phiếu giảm giá : &nbsp;</strong>
                <span class="px-2 py-1 rounded">
                    {{ order.vouchers[0]?.voucher?.description || 'không' }}
                </span>
            </div>

            <!-- Total Price -->
            <div class="text-gray-500 text-xl font-semibold">
                <span>Tổng tiền : </span>
                <span class="text-red-500 text-xl">{{ formatCurrencyVN(order.totalPrice) || 'null' }} VND</span>
            </div>

            <!-- Cancel Order Button -->
            <div v-if="order.orderStatus?.id === 1" class="mt-4">
                <button @click.stop="openCancelModal(order)"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Hủy đơn hàng
                </button>
            </div>
        </div>

        <!-- Cancel Order Modal -->
        <div v-if="isCancelModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 class="text-lg font-semibold mb-4">Chọn lý do hủy đơn hàng</h2>

                <!-- Reason Select -->
                <select v-model="cancelReason" class="w-full p-2 border rounded mb-4">
                    <option value="" disabled selected>Chọn lý do</option>
                    <option value="thay đổi ý định">Thay đổi ý định</option>
                    <option value="Tìm được nơi bán rẻ hơn">Tìm được giá rẻ hơn</option>
                    <option value="không muốn mua">Không muốn mua</option>
                    <option value="other">Lý do khác</option>
                </select>

                <!-- Note Field for 'Other' Reason -->
                <div v-if="cancelReason === 'other'" class="mb-4">
                    <textarea v-model="cancelNote" placeholder="Nhập ghi chú của bạn" class="w-full p-2 border rounded"
                        rows="3"></textarea>
                </div>

                <!-- Submit and Cancel Buttons -->
                <div class="flex justify-end">
                    <button @click="closeCancelModal" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
                        Hủy
                    </button>
                    <button @click="confirmCancelOrder" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        :disabled="!cancelReason || (cancelReason === 'other' && !cancelNote)">
                        Xác nhận hủy
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatCurrencyVN } from '@/utils/currencyUtils';
export default {
    name: 'OrderCardGrid',
    props: {
        orders: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isCancelModalOpen: false,
            cancelReason: '',
            cancelNote: '',
            selectedOrder: null,
        };
    },
    methods: {
        formatCurrencyVN,
        formatDate(date) {
            if (!date) return 'null';
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Date(date).toLocaleDateString('vi-VN', options);
        },
        openCancelModal(order) {
            this.isCancelModalOpen = true;
            this.selectedOrder = order;
        },
        confirmCancelOrder() {
            if (this.selectedOrder) {
                // Emit both reason and optional note for cancellation
                this.$emit('cancelOrder', {
                    order: this.selectedOrder,
                    reason: this.cancelReason,
                    note: this.cancelReason === 'other' ? this.cancelNote : null,
                });
                this.closeCancelModal();
            }
        },
        closeCancelModal() {
            this.isCancelModalOpen = false;
            this.cancelReason = '';
            this.cancelNote = '';
            this.selectedOrder = null;
        },
    },
};
</script>

<style scoped>
/* Adjusting responsive grid for different screen sizes */
.card {
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}
</style>
