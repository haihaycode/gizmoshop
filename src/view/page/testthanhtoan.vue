<template>
    <div class="payment-container">
        <!-- Nút Thanh Toán -->
        <button @click="handlePayment" class="payment-button">Thanh toán với VNPay</button>
    </div>
</template>

<script>
import { createPaymentForOrderCustumer } from '@/api/vnpayApi';

export default {
    name: 'PaymentButton',
    methods: {
        async handlePayment() {
            try {
                const amount = 3000000;
                const idWallet = '123';
                const idAddress = '123';
                const idVoucher = '-1';
                const type = 'order_payment';

                const response = await createPaymentForOrderCustumer(amount, idWallet, idVoucher, idAddress, type);
                if (response && response.data.paymentUrl) {
                    window.location.href = response.data.paymentUrl;
                } else {
                    console.error("Không tìm thấy URL thanh toán trong phản hồi.");
                }
            } catch (error) {
                console.error("Lỗi khi tạo thanh toán:", error);
            }
        }
    }
};
</script>

<style>
.payment-button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.payment-button:hover {
    background-color: #0056b3;
}
</style>
