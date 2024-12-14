<template>
    <div class="min-h-screen space-y-1">
        <!-- Page Title -->
        <div>
            <h2 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500"> &nbsp; Lịch sử Giao
                dịch
            </h2>
        </div>

        <!-- Date Range Filters -->
        <div class="p-2">
            <DateFilter @date-range-selected="setDateRange" />
        </div>

        <div v-if="isLoading" class="text-blue-500 text-center"><i class='bx bx-loader-circle bx-rotate-90 bx-spin'
                style='color:#1257c0'></i> Đang tải dữ liệu...</div>
        <!-- List of Withdrawals -->
        <div v-if="withdrawals.length" class="space-y-1 p-3">
            <ItemCardComponent v-for="withdrawal in withdrawals" :key="withdrawal.id" :withdrawal="withdrawal"
                @click="openModal(withdrawal)" />
            <Pagination :total-items="pagination?.totalElements || 0" :items-per-page="filters.limit"
                :current-page="filters.page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
            </Pagination>

        </div>
        <p v-if="!isLoading && withdrawals.length <= 0" class="text-gray-500 text-center italic mt-6 p-3">Không có giao
            dịch nào.</p>

        <!-- Withdrawal Details Modal -->
        <WithdrawalDetailsModal :isOpen="isModalOpen" :withdrawal="selectedWithdrawal" @close="isModalOpen = false" />
    </div>
</template>

<script>
import { getWithdrawalHistoryForSupplier } from '@/api/auth/withDrawalHistoryApi';
import { mapGetters } from 'vuex';
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
        openModal(withdrawal) {
            this.selectedWithdrawal = withdrawal;
            this.isModalOpen = true;
        },
        setDateRange({ startDate, endDate }) {
            this.filters.startDate = formatDateToISO(startDate);
            this.filters.endDate = formatDateToISO(endDate);
            this.handleFetchWithdrawals();
        },
        async handleFetchWithdrawals() {
            const res = await getWithdrawalHistoryForSupplier(this.filters);
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
