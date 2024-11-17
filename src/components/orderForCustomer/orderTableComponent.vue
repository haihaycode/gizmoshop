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
            <div class="mb-2">
                <strong class="text-gray-500">Phiếu giảm giá : &nbsp;</strong>
                <span class="px-2 py-1 rounded">
                    {{ order.vouchers[0].voucher.description || 'không' }}
                </span>
            </div>


            <!-- Total Price -->
            <div class="text-gray-500 text-xl font-semibold">
                <span>Tổng tiền : </span> <span class="text-red-500 text-xl">{{ formatCurrencyVN(order.totalPrice) ||
                    'null' }} VND</span>
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
    methods: {
        formatCurrencyVN,
        formatDate(date) {
            if (!date) return 'null';
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Date(date).toLocaleDateString('vi-VN', options);
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