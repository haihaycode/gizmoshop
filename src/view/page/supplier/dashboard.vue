<template>
    <div class="dashboard-page p-6  min-h-screen">
        <div>
            <div v-if="isLoadingComponent">
                <div class="text-blue-500 text-center"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                        style='color:#1257c0'></i> Đang tải dữ liệu...
                </div>
            </div>
            <div v-else>
                <!-- Tổng quan doanh thu -->
                <section class="mb-8">
                    <h2 class="text-2xl font-semibold mb-4">Tổng quan doanh thu</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="stat-card bg-white p-6 rounded-lg shadow">
                            <p class="text-gray-600">Doanh thu tuần này </p>
                            <h3 class="text-3xl font-bold text-green-500 mt-2">{{ revenue.thisWeek ?
                                formatCurrencyVN(revenue.thisWeek) : '0 đ' }}
                            </h3>
                        </div>
                        <div class="stat-card bg-white p-6 rounded-lg shadow">
                            <p class="text-gray-600">Doanh thu tháng này</p>
                            <h3 class="text-3xl font-bold text-green-500 mt-2">{{ revenue.thisMonth ?
                                formatCurrencyVN(revenue.thisMonth) : '0 đ' }}
                            </h3>
                        </div>
                    </div>
                    <!-- Biểu đồ doanh thu -->
                    <div class="mt-6 bg-white p-6 rounded-lg shadow" v-if="isDataLoaded">
                        <RevenueChart :labels="revenueLabels" :dataValues="revenueValues" />
                    </div>
                </section>

                <!-- Số lượng đơn hàng -->
                <section class="mb-8">
                    <h2 class="text-2xl font-semibold mb-4">Đơn hàng</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="stat-card bg-white p-6 rounded-lg shadow">
                            <p class="text-gray-600">Đơn hàng đang tạo (chưa giao dịch)</p>
                            <h3 class="text-3xl font-bold text-blue-500 mt-2">{{ orders.new.length }}</h3>
                        </div>
                        <!-- Đơn hàng mới và đang chờ xử lý -->
                        <div class="stat-card bg-white p-6 rounded-lg shadow">
                            <p class="text-gray-600">Đơn hàng mới và đang chờ xử lý</p>
                            <h3 class="text-3xl font-bold text-green-500 mt-2">{{ orders.newOrders }}</h3>
                        </div>
                        <!-- Đơn hàng đã được chấp nhận và đang xử lý -->
                        <div class="stat-card bg-white p-6 rounded-lg shadow">
                            <p class="text-gray-600">Đơn hàng đã được chấp nhận và đang xử lý</p>
                            <h3 class="text-3xl font-bold text-yellow-500 mt-2">{{ orders.processing }}</h3>
                        </div>
                        <!-- Đơn hàng gặp vấn đề -->
                        <div class="stat-card bg-white p-6 rounded-lg shadow">
                            <p class="text-gray-600">Đơn hàng gặp vấn đề</p>
                            <h3 class="text-3xl font-bold text-red-500 mt-2">{{ orders.issues }}</h3>
                        </div>

                        <!-- thành công  -->
                        <div class="stat-card bg-white p-6 rounded-lg shadow">
                            <p class="text-gray-600">Đơn hàng đã giao dịch</p>
                            <h3 class="text-3xl font-bold text-purple-500 mt-2">{{ orders.success }}</h3>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import RevenueChart from '@/components/supplier/dashboard/RevenueChartComponent.vue';
import { getOrderCountByStatus, getOrderTotalPriceBySupplier } from '@/api/supplierApi';
import { formatCurrencyVN } from '@/utils/currencyUtils';

export default {
    name: 'DashboardPage',
    components: {
        RevenueChart,
    },
    data() {
        return {

            revenue: {
                thisWeek: 0,
                thisMonth: 0,
            },
            orders: {
                new: JSON.parse(localStorage.getItem("orders")) || [],//  trong local storage
                processing: 0,
                newOrders: 0,
                issues: 0,
                success: 0,
            },
            revenueLabels: [],
            revenueValues: [],
            isDataLoaded: false,
            isLoadingComponent: false
        };
    },
    mounted() {
        this.fetchOrderCounts();
        this.fetchRevenueData();
        this.fetchLastSixMonthsRevenue();
    },
    methods: {
        formatCurrencyVN,

        async fetchOrderCounts() {
            this.isLoadingComponent = true
            try {
                // Nhóm trạng thái đơn hàng mới và đang chờ xử lý
                const newOrderStatusIds = [9, 26, 27];

                // Nhóm trạng thái đơn hàng đã được chấp nhận và đang xử lý
                const acceptedProcessingStatusIds = [18, 20];

                // Nhóm trạng thái đơn hàng gặp vấn đề
                const issuesStatusIds = [11, 12, 19, 21];
                // Nhóm trạng thái đơn hàng đã được giao
                const success = [10];

                // Gọi API trạng thái đơn hàng đã giao dịch
                const successOrderResponse = await getOrderCountByStatus(success);
                this.orders.success = successOrderResponse.data.successfulOrderCount;

                // Gọi API cho đơn hàng mới và đang chờ xử lý
                const newOrderResponse = await getOrderCountByStatus(newOrderStatusIds);
                this.orders.newOrders = newOrderResponse.data.successfulOrderCount;

                // Gọi API cho đơn hàng đã được chấp nhận và đang xử lý
                const acceptedProcessingResponse = await getOrderCountByStatus(acceptedProcessingStatusIds);
                this.orders.processing = acceptedProcessingResponse.data.successfulOrderCount;

                // Gọi API cho đơn hàng gặp vấn đề
                const issuesResponse = await getOrderCountByStatus(issuesStatusIds);
                this.orders.issues = issuesResponse.data.successfulOrderCount;


            } catch (error) {
                console.error('Lỗi khi lấy số lượng đơn hàng:', error);
            }
            finally {
                this.isLoadingComponent = false
            }
        },
        async fetchRevenueData() {
            try {
                const statusIds = ['13'];
                const today = new Date();
                const dayOfWeek = today.getDay();
                const firstDayOfWeek = new Date(today);
                firstDayOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
                const lastDayOfWeek = new Date(today);
                lastDayOfWeek.setDate(today.getDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek));

                const firstDayStr = firstDayOfWeek.toISOString().split('T')[0];
                const lastDayStr = lastDayOfWeek.toISOString().split('T')[0];

                // Lấy ngày đầu tháng và cuối tháng (nếu bạn vẫn cần)
                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

                const firstDayMonthStr = firstDayOfMonth.toISOString().split('T')[0];
                const lastDayMonthStr = lastDayOfMonth.toISOString().split('T')[0];

                // Gọi API để lấy doanh thu tuần này
                const weeklyRevenueResponse = await getOrderTotalPriceBySupplier(statusIds, firstDayStr, lastDayStr);
                this.revenue.thisWeek = weeklyRevenueResponse.data.totalPriceOrder;


                // Gọi API để lấy doanh thu tháng này
                const monthlyRevenueResponse = await getOrderTotalPriceBySupplier(statusIds, firstDayMonthStr, lastDayMonthStr);
                this.revenue.thisMonth = monthlyRevenueResponse.data.totalPriceOrder;


            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
            }
        },
        async fetchLastSixMonthsRevenue() {
            this.isLoadingComponent = false
            try {
                const statusIds = ['13']; // Sử dụng statusId = 10 cho doanh thu

                const labels = [];
                const values = [];

                const today = new Date();

                const promises = [];

                for (let i = 0; i < 6; i++) {
                    // Tính toán tháng và năm bằng cách lùi về 'i' tháng từ tháng hiện tại
                    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;

                    // Lấy ngày đầu và cuối tháng
                    const firstDayOfMonth = new Date(year, month - 1, 1);
                    const lastDayOfMonth = new Date(year, month, 0);

                    const firstDayStr = firstDayOfMonth.toISOString().split('T')[0];
                    const lastDayStr = lastDayOfMonth.toISOString().split('T')[0];

                    // Tạo Promise cho mỗi API call và thêm vào mảng promises
                    const promise = getOrderTotalPriceBySupplier(statusIds, firstDayStr, lastDayStr)
                        .then(response => {
                            return {
                                label: `Tháng ${month}/${year}`,
                                value: response.data.totalPriceOrder || 0
                            };
                        })
                        .catch(error => {
                            console.error(`Lỗi khi lấy doanh thu cho tháng ${month}/${year}:`, error);
                            return {
                                label: `Tháng ${month}/${year}`,
                                value: 0
                            };
                        });

                    promises.push(promise);
                }

                // Chờ tất cả các Promise hoàn thành
                const results = await Promise.all(promises);

                // Sắp xếp kết quả theo thứ tự thời gian giảm dần (từ tháng hiện tại lùi về)
                results.sort((a, b) => {
                    const [monthA, yearA] = a.label.match(/Tháng (\d+)\/(\d+)/).slice(1).map(Number);
                    const [monthB, yearB] = b.label.match(/Tháng (\d+)\/(\d+)/).slice(1).map(Number);
                    return new Date(yearB, monthB - 1) - new Date(yearA, monthA - 1);
                });

                // Tách labels và values từ results
                results.forEach(item => {
                    labels.push(item.label);
                    values.push(item.value);
                });

                // Cập nhật dữ liệu cho biểu đồ
                this.revenueLabels = labels.reverse(); // Đảo ngược để hiển thị từ tháng cũ đến mới
                this.revenueValues = values.reverse();

                // Đánh dấu dữ liệu đã được tải
                this.isDataLoaded = true;

            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu doanh thu 6 tháng gần nhất:', error);
            }
            finally {
                this.isLoadingComponent = false
            }
        },
    }
};
</script>

<style scoped>
/* Bạn có thể thêm các kiểu tùy chỉnh nếu cần */
</style>