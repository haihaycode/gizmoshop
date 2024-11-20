<template>
  <div class="p-1">
    <!-- Tiêu đề -->
    <div
      class="flex items-center justify-between mb-2 border-b rounded border-gray-200 pb-2 hover:border-red-600 transition duration-300"
    >
      <!-- Tiêu đề giỏ hàng -->
      <h3 class="text-gray-800 font-bold text-lg">Giỏ hàng</h3>

      <!-- Nút đi đến giỏ hàng -->
      <router-link
        to="/cart"
        class="flex items-center text-red-600 hover:text-red-800 transition duration-300 relative group"
      >
        <i class="bx bx-cart text-2xl"></i>

        <span
          class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
        >
          Xem giỏ hàng
        </span>
      </router-link>
    </div>

    <!-- Hiển thị lỗi nếu có -->
    <div v-if="errorMessage" class="text-red-500 text-center">
      {{ errorMessage }}
    </div>
    <div v-else-if="isLoading" class="flex justify-center items-center h-32">
      <div
        class="loader border-t-4 border-red-600 rounded-full w-8 h-8 animate-spin"
      ></div>
    </div>
    <div v-else-if="cartItems.length === 0" class="text-center py-4">
      <p class="text-gray-600 text-sm">Giỏ hàng trống, mua sắm tiếp nào!</p>
      <a
        href="/"
        class="mt-2 inline-block text-red-500 font-medium hover:underline"
      >
        Tiếp tục mua sắm
      </a>
    </div>
    <!-- Danh sách sản phẩm -->
    <div v-else>
      <div
        v-for="(product) in cartItems"
        :key="product.id"
        class="bg-white p-2 mb-2 flex items-center justify-between hover:shadow transition duration-200 border-b"
      >
        <!-- Hình ảnh và thông tin sản phẩm -->
        <div class="flex items-center space-x-2">
          <img
            :src="
              product.productId.thumbnail
                ? loadImage(product.productId.thumbnail, 'product')
                : 'https://i.pinimg.com/736x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg'
            "
            alt="Product Image"
            class="w-12 h-12 object-cover rounded border border-gray-300"
          />
          <div>
            <p class="text-gray-800 font-medium text-xs">
              {{ product.productId.productName }}
            </p>
            <p class="text-gray-600 text-xs mt-1">
              {{
                truncateDescription(
                  product.productId.productLongDescription,
                  20
                )
              }}"
            </p>

            <div class="flex items-center mt-1">
              <p class="text-red-500 font-semibold text-sm">
                {{ formatCurrency(product.productId.productPrice) }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center">
    

          <!-- Input số lượng sản phẩm -->
          <input
            type="text"
            v-model.number="product.quantity"
            class="w-8 h-4 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-xs"
          />

        </div>
      </div>

      <!-- Tổng giá -->
      <div class="flex justify-end items-center border-t pt-2">
        <p class="text-red-600 font-bold text-md">
          Tổng: {{ formatCurrency(totalPrice) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCart } from "@/api/CartApi";
import { loadImage } from "@/services/imageService"; // Import API lấy giỏ hàng

export default {
  name: "CartComponent",
  data() {
    return {
      cartItems: [],
      errorMessage: null,
      isLoading: true,
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.productId.productPrice * item.quantity,
        0
      );
    },
  },
  mounted() {
    this.getViewCart();
  },
  methods: {
    truncateDescription(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    },
    async getViewCart() {
      this.isLoading = true; // Bắt đầu loading
      try {
        const response = await getCart();
        this.cartItems = response.data;
      } catch (error) {
        this.errorMessage = "Vui lòng đăng nhập.";
        console.error(error);
      } finally {
        this.isLoading = false; // Kết thúc loading
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    decreaseQuantity(index) {
      const item = this.cartItems[index];
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    increaseQuantity(index) {
      const item = this.cartItems[index];
      item.quantity++;
    },
    loadImage,
  },
};
</script>
<style>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid red;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
