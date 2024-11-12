<template>
    <div class="p-5 sm:p-6 lg:p-8 rounded-sm w-full mx-auto ">
        <!-- Breadcrumb Navigation -->
        <BreadcrumbComponent :items="breadcrumbItems" />

        <!-- Page Title -->
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Lịch sử rút tiền</h2>

        <!-- List of Withdrawals -->
        <div v-if="withdrawals.length" class="space-y-4">
            <ItemCardComponent v-for="withdrawal in withdrawals" :key="withdrawal.id" :withdrawal="withdrawal"
                @click="openModal(withdrawal)" />
        </div>
        <p v-else class="text-gray-500 text-center italic mt-6">Không có giao dịch rút tiền nào.</p>

        <!-- Withdrawal Details Modal -->
        <WithdrawalDetailsModal :isOpen="isModalOpen" :withdrawal="selectedWithdrawal" @close="isModalOpen = false" />
    </div>
</template>

<script>
import ItemCardComponent from '@/components/withdrawalHistory/ItemCardComponent.vue';
import WithdrawalDetailsModal from '@/components/withdrawalHistory/WithdrawalDetailsModalComponent.vue';
import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';

export default {
    name: 'WithdrawalHistoryPage',
    components: {
        ItemCardComponent,
        WithdrawalDetailsModal,
        BreadcrumbComponent,
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
    methods: {
        openModal(withdrawal) {
            this.selectedWithdrawal = withdrawal;
            this.isModalOpen = true;
        },
    },
};
</script>

<style scoped>
.max-w-2xl {
    max-width: 100%;
}

@media (min-width: 640px) {
    .max-w-2xl {
        max-width: 90%;
    }
}

@media (min-width: 768px) {
    .max-w-2xl {
        max-width: 80%;
    }
}

.bg-white {
    background-color: #ffffff;
}
</style>
