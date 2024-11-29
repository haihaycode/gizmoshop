<template>
  <div class="bg-white rounded-lg shadow-xl mt-6 p-6 w-full lg:w-3/10 md:w-1/3">
    <h2 class="text-xl font-semibold mb-6 text-gray-800">Tổng kết giỏ hàng</h2>

    <div class="mb-6">
      <p class="font-semibold text-gray-800 mb-2">Sản phẩm đã chọn:</p>
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="flex justify-between items-center mb-3"
      >
        <p class="text-gray-700">{{ item.productId.productName }}</p>
        <p class="text-gray-700">
          {{ item.quantity }} x
          {{ formatCurrency(item.productId.productPrice) }}
        </p>
      </div>
    </div>

    <!-- Tạm tính -->
    <div class="flex justify-between items-center mb-4">
      <p class="text-gray-600">Tạm tính:</p>
      <p class="font-semibold text-gray-800">
        {{ formatCurrency(totalPrice) }}
      </p>
    </div>

    <!-- Tổng cộng -->
    <div class="flex justify-between items-center border-t pt-4">
      <p class="text-lg font-bold text-gray-800">Tổng cộng:</p>
      <p class="text-lg font-bold text-red-400">
        {{ formatCurrency(totalPrice) }}
      </p>
    </div>

    <!-- Nút Tiến hành đặt hàng -->
    <div class="mt-6">
      <button
        class="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        @click="proceedToCheckout"
      >
        Tiến hành đặt hàng
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: Array,
    totalPrice: Number,
    formatCurrency: Function,
    proceedToCheckout: Function,
  },
};
</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
</style>
