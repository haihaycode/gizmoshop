<template>
    <div class="p-5 sm:p-6 lg:p-8 rounded-sm w-full mx-auto ">
        <!-- Breadcrumb Navigation -->
        <div class="mb-6">
            <BreadcrumbComponent :items="breadcrumbItems" />
        </div>

        <!-- Title and Description -->
        <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Thông tin ngân hàng</h2>
        <p class="text-gray-500 mb-6 text-sm sm:text-base lg:text-lg">
            Quản lý tài khoản ngân hàng của bạn để tiện cho giao dịch.
        </p>

        <!-- Add New Bank Account Button -->
        <div class="flex justify-end mt-6 lg:mb-3 mb-3">
            <button @click="openNewBankAccountModal" class="text-red-500 hover:underline transition duration-300">
                <i class='bx bx-add-to-queue'></i> Thêm Ngân Hàng
            </button>
        </div>

        <!-- List of Bank Accounts in a Responsive Grid -->
        <div v-if="bankAccounts.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <BankAccountComponent v-for="account in bankAccounts.filter(bank => !bank?.deleted)" :key="account?.id"
                :account="account" @edit="openEditModal(account)" />
        </div>
        <p v-else class="text-gray-400 text-sm md:text-base mt-4 text-center italic">
            Chưa có thông tin ngân hàng nào.
        </p>

        <!-- Modal for Adding/Editing Bank Account -->
        <BankAccountModal :isOpen="isModalOpen" :account="selectedAccount" @close="closeModal" @save="handleSave" />
    </div>
</template>

<script>
import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import BankAccountComponent from '@/components/bankAccount/BankAccountComponent.vue';
import BankAccountModal from '@/components/bankAccount/BankAccountModal.vue';

export default {
    name: 'BankPage',
    components: {
        BreadcrumbComponent,
        BankAccountComponent,
        BankAccountModal,
    },
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'home' },
                { text: 'Ngân hàng', name: '' },
            ],
            bankAccounts: [
                {
                    id: 1,
                    account_number: '0906806754',
                    bank_name: 'LE QUYET TIEN',
                    branch: 'MBBank/Danang',
                    swift_code: null,
                    create_at: null,
                    update_at: null,
                    account_id: 3
                },
                {
                    id: 2,
                    account_number: '0906854754',
                    bank_name: 'LUONG CAO THINH',
                    branch: 'MBBank/Danang',
                    swift_code: null,
                    create_at: null,
                    update_at: null,
                    account_id: 3
                },
                // Additional demo accounts can be added here
            ],
            isModalOpen: false,
            selectedAccount: null,
        };
    },
    methods: {
        openNewBankAccountModal() {
            this.selectedAccount = null;
            this.isModalOpen = true;
        },
        openEditModal(account) {
            this.selectedAccount = { ...account };
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        handleSave(account) {
            if (account.id) {
                const index = this.bankAccounts.findIndex((acc) => acc.id === account.id);
                if (index !== -1) {
                    this.$set(this.bankAccounts, index, account);
                }
            } else {
                account.id = Date.now();
                this.bankAccounts.push(account);
            }
            this.closeModal();
        },
    }
};
</script>

<style scoped>
/* Additional styling for a polished appearance */
.bg-gradient-to-r {
    background: linear-gradient(to right, #ff7e5f, #feb47b);
}

.bg-white {
    background-color: #ffffff;
}

.italic {
    font-style: italic;
}
</style>
