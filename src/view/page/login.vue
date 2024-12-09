<template>
  <div class="flex h-screen " style="
      background-image: url('https://i.pinimg.com/736x/41/60/7d/41607d7cc517513f13d335087de68d71.jpg');
      background-size: cover;
      background-position: center;
    ">
    <div class="w-5/6 h-5/6 flex items-center justify-center mx-auto my-auto rounded-sm ">
      <div
        class="w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center bg-white shadow-xl p-10 rounded-lg bg-opacity-35">
        <h1 class="text-5xl font-extrabold mb-6 text-red-600">Gizmo</h1>
        <p class="text-lg text-gray-700 mb-8">
          Chào mừng trở lại! Nhập thông tin để tiếp tục.
        </p>

        <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ errors }" class="w-full max-w-sm">
          <div class="mb-4">
            <Field name="email" type="email" placeholder="Email" required
              class="w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
              :class="errors.email ? 'border-red-500' : ''" />
            <p class="text-sm text-red-500">{{ errors.email }}</p>
          </div>
          <div class="mb-4">
            <div class="relative">
              <Field name="password" :type="passwordType" placeholder="Mật khẩu" required
                class="w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
                :class="errors.password ? 'border-red-500' : ''" />
              <i class="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                @click="togglePassword" :class="passwordType === 'password' ? 'bx bx-hide' : 'bx bx-show'
                  "></i>
            </div>
            <p class="text-sm text-red-500">{{ errors.password }}</p>
          </div>

          <div>
            <BUTTON :isLoading="isLoading" color="bg-red-600" disabledColor="bg-red-300" text="Đăng nhập"
              class="w-full p-4 font-bold rounded-lg hover:bg-red-700 transition duration-200 shadow-lg"></BUTTON>
          </div>
        </Form>

        <a href="/forgotpassword" class="text-red-600 mt-4 hover:underline">Quên mật khẩu?</a>
        <p class="mt-4 text-sm text-gray-600">
          Chưa có tài khoản?
          <a href="/signin" class="text-red-600 hover:underline">Đăng ký ngay</a>

        </p>
        <p class=" text-sm text-gray-600 text-center">
          <a href="/" class="text-blue-600 underline text-center">Đi đến trang chủ</a>
        </p>
      </div>

      <!-- Welcome Section -->
      <div
        class="hidden md:flex md:w-1/3 lg:w-1/2 h-full flex-col justify-center items-center text-white text-center p-10 relative rounded-lg overflow-hidden"
        style="
          background-image: url('https://i.pinimg.com/564x/53/91/15/539115966ea3c25b220d23ed23ee5848.jpg');
          background-size: cover;
          background-position: center;
        ">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black opacity-50"></div>

        <!-- Welcome Content -->
        <div class="relative z-10">
          <h2 class="text-4xl font-extrabold mb-4">Chào mừng bạn!</h2>
          <p class="mb-8 text-lg">
            Hãy đăng ký và bắt đầu hành trình cùng chúng tôi.
          </p>
          <router-link to="/signin">
            <button
              class="py-3 px-10 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-red-600 transition duration-200 shadow-lg">
              Đăng ký
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Notification Modal -->
    <NotificationModal :isOpen="isModalOpen" :title="'Thông báo'" :message="message" :type="messageType"
      @close="isModalOpen = false" />
  </div>
</template>

<script>
import NotificationModal from "@/components/containers/modal/NotificationModal.vue";
import BUTTON from "@/components/containers/buttons/button.vue";
import { mapGetters, mapActions } from "vuex";
import { loginApi } from "@/api/auth/loginApi";
import { handleAuthentication } from "@/services/authService";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { saveNotifications } from "@/services/notiServiceC";

export default {
  name: "LoginForm",
  data() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required("Email là bắt buộc *")
        .email("Email không đúng định dạng *"),
      password: Yup.string()
        .min(8, "Password tối thiểu 8 ký tự *")
        .required("Password là bắt buộc *"),
    });
    return {
      schema,
      email: "",
      password: "",
      isModalOpen: false,
      message: "",
      messageType: "",
      passwordType: "password",
    };
  },
  computed: {
    ...mapGetters("loading", ["isLoading"]),
  },
  components: {
    Form,
    Field,
    BUTTON,
    NotificationModal,
  },
  methods: {
    ...mapActions("auth", ["setToken", "setRefreshToken"]),
    async handleLogin(values) {
      try {
        const loginData = {
          email: values.email,
          password: values.password,
        };
        const response = await loginApi(loginData);
        const isAdmin = handleAuthentication(
          response.data.accessToken,
          response.data.refreshToken
        );
        this.messageType = isAdmin ? "success" : "warning";
        this.message = isAdmin ? response.message : "Không đủ quyền";
        this.isModalOpen = true;

        if (isAdmin) {
          setTimeout(() => {
            saveNotifications("Đăng nhập thành công")
            this.$router.push("/");
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    },
    togglePassword() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
