<template>
    <div @click="$emit('click')"
        class="p-6 border rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-105">
        <div class="flex items-center justify-between mb-3">
            <h3 class="text-xl font-semibold text-gray-800">Rút {{ withdrawal.amount }} VND</h3>
            <span class="text-sm text-gray-500">{{ withdrawal.date }}</span>
        </div>
        <p class="text-sm text-gray-600">
            Trạng thái: <span :class="statusClass">{{ withdrawal.status }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'ItemCardComponent',
    props: {
        withdrawal: {
            type: Object,
            required: true,
        },
    },
    computed: {
        statusClass() {
            return this.withdrawal.status === 'Completed'
                ? 'text-green-600 font-semibold'
                : this.withdrawal.status === 'Pending'
                    ? 'text-yellow-600 font-semibold'
                    : 'text-red-600 font-semibold';
        },
    },
};
</script>

<style scoped>
/* Additional styling for smooth transitions and rounded edges */
</style>
