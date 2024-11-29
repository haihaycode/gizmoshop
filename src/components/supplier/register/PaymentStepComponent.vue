<template>
    <div class="bg-white p-6 ">
        <h2 class="text-2xl font-bold mb-4">Chọn ngân hàng & Thanh toán</h2>
        <p class="mb-4">
            B1: Vui lòng chọn ngân hàng để nếu bạn không trở thành nhà cung cấp thành công thì tiền sẽ được hoàn về tài
            khoản ngân hàng bạn đã chọn
        </p>

        <div v-if="banks.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div v-for="account in banks.filter(bank => !bank?.deleted)" :key="account?.id"
                @click="handleSelectBank(account)" :class="[
                    'flex items-center justify-between p-4 border rounded-lg shadow-sm cursor-pointer transition duration-200',
                    selectedBank?.id === account?.id ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-gray-100'
                ]">
                <BankAccountComponent :account="account" />
            </div>

            <div class="flex items-center justify-center bg-white h-[100px] border border-gray-300 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-100 transition duration-200"
                @click="isModalOpen = true">
                <span class="text-4xl text-gray-500">+</span>
            </div>
        </div>
        <div v-else>
            <p class="text-sm text-gray-500">(*) Vui lòng quay lại trang thông tin cá nhân để thêm ngân hàng và quay lại
                đây
                đăng ký <router-link :to="{ name: 'bank' }" class="text-blue-500 underline">
                    Quay lại thêm ngân hàng
                </router-link> </p>
        </div>

        <p v-if="banks.length > 0" class="mb-4 mt-4">
            B2: Để hoàn tất quá trình đăng ký, vui lòng chọn tài khoản ngân hàng của bạn. Trong trường hợp đăng ký không
            thành công, số tiền
            <b>200.000 VND</b> sẽ được hoàn trả về tài khoản đã đăng ký.
        </p>

        <p v-if="banks.length > 0" class="text-gray-400 text-sm md:text-base mt-4 text-center italic">
            <Button :disabled="!banks.length || !selectedBank" @click="submitPayment"
                :text="banks.length ? (selectedBank ? 'Tiến hành thanh toán' : 'Chọn ngân hàng để tiếp tục') : 'Vui lòng quay lại trang thông tin cá nhân để thêm ngân hàng'"
                class="hover:bg-red-500" />
        </p>
    </div>
</template>

<script>
import { getWallet } from '@/api/auth/walletApi';
import BankAccountComponent from '@/components/bankAccount/BankAccountComponent.vue';
import Button from '@/components/containers/buttons/button.vue';
import notificationService from '@/services/notificationService';

export default {
    data() {
        return {
            banks: [],
            selectedBank: null, // Ngân hàng được chọn
        };
    },
    components: {
        BankAccountComponent,
        Button,
    },
    methods: {
        async handleFetchWallet() {
            try {
                const res = await getWallet();
                this.banks = res.data;
            } catch (error) {
                console.error('Error fetching wallet:', error);
            }
        },
        handleSelectBank(bank) {
            this.selectedBank = bank;
        },
        submitPayment() {

            if (this.selectedBank) {
                this.$emit('complete', this.selectedBank);
            } else {
                notificationService.info('Vui lòng chọn ngân hàng trước khi thanh toán.');
            }
        },
    },
    mounted() {
        this.handleFetchWallet();
    },
};
</script>

<style scoped>
/* CSS để thêm hiệu ứng */
.bg-blue-100 {
    background-color: #ebf8ff;
    /* Màu nền xanh nhạt */
}

.border-blue-500 {
    border-color: #4299e1;
    /* Màu viền xanh */
}
</style>
