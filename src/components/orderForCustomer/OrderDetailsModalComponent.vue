<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="bg-white w-full max-w-lg p-4 sm:p-6 rounded-lg shadow-lg relative overflow-auto max-h-[90vh]">
            <!-- Close Button -->
            <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl">
                &times;
            </button>
            <!-- Modal Title -->
            <h3 class="text-lg sm:text-xl font-semibold mb-4">Chi tiết đơn hàng #{{ order.id }}</h3>
            <!-- Products Table -->
            <table class="min-w-full border-collapse">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="p-2 text-left text-gray-600 font-semibold border-b">Sản phẩm</th>
                        <th class="p-2 text-right text-gray-600 font-semibold border-b">Số lượng</th>
                        <th class="p-2 text-right text-gray-600 font-semibold border-b">Giá</th>
                        <th class="p-2 text-right text-gray-600 font-semibold border-b">Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in order.items" :key="item.id" class="border-t">
                        <td class="p-2 text-gray-700">{{ item.name }}</td>
                        <td class="p-2 text-right text-gray-700">{{ item.quantity }}</td>
                        <td class="p-2 text-right text-gray-700">{{ item.price }}đ</td>
                        <td class="p-2 text-right text-gray-700">{{ item.total }}đ</td>
                    </tr>
                </tbody>
            </table>
            <!-- Order Total -->
            <div class="mt-4 text-right font-semibold text-lg">
                Tổng cộng: <span class="text-gray-800">{{ order.total }}đ</span>
            </div>
        </div>
    </div>
</template>

<script>
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
};
</script>
