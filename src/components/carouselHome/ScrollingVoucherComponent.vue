<template>
  <div class="w-full text-center bg-white p-2">
    <!-- Running Text -->
    <div class="overflow-hidden whitespace-nowrap">
      <p class="text-nowrap running-text">
        <!-- Dynamic Running Text with Icons -->
        <span v-for="(voucher, index) in vouchers" :key="voucher.id" class="mr-8">
          {{ voucher.description }}
          <!-- Icon between descriptions -->
          <i v-if="index < vouchers.length - 1" class="fas fa-bolt mx-2"></i> 
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { getVoucherPage } from '@/api/voucherApi';

export default {
  name: "RunningTextPage",
  data() {
    return {
      vouchers: [],
    };
  },
  async mounted() {
    await this.handleFetchVoucher();
  },
  methods: {
    async handleFetchVoucher() {
      try {
        const response = await getVoucherPage();
        this.vouchers = response.data.content;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu voucher:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Import Font Awesome cho icon */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Import font chữ đẹp */
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400&display=swap');

/* Định nghĩa keyframes cho chạy chữ */
@keyframes running-text {
  0% {
    transform: translateX(0); /* Bắt đầu từ bên phải */
  }
  100% {
    transform: translateX(-100%); /* Chạy sang trái */
  }
}

/* Áp dụng font chữ và hiệu ứng animation */
.running-text {
  font-family: 'Lora', serif; /* Sử dụng font chữ Lora */
  font-weight: normal; /* Không in đậm */
  display: inline-block;
  animation: running-text 50s linear infinite; /* Thời gian chạy lâu hơn, có thể điều chỉnh */
  opacity: 1; /* Đảm bảo chữ xuất hiện ngay lập tức */
  white-space: nowrap; /* Không để chữ xuống dòng */
  margin-left: 0%; /* Xóa khoảng trống phía trước */
}

/* Style cho icon */
.fas {
  color: #f39c12; /* Màu của icon */
  font-size: 1rem;
  animation: pulse 1s infinite alternate; /* Hiệu ứng nhấp nháy cho icon */
}

/* Hiệu ứng nhấp nháy cho icon */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
