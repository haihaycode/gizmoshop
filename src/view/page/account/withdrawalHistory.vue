<template>
    <div v-if="!isLoading" lass="min-h-screen space-y-6  ">
        <!-- Page Title -->
        <div>
            <h2 class="text-xl font-semibold text-gray-600 mb-4 p-3 ">Lịch sử rút tiền</h2>
        </div>

        <!-- List of Withdrawals -->
        <div v-if="withdrawals.length" class="space-y-4 p-3">
            <ItemCardComponent v-for="withdrawal in withdrawals" :key="withdrawal.id" :withdrawal="withdrawal"
                @click="openModal(withdrawal)" />
        </div>
        <p v-else class="text-gray-500 text-center italic mt-6 p-3">Không có giao dịch rút tiền nào.</p>

        <!-- Withdrawal Details Modal -->
        <WithdrawalDetailsModal :isOpen="isModalOpen" :withdrawal="selectedWithdrawal" @close="isModalOpen = false" />
    </div>
</template>

<script>
import ItemCardComponent from '@/components/withdrawalHistory/ItemCardComponent.vue';
import WithdrawalDetailsModal from '@/components/withdrawalHistory/WithdrawalDetailsModalComponent.vue';
// import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'WithdrawalHistoryPage',
    components: {
        ItemCardComponent,
        WithdrawalDetailsModal,
        // BreadcrumbComponent,
    },
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'home' },
                { text: 'Lịch sử rút tiền' },
            ],
            withdrawals: [
                { id: 1, amount: 1000, date: '2023-11-11', status: 'Completed' },
                { id: 2, amount: 500, date: '2023-11-10', status: 'Pending' },
                // Add more sample withdrawal data here
            ],
            isModalOpen: false,
            selectedWithdrawal: null,
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        openModal(withdrawal) {
            this.selectedWithdrawal = withdrawal;
            this.isModalOpen = true;
        },
    },
};
</script>

<style scoped></style>
