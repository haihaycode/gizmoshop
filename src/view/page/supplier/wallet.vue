<template>
    <h2 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500 text-left sm:text-center">
        &nbsp; THÔNG TIN & VÍ CỦA
        BẠN </h2>
    <div class="min-h-screen flex flex-wrap py-10 mx-auto justify-center">

        <div>
            <div class="flex" v-if="!isLoading">
                <div class="max-w-md w-full md:w-1/2">
                    <WalletActions @deposit="handleDeposit" @withdraw="handleWithdraw" />
                    <WalletBalance :walletData="wallet" :bankAccounts="bankAccounts" :addresses="addresses" />
                </div>
                <div class="hidden md:flex w-full md:w-1/2   justify-center">
                    <img src="https://omisell.com/vi-vn/wp-content/uploads/sites/2/2021/12/Screenshot_2.jpg"
                        alt="Mô tả ảnh" class="w-full h-[450px]" />
                </div>
            </div>
            <div v-else>
                <div v-if="isLoading" class="text-blue-500 text-center"><i
                        class='bx bx-loader-circle bx-rotate-90 bx-spin' style='color:#1257c0'></i> Đang tải dữ liệu...
                </div>
            </div>

        </div>
        <!-- modal giao dịch  -->
        <ModalBox :isOpen="isModalOpen" :header="'Rút tiền'" :loading="isLoading"
            :closeModal="() => { isModalOpen = false }">
            <template #body>
                <form @submit.prevent="submitWithdraw" class="min-w-[300px]">

                    <CustomInputComponent @input="handleCaculatorVND(withdrawData.amount)"
                        :label="'Số tiền rút' + ' (~ ' + amountVietNamDong + ')'" v-model="withdrawData.amount"
                        :error="!!errors.amount" :message="errors.amount" type="number" />

                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Ngân Hàng</label>
                        <el-select v-model="withdrawData.bank" placeholder="Chọn ngân hàng" class="w-full"
                            :class="{ 'border-red-500': !!withdrawData.bank }" clearable>
                            <el-option v-for="bank in banks" :key="bank.id"
                                :label="bank.bankName + ' - ' + bank.accountNumber" :value="bank.id"></el-option>
                        </el-select>
                        <p v-if="errors.bank" class="text-red-500 text-sm">{{ errors.bank }}</p>
                    </div>
                    <p class="text-gray-400 font-mono mt-2">(*) Sau khi rút tiền thành công hãy chú ý lịch sử giao dịch
                    </p>
                    <div class="flex justify-end space-x-2 mt-4">
                        <button type="submit"
                            class="px-4 py-2 bg-green-500 text-white rounded-sm mt-2 hover:bg-green-600">
                            Xác nhận rút tiền
                        </button>
                    </div>


                </form>
            </template>
        </ModalBox>

        <!-- modal nạp tiền  -->
        <ModalBox :isOpen="isDepositModalOpen" :header="'Nạp tiền '" :loading="false"
            :closeModal="() => { isDepositModalOpen = false }">
            <template #body>
                <p class="text-gray-400 mb-2 font-mono">(*)Nạp tiền và duy trì số dư trong tài khoản để khi giao dịch sẽ
                    dùng
                    tiền này để thanh toán </p>
                <form @submit.prevent="submitDeposit" class="min-w-[300px]">
                    <CustomInputComponent @input="handleCaculatorVND(depositData.amount)" l
                        :label="'Số tiền nạp ' + ' (~ ' + amountVietNamDong + ')'" v-model="depositData.amount"
                        :error="!!depositErrors.amount" :message="depositErrors.amount" type="number" />

                    <div class="flex justify-end space-x-2 mt-4">
                        <button type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-sm mt-2 hover:bg-blue-600">
                            Xác nhận nạp tiền
                        </button>
                    </div>
                </form>
            </template>
        </ModalBox>
    </div>
</template>

<script>
import WalletBalance from "@/components/supplier/wallet/WalletBalanceComponent.vue";
import WalletActions from "@/components/supplier/wallet/WalletActionsComponent.vue";
import ModalBox from "@/components/containers/modal/ModalBox.vue";
import CustomInputComponent from "@/components/containers/input/CustomInputComponent.vue";
import * as yup from "yup";
import { getInfoSuplier } from "@/api/supplierApi";
import { getWallet } from '@/api/auth/walletApi';
import { ElSelect, ElOption } from "element-plus";
import 'element-plus/dist/index.css';
import { withdrawSupplierFunds } from '@/api/supplierApi';
import notificationService from "@/services/notificationService";
import { mapGetters } from "vuex";
import { createPaymentForOrderCustumer } from '@/api/vnpayApi';
import { getAddress } from '@/api/auth/addressApi';
export default {
    name: "WalletPage",
    components: {
        WalletBalance,
        WalletActions,
        ModalBox,
        CustomInputComponent,
        ElSelect, ElOption
    },
    data() {
        return {
            amountVietNamDong: '',
            wallet: {},
            banks: [],
            addresses: [],
            bankAccounts: [],
            isModalOpen: false,//nút
            isDepositModalOpen: false,//nạp
            withdrawData: {
                amount: 0,
                bank: 0,
            },
            errors: {},
            loading: false,
            depositData: {
                amount: 0,
            },
            depositErrors: {},
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    mounted() {
        this.handleFetchWallet();
    },
    methods: {

        handleCaculatorVND(amount) {
            this.amountVietNamDong = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(amount);
        },
        async handleFetchAll() {
            try {
                const resAddress = await getAddress();
                const resWallet = await getWallet();
                this.addresses = resAddress.data;
                this.bankAccounts = resWallet.data;
            } catch (error) {
                console.log(error);
            }
        },
        async handleFetchWallet() {
            try {
                const resWallet = await getInfoSuplier();
                const resBank = await getWallet();
                this.wallet = resWallet.data;
                this.banks = resBank.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.handleFetchAll();
            }
        },
        handleDeposit() {
            this.resetDepositForm();
            this.isDepositModalOpen = true;
        },
        handleWithdraw() {
            this.resetWithdrawForm();
            this.isModalOpen = true;
        },
        resetDepositForm() {
            this.depositData = { amount: 0 };
            this.depositErrors = {};
        },
        resetWithdrawForm() {
            this.withdrawData = { amount: 0, bank: null };
            this.errors = {};
        },
        async validateWithdraw() {
            const schema = yup.object().shape({
                amount: yup
                    .number()
                    .transform((value) => parseFloat(value))
                    .required("Số tiền không được để trống")
                    .positive("Số tiền phải lớn hơn 0")
                    .min(50000, "Số tiền nạp và rút phải lớn hơn >= 50.000VND")
                    .max(this.wallet.balance, "Số tiền không được vượt quá số dư hiện tại"),
                bank: yup.number().required("Ngân hàng là bắt buộc"),
            });

            return schema
                .validate(this.withdrawData, { abortEarly: false })
                .then(() => {
                    this.errors = {};
                })
                .catch((err) => {
                    this.errors = {};
                    err.inner.forEach((e) => {
                        this.errors[e.path] = e.message;
                    });
                });
        },
        async submitWithdraw() {
            await this.validateWithdraw();
            if (Object.keys(this.errors).length === 0) {
                try {
                    const data = {
                        balance: Number(this.withdrawData.amount),
                        wallet: this.withdrawData.bank,
                    };
                    const response = await withdrawSupplierFunds(data);
                    notificationService.success(response.message || "Rút tiền thành công!");
                    this.handleFetchWallet();
                } catch (error) {
                    alert(error);
                }
                this.isModalOpen = false;
            }
        },

        async validateDeposit() {
            const schema = yup.object().shape({
                amount: yup
                    .number()
                    .transform((value) => parseFloat(value)) // Chuyển đổi giá trị sang kiểu số
                    .required("Số tiền không được để trống")
                    .positive("Số tiền phải lớn hơn 0")
                    .min(50000, "Số tiền nạp và rút phải lớn hơn >= 50.000VND")
                    .max(this.wallet.balance, "Số tiền không được vượt quá số dư hiện tại")
            });

            return schema
                .validate(this.depositData, { abortEarly: false })
                .then(() => {
                    this.depositErrors = {};
                })
                .catch((err) => {
                    this.depositErrors = {};
                    err.inner.forEach((e) => {
                        this.depositErrors[e.path] = e.message;
                    });
                });
        },
        async submitDeposit() {
            await this.validateDeposit();
            if (Object.keys(this.depositErrors).length === 0) {

                try {
                    // amount, idWallet, idVoucher, idAddress, type
                    const res = await createPaymentForOrderCustumer(this.depositData.amount, null, null, null, 'account_topup');
                    if (res && res.data.paymentUrl) {
                        window.location.href = res.data.paymentUrl;
                    } else {
                        console.error("Không tìm thấy URL thanh toán trong phản hồi .");
                    }
                } catch (error) {
                    console.error(error);
                }
                this.isDepositModalOpen = false; // Close modal
            }
        },
    },
};
</script>
