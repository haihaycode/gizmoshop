<template>
    <div class="bg-white p-4 sm:p-6 rounded-md shadow overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th class="p-2 sm:p-4 text-left text-gray-600 font-semibold border-b">Mã đơn hàng</th>
                    <th class="p-2 sm:p-4 text-left text-gray-600 font-semibold border-b">Ngày đặt</th>
                    <th class="p-2 sm:p-4 text-left text-gray-600 font-semibold border-b">Trạng thái</th>
                    <th class="p-2 sm:p-4 text-right text-gray-600 font-semibold border-b">Tổng tiền</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id" class="border-t cursor-pointer hover:bg-gray-100"
                    @click="$emit('viewOrderDetails', order)">
                    <td class="p-2 sm:p-4 text-gray-700">{{ order.id }}</td>
                    <td class="p-2 sm:p-4 text-gray-700">{{ order.date }}</td>
                    <td class="p-2 sm:p-4">
                        <span :class="statusClass(order.status)" class="px-2 py-1 rounded">
                            {{ order.status }}
                        </span>
                    </td>
                    <td class="p-2 sm:p-4 text-right text-gray-700">{{ order.total }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'OrderTable',
    props: {
        orders: {
            type: Array,
            required: true,
        },
    },
    methods: {
        statusClass(status) {
            switch (status) {
                case 'Completed':
                    return 'bg-green-100 text-green-600';
                case 'Pending':
                    return 'bg-yellow-100 text-yellow-600';
                case 'Canceled':
                    return 'bg-red-100 text-red-600';
                default:
                    return 'bg-gray-100 text-gray-600';
            }
        },
    },
};
</script>
