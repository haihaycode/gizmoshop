<template>
    <div class="mx-auto p-4 ">
        <h1 class="text-3xl font-bold text-center mb-6">Đăng ký nhà cung cấp</h1>

        <!-- Các bước -->
        <transition name="fade-slide" mode="out-in">
            <div :key="step">
                <div v-if="step === 1">
                    <IntroductionStepComponent @next="goToNextStep" />
                </div>
                <div v-if="step === 2">
                    <UpdateInfoStepComponent @next="handleUpdateInfo" @prev="goToPrevStep" />
                </div>
                <div v-if="step === 3">
                    <PaymentStepComponent @complete="handlePayment" @prev="goToPrevStep" />
                </div>
            </div>
        </transition>

        <!-- Quy trình ở dưới -->
        <div class="mt-8">
            <div class="flex items-center justify-center space-x-4">
                <div v-for="(stepLabel, index) in steps" :key="index" class="flex items-center">
                    <!-- Step Circle -->
                    <div :class="[
                        'w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                        index + 1 === step
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-500',
                    ]">
                        {{ index + 1 }}
                    </div>

                    <!-- Connector Line -->
                    <div v-if="index < steps.length - 1" class="w-10 h-[2px] mx-2"
                        :class="index + 1 < step ? 'bg-blue-500' : 'bg-gray-300'"></div>
                </div>
            </div>

            <!-- Step Labels -->
            <div class="flex justify-center mt-2 space-x-10">
                <span v-for="(stepLabel, index) in steps" :key="index" class="text-sm"
                    :class="index + 1 === step ? 'text-blue-500 font-bold' : 'text-gray-500'">
                    {{ stepLabel }}
                </span>
            </div>
        </div>

    </div>
</template>
<script>
import IntroductionStepComponent from '@/components/supplier/register/IntroductionStepComponent.vue';
import PaymentStepComponent from '@/components/supplier/register/PaymentStepComponent.vue';
import UpdateInfoStepComponent from '@/components/supplier/register/UpdateInfoStepComponent.vue';
import { registerNoteSupplierAccount } from '@/api/supplierApi'
import { createPaymentForOrderCustumer } from '@/api/vnpayApi';

export default {
    components: {
        IntroductionStepComponent,
        UpdateInfoStepComponent,
        PaymentStepComponent,
    },
    data() {
        return {
            step: 1,//start
            supplierData: {
                businessInfo: {},
                paymentInfo: {},
            },
            amount: 200000,
            paymentType: 'supplier_registration',
            steps: ['Giới thiệu', 'Cập nhật thông tin', 'Thanh toán'],
        };
    },
    methods: {
        goToNextStep() {
            if (this.step < 3) this.step++;
        },
        goToPrevStep() {
            if (this.step > 1) this.step--;
        },
        restartProcess() {
            this.step = 1;
            this.supplierData = { businessInfo: {}, paymentInfo: {} };
        },
        handleUpdateInfo(data) {
            this.supplierData.businessInfo = data;
            this.goToNextStep();
        },
        async handlePayment(data) {
            try {
                this.supplierData.paymentInfo = data;
                //lưu thông tin tạm trước lên db với account đó vì txn_ref chứa đc khá ít dữ liệu
                await this.hanldeRegisterNoteSupplierAccount();
                //thanh toán 200.000 lấy url
                const amount = this.amount;
                const idWallet = this.supplierData.paymentInfo.id;
                const type = this.paymentType;
                const response = await createPaymentForOrderCustumer(amount, idWallet, -1, -1, type);
                if (response && response.data.paymentUrl) {
                    window.location.href = response.data.paymentUrl;
                } else {
                    console.error("Không tìm thấy URL thanh toán trong phản hồi.");
                }
            } catch (error) {
                console.log(error);
            }
        },
        async hanldeRegisterNoteSupplierAccount() {
            try {
                await registerNoteSupplierAccount(this.supplierData.businessInfo);
            } catch (error) {
                console.error(error);
            }
        }
        ,

    },
};
</script>

<style scoped>
/* Hiệu ứng chuyển động mượt mà */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter {
    opacity: 0;
    transform: translateX(50px);
    /* Hiệu ứng từ phải vào */
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-50px);
    /* Hiệu ứng từ trái ra */
}
</style>
