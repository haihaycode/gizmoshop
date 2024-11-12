<template>
    <div class="flex flex-wrap gap-2 bg-white p-3 sm:p-4 rounded-md shadow mb-4">
        <button v-for="status in statuses" :key="status" @click="$emit('changeStatus', status)"
            :class="['px-3 py-2 text-sm sm:text-base rounded', activeStatus === status ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600']">
            {{ status }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'OrderStatusTabs',
    props: {
        statuses: {
            type: Array,
            required: true,
        },
        activeStatus: {
            type: String,
            required: true,
        },
    },
};
</script>
