<template>
    <div class=" bg-white p-2 sm:p-3 rounded-sm shadow-sm mb-1 transition-all hover:shadow-xl">
        <label class="text-gray-700 font-medium text-sm mb-2 block">Trạng thái đơn hàng</label>

        <el-select v-model="selectedStatus" placeholder="Chọn trạng thái đơn hàng" @change="handleStatusChange"
            class="w-full">
            <el-option label="Tất cả" :value="null"></el-option>
            <el-option v-for="status in statuses" :key="status.id" :label="status.status"
                :value="status.id"></el-option>
        </el-select>
    </div>
</template>

<script>
import { ElSelect, ElOption } from 'element-plus';
import 'element-plus/dist/index.css';
import { getAllOrderStatuses } from '@/api/orderStatusApi';

export default {
    name: 'OrderStatusTabs',
    components: {
        ElSelect,
        ElOption
    },
    props: {
        activeStatus: {
            type: [String, Number],
            required: false,
            default: null
        },
    },
    data() {
        return {
            statuses: [], // Các trạng thái đơn hàng
            selectedStatus: null, // Mặc định chọn "Tất cả"
        };
    },
    async mounted() {
        try {
            // Gọi API để lấy danh sách trạng thái với type = 0
            const response = await getAllOrderStatuses(0);
            this.statuses = response.data; // Giả sử cấu trúc trả về là { data: [...] }

            // Đặt selectedStatus theo activeStatus nếu có, ngược lại mặc định là "Tất cả" (null)
            this.selectedStatus = this.activeStatus || null;
        } catch (error) {
            console.error("Lỗi khi lấy trạng thái đơn hàng:", error);
        }
    },
    methods: {
        handleStatusChange(value) {
            this.$emit('changeStatus', value);
        },
    },
};
</script>

<style scoped></style>
