<template>
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
        <div class="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
            <!-- Dấu tích thành công và tiêu đề -->
            <div class="mb-4">
                <i class='bx bxs-badge-check bx-tada text-blue-600 text-4xl mb-2'></i>
                <h1 class="text-3xl font-bold text-blue-600">Thanh toán thành công !</h1>
                <p v-if="type === 'pendingsupplier'">
                    {{ type === 'pendingsupplier' ? 'Đăng ký trở thành cung cấp thành công đang đợi xét duyệt' : '' }}
                </p>
            </div>
            <router-link to="/"
                class="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Về
                trang chủ</router-link>
            <router-link :to="{ name: 'orderHistory' }"
                class="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ml-2">
                Xem đơn hàng</router-link>
        </div>
    </div>
</template>

<script>
import notificationService from '@/services/notificationService';
import { saveNotifications } from '@/services/notiServiceC';
import { formatCurrencyVN } from '@/utils/currencyUtils';
import { mapActions } from 'vuex';

export default {
    name: "PaymentSuccess",
    data() {
        return {
            status: this.$route.query.status,
            txnRef: this.$route.query.txnRef,
            amount: this.$route.query.amount,
            type: this.$route.query.type
        };
    },
    mounted() {
        this.handleCheckLogoutRegSupplier();
    },
    methods: {
        formatCurrencyVN,
        ...mapActions('auth', ['logout']),
        handleCheckLogoutRegSupplier() {
            notificationService.info("Đang đăng xuất....")
            if (this.type === 'pendingsupplier') {
                setTimeout(() => {
                    this.logout();
                    saveNotifications("Đang đăng xuất ....")
                    this.$router.push("/login");
                }, 2000);
            }
        }
    }
};
</script>

<style scoped>
/* Tùy chỉnh màu sắc */
.bg-blue-100 {
    background-color: #ebf8ff;
    /* Màu nền xanh nhạt */
}

.text-blue-600 {
    color: #3182ce;
    /* Màu xanh nước biển đậm cho tiêu đề */
}

.bg-blue-500 {
    background-color: #4299e1;
    /* Màu xanh nước biển cho nút */
}

.bg-blue-600:hover {
    background-color: #3182ce;
    /* Màu xanh nước biển khi hover */
}

/* Thêm hiệu ứng cho biểu tượng dấu tích */
.fas.fa-check-circle {
    color: #3182ce;
    /* Màu xanh nước biển cho dấu tích */
}
</style>

<!-- Thêm FontAwesome -->
