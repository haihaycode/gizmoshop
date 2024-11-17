<template>
  <div class="flex flex-wrap w-full">
    <!-- Loading Spinner -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="spinner-border animate-spin text-white" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="rounded-md w-full lg:w-7/10 md:w-2/3 p-4">
      <div class="flex items-center mb-6 border-b pb-2">
        <button class="text-red-600 font-bold text-lg">Giỏ hàng của bạn</button>
      </div>

      <!-- Select All and Remove Selected Button -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-red-600"
            v-model="selectAll"
            @change="toggleSelectAll"
          />
          <label class="ml-2 text-gray-700 font-medium">Chọn tất cả</label>
        </div>
        <button
          class="text-gray-500 text-sm border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200"
          @click="removeSelectedProducts"
        >
          Xóa sản phẩm đã chọn
        </button>
      </div>

      <!-- Cart Item List -->
      <div
        v-for="(product, index) in cartItems"
        :key="product.id"
        class="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between border border-gray-200 hover:shadow-lg transition duration-200"
      >
        <div class="flex items-center space-x-4">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-red-600"
            v-model="product.selected"
          />
          <img
            :src="
              product.productId.thumbnail
                ? loadImage(product.productId.thumbnail, 'product')
                : 'https://i.pinimg.com/736x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg'
            "
            alt="Product Image"
            class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-300"
          />
          <div>
            <p class="text-gray-800 font-semibold text-sm md:text-base">
              {{ product.productId.productName }}
            </p>
            <div class="flex items-center mt-1">
              <p class="text-red-500 text-lg font-semibold">
                {{ formatCurrency(product.productId.productPrice) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Quantity Controls -->
        <div class="flex items-center space-x-2">
          <!-- Decrease Quantity Button -->
          <button
            class="text-gray-500 border border-gray-300 rounded-full w-8 h-8 items-center justify-center hover:bg-gray-100 transition duration-200"
            @click="updateQuantity(index, -1)"
          >
            -
          </button>
          <!-- Quantity Input -->
          <input
            type="text"
            class="w-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
            v-model.number="product.quantity"
            @blur="updateQuantity(index, 0)"
          />
          <!-- Increase Quantity Button -->
          <button
            class="text-gray-500 border border-gray-300 rounded-full w-8 h-8 items-center justify-center hover:bg-gray-100 transition duration-200"
            @click="updateQuantity(index, 1)"
          >
            +
          </button>
          <!-- Remove Product -->
          <button
            class="text-red-500 text-sm border border-red-500 px-2 py-1 rounded-md hover:bg-red-100 transition duration-200"
            @click="removeProduct(index)"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-lg shadow-xl mt-6 p-6 w-full lg:w-3/10 md:w-1/3 border-1 border-gray-100"
    >
      <h2 class="text-xl font-semibold mb-6 text-gray-800">
        Tổng kết giỏ hàng
      </h2>

      <!-- Danh sách sản phẩm đã chọn -->
      <div class="mb-6">
        <p class="font-semibold text-gray-800 mb-2">Sản phẩm đã chọn:</p>
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="flex justify-between items-center mb-3"
        >
          <p class="text-gray-700">{{ item.productId.productName }}</p>
          <!-- Tên sản phẩm -->
          <p class="text-gray-700">
            {{ item.quantity }} x
            {{ formatCurrency(item.productId.productPrice) }}
          </p>
          <!-- Số lượng và giá -->
        </div>
      </div>

      <!-- Tạm tính -->
      <div class="flex justify-between items-center mb-4">
        <p class="text-gray-600">Tạm tính:</p>
        <p class="font-semibold text-gray-800">
          {{ formatCurrency(totalPrice) }}
        </p>
        <!-- Hiển thị tổng tiền tạm tính -->
      </div>

      <!-- Tổng cộng -->
      <div class="flex justify-between items-center border-t pt-4">
        <p class="text-lg font-bold text-gray-800">Tổng cộng:</p>
        <p class="text-lg font-bold text-red-400">
          {{ formatCurrency(totalPrice) }}
        </p>
        <!-- Hiển thị tổng cộng -->
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
  </div>
</template>

<script>
import {
  getCart,
  removeProductFromCart,
  addProductToCart,
} from "@/api/CartApi";
import { loadImage } from "@/services/imageService";

export default {
  name: "CartComponent",
  data() {
    return {
      selectAll: false,
      cartItems: [], // Danh sách sản phẩm trong giỏ hàng
      errorMessage: null,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["loading/isLoading"];
    },
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
     proceedToCheckout() {
   
    this.$router.push("/toOrder"); 
   
    console.log("Tiến hành đặt hàng...");
  },
    async getViewCart() {
      try {
        const response = await getCart();
        this.cartItems = response.data;
      } catch (error) {
        this.errorMessage = "Không thể tải giỏ hàng.";
        console.error(error);
      }
    },
    async removeSelectedProducts() {
      const selectedProductIds = this.cartItems
        .filter((product) => product.selected)
        .map((product) => product.productId.id);

      if (selectedProductIds.length === 0) {
        return alert("Vui lòng chọn ít nhất một sản phẩm để xóa.");
      }

      try {
        for (const productId of selectedProductIds) {
          await removeProductFromCart(productId);
        }
        this.getViewCart();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        this.errorMessage = "Không thể xóa sản phẩm. Vui lòng thử lại.";
      }
    },
    loadImage,
    formatCurrency(value) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    toggleSelectAll() {
      this.cartItems.forEach((product) => {
        product.selected = this.selectAll;
      });
    },
    async removeProduct(index) {
      const productId = this.cartItems[index].productId.id;
      try {
        await removeProductFromCart(productId);
        this.getViewCart();
      } catch (error) {
        this.errorMessage = "Lỗi khi xóa sản phẩm.";
        console.error(error);
      }
    },
    async updateQuantity(index, delta) {
      const product = this.cartItems[index];
      const currentQuantity = product.quantity;
      const newQuantity = currentQuantity + delta;
      try {
        if (newQuantity > currentQuantity) {
          const addQuantity = newQuantity - currentQuantity;
          await addProductToCart(product.productId.id, addQuantity);
        } else if (newQuantity < currentQuantity) {
          const TruQuantity = currentQuantity - newQuantity;
          await addProductToCart(product.productId.id, -TruQuantity);
        }
        this.cartItems[index].quantity = newQuantity;
      } catch (error) {
        if (error.response?.data?.message) {
          alert(`Lỗi: ${error.response.data.message}`);
        } else {
          alert("Không thể cập nhật số lượng. Vui lòng thử lại.");
        }
        console.error("Lỗi khi cập nhật số lượng:", error);
      }
    },
  },
  watch: {
    cartItems: {
      handler(newCartItems) {
        this.selectAll = newCartItems.every((product) => product.selected);
      },
      deep: true,
    },
  },
};
</script>
