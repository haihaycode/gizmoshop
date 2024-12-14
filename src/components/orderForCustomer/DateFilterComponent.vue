<template>
    <div class="relative bg-white p-2 sm:p-3  mb-1 transition-all hover:shadow-xl">
        <label class="text-gray-700 font-medium text-sm mb-2 block">Thời gian đặt hàng</label>

        <!-- Datepicker Component -->
        <Datepicker v-model="dateRange" range format="dd/MM/yyyy" placeholder="Chọn khoảng thời gian"
            @update:model-value="emitDateRange"
            :input-class="'text-gray-600 border-none outline-none bg-transparent w-full'" :zIndex="50"
            :teleport="'body'" />
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    name: 'DateFilter',
    components: { Datepicker },
    data() {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);

        return {
            dateRange: [startOfMonth, endOfMonth],  // Set initial range to current month
        };
    },
    methods: {
        // Emit the date range as soon as the user selects it
        emitDateRange(value) {
            if (value && value.length === 2) {
                const [startDate, endDate] = value;
                this.$emit('date-range-selected', { startDate, endDate });
            }
        }
    },
    mounted() {
        // Emit the initial date range when the component mounts
        this.emitDateRange(this.dateRange);
    }
};
</script>

<style scoped>
.datepicker__popover {
    z-index: 50 !important;
}
</style>
