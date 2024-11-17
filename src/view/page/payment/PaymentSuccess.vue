<template>
    <div class="flex items-center justify-center min-h-screen bg-green-100">
        <div class="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
            <h1 class="text-3xl font-bold text-green-600 mb-4">Thanh toán thành công!</h1>
            <p class="text-lg text-gray-700 mb-2">Mã giao dịch: <span class="font-semibold">{{ txnRef }}</span></p>
            <p class="text-lg text-gray-700 mb-4">Số tiền: <span class="font-semibold">{{ amount }} VND</span></p>
            <router-link to="/"
                class="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">Về
                trang chủ</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentSuccess",
    data() {
        return {
            status: this.$route.query.status,
            txnRef: this.$route.query.txnRef,
            amount: this.$route.query.amount
        };
    }
};
</script>