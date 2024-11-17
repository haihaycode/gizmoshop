<!-- SortOptions.vue -->
<template>
    <div class="flex justify-start space-x-4 mb-4">
        <button v-for="option in sortOptions" :key="option.value" @click="selectSort(option.value)"
            :class="['px-4 py-2 rounded-sm', selectedSort === option.value ? 'bg-gray-300' : 'bg-gray-200 bg-opacity-35']">
            {{ option.label }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'SortOptions',
    props: {
        initialSort: {
            type: String,
            default: 'relevance'
        }
    },
    data() {
        return {
            selectedSort: this.initialSort, // Set initial sort selection
            sortOptions: [
                { label: 'Liên Quan', value: 'relevance' },
                { label: 'Mới Nhất', value: 'newest' },
                { label: 'Bán Chạy', value: 'best_seller' },
                { label: 'Giá Thấp Tới Cao', value: 'price_asc' },
                { label: 'Giá Cao Tới Thấp', value: 'price_desc' },
                { label: 'Xem Nhiều Nhất', value: 'most_viewed' }

            ]
        };
    },
    methods: {
        selectSort(sortType) {
            this.selectedSort = sortType;
            this.$emit('sortSelected', sortType); // Emit the selected sort option
        }
    }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
