<template>
    <div class="dashboard-page p-2  min-h-screen">
        <div>
            <div>
                <section class="mb-8">
                    <h2 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500">&nbsp; TỔNG
                        QUAN DOANH THU</h2>
                    <br>

                    <div class="DOANHTHUDATERANGE mt-2">
                        <DateRangeFilterComponent @date-range="handleFetchDataRevenueByDateRange"
                            :isLoading="isLoadingDataRevenueByDateRange">
                        </DateRangeFilterComponent>
                        <div class="mb-3">
                            <div class="text-blue-500 font-mono"
                                v-if="!isLoadingDataRevenueByDateRange && DataRevenueByDateRange">
                                Doanh thu : {{ formatCurrencyVN(DataRevenueByDateRange) }}
                            </div>
                        </div>
                    </div>
                    <div class="DOANHTHUTHEOTUAN&THEOTHANG">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-if="!isLoadingfetchRevenueData">
                            <div class="stat-card bg-white p-6 rounded-sm shadow">
                                <p class="text-gray-600">Doanh thu tuần này </p>
                                <h3 class="text-3xl font-bold text-green-500 mt-2">{{ revenue.thisWeek ?
                                    formatCurrencyVN(revenue.thisWeek) : '0 đ' }}
                                </h3>
                            </div>
                            <div class="stat-card bg-white p-6 rounded-sm shadow">
                                <p class="text-gray-600">Doanh thu tháng này</p>
                                <h3 class="text-3xl font-bold text-green-500 mt-2">{{ revenue.thisMonth ?
                                    formatCurrencyVN(revenue.thisMonth) : '0 đ' }}
                                </h3>
                            </div>
                        </div>
                        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="stat-card bg-white p-6 rounded-sm shadow animate-pulse">
                                <p class="h-4 bg-gray-300 rounded w-1/3 mb-4"></p>
                                <h3 class="h-8 bg-gray-300 rounded w-2/3"></h3>
                            </div>
                            <div class="stat-card bg-white p-6 rounded-sm shadow animate-pulse">
                                <p class="h-4 bg-gray-300 rounded w-1/3 mb-4"></p>
                                <h3 class="h-8 bg-gray-300 rounded w-2/3"></h3>
                            </div>
                        </div>
                    </div>

                    <!-- Biểu đồ doanh thu -->
                    <div class="mt-6 bg-white  ">
                        <div
                            v-if="!isLoadingfetchLastSixMonthsRevenue && revenueLabels.length > 0 && revenueValues.length > 0">
                            <RevenueChart :labels="revenueLabels" :dataValues="revenueValues" />
                        </div>
                        <div v-if="isLoadingfetchLastSixMonthsRevenue" class="shadow">
                            <svg width="100%" height="80" viewBox="0 0 1140 80" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M108.354 62.0435L1 79H571H1139L1067.39 54.6957L1011.15 75.0435L899.708 59.2174L835.296 54.6957L782.13 36.0435L722.83 59.2174L629.789 33.2174L556.175 66L483.583 54.6957H384.408L329.197 27L249.448 44.5217L190.148 33.2174L108.354 62.0435Z"
                                    fill="url(#chart-shine)" stroke="#ECEEEF" stroke-width="2" />
                                <rect x="9" y="8" width="118" height="11" rx="2" fill="#ECEEEF" />
                                <defs>
                                    <linearGradient id="chart-shine" x1="0" y1="100%" x2="100%" y2="100%"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#ECEEEF" />
                                        <stop offset="12%" stop-color="#ECEEEF" stop-opacity="0.1" />
                                        <stop offset="30%" stop-color="#ECEEEF" />
                                        <stop offset="100%" stop-color="#ECEEEF" />
                                        <animate id="gradient" attributeName="x1" dur="1s" from="0" to="100%"
                                            repeatCount="indefinite" begin="0s" />
                                    </linearGradient>
                                </defs>
                            </svg>

                        </div>
                    </div>
                </section>

                <!-- Số lượng đơn hàng -->
                <div>
                    <div v-if="!isLoadingfetchOrderCounts">
                        <section class="mb-8">
                            <h2 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500">
                                &nbsp; ĐƠN
                                HÀNG</h2>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="stat-card bg-white p-6 rounded-sm shadow">
                                    <p class="text-gray-600">Đơn hàng đang tạo (chưa giao dịch)</p>
                                    <h3 class="text-3xl font-bold text-blue-500 mt-2">{{ orders.new.length }}</h3>
                                </div>
                                <!-- Đơn hàng mới và đang chờ xử lý -->
                                <div class="stat-card bg-white p-6 rounded-sm shadow">
                                    <p class="text-gray-600">Đơn hàng mới và đang chờ xử lý</p>
                                    <h3 class="text-3xl font-bold text-green-500 mt-2">{{ orders.newOrders }}</h3>
                                </div>
                                <!-- Đơn hàng đã được chấp nhận và đang xử lý -->
                                <div class="stat-card bg-white p-6 rounded-sm shadow">
                                    <p class="text-gray-600">Đơn hàng đã được chấp nhận và đang xử lý</p>
                                    <h3 class="text-3xl font-bold text-yellow-500 mt-2">{{ orders.processing }}</h3>
                                </div>
                                <!-- Đơn hàng gặp vấn đề -->
                                <div class="stat-card bg-white p-6 rounded-sm shadow">
                                    <p class="text-gray-600">Đơn hàng gặp vấn đề</p>
                                    <h3 class="text-3xl font-bold text-red-500 mt-2">{{ orders.issues }}</h3>
                                </div>

                                <!-- thành công  -->
                                <div class="stat-card bg-white p-6 rounded-sm shadow">
                                    <p class="text-gray-600">Đơn hàng đã giao dịch</p>
                                    <h3 class="text-3xl font-bold text-purple-500 mt-2">{{ orders.success }}</h3>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div v-else>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                            <div class="stat-card bg-white p-6 rounded-sm shadow animate-pulse">
                                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/3"></div>
                            </div>

                            <div class="stat-card bg-white p-6 rounded-sm shadow animate-pulse">
                                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/3"></div>
                            </div>

                            <div class="stat-card bg-white p-6 rounded-sm shadow animate-pulse">
                                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/3"></div>
                            </div>

                            <div class="stat-card bg-white p-6 rounded-sm shadow animate-pulse">
                                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/3"></div>
                            </div>

                            <div class="stat-card bg-white p-6 rounded-sm shadow animate-pulse">
                                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
                                <div class="h-8 bg-gray-300 rounded w-1/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RevenueChart from '@/components/supplier/dashboard/RevenueChartComponent.vue';
import { getOrderCountByStatus, getOrderTotalPriceBySupplier } from '@/api/supplierApi';
import { formatCurrencyVN } from '@/utils/currencyUtils';
import { mapGetters } from 'vuex';
import DateRangeFilterComponent from '@/components/containers/filters/dateRangeFilterComponent.vue';
export default {
    name: 'DashboardPage',
    components: {
        RevenueChart,
        DateRangeFilterComponent
    },
    data() {
        return {
            revenue: {
                thisWeek: 0,
                thisMonth: 0,
            },
            orders: {
                new: JSON.parse(localStorage.getItem("orders")) || [],//  trong local storage
                processing: ' ...',
                newOrders: ' ...',
                issues: '...',
                success: '...',
            },
            revenueLabels: [],
            revenueValues: [],
            DataRevenueByDateRange: null,
            isDataLoaded: false,
            isLoadingfetchOrderCounts: false,
            isLoadingfetchRevenueData: false,
            isLoadingfetchLastSixMonthsRevenue: false,
            isLoadingDataRevenueByDateRange: false
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    mounted() {
        (async () => {
            this.fetchRevenueData();
            this.fetchLastSixMonthsRevenue();
            this.fetchOrderCounts();
        })();
    },
    methods: {
        formatCurrencyVN,
        async handleFetchDataRevenueByDateRange(dateRange) {
            this.isLoadingDataRevenueByDateRange = true
            try {
                const statusIds = ['13'];
                const weeklyRevenueResponse = await getOrderTotalPriceBySupplier(statusIds, dateRange.startDate, dateRange.endDate);
                this.DataRevenueByDateRange = weeklyRevenueResponse.data.totalPriceOrder;
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoadingDataRevenueByDateRange = false
            }
        },
        async fetchOrderCounts() {
            this.isLoadingfetchOrderCounts = true
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
                this.isLoadingfetchOrderCounts = false
            }
        },
        async fetchRevenueData() {
            this.isLoadingfetchRevenueData = true
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
            } finally {
                this.isLoadingfetchRevenueData = false
            }
        },
        async fetchLastSixMonthsRevenue() {
            this.isLoadingfetchLastSixMonthsRevenue = true
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
                this.isLoadingfetchLastSixMonthsRevenue = false
            }
        },
    }
};
</script>
