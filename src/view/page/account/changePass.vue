<template>
    <div class="p-6 min-h-screen space-y-6">
        <!-- Page Title -->
        <div>
            <h2 class="text-xl font-semibold text-gray-600 mb-4">Thay đổi mật khẩu cho tài khoản</h2>
        </div>

        <!-- Form Container -->
        <div class="w-full space-y-6">
            <!-- Old Password and OTP Button in Row -->
            <div class="flex items-center space-x-4">
                <CustomInputComponent v-model="oldPassword" label="Mật khẩu cũ" type="password"
                    :error="!!errors.oldPassword" :message="errors.oldPassword" @input="clearError('oldPassword')"
                    required class="flex-1" />
                <Button type="button" @click="sendOtp" :disabled="isCountdownActive" :isLoading="isLoading"
                    :text="isCountdownActive ? `${countdown}s` : 'Gửi mã OTP'"
                    class="py-2 px-4 text-white bg-blue-500 rounded-sm  hover:bg-blue-600 disabled:opacity-50 transition duration-200">

                </Button>
            </div>

            <!-- Other Password Inputs -->
            <CustomInputComponent v-model="newPassword" label="Mật khẩu mới" type="password"
                :error="!!errors.newPassword" :message="errors.newPassword" @input="clearError('newPassword')"
                required />
            <CustomInputComponent v-model="confirmPassword" label="Xác nhận mật khẩu mới" type="password"
                :error="!!errors.confirmPassword" :message="errors.confirmPassword"
                @input="clearError('confirmPassword')" required />
            <CustomInputComponent v-model="otp" label="Mã OTP" type="text" :error="!!errors.otp" :message="errors.otp"
                @input="clearError('otp')" required />

            <!-- Submit New Password Button at the Bottom, Smaller -->
            <Button @click="submitNewPassword" :text="'   Xác nhận đổi mật khẩu'" :isLoading="isLoading"
                class=" py-2 text-white bg-red-500 rounded-sm  hover:bg-red-600 transition duration-200">
            </Button>
        </div>
    </div>
</template>

<script>
import * as yup from 'yup';
import CustomInputComponent from '@/components/containers/input/CustomInputComponent.vue';
import { sendOtpChangePassword, changePassword } from '@/api/auth/changePassApi';
import notificationService from '@/services/notificationService';
import { mapGetters } from 'vuex';
import Button from '@/components/containers/buttons/button.vue';

export default {
    name: 'ChangePasswordPage',
    components: {
        CustomInputComponent,
        Button
    },
    data() {
        return {
            step: 1,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            otp: '',
            errors: {},
            countdown: 60,
            isCountdownActive: false,
            countdownInterval: null,
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        clearError(field) {
            this.errors[field] = '';
        },
        async sendOtp() {
            const res = await sendOtpChangePassword();
            notificationService.success(res.message);
            this.startCountdown();
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
                oldPassword: yup.string().required('Mật khẩu cũ là bắt buộc'),
                newPassword: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu mới là bắt buộc'),
                confirmPassword: yup.string()
                    .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
                    .required('Xác nhận mật khẩu là bắt buộc'),
                otp: yup.string().required('Mã OTP là bắt buộc'),
            });

            schema.validate(
                { oldPassword: this.oldPassword, newPassword: this.newPassword, confirmPassword: this.confirmPassword, otp: this.otp },
                { abortEarly: false }
            )
                .then(() => {
                    this.errors = {};
                    this.handleChangePassword({ oldPassword: this.oldPassword, newPassword: this.newPassword, confirmPassword: this.confirmPassword, otp: this.otp });
                })
                .catch((err) => {
                    this.errors = {};
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                });
        },
        async handleChangePassword(data) {
            try {
                const res = await changePassword(data);
                notificationService.success(res.message);
                this.$router.push({ name: 'profile' });
            } catch (error) {
                console.error(error)
            }
        },
    },
    beforeUnmount() {
        this.stopCountdown();
    },
};
</script>

<style scoped>
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
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
