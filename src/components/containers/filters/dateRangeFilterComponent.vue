<template>
    <div class="mx-auto ">
        <!-- Container cho các input và button -->
        <div class="flex flex-wrap space-x-0 sm:space-x-4 mb-3">
            <!-- Input cho Ngày bắt đầu -->
            <div class="flex-1">
                <label for="start-date" class="block text-sm font-semibold text-gray-700  mb-2"><i
                        class="bx bx-time"></i> Ngày bắt đầu:</label>
                <input type="date" id="start-date" v-model="startDate"
                    class="w-full px-4 py-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300" />
            </div>

            <!-- Input cho Ngày kết thúc -->
            <div class="flex-1">
                <label for="end-date" class="block text-sm font-semibold text-gray-700 mb-2"><i class="bx bx-time"></i>
                    Ngày kết thúc:</label>
                <input type="date" id="end-date" v-model="endDate"
                    class="w-full px-4 py-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300" />
            </div>

            <!-- Nút Lọc -->
            <div class="flex-1 items-end">
                <div class="block text-sm font-semibold text-gray-700 mb-2">&nbsp;</div>
                <Button @click="submitDateRange" :text="'Tính doanh thu'" :isLoading="isLoading"
                    class="w-full sm:w-auto px-4 mx-auto py-3 border border-blue-300 bg-blue-500 hover:bg-blue-900 text-white rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300">
                </Button>
            </div>

        </div>
    </div>
</template>

<script>
import notificationService from '@/services/notificationService';
import Button from '../buttons/button.vue';
export default {

    components: {
        Button
    },
    props: {
        isLoading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            startDate: "",
            endDate: "",
        };
    },
    methods: {
        submitDateRange() {
            if (!this.startDate || !this.endDate) {
                notificationService.warning("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!");
                return;
            }
            if (new Date(this.endDate) < new Date(this.startDate)) {
                notificationService.warning("Ngày kết thúc không thể trước ngày bắt đầu!");
                return;
            }
            this.$emit('date-range', {
                startDate: this.startDate,
                endDate: this.endDate
            });
        }
    }
};
</script>

<style scoped>
/* Tùy chỉnh giao diện nếu cần */
</style>