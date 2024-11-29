<template>
    <!-- Use ModalBox as the wrapper -->
    <ModalBox :isOpen="isOpen" :closeModal="() => $emit('close')" header="Chi tiết giao dịch" closeText="Đóng">
        <!-- Modal Content -->
        <template #body>
            <div class="w-full sm:w-[500px] md:w-[600px] lg:w-[700px]">
                <!-- Display Transaction Information -->
                <p class="text-sm text-gray-600 mb-2">
                    <strong>Số tiền :</strong> {{ formatCurrencyVN(withdrawal.amount || 0) }}
                </p>
                <p class="text-sm text-gray-600 mb-2">
                    <strong>Ngày :</strong> {{ formatDay(withdrawal.withdrawalDate) }}
                </p>
                <p class="text-sm text-gray-600 mb-2">
                    <strong>Lý do :</strong> {{ withdrawal.note }}
                </p>

                <!-- Display User Information -->
                <div v-if="withdrawal.account">
                    <p class="text-sm text-gray-600 mb-2">
                        <strong>Email người dùng:</strong> {{ withdrawal.account.email || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                        <strong>Tên người dùng:</strong> {{ withdrawal.account.fullname || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                        <strong>Số điện thoại:</strong> {{ withdrawal.account.sdt || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                        <strong>Ngày sinh:</strong> {{ withdrawal.account.birthday || 'Không có thông tin' }}
                    </p>

                </div>

                <!-- Display Wallet Information -->
                <div v-if="withdrawal.walletAccount">
                    <p class="text-sm text-gray-600 mb-2">
                        <strong>Tên ngân hàng:</strong> {{ withdrawal.walletAccount.bankName || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                        <strong>Số tài khoản:</strong> {{ withdrawal.walletAccount.accountNumber || 'Không có thông tin'
                        }}
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                        <strong>Chi nhánh:</strong> {{ withdrawal.walletAccount.branch || 'Không có thông tin' }}
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
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
