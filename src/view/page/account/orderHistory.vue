<template>
    <div class="p-6 min-h-screen space-y-2 bg-gray-50">
        <!-- User Order Stats -->
        <OrderStats :orderCount="orderCount" :totalPoints="totalPoints" />

        <!-- Filters Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <!-- Date Filter -->
            <DateFilter @date-range-selected="setDateRange" />

            <!-- Order Status Tabs -->
            <OrderStatusTabs @changeStatus="setActiveStatus" />

            <!-- Search Button -->
            <div class=" ">
                <button @click="searchOrders"
                    class="bg-red-500 text-white py-2   px-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 transform scale-90 font-medium tracking-wide">
                    Tìm kiếm
                </button>
            </div>

        </div>

        <!-- Order Table or Empty State -->
        <div>
            <div v-if="isLoading" class="mt-2">
                <!-- Hiển thị skeleton -->
                <EmptyState message="đang tải dữ liệu..." />
            </div>
            <div v-if="orders.length > 0">
                <OrderTable :orders="orders" @viewOrderDetails="openOrderDetails" @cancelOrder="cancelOrder" />
                <br />
                <Pagination :total-items="pagination?.totalElements || 0" :items-per-page="limit"
                    :current-page="page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                </Pagination>
            </div>
            <EmptyState v-if="!isLoading && orders.length <= 0" message="--- \ ---" />
        </div>


        <!-- Order Details Modal -->
        <OrderDetailsModal :isOpen="isModalOpen" :order="selectedOrder" @close="closeOrderDetails" />
    </div>
</template>

<script>
import OrderStats from '@/components/orderForCustomer/OrderStatsComponent.vue';
import DateFilter from '@/components/orderForCustomer/DateFilterComponent.vue';
import OrderStatusTabs from '@/components/orderForCustomer/OrderStatusTabsComponent.vue';
import OrderTable from '@/components/orderForCustomer/orderTableComponent.vue';
import EmptyState from '@/components/orderForCustomer/EmptyStateComponent.vue';
import OrderDetailsModal from '@/components/orderForCustomer/OrderDetailsModalComponent.vue';
import { getOrders, cancelOrderForUsers } from '@/api/orderForCustomerApi';
import { mapGetters, mapActions } from 'vuex';
import Pagination from '@/components/containers/pagination/Pagination.vue';
import { orderSummary } from '@/api/orderForCustomerApi';

export default {
    name: 'OrderHistoryPage',
    components: {
        OrderStats,
        DateFilter,
        OrderStatusTabs,
        OrderTable,
        EmptyState,
        OrderDetailsModal,
        Pagination
    },
    data() {
        return {
            orderCount: 0,
            orders: [],
            totalPoints: 0,
            activeStatus: null,
            startDate: null,
            limit: 5,
            page: 0,
            endDate: null,
            isModalOpen: false,
            selectedOrder: null,
            pagination: null,
        };
    },
    mounted() {
        this.fetchOrderSummary();
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        ...mapActions('nav', ['setNavMenuOpen']),
        toggleNav(isOpen) {
            this.setNavMenuOpen(isOpen);
        },
        setActiveStatus(statusId) {
            this.activeStatus = statusId;
        },
        setDateRange({ startDate, endDate }) {
            this.startDate = startDate;
            this.endDate = endDate;
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.fetchOrders();
        },
        handleLimitChange(limitPanigation) {
            this.limit = limitPanigation;
            this.page = 0;
            this.fetchOrders();
        },
        async fetchOrderSummary() {
            const response = await orderSummary();
            this.orderCount = response.data.totalQuantityOrder;
            this.totalPoints = response.data.totalAmountOrder;

            this.fetchOrders();
        },
        async fetchOrders() {
            try {
                const filters = {
                    page: this.page,
                    limit: this.limit,
                    idStatus: this.activeStatus,
                    startDate: this.startDate ? this.formatDate(this.startDate) : null,
                    endDate: this.endDate ? this.formatDate(this.endDate) : null,
                };
                const response = await getOrders(filters);
                this.orders = response.data.content;
                this.pagination = response.data;

            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        openOrderDetails(order) {
            this.toggleNav(false);
            this.selectedOrder = order;
            this.isModalOpen = true;
        },
        closeOrderDetails() {
            this.toggleNav(true);
            this.isModalOpen = false;
            this.selectedOrder = null;
        },
        searchOrders() {
            this.page = 0; // Reset to the first page when searching
            this.fetchOrders();
        },
        async cancelOrder(order) {
            try {
                await cancelOrderForUsers(order.order.id, order.reason === 'other' ? order.note : order.reason);
                this.fetchOrders();
            } catch (error) {
                console.error("Error canceling order:", error);
            }
        }
    },
};
</script>
