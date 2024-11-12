<template>
    <div
        class="flex flex-col sm:flex-row items-center justify-between bg-white p-4 sm:p-6 lg:p-8 rounded-md shadow space-y-4 sm:space-y-0">
        <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-gray-800">{{ orderCount }}</p>
            <p class="text-gray-500 text-sm sm:text-base">đơn hàng</p>
        </div>
        <div class="border-t sm:border-l border-gray-200 h-0 sm:h-12 w-full sm:w-0 sm:mx-4"></div>
        <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-gray-800">{{ totalPoints }}đ</p>
            <p class="text-gray-500 text-sm sm:text-base">Tổng tiền tích lũy</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderStats',
    props: {
        orderCount: {
            type: Number,
            required: true,
        },
        totalPoints: {
            type: Number,
            required: true,
        },
    },
};
</script>
