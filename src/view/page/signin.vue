<template>
  <div
    class="flex h-screen items-center justify-center bg-gray-100"
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
        <!-- Welcome Section -->
        <div
          class="hidden md:flex w-1/2 h-full flex-col justify-center items-center text-white text-center p-10 relative"
          style="
            background-image: url('https://i.pinimg.com/564x/53/91/15/539115966ea3c25b220d23ed23ee5848.jpg');
            background-size: cover;
            background-position: center;
          "
        >
          <div class="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div class="relative z-10">
            <h2 class="text-4xl font-extrabold mb-4">Chào mừng bạn!</h2>
            <p class="mb-8 text-lg">Bạn đã có tài khoản, đăng nhập ngay.</p>
            <router-link to="/login">
              <button
                class="py-3 px-10 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-red-600 transition duration-200 shadow-lg"
              >
                Đăng nhập
              </button>
            </router-link>
          </div>
        </div>

        <!-- Registration Form -->
        <div
          class="w-full md:w-1/2 flex flex-col justify-center items-center bg-white shadow-xl p-6 rounded-lg"
        >
          <h1 class="text-5xl font-extrabold mb-6 text-red-600 tracking-wide">
            Đăng ký
          </h1>
          <p class="text-lg text-gray-700 mb-8">
            Chào mừng! Nhập thông tin để tạo tài khoản.
          </p>

          <Form
            ref="registerForm"
            @submit="handleSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="w-full max-w-sm"
          >
            <!-- Họ và tên -->
            <div class="mb-4">
              <Field
                v-model="fullName"
                name="fullName"
                placeholder="Họ và tên"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
              />
              <p class="text-sm text-red-500">{{ errors.fullName }}</p>
            </div>
            <div class="mb-4">
              <Field
                v-model="email"
                name="email"
                type="email"
                placeholder="Email"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
              />
              <p class="text-sm text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Mật khẩu -->
            <div class="mb-4">
              <!-- Mật khẩu -->
              <div class="relative">
                <Field
                  v-model="password"
                  name="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  placeholder="Mật khẩu"
                  class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
                />
                <button
                  type="
                button"
                  @click.stop="togglePasswordVisibility"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <i :class="passwordVisible ? 'bx bx-hide' : 'bx bx-show'"></i>
                </button>
              </div>
              <p class="text-sm text-red-500">{{ errors.password }}</p>
            </div>

            <!-- Xác nhận mật khẩu -->
            <div class="mb-4">
              <div class="relative">
                <Field
                  v-model="confirmPassword"
                  name="confirmPassword"
                  :type="confirmPasswordVisible ? 'text' : 'password'"
                  placeholder="Xác nhận mật khẩu"
                  class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
                />

                <button
                  type="button"
                  @click.stop="toggleConfirmPasswordVisibility"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <i
                    :class="
                      confirmPasswordVisible ? 'bx bx-hide' : 'bx bx-show'
                    "
                  ></i>
                </button>
              </div>
              <p class="text-sm text-red-500">{{ errors.confirmPassword }}</p>
            </div>
            <div v-if="showOtp" class="mb-4 relative">
              <input
                v-model="otp"
                type="text"
                placeholder="Nhập mã OTP"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md pr-16"
                :class="{ 'border-red-500': isOtpExpired }"
              />
              <p v-if="isOtpExpired" class="text-sm text-red-500">
                OTP đã hết hạn, vui lòng gửi lại!
              </p>
              <span
                v-if="otpSent && !isOtpExpired"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {{ otpTimer }}s
              </span>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              @click="handleSubmit"
              class="w-full py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-lg font-semibold"
            >
              {{
                isLoading
                  ? "Đang xử lý..."
                  : isOtpVerified
                  ? "Đăng ký ngay"
                  : "Xác thực tài khoản"
              }}
            </button>
            <p class="text-xl text-gray-600 text-center mt-3">
              <a href="/signin" class="text-red-600 underline">Đăng nhập</a>
              <a href="/" class="text-blue-600 underline text-center"
                >Trang chủ</a
              >
            </p>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { registerApi } from "@/api/auth/registerApi";
import notificationService from "@/services/notificationService";
import { sendmailOtp } from "@/api/auth/forgotPasswordApi";
export default {
  name: "RegisterPage",
  data() {
    const schema = Yup.object().shape({
      fullName: Yup.string()
        .required("Họ và tên là bắt buộc")
        .min(3, "Họ và tên phải ít nhất 3 ký tự"),
      email: Yup.string()
        .required("Email là bắt buộc")
        .email("Email không đúng định dạng"),
      password: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải ít nhất 8 ký tự"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không khớp")
        .required("Xác nhận mật khẩu là bắt buộc"),
    });

    return {
      serverOtp: null, // Lưu mã OTP từ server
      otp: "",
      otpTimer: 0,
      schema,
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
      passwordVisible: false, // Kiểm soát hiển thị mật khẩu
      confirmPasswordVisible: false,
      showOtp: false,
      isOtpVerified: false, // Kiểm soát hiển thị xác nhận mật khẩu
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.isOtpVerified) {
        // Kiểm tra trường bắt buộc
        if (
          !this.fullName ||
          !this.email ||
          !this.password ||
          !this.confirmPassword
        ) {
          notificationService.error("Vui lòng nhập đủ các thông tin bắt buộc!");
          return;
        }

        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (this.password !== this.confirmPassword) {
          notificationService.error(
            "Mật khẩu và xác nhận mật khẩu không khớp!"
          );
          return;
        }
        const isValid = await this.$refs.registerForm.validate();
        if (!isValid) {
          notificationService.error(
            "Thông tin không hợp lệ. Vui lòng kiểm tra lại!"
          );
          return;
        }
        this.showOtp = true;
        await this.sendOtp();
      } else {
        // Xác thực OTP
        if (!this.otp || this.otp !== this.serverOtp) {
          notificationService.error(
            "Mã OTP không chính xác. Vui lòng kiểm tra lại!"
          );
          return;
        }
        await this.handleRegister();
      }
    },
    async sendOtp() {
      if (!this.validateEmail()) {
        notificationService.error("Email không hợp lệ!");
        return;
      }
      this.isLoading = true;

      try {
        const response = await sendmailOtp({ email: this.email });
        if (response?.data) {
          this.serverOtp = response.data; // Lưu mã OTP từ server
          notificationService.success("OTP đã được gửi qua email!");
          this.isOtpVerified = true;
          this.otpSent = true;
          this.startOtpTimer();
        }
      } catch (err) {
        notificationService.error(
          err.response?.data?.message || "Gửi OTP thất bại. Vui lòng thử lại."
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

    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible; // Lật trạng thái hiển thị mật khẩu
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible; // Lật trạng thái hiển thị xác nhận mật khẩu
    },

    validateOtp() {
      if (!this.otp) {
        this.errorOtp = "Vui lòng nhập mã OTP!";
        return false;
      }
      if (this.otp !== this.serverOtp) {
        this.errorOtp = "Mã OTP không đúng!";
        return false;
      }
      if (this.isOtpExpired) {
        this.errorOtp = "Mã OTP đã hết hạn!";
        return false;
      }
      return true;
    },
    startOtpTimer() {
      this.otpTimer = 60; // 60 giây
      this.isOtpExpired = false;

      let timeLeft = 60; // Thời gian thực
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          // Cập nhật giao diện mỗi 2 giây
          if (timeLeft % 2 === 0) {
            this.otpTimer = timeLeft;
          }
        } else {
          clearInterval(timer);
          this.isOtpExpired = true;
          this.isOtpVerified = false; // OTP đã hết hạn
          this.otpSent = false; // Cho phép gửi lại OTP
        }
      }, 1000); // Thực thi mỗi giây
    },

    async handleRegister() {
      this.isLoading = true;

      try {
        const registerObject = {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword, // Thêm confirmPassword
        };

        console.log("Register Object Trước Khi Gửi: ", registerObject);
        const response = await registerApi(registerObject);
        notificationService.success(response.message || "Đăng ký thành công!");
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } catch (error) {
        notificationService.error("Đăng ký thất bại. Vui lòng thử lại.");
      } finally {
        this.isLoading = false;
      }
    },
  },
  components: {
    Form,
    Field,
  },
};
</script>
