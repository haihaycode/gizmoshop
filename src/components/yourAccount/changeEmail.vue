<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <template #header>
            <div class="sm:text-sm md:text-lg font-bold">
                <h3 class="sm:text-sm md:text-lg font-bold">Cập nhật Email</h3>
            </div>
        </template>
        <template #body>
            <form class="max-w-md mx-auto p-6" @submit.prevent="verifyEmail">


                <!-- OTP Send Button -->
                <div class="mb-4 flex items-center justify-between">
                    <CustomInputComponent label="Nhập email mới" v-model="email" :error="!!emailError"
                        :message="emailError" @input="validateEmail" placeholder="example@gmail.com" />

                    <Button :text="isOtpSending ? `Gửi lại sau ${countdown}s` : 'Gửi'" type="button" @click="sendOtp"
                        :disabled="!email || emailError || isOtpSending"
                        class="bg-red-500 mb-2 text-white font-bold rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 hover:bg-red-600 disabled:opacity-50">
                    </Button>
                </div>


                <!-- OTP Verify Button -->
                <div class="flex items-center justify-between">
                    <CustomInputComponent label="Nhập OTP" v-model="otp" :error="!!otpError" :message="otpError"
                        @input="validateOtp" placeholder="Nhập mã OTP" />

                    <Button :text="'Xác nhận'" type="submit" :disabled="otpError || !otp"
                        class="bg-green-500 mb-2 text-white font-bold text-base rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 hover:bg-green-600 disabled:opacity-50">
                    </Button>
                </div>
            </form>
        </template>
        <template #footer></template>
    </ModalBox>
</template>

<script>
import ModalBox from '@/components/containers/modal/ModalBox.vue';
import Button from '../containers/buttons/button.vue';
import CustomInputComponent from '@/components/containers/input/CustomInputComponent.vue';
import { sendOtp, verifyEmail } from '@/api/auth/meApi';
import { mapGetters } from 'vuex';

export default {
    name: 'changeEmail',
    components: {
        ModalBox,
        Button,
        CustomInputComponent,
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            email: '',
            otp: '',
            emailError: '',
            otpError: '',
            countdown: 60,
            isOtpSending: false,
            timer: null,
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.email) {
                this.emailError = 'Email không được để trống';
            } else if (!emailPattern.test(this.email)) {
                this.emailError = 'Email không hợp lệ';
            } else {
                this.emailError = '';
            }
        },
        validateOtp() {
            if (!this.otp) {
                this.otpError = 'OTP không được để trống';
            } else {
                this.otpError = '';
            }
        },
        async sendOtp() {
            try {
                this.startCountdown();
                const emailNew = { newEmail: this.email };
                await sendOtp(emailNew);
            } catch (error) {
                console.error(error);
            }
        },
        startCountdown() {
            this.isOtpSending = true;
            this.countdown = 60;
            this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    this.stopCountdown();
                }
            }, 1000);
        },
        stopCountdown() {
            this.isOtpSending = false;
            clearInterval(this.timer);
        },
        async verifyEmail() {
            try {
                const emailNewandOtp = { newEmail: this.email, otp: this.otp };
                await verifyEmail(emailNewandOtp);
                this.closeModal();
            } catch (error) {
                console.error(error);
            }
        },
    },
    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
};
</script>

<style></style>
