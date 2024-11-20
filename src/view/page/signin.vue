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
          class="w-full md:w-1/2 flex flex-col justify-center items-center bg-white shadow-xl p-10 rounded-lg"
        >
          <h1 class="text-5xl font-extrabold mb-6 text-red-600 tracking-wide">
            Đăng ký
          </h1>
          <p class="text-lg text-gray-700 mb-8">
            Chào mừng! Nhập thông tin để tạo tài khoản.
          </p>

          <Form
            @submit="handleRegister"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="w-full max-w-sm"
          >
            <!-- Họ và tên -->
            <div class="mb-4">
              <Field
                name="fullName"
                placeholder="Họ và tên"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
              />
              <p class="text-sm text-red-500">{{ errors.fullName }}</p>
            </div>
            <!-- Email -->
            <div class="mb-4">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
              />
              <p class="text-sm text-red-500">{{ errors.email }}</p>
            </div>
            <!-- Mật khẩu -->
            <div class="mb-4">
              <Field
                name="password"
                type="password"
                placeholder="Mật khẩu"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
              />
              <p class="text-sm text-red-500">{{ errors.password }}</p>
            </div>
            <!-- Xác nhận mật khẩu -->
            <div class="mb-4">
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu"
                class="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
              />
              <p class="text-sm text-red-500">{{ errors.confirmPassword }}</p>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-lg font-semibold"
            >
              {{ isLoading ? "Đang xử lý..." : "Tạo tài khoản" }}
            </button>
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
      schema,
      isLoading: false,
    };
  },
  methods: {
    async handleRegister(values) {
      this.isLoading = true;

      try {
        const registerObject = {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword, // Thêm confirmPassword
        };

        console.log("Register Object Trước Khi Gửi: ", registerObject);
        const response = await registerApi(registerObject);
        notificationService.success(response.message || "Đăng ký thành công!");

        // Reset form và chuyển hướng
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } catch (error) {
        notificationService.error(
          error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
        );
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
