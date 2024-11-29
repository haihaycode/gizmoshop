<template>
    <div class="flex flex-col items-center justify-center bg-white p-4 sm:p-6 rounded-md shadow text-center mt-6">
        <p class="text-gray-500 text-sm sm:text-base">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'EmptyState',
    props: {
        message: {
            type: String,
            default: "Không có đơn hàng nào!",
        },
    },
};
</script>
