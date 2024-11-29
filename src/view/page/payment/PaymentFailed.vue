<template>
    <div class="flex items-center justify-center min-h-screen bg-red-100">
        <div class="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
            <h1 class="text-3xl font-bold text-red-600 mb-4">Thanh toán thất bại !</h1>
            <p class="text-lg text-gray-700 mb-2">Xin lỗi, giao dịch của bạn không thành công .</p>
            <router-link to="/"
                class="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">Về
                trang chủ</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentFailed",
    data() {
        return {
            status: this.$route.query.status,
            txnRef: this.$route.query.txnRef
        };
    }
};
</script>