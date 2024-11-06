<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="text-center p-8 bg-white shadow-lg rounded-lg">
            <h1 class="text-6xl font-extrabold text-red-600">404</h1>
            <p class="mt-4 text-xl text-gray-700">Trang bạn tìm kiếm không tồn tại.</p>
            <p class="mt-2 text-lg text-gray-500">Xin hãy kiểm tra lại đường dẫn hoặc sử dụng các liên kết dưới đây.</p>
            <div class="mt-6 flex justify-center space-x-4">
                <router-link to="/"
                    class="inline-block px-6 py-3 bg-blue-600 text-white rounded-sm transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Quay lại trang chủ
                </router-link>
                <button @click="goBack"
                    class="inline-block px-6 py-3 bg-gray-300 text-gray-800 rounded-sm transition duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600">
                    Quay lại trang trước
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goBack() {
            this.$router.go(-1); // Go back to the previous page
        }
    }
};
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
