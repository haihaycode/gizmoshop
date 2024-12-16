<template>
    <!-- Use ModalBox as the wrapper -->
    <ModalBox :isOpen="isOpen" :closeModal="() => $emit('close')" header="Chi tiết giao dịch" closeText="Đóng">
        <!-- Modal Content -->
        <template #body>
            <div class="w-full sm:w-[500px] md:w-[600px] lg:w-[700px] bg-white">
                <!-- Transaction Information Section -->
                <div class="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Thông tin Giao dịch</h3>
                    <p class="text-sm text-gray-700 mb-2 font-semibold">
                        <strong>Số tiền:</strong> {{ formatCurrencyVN(withdrawal.amount || 0) }}
                    </p>
                    <p class="text-sm text-gray-700 mb-2 font-semibold">
                        <strong>Ngày:</strong> {{ formatDay(withdrawal.withdrawalDate) }}
                    </p>
                    <p class="text-sm text-gray-700 mb-2 font-semibold">
                        <strong>Lý do:</strong> {{ withdrawal.note }}
                    </p>
                </div>

                <!-- User Information Section -->
                <div v-if="withdrawal.account" class="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Thông tin Người dùng</h3>
                    <p class="text-sm text-gray-700 mb-2">
                        <strong>Email người dùng:</strong> {{ withdrawal.account.email || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                        <strong>Tên người dùng:</strong> {{ withdrawal.account.fullname || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                        <strong>Số điện thoại:</strong> {{ withdrawal.account.sdt || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                        <strong>Ngày sinh:</strong> {{ withdrawal.account.birthday || 'Không có thông tin' }}
                    </p>
                </div>

                <!-- Wallet Information Section -->
                <div v-if="withdrawal.walletAccount" class="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Thông tin Ngân hàng</h3>
                    <p class="text-sm text-gray-700 mb-2">
                        <strong>Tên ngân hàng:</strong> {{ withdrawal.walletAccount.bankName || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                        <strong>Số tài khoản:</strong> {{ withdrawal.walletAccount.accountNumber || 'Không có thông tin'
                        }}
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                        <strong>Chi nhánh:</strong> {{ withdrawal.walletAccount.branch || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-700 mb-2">
                        <strong>Swift Code:</strong> {{ withdrawal.walletAccount.swiftCode || 'Không có thông tin' }}
                    </p>
                </div>
            </div>


        </template>
    </ModalBox>
</template>

<script>
import ModalBox from '@/components/containers/modal/ModalBox.vue';
import { formatCurrencyVN, formatDay } from '@/utils/currencyUtils';

export default {
    name: 'WithdrawalDetailsModal',
    components: {
        ModalBox,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        withdrawal: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        formatDay,
        formatCurrencyVN
    },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
