<template>
    <div class="p-6 min-h-screen space-y-6">
        <div class="flex justify-between">
            <h2 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-8 border-red-500">&nbsp; NGÂN HÀNG</h2>
            <span class="text-sm font-semibold text-gray-600 mb-4 cursor-pointer" @click="openEditModal(account)"> +
                Thêm
                ngân hàng
            </span>
        </div>


        <!-- List of Bank Accounts in a Responsive Grid -->
        <div v-if="bankAccounts.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <BankAccountComponent v-for="account in bankAccounts.filter(bank => !bank?.deleted)"
                :key="account?.accountId" :account="account" @edit="openEditModal(account)" />
            <div class="flex items-center justify-center bg-white h-[100px] border border-gray-300 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-100 transition duration-200"
                @click="() => { isModalOpen = true, toggleNav(false) }">
                <span class="text-4xl text-gray-500">+</span>
            </div>
        </div>
        <p v-else class="text-gray-400 text-sm md:text-base mt-4 text-center italic">
            Chưa có thông tin ngân hàng nào.
        </p>

        <!-- Modal for Adding/Editing Bank Account -->
        <BankAccountModal :isOpen="isModalOpen" :account="selectedAccount" @close="closeModal" @save="handleSave"
            @delete="handleDetete" />
    </div>
</template>

<script>
// import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import { addWallet, getWallet, updateWallet, deleteWallet } from '@/api/auth/walletApi';
import BankAccountComponent from '@/components/bankAccount/BankAccountComponent.vue';
import BankAccountModal from '@/components/bankAccount/BankAccountModal.vue';
import notificationService from '@/services/notificationService';
import { mapGetters, mapActions } from 'vuex';
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
            bankAccounts: [],
            isModalOpen: false,
            selectedAccount: null,
        };
    },
    mounted() {
        this.handleFetchWallet();
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        ...mapActions('nav', ['setNavMenuOpen']),
        toggleNav(isOpen) {
            this.setNavMenuOpen(isOpen);
        },
        async handleFetchWallet() {
            try {
                const res = await getWallet();
                this.bankAccounts = res.data;
            } catch (error) {
                console.log(error)
            }
        },
        openNewBankAccountModal() {
            this.toggleNav(false)
            this.selectedAccount = null;
            this.isModalOpen = true;
        },
        openEditModal(account) {
            this.toggleNav(false)
            this.selectedAccount = { ...account };
            this.isModalOpen = true;
        },
        closeModal() {
            this.toggleNav(true)
            this.selectedAccount = null;
            this.isModalOpen = false;
        },
        handleSave(account) {
            if (account.id) {
                this.handleUpdateWallet(account);
            } else {
                this.handleCreateWallet(account);
            }
            this.closeModal();
        },
        async handleUpdateWallet(wallet) {
            try {
                const res = await updateWallet(wallet);
                notificationService.success(res.message);
                this.handleFetchWallet()
            } catch (error) {
                console.error(error)
                notificationService.error(error.message)
            }
        }
        ,
        async handleCreateWallet(wallet) {
            try {
                const res = await addWallet(wallet);
                notificationService.success(res.message);
                this.handleFetchWallet()
            } catch (error) {
                console.error(error)
                notificationService.error(error.message)
            }
        },
        async handleDetete(account) {
            try {
                const res = await deleteWallet(account);
                notificationService.success(res.message);
                this.closeModal()
                this.handleFetchWallet()
            } catch (error) {
                console.log(error)
            }
        }
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
