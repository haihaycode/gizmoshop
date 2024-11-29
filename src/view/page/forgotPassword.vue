<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-gray-100"
    style="
      background-image: url('https://i.pinimg.com/736x/41/60/7d/41607d7cc517513f13d335087de68d71.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <div
      class="w-5/6 h-5/6 flex items-center justify-center mx-auto rounded-lg"
    >
      <div
        class="flex w-full h-full bg-gray-100 shadow-lg rounded-lg overflow-hidden"
      >
        <!-- Forgot Password Section -->
        <div
          class="hidden md:flex md:w-1/3 lg:w-1/2 h-full flex-col justify-center items-center text-white text-center p-10 relative rounded-lg overflow-hidden"
          style="
            background-image: url('https://i.pinimg.com/564x/53/91/15/539115966ea3c25b220d23ed23ee5848.jpg');
            background-size: cover;
            background-position: center;
          "
        >
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black opacity-50"></div>

          <!-- Forgot Password Content -->
          <div class="relative z-10">
            <h2 class="text-4xl font-extrabold mb-4">Quên mật khẩu?</h2>
            <p class="mb-8 text-lg">
              Hãy nhập email của bạn và chúng tôi sẽ gửi mã OTP để bạn có thể
              đặt lại mật khẩu mới.
            </p>
            <router-link to="/login">
              <button
                class="py-3 px-10 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-red-600 transition duration-200 shadow-lg"
              >
                Quay lại Đăng nhập
              </button>
            </router-link>
          </div>
        </div>

        <!-- Forgot Password Form Section -->
        <div
          class="w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center items-center bg-white shadow-xl p-10 rounded-lg"
        >
          <h1 class="text-5xl font-extrabold mb-6 text-red-600 tracking-wide">
            Đổi mật khẩu
          </h1>

          <form @submit.prevent="handleFormSubmit" class="w-full max-w-sm">
            <!-- Email -->
            <div class="mb-4 flex items-center">
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="w-9/12 p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
                :class="{ 'border-red-500': errorEmail }"
              />
              <button
                @click="sendOtp"
                :disabled="isLoading || email === ''"
                class="w-3/12 py-4 ml-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-lg font-semibold"
              >
                OTP
              </button>
              <p v-if="errorEmail" class="text-sm text-red-500 ml-2">
                {{ errorEmail }}
              </p>
            </div>

            <!-- OTP -->
            <div class="mb-4 relative">
              <!-- Input OTP -->
              <input
                v-model="otp"
                type="text"
                placeholder="Nhập mã OTP"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md pr-16"
                :class="{ 'border-red-500': errorOtp }"
              />
              <p v-if="errorOtp" class="text-sm text-red-500">{{ errorOtp }}</p>

              <!-- Thời gian đếm ngược, sử dụng position absolute để căn chỉnh vào bên trong input -->
              <span
                v-if="otpSent"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {{ otpTimer }} s
              </span>
            </div>

            <!-- Passwords -->
            <div class="mb-4">
              <input
                v-model="newPassword"
                type="password"
                placeholder="Mật khẩu mới"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
                :class="{ 'border-red-500': errorPassword }"
              />
              <p v-if="errorPassword" class="text-sm text-red-500">
                {{ errorPassword }}
              </p>
            </div>
            <div class="mb-4">
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
                :class="{ 'border-red-500': errorConfirmPassword }"
              />
              <p v-if="errorConfirmPassword" class="text-sm text-red-500">
                {{ errorConfirmPassword }}
              </p>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isLoading || !otpSent || isOtpExpired"
              class="w-full py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-lg font-semibold"
            >
              {{ isLoading ? "Đang xử lý..." : "Đổi mật khẩu" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import notificationService from "@/services/notificationService";
import {
  forgotPass,
  confirmOtpAndResetPassword,
} from "@/api/auth/forgotPasswordApi";

export default {
  data() {
    return {
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
      otpSent: false,
      isLoading: false,
      isOtpExpired: false,
      errorEmail: null,
      errorOtp: null,
      errorPassword: null,
      errorConfirmPassword: null,
      errorMessage: null,
      successMessage: null,
      otpTimer: 60, // 60s countdown for OTP
      timerInterval: null,
    };
  },
  methods: {
    async sendOtp() {
      this.errorEmail = null;
      this.errorMessage = null;
      if (!this.validateEmail()) return;

      this.isLoading = true;
      try {
        const response = await forgotPass({ email: this.email });
        if (response?.message) {
          notificationService.success(
            response.message || "OTP đã được gửi qua email!"
          );

          this.otpSent = true;
          this.startOtpTimer();
        }
      } catch (err) {
        notificationService.error(
          err.response?.data?.message || "Send OTP thất bại. Vui lòng thử lại."
        );
      } finally {
        this.isLoading = false;
      }
    },

    async handleFormSubmit() {
      this.errorOtp = this.errorPassword = this.errorConfirmPassword = null;

      if (!this.validateOtp() || !this.validatePassword()) return;

      this.isLoading = true;
      try {
        const response = await confirmOtpAndResetPassword({
          email: this.email,
          otp: this.otp,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });
        notificationService.success(
          response.message || "Mật khẩu đã được thay đổi thành công!"
        );
      } catch (err) {
        notificationService.error(
          err.response?.data?.message || "Thay đổi thất bại. Vui lòng thử lại."
        );
      } finally {
        this.isLoading = false;
      }
    },

    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errorEmail = "Vui lòng nhập email!";
        return false;
      } else if (!emailPattern.test(this.email)) {
        this.errorEmail = "Email không hợp lệ!";
        return false;
      }
      return true;
    },

    validateOtp() {
      if (!this.otp) {
        this.errorOtp = "Vui lòng nhập mã OTP!";
        return false;
      }
      return true;
    },

    validatePassword() {
      if (!this.newPassword) {
        this.errorPassword = "Vui lòng nhập mật khẩu!";
        return false;
      }
      if (this.newPassword.length < 6) {
        this.errorPassword = "Mật khẩu phải có ít nhất 6 ký tự!";
        return false;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.errorConfirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp!";
        return false;
      }
      return true;
    },

    startOtpTimer() {
      this.timerInterval = setInterval(() => {
        if (this.otpTimer <= 0) {
          clearInterval(this.timerInterval);
          this.isOtpExpired = true;
        } else {
          this.otpTimer--;
        }
      }, 1000);
    },
  },
};
</script>
