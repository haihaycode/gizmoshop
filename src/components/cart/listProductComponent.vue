<template>
  <div>
    <div class="text-red-500 " v-if="isLoading">
      <p class="text-red-500"><i class='bx bx-loader bx-spin'></i> &nbsp;Đang tải dữ liệu ...</p>
      <img class="w-[400px] mx-auto" :src="require('@/assets/gizmoImageLoading/gizmo.gif')" alt="">
    </div>

    <div v-if="cartItems.length > 0" class="flex flex-wrap w-full">
      <div class="rounded-md w-full lg:w-7/10 md:w-2/3 p-4">
        <div class="flex items-center mb-6 border-b pb-2">
          <button class="text-red-600 font-bold text-lg">Giỏ hàng của bạn</button>
        </div>
        <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-800">
          <div class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-red-500"></div>
          <img src="https://i.pinimg.com/736x/93/62/f8/9362f8b574c0d01f96129bd57ba2ec3b.jpg"
            class="rounded-full h-20 w-20 opacity-80" />
        </div>

        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" v-model="selectAll"
              @change="toggleSelectAll" />
            <label class="ml-2 text-gray-700 font-medium">Chọn tất cả</label>
          </div>
          <button
            class="text-gray-500 text-sm border border-gray-300 px-3 py-1 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-200"
            :disabled="isLoading" @click="removeSelectedProducts">
            <span v-if="!isLoading">Xóa sản phẩm đã chọn</span>
            <span v-else class="flex items-center">
              <i class="bx bx-loader-alt animate-spin mr-2"></i> Đang xử lý...
            </span>
          </button>
        </div>
        <div v-for="(product, index) in cartItems" :key="product.id"
          class="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between border border-gray-200 hover:shadow-lg transition duration-200">
          <!-- Chi tiết sản phẩm -->
          <div class="flex items-center space-x-4">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" v-model="product.selected" />
            <img :src="product.productId.thumbnail
              ? loadImage(product.productId.thumbnail, 'product')
              : 'https://i.pinimg.com/736x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg'
              " alt="Product Image" class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-300" />
            <div>
              <p class="text-gray-800 font-semibold text-sm md:text-base">
                {{ product.productId.productName }}
              </p>
              <p class="text-gray-600 text-sm">
                {{ truncateText(product.productId.productShortDescription, 100) }}
              </p>

              <!-- Giá sản phẩm -->
              <div class="mt-1">
                <p class="text-gray-500 line-through text-sm" v-if="product.productId.discountProduct > 0">
                  {{ formatCurrency(product.productId.productPrice) }}
                </p>
                <p class="text-red-500 text-lg font-semibold">
                  {{ formatCurrency(getFinalPrice(product)) }}
                </p>
                <p class="text-green-600 text-xs" v-if="product.productId.discountProduct > 0">
                  Giảm: {{ product.productId.discountProduct }}%
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <button
              class="text-gray-500 border border-gray-300 rounded-full w-8 h-8 items-center justify-center hover:bg-gray-100 transition duration-200"
              @click="updateQuantity(index, -1)" :disabled="isLoading || product.quantity <= 1">
              -
            </button>
            <!-- Hiển thị số lượng -->
            <input type="text"
              class="w-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
              v-model.number="product.quantity" @blur="updateQuantity(index, 0)" :disabled="isLoading" />
            <!-- Tăng số lượng -->
            <button
              class="text-gray-500 border border-gray-300 rounded-full w-8 h-8 items-center justify-center hover:bg-gray-100 transition duration-200"
              @click="updateQuantity(index, 1)" :disabled="isLoading">
              +
            </button>
            <!-- Xóa sản phẩm -->
            <button
              class="text-red-500 text-sm border border-red-500 px-2 py-1 rounded-md hover:bg-red-100 transition duration-200"
              @click="removeProduct(index)" :disabled="isLoading">
              Xóa
            </button>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-xl mt-6 p-6 w-full lg:w-3/10 md:w-1/3 border-1 border-gray-100">
        <h2 class="text-xl font-semibold mb-6 text-gray-800">
          Tổng kết giỏ hàng
        </h2>

        <div class="mb-6">
          <!-- Tiêu đề -->
          <p class="font-semibold text-gray-800 mb-4 text-lg">
            Sản phẩm đã chọn:
          </p>
          <!-- Danh sách sản phẩm -->
          <div v-for="(item, index) in cartItems" :key="index"
            class="flex justify-between items-center mb-4 border-b pb-3">
            <!-- Tên và mô tả sản phẩm -->
            <div>
              <p class="text-gray-800 font-medium">
                {{ item.productId.productName }}
              </p>
              <p class="text-sm text-gray-600">
                {{ item.quantity }} x
                {{ formatCurrency(getDiscountedPrice(item)) }}
              </p>
              <div class="flex items-center text-xs text-gray-500 mt-1">
                <!-- Giá gốc -->
                <p class="line-through mr-2">
                  {{ formatCurrency(item.productId.productPrice) }}
                </p>
                <!-- Phần trăm giảm -->
                <p class="text-green-500" v-if="item.productId.discountProduct > 0">
                  Giảm: {{ item.productId.discountProduct }}%
                </p>
              </div>
            </div>

            <!-- Giá tổng cộng -->
            <p class="text-red-600 font-semibold">
              {{ formatCurrency(getTotalPrice(item)) }}
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center mb-4">
          <p class="text-sm text-gray-600">Tạm tính:</p>
          <p class="font-medium text-gray-800">
            {{ formatCurrency(totalPrice) }}
          </p>
        </div>

        <!-- Giảm giá -->
        <div v-if="discountAmount > 0" class="flex justify-between items-center mb-4">
          <p class="text-sm text-gray-600">Giảm giá:</p>
          <p class="font-medium text-green-500">
            - {{ formatCurrency(discountAmount) }}
          </p>
        </div>

        <!-- Tổng cộng -->
        <div class="flex justify-between items-center border-t border-gray-300 pt-4">
          <p class="text-base font-bold text-gray-800">Tổng cộng:</p>
          <p class="text-lg font-bold text-red-500">
            {{ formatCurrency(finalPrice) }}
          </p>
        </div>

        <div class="mt-6" v-if="cartItems.length > 0">
          <button
            class="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            @click="proceedToCheckout">
            Tiến hành đặt hàng
          </button>
        </div>
      </div>
    </div>
    <div v-if="cartItems.length <= 0 && !isLoading" class="flex justify-center  ">
      <p class="px-2">Không có sản phẩm nào trong giỏ hàng
        <router-link :to="{ name: 'product' }">
          <span class="text-red-500 underline hover:text-blue-500">Tiếp tục mua sắm</span>
        </router-link>
      </p>
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
import notificationService from "@/services/notificationService";
import { mapGetters } from "vuex";
export default {
  name: "CartComponent",
  data() {
    return {
      isLoading: false,
      selectAll: false,
      cartItems: [],
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters('auth', ['token', 'user', 'name', 'role']),
    ...mapGetters('loading', ['isLoading']),
    discountAmount() {
      return this.cartItems.reduce(
        (total, item) =>
          total +
          ((item.productId.productPrice * item.productId.discountProduct) /
            100) *
          item.quantity,
        0
      );
    },
    finalPrice() {
      return this.totalPrice - this.discountAmount;
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
    truncateText(text, maxLength) {
      if (!text || typeof text !== "string") {
        return "";
      }
      const bracketIndex = text.indexOf("[");

      if (bracketIndex !== -1 && bracketIndex <= maxLength) {
        text = text.slice(0, bracketIndex);
      }

      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    },
    getTotalPrice(item) {
      return this.getDiscountedPrice(item) * item.quantity;
    },
    getDiscountedPrice(item) {
      const originalPrice = item.productId.productPrice;
      const discount = item.productId.discountProduct;
      return discount > 0
        ? originalPrice * (1 - discount / 100)
        : originalPrice;
    },
    getFinalPrice(product) {
      const originalPrice = product.productId.productPrice;
      const discount = product.productId.discountProduct;
      return originalPrice * (1 - discount / 100);
    },
    proceedToCheckout() {
      this.$router.push({ name: "cartToOrder" });
    },
    async getViewCart() {
      if (!this.token) {
        notificationService.info("Vui lòng đăng nhập");
        return
      }
      this.isLoading = true;

      try {
        const response = await getCart();
        this.cartItems = response.data;
      } catch (error) {
        this.errorMessage = "Không thể tải giỏ hàng.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async removeSelectedProducts() {
      const selectedProductIds = this.cartItems
        .filter((product) => product.selected)
        .map((product) => product.productId.id);

      if (selectedProductIds.length === 0) {
        return notificationService.info("Vui lòng chọn ít nhất một sản phẩm để xóa.");
      }

      this.isLoading = true; // Bắt đầu trạng thái loading

      try {
        for (const productId of selectedProductIds) {
          await removeProductFromCart(productId);
        }
        this.getViewCart(); // Refresh giỏ hàng
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        this.errorMessage = "Không thể xóa sản phẩm. Vui lòng thử lại.";
      } finally {
        this.isLoading = false; // Kết thúc trạng thái loading
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
      this.isLoading = true; // Bắt đầu loading
      try {
        await removeProductFromCart(productId);
        this.getViewCart();
      } catch (error) {
        this.errorMessage = "Lỗi khi xóa sản phẩm.";
        console.error(error);
      } finally {
        this.isLoading = false; // Kết thúc loading
      }
    },

    async updateQuantity(index, delta) {
      const product = this.cartItems[index];
      const currentQuantity = product.quantity;
      const newQuantity = currentQuantity + delta;

      this.isLoading = true; // Bắt đầu loading
      try {
        if (newQuantity < 1) {
          // Gọi hàm xóa sản phẩm nếu số lượng mới nhỏ hơn 1
          await this.removeProduct(index);
          notificationService.success("Sản phẩm đã được xóa khỏi giỏ hàng");
        } else {
          // Cập nhật số lượng sản phẩm
          const quantityChange = newQuantity - currentQuantity;
          await addProductToCart(product.productId.id, quantityChange);
          notificationService.success("Số lượng sản phẩm đã được cập nhật");
          this.cartItems[index].quantity = newQuantity;
        }
      } catch (error) {
        if (error.response?.data?.message) {
          notificationService.error(`Lỗi: ${error.response.data.message}`);
        } else {
          notificationService.error(
            "Không thể cập nhật số lượng. Vui lòng thử lại"
          );
        }
        console.error("Lỗi khi cập nhật số lượng:", error);
      } finally {
        this.isLoading = false; // Kết thúc loading
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
