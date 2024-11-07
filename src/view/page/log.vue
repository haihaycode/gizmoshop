<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Phần đăng nhập -->
    <div class="w-full md:w-1/2 flex flex-col justify-center items-center bg-white shadow-xl p-10 rounded-lg">
      <h1 class="text-5xl font-extrabold mb-6 text-red-600 tracking-wide">Đăng nhập</h1>
      <p class="text-lg text-gray-700 mb-8">Chào mừng trở lại! Nhập thông tin để tiếp tục.</p>
      
      <div class="flex space-x-4 mb-8">
        <button class="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center text-xl transition-transform transform hover:scale-110 hover:bg-red-600 hover:text-white shadow-lg">
          <i class="bx bxl-facebook"></i>
        </button>
        <button class="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center text-xl transition-transform transform hover:scale-110 hover:bg-red-600 hover:text-white shadow-lg">
          <i class="bx bxl-google"></i>
        </button>
        <button class="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center text-xl transition-transform transform hover:scale-110 hover:bg-red-600 hover:text-white shadow-lg">
          <i class="bx bxl-linkedin"></i>
        </button>
      </div>
      
      <form class="w-full max-w-sm">
        <input type="email" placeholder="Email" required class="w-full p-4 mb-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md">
        <input type="password" placeholder="Mật khẩu" required class="w-full p-4 mb-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 shadow-md">
        <button type="submit" class="w-full p-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-200 shadow-lg">Đăng nhập</button>
      </form>
      
      <a href="#" class="text-red-600 mt-4 hover:underline">Quên mật khẩu?</a>
      <p class="mt-4 text-sm text-gray-600">Chưa có tài khoản? <a href="#" class="text-red-600 hover:underline">Đăng ký ngay</a></p>
    </div>

    <!-- Phần chào mừng -->
    <div class="hidden md:flex w-1/2 flex-col justify-center items-center bg-red-600 text-white text-center p-10 rounded-lg">
      <h2 class="text-4xl font-extrabold mb-4">Chào mừng bạn!</h2>
      <p class="mb-8 text-lg">Hãy đăng ký và bắt đầu hành trình cùng chúng tôi.</p>
      <button class="py-3 px-10 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-red-600 transition duration-200 shadow-lg">Đăng ký</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style scoped>
/* Custom scrollbar for a modern touch */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}

/* Modern hover effects */
button:hover i {
  transform: scale(1.1);
  transition: all 0.3s ease;
}
</style>
