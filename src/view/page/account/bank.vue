<template>
    <div v-if="!isLoading" class="p-6 min-h-screen space-y-6">
        <div>
            <h2 class="text-xl font-semibold text-gray-600 mb-4">Thông tin tài khoản ngân hàng</h2>
        </div>



        <!-- List of Bank Accounts in a Responsive Grid -->
        <div v-if="bankAccounts.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <BankAccountComponent v-for="account in bankAccounts.filter(bank => !bank?.deleted)" :key="account?.id"
                :account="account" @edit="openEditModal(account)" />
            <div class="flex items-center justify-center bg-white h-[100px] border border-gray-300 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-100 transition duration-200"
                @click="isModalOpen = true">
                <span class="text-4xl text-gray-500">+</span>
            </div>
        </div>
        <p v-else class="text-gray-400 text-sm md:text-base mt-4 text-center italic">
            Chưa có thông tin ngân hàng nào.
        </p>

        <!-- Modal for Adding/Editing Bank Account -->
        <BankAccountModal :isOpen="isModalOpen" :account="selectedAccount" @close="closeModal" @save="handleSave" />
    </div>
</template>

<script>
// import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import BankAccountComponent from '@/components/bankAccount/BankAccountComponent.vue';
import BankAccountModal from '@/components/bankAccount/BankAccountModal.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'BankPage',
    components: {
        // BreadcrumbComponent,
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
    computed: {
        ...mapGetters('loading', ['isLoading']),
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
