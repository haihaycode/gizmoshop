<template>
  <div class="product-container px-4 md:p-4">
    <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      <div class="w-full space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          {{ product?.productName ? product.productName : "..." }}
        </h2>
        <hr class="m-1 border-gray-300" />
        <div class="text-gray-500 text-sm flex items-center space-x-2">
          <span class="flex items-center">
            <i class="bx bxs-show text-gray-600 mr-1"></i>
            <span>{{ product?.view || 0 }} lượt xem</span>
          </span>

          <span class="flex items-center">
            <i class="bx bx-cart text-green-500 mr-1"></i>
            <span>{{ product?.soldProduct || 0 }} đã bán</span>
          </span>
        </div>

        <div class="flex items-center space-x-4 mt-2">
          <span class="text-lg md:text-2xl font-bold text-red-500">
            {{
              formatCurrency(
                product?.productPrice * (1 - product?.discountProduct / 100)
              )
            }}
          </span>
          <span class="text-sm line-through text-gray-400">
            {{ formatCurrency(product?.productPrice) }}
          </span>
          <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{{ product?.discountProduct }}%
          </span>
        </div>

        <div class="text-sm text-gray-600 space-y-2 mt-2">
          <p>
            <strong>Danh mục:</strong>
            <span class="text-blue-500 cursor-pointer hover:underline">{{
              product?.productCategories?.name || "No Category"
            }}</span>
          </p>
          <p>
            <strong>Thương hiệu:</strong>
            <span class="text-blue-500 cursor-pointer hover:underline">{{
              product?.productBrand?.name || "Unknown"
            }}</span>
          </p>
          <p>
            <strong>Số lượng còn lại:</strong>
            {{ product?.productInventoryResponse?.quantity || "N/A" }}
          </p>
          <p>
            <strong>Mô tả:</strong>
            {{
              product?.productShortDescription?.slice(
                0,
                product.productShortDescription?.indexOf("[[[")
              ) || product?.productShortDescription
            }}
          </p>
        </div>

        <div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 mt-4">
          <div class="flex items-center border border-gray-300 rounded">
            <button @click="decreaseQuantity" class="px-3 py-1 md:px-4">
              <i class="bx bx-minus"></i>
            </button>
            <input type="number" v-model="quantity" min="1"
              class="w-12 text-center border-l border-r border-gray-300" />
            <button @click="increaseQuantity" class="px-3 py-1 md:px-4">
              <i class="bx bx-plus"></i>
            </button>
          </div>
          <button
            class="bg-red-500 text-white flex items-center justify-center px-3 py-1 md:px-4 md:py-1 rounded hover:bg-red-600 w-full md:w-auto"
            @click="handleAddToCart">
            <i class="bx bx-cart-add mr-1"></i>
            <span class="hidden lg:inline">Thêm Vào Giỏ Hàng</span>
            <span class="inline lg:hidden">Thêm</span>
          </button>

          <button @click="toggleWishlist"
            class="bg-gray-300 text-gray-700 flex items-center justify-center px-3 py-1 md:px-4 md:py-1 rounded hover:bg-gray-400 w-full md:w-auto">
            <i :class="isInWishlist ? 'bx bxs-heart' : 'bx bx-heart'"></i>
            <span class="hidden lg:inline ml-1">{{
              isInWishlist ? "Đã Yêu Thích" : "Thêm vào Yêu Thích"
            }}</span>
            <span class="inline lg:hidden ml-1">{{
              isInWishlist ? "Đã Yêu Thích" : "Thêm"
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toggleProductFavorite } from "@/api/auth/favoriteApi";
import notificationService from "@/services/notificationService";
import { mapGetters } from "vuex";
import { addProductToCart } from "@/api/CartApi";
import { saveNotifications } from "@/services/notiServiceC";

export default {
  name: "ProductDetail",
  props: {
    product: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
      isInWishlist: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["token", "user", "name", "role"]),
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    toggleWishlist() {
      this.toggleFavorite();
      this.isInWishlist = !this.isInWishlist;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    async toggleFavorite() {
      if (!this.token) {
        notificationService.info("Vui lòng đăng nhập");
        return;
      } else {
        try {
          notificationService.success("Thành công");
          await toggleProductFavorite(this.product.id);
          saveNotifications('' + this.product.productName + ' Vừa được thêm vào yêu thích')
        } catch (error) {
          console.error("Failed to toggle favorite:", error);
        } finally {
          this.$emit("load-product", this.product);
        }
      }
    },
    async handleAddToCart() {
      if (!this.token) {
        notificationService.info("Vui lòng đăng nhập");
        return;
      }

      if (!this.product || !this.product.id) {
        alert("Thông tin sản phẩm không hợp lệ!");
        return;
      }
      try {
        const result = await addProductToCart(this.product.id, this.quantity);
        notificationService.success("Sản phẩm đã được thêm vào giỏ hàng!");
        saveNotifications('Thêm (' + this.quantity + ')' + this.product.productName + ' Vào giỏ hàng')
        console.log("Kết quả giỏ hàng:", result);
        this.$emit("cart-updated", result);
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        notificationService.error(
          "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!"
        );
      }
    },
  },
};
</script>

<style scoped>
.product-container {
  max-width: 1200px;
  margin: 0 auto;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f4f4f4;
}
</style>
