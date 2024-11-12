<template>
  <div
      class="flex h-screen items-center justify-center bg-gray-100"
    style="
      background-image: url('https://i.pinimg.com/736x/41/60/7d/41607d7cc517513f13d335087de68d71.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <div class="w-5/6 h-5/6 flex items-center justify-center mx-auto rounded-lg">
      <div class="flex w-full h-full  bg-gray-100 shadow-lg rounded-lg overflow-hidden">
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

          <form class="w-full max-w-sm">
            <input
              type="text"
              placeholder="Họ và tên"
              required
              class="w-full p-4 mb-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
            />
            <input
              type="email"
              placeholder="Email"
              required
              class="w-full p-4 mb-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              class="w-full p-4 mb-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md"
            />
            <button
              type="submit"
              class="w-full py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-lg font-semibold"
            >
              Tạo tài khoản
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
};
</script>

<style scoped>
/* Add any custom styling here */
</style>
