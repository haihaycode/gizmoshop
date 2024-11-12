<template>
    <div class="p-4 sm:p-6 lg:p-8  min-h-screen space-y-4 sm:space-y-6">
        <!-- User Order Stats -->
        <OrderStats :orderCount="orders.length" :totalPoints="totalPoints" />

        <!-- Date Filter Section -->
        <DateFilter />

        <!-- Order Status Tabs -->
        <OrderStatusTabs :statuses="statuses" :activeStatus="activeStatus" @changeStatus="setActiveStatus" />

        <!-- Order Table or Empty State -->
        <div v-if="orders.length">
            <OrderTable :orders="filteredOrders" @viewOrderDetails="openOrderDetails" />
        </div>
        <EmptyState v-else message="Không có đơn hàng nào thỏa mãn!" />

        <!-- Order Details Modal -->
        <OrderDetailsModal :isOpen="isModalOpen" :order="selectedOrder" @close="closeOrderDetails" />
    </div>
</template>

<script>
import OrderStats from '@/components/orderForCustomer/OrderStatsComponent.vue';
import DateFilter from '@/components/orderForCustomer/DateFilterComponent.vue';
import OrderStatusTabs from '@/components/orderForCustomer/OrderStatusTabsComponent.vue';
import EmptyState from '@/components/orderForCustomer/EmptyStateComponent.vue';
import OrderTable from '@/components/orderForCustomer/orderTableComponent.vue';
import OrderDetailsModal from '@/components/orderForCustomer/OrderDetailsModalComponent.vue';

import { mapGetters } from 'vuex';
export default {
    name: 'OrderHistoryPage',
    components: {
        OrderStats,
        DateFilter,
        OrderStatusTabs,
        EmptyState,
        OrderTable,
        OrderDetailsModal,
    },
    data() {
        return {
            orders: [
                {
                    id: 1, date: '2023-11-10', status: 'Completed', total: '200,000đ', items: [
                        { id: 1, name: 'Product A', quantity: 1, price: '100,000', total: '100,000' },
                        { id: 2, name: 'Product B', quantity: 2, price: '50,000', total: '100,000' },
                    ]
                },
                {
                    id: 2, date: '2023-11-09', status: 'Pending', total: '150,000đ', items: [
                        { id: 3, name: 'Product C', quantity: 3, price: '50,000', total: '150,000' },
                    ]
                },
            ],
            totalPoints: 0,
            statuses: ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Đã hủy'],
            activeStatus: 'Tất cả',
            isModalOpen: false,
            selectedOrder: null,
        };
    },
    computed: {
        filteredOrders() {
            return this.activeStatus === 'Tất cả'
                ? this.orders
                : this.orders.filter(order => order.status === this.activeStatus);
        },
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        setActiveStatus(status) {
            this.activeStatus = status;
        },
        openOrderDetails(order) {
            this.selectedOrder = order;
            this.isModalOpen = true;
        },
        closeOrderDetails() {
            this.isModalOpen = false;
            this.selectedOrder = null;
        },
    },
};
</script>
