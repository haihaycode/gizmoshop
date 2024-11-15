<template>
  <div class="bg-white w-full p-4 rounded-lg shadow-lg mt-4">
    <h2 class="text-lg font-bold mb-4">Tổng kết giỏ hàng</h2>

    <!-- Gợi ý voucher -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Voucher gợi ý</label>
      <div
        class="border p-4 rounded-lg cursor-pointer bg-orange-50 border-orange-500 text-orange-800"
      >
        <div class="flex items-center">
          <!-- Hiển thị hình ảnh voucher nếu có -->
          <div class="w-1/3 mr-4">
            <img
              v-if="selectedVoucher && selectedVoucher.image"
              :src="selectedVoucher.image"
              alt="Voucher Image"
              class="w-full h-32 object-cover rounded-lg"
            />
            <img
              v-else
              src="https://i.pinimg.com/736x/0d/b3/96/0db3963e06b67499f517d7074229f1a9.jpg"
              alt="Voucher Default Image"
              class="w-full h-20 object-cover rounded-lg"
            />
          </div>

          <!-- Thông tin voucher -->
          <div class="w-2/3">
            <h3 class="text-sm font-bold">
              {{ selectedVoucher ? selectedVoucher.name : "Chọn voucher..." }}
            </h3>
            <p v-if="selectedVoucher" class="text-gray-500">
              Giảm {{ selectedVoucher.discount }}%
            </p>
            <button
              class="mt-2 text-sm underline text-orange-600"
              @click="showModal = true"
            >
              Chọn voucher khác
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal chọn voucher -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-11/12 md:w-1/2 p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-bold mb-4">Chọn voucher</h3>
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div
            v-for="voucher in vouchers"
            :key="voucher.id"
            @click="selectVoucher(voucher)"
            class="border p-4 rounded-lg cursor-pointer hover:bg-orange-100 border-gray-300 text-gray-700"
            :class="
              selectedVoucher && selectedVoucher.id === voucher.id
                ? 'border-orange-500 bg-orange-50'
                : ''
            "
          >
            <div class="flex items-center">
              <!-- Hình ảnh voucher -->
              <div class="w-1/3 mr-4">
                <img
                  v-if="voucher.image"
                  :src="voucher.image"
                  alt="Voucher Image"
                  class="w-full h-20 object-cover rounded-lg"
                />
                <img
                  v-else
                  src="https://i.pinimg.com/736x/0d/b3/96/0db3963e06b67499f517d7074229f1a9.jpg"
                  alt="Voucher Default Image"
                  class="w-full h-20 object-cover rounded-lg"
                />
              </div>
              <!-- Thông tin voucher -->
              <div class="w-2/3">
                <h4 class="text-sm font-bold">{{ voucher.name }}</h4>
                <p class="text-gray-500">Giảm {{ voucher.discount }}%</p>
              </div>
            </div>
          </div>
        </div>
        <button
          class="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg"
          @click="showModal = false"
        >
          Đóng
        </button>
      </div>
    </div>

    <!-- Hiển thị tổng tiền -->
    <div class="flex justify-between items-center mb-4 mt-4">
      <p class="text-gray-600">Tạm tính:</p>
      <p class="font-semibold">{{ formatCurrency(totalPrice) }}</p>
    </div>
    <div class="flex justify-between items-center mb-4">
      <p class="text-gray-600">Giảm giá (voucher):</p>
      <p class="font-semibold text-red-500">
        -{{ formatCurrency(discountAmount) }}
      </p>
    </div>
    <div class="flex justify-between items-center border-t pt-4">
      <p class="text-lg font-bold">Tổng cộng:</p>
      <p class="text-lg font-bold text-green-600">
        {{ formatCurrency(finalPrice) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      totalPrice: 1000000, // Giá tạm tính (có thể lấy từ giỏ hàng)
      selectedVoucher: null,
      vouchers: [
        { id: 1, name: "Voucher 10%", discount: 10, image: "" },
        {
          id: 2,
          name: "Voucher 20%",
          discount: 20,
          image: "https://example.com/voucher-2.jpg",
        },
        { id: 3, name: "Voucher 30%", discount: 30, image: "" },
        {
          id: 4,
          name: "Voucher 40%",
          discount: 40,
          image: "https://example.com/voucher-4.jpg",
        },
        { id: 5, name: "Voucher 50%", discount: 50, image: "" },
      ],
    };
  },
  computed: {
    discountAmount() {
      if (this.selectedVoucher) {
        return (this.totalPrice * this.selectedVoucher.discount) / 100;
      }
      return 0;
    },
    finalPrice() {
      return this.totalPrice - this.discountAmount;
    },
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    },
    selectVoucher(voucher) {
      this.selectedVoucher = voucher;
      this.showModal = false;
    },
  },
  mounted() {
    // Gợi ý voucher đầu tiên trong danh sách (nếu có)
    if (this.vouchers.length > 0) {
      this.selectedVoucher = this.vouchers[0];
    }
  },
};
</script>

<style scoped>
/* Tùy chỉnh CSS cho tông màu đỏ cam */
.bg-orange-50 {
  background-color: #fff7ed;
}
.border-orange-500 {
  border-color: #f97316;
}
.text-orange-800 {
  color: #c2410c;
}
.text-orange-600 {
  color: #ea580c;
}
.bg-orange-600 {
  background-color: #ea580c;
}
.hover\:bg-orange-100:hover {
  background-color: #ffedd5;
}
</style>
