<template>
    <div class="flex flex-wrap justify-start space-x-2 sm:space-x-4 mb-4">
        <button v-for="option in sortOptions" :key="option.value" @click="selectSort(option.value)" :class="[
            'px-4 py-2 my-2 rounded-sm text-white',
            selectedSort === option.value ? 'bg-red-500' : 'bg-gray-500 bg-opacity-35',
            'mb-2 md:mb-0'
        ]">
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
            selectedSort: this.initialSort,
            sortOptions: [
                { label: 'Mới Nhất', value: 'id,desc' },
                { label: 'Giá Thấp Tới Cao', value: 'price,asc' },
                { label: 'Giá Cao Tới Thấp', value: 'price,desc' },
                { label: 'Xem Nhiều Nhất', value: 'view,desc' }
            ]
        };
    },
    mounted() {
        this.selectedSort = this.initialSort;
    },
    methods: {
        selectSort(sortType) {
            this.selectedSort = sortType;
            this.$emit('sortSelected', sortType);
        }
    }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
