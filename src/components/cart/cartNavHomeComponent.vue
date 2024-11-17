<template>
  <div class="p-1">
    <!-- Tiêu đề -->
    <div class="flex items-center mb-2 border-b rounded border-gray-200 pb-2">
      <router-link to="/cart" class="text-red-600 font-mono text-md">
        Giỏ hàng của bạn
      </router-link>
    </div>

    <!-- Hiển thị lỗi nếu có -->
    <div v-if="errorMessage" class="text-red-500 text-center">
      {{ errorMessage }}
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-else>
      <div
        v-for="(product, index) in cartItems"
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
          <!-- Nút giảm số lượng -->
          <button
            @click="decreaseQuantity(index)"
            class="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 focus:outline-none transition"
          >
            -
          </button>

          <!-- Input số lượng sản phẩm -->
          <input
            type="text"
            v-model.number="product.quantity"
            class="w-8 h-4 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-xs"
          />

          <!-- Nút tăng số lượng -->
          <button
            @click="increaseQuantity(index)"
            class="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 focus:outline-none transition"
          >
            +
          </button>
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
      cartItems: [], // Danh sách sản phẩm trong giỏ hàng
      errorMessage: null, // Thông báo lỗi nếu xảy ra
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
    // Hàm rút ngắn mô tả sản phẩm
    truncateDescription(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    },

    // Hàm lấy giỏ hàng từ API
    async getViewCart() {
      try {
        const response = await getCart();
        this.cartItems = response.data;
        console.log(this.cartItems);
      } catch (error) {
        this.errorMessage = "Không thể tải giỏ hàng.";
        console.error(error);
      }
    },

    // Hàm định dạng giá trị thành VND
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    // Hàm giảm số lượng sản phẩm
    decreaseQuantity(index) {
      const item = this.cartItems[index];
      if (item.quantity > 1) {
        item.quantity--;
      }
    },

    // Hàm tăng số lượng sản phẩm
    increaseQuantity(index) {
      const item = this.cartItems[index];
      item.quantity++;
    },

    // Lấy URL ảnh sản phẩm
    loadImage,
  },
};
</script>
