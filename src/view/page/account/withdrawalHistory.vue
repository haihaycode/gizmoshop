<template>
    <div class="min-h-screen space-y-1">
        <!-- Page Title -->
        <div>
            <h2 class="text-xl font-semibold text-gray-600 mb-1 p-3">Lịch sử Giao dịch</h2>
        </div>

        <!-- Date Range Filters -->
        <div class="p-2">
            <DateFilter @date-range-selected="setDateRange" />
        </div>

        <!-- List of Withdrawals -->
        <div v-if="withdrawals.length" class="space-y-1 p-3">
            <ItemCardComponent v-for="withdrawal in withdrawals" :key="withdrawal.id" :withdrawal="withdrawal"
                @click="openModal(withdrawal)" />
            <Pagination :total-items="pagination?.totalElements || 0" :items-per-page="filters.limit"
                :current-page="filters.page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
            </Pagination>

        </div>
        <p v-else class="text-gray-500 text-center italic mt-6 p-3">Không có giao dịch rút tiền nào.</p>

        <!-- Withdrawal Details Modal -->
        <WithdrawalDetailsModal :isOpen="isModalOpen" :withdrawal="selectedWithdrawal"
            @close="isModalOpen = false; toggleNav(true)" />
    </div>
</template>

<script>
import { getWithdrawalHistory } from '@/api/auth/withDrawalHistoryApi';
import { mapGetters, mapActions } from 'vuex';
import ItemCardComponent from '@/components/withdrawalHistory/ItemCardComponent.vue';
import WithdrawalDetailsModal from '@/components/withdrawalHistory/WithdrawalDetailsModalComponent.vue';
import DateFilter from '@/components/orderForCustomer/DateFilterComponent.vue';
import { formatDateToISO } from '@/utils/currencyUtils';
import Pagination from '@/components/containers/pagination/Pagination.vue';

export default {
    name: 'WithdrawalHistoryPage',
    components: {
        ItemCardComponent,
        WithdrawalDetailsModal,
        DateFilter,
        Pagination
    },
    data() {
        return {
            withdrawals: [],
            isModalOpen: false,
            selectedWithdrawal: null,
            pagination: null,
            filters: {
                page: 0,
                limit: 5,
                sortField: 'id',
                sortDirection: 'desc',
                startDate: '',
                endDate: ''
            }
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    mounted() {
        this.handleFetchWithdrawals();
    },
    methods: {
        ...mapActions('nav', ['setNavMenuOpen']),
        toggleNav(isOpen) {
            this.setNavMenuOpen(isOpen);
        },
        openModal(withdrawal) {
            this.toggleNav(false);
            this.selectedWithdrawal = withdrawal;
            this.isModalOpen = true;
        },
        setDateRange({ startDate, endDate }) {
            this.filters.startDate = formatDateToISO(startDate);
            this.filters.endDate = formatDateToISO(endDate);
            this.handleFetchWithdrawals();
        },
        async handleFetchWithdrawals() {
            const res = await getWithdrawalHistory(this.filters);
            this.withdrawals = res.data.content;
            this.pagination = res.data;
            console.log(this.withdrawals);
        },
        handlePageChange(newPage) {
            this.filters.page = newPage - 1;
            this.handleFetchWithdrawals();
        },
        handleLimitChange(limitPanigation) {
            this.filters.limit = limitPanigation;
            this.filters.page = 0;
            this.handleFetchWithdrawals();
        },
    },
};
</script>

<style scoped></style>
