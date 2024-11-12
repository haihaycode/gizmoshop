<template>
    <div class="p-5 sm:p-6 lg:p-8 rounded-sm w-full mx-auto ">
        <!-- Breadcrumb Navigation -->
        <BreadcrumbComponent :items="breadcrumbItems" />

        <!-- Page Title -->
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Đổi mật khẩu</h2>

        <!-- Step 1: Enter Email to Receive OTP -->
        <div v-if="step === 1">
            <CustomInputComponent v-model="email" label="Email" type="email" :error="!!errors.email"
                :message="errors.email" @input="clearError('email')" required />
            <button type="button" @click="sendOtp" :disabled="isCountdownActive"
                class="mt-6 w-full py-3 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50 transition duration-200">
                {{ isCountdownActive ? `Gửi lại mã OTP sau ${countdown}s` : 'Gửi mã OTP' }}
            </button>
        </div>

        <!-- Step 2: Enter OTP and New Password -->
        <div v-if="step === 2" class="space-y-4">
            <CustomInputComponent v-model="otp" label="Mã OTP" type="text" :error="!!errors.otp" :message="errors.otp"
                @input="clearError('otp')" required />
            <CustomInputComponent v-model="newPassword" label="Mật khẩu mới" type="password"
                :error="!!errors.newPassword" :message="errors.newPassword" @input="clearError('newPassword')"
                required />
            <CustomInputComponent v-model="confirmPassword" label="Xác nhận mật khẩu mới" type="password"
                :error="!!errors.confirmPassword" :message="errors.confirmPassword"
                @input="clearError('confirmPassword')" required />
            <button type="button" @click="submitNewPassword"
                class="mt-6 w-full py-3 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 transition duration-200">
                Đổi mật khẩu
            </button>
        </div>

        <!-- Success Message -->
        <div v-if="step === 3" class="text-center text-green-600 text-lg font-semibold mt-6">
            Mật khẩu của bạn đã được thay đổi thành công!
        </div>
    </div>
</template>

<script>
import * as yup from 'yup';
import BreadcrumbComponent from '@/components/containers/breadcrumb/BreadcrumbComponent.vue';
import CustomInputComponent from '@/components/containers/input/CustomInputComponent.vue';

export default {
    name: 'ChangePasswordPage',
    components: {
        BreadcrumbComponent,
        CustomInputComponent,
    },
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'home' },
                { text: 'Đổi mật khẩu' },
            ],
            step: 1,
            email: '',
            otp: '',
            newPassword: '',
            confirmPassword: '',
            errors: {},
            countdown: 60,
            isCountdownActive: false,
            countdownInterval: null,
        };
    },
    methods: {
        clearError(field) {
            this.errors[field] = '';
        },
        sendOtp() {
            const schema = yup.object().shape({
                email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            });
            schema.validate({ email: this.email }, { abortEarly: false })
                .then(() => {
                    this.errors = {};
                    this.$emit('send-otp', this.email);
                    this.startCountdown();
                    this.step = 2;
                })
                .catch((err) => {
                    this.errors = {};
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                });
        },
        startCountdown() {
            this.isCountdownActive = true;
            this.countdown = 60;
            this.countdownInterval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    this.stopCountdown();
                }
            }, 1000);
        },
        stopCountdown() {
            this.isCountdownActive = false;
            clearInterval(this.countdownInterval);
        },
        submitNewPassword() {
            const schema = yup.object().shape({
                otp: yup.string().required('Mã OTP là bắt buộc'),
                newPassword: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu mới là bắt buộc'),
                confirmPassword: yup.string()
                    .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
                    .required('Xác nhận mật khẩu là bắt buộc'),
            });

            schema.validate(
                { otp: this.otp, newPassword: this.newPassword, confirmPassword: this.confirmPassword },
                { abortEarly: false }
            )
                .then(() => {
                    this.errors = {};
                    this.$emit('change-password', { email: this.email, otp: this.otp, newPassword: this.newPassword });
                    this.step = 3;
                })
                .catch((err) => {
                    this.errors = {};
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                });
        },
    },
    beforeUnmount() {
        this.stopCountdown();
    },
};
</script>

<style scoped>
/* Responsive styling for container */
.max-w-md {
    max-width: 100%;
}

@media (min-width: 640px) {
    .max-w-md {
        max-width: 90%;
    }
}

@media (min-width: 768px) {
    .max-w-md {
        max-width: 80%;
    }
}

.bg-white {
    background-color: #ffffff;
}
</style>
