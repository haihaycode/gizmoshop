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
            <strong>Danh mục :</strong>
            <span class="text-blue-500 cursor-pointer hover:underline">&nbsp;{{
              product?.productCategories?.name || "..."
            }}</span>
          </p>
          <p>
            <strong>Thương hiệu :</strong>
            <span class="text-blue-500 cursor-pointer hover:underline">&nbsp;{{
              product?.productBrand?.name || "..."
            }}</span>
          </p>
          <p>
            <strong>Số lượng :</strong>
            <span class="text-red-500">&nbsp;{{ product?.productInventoryResponse?.quantity || "Hết Hàng" }}</span>
          </p>
          <p>
            <strong>Mô tả : &nbsp;</strong>
            {{
              product?.productShortDescription?.slice(
                0,
                product.productShortDescription?.indexOf("[[[")
              ) || '...'
            }}
          </p>
        </div>

        <div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 mt-4">
          <div v-if="product?.productInventoryResponse?.quantity > 0"
            class="flex items-center border border-gray-300 rounded">
            <button @click="decreaseQuantity" class="px-3 py-1 md:px-4">
              <i class="bx bx-minus"></i>
            </button>
            <input type="number" v-model="quantity" min="1" disabled
              class="w-12 text-center border-l border-r border-gray-300" />
            <button @click="increaseQuantity" class="px-3 py-1 md:px-4">
              <i class="bx bx-plus"></i>
            </button>
          </div>


          <button v-if="showAddToCartButton && product?.productInventoryResponse?.quantity" :disabled="isLoading"
            :class="isLoading ? 'bg-gray-200' : ''"
            class="bg-red-500 text-white flex items-center justify-center px-3 py-1 md:px-4 md:py-1 rounded hover:bg-red-600 w-full md:w-auto"
            @click="() => { handleAddToCart(); showWishlistButton = false }">
            <i v-if="!isLoading" class="bx bx-cart-add mr-1"></i>
            <span class="hidden lg:inline"> <i v-if="isLoading" class='bx bx-loader bx-spin'></i> Thêm Vào Giỏ
              Hàng</span>
            <span class="inline lg:hidden"><i v-if="isLoading" class='bx bx-loader bx-spin'></i> Thêm</span>
          </button>


          <button v-if="showWishlistButton" @click="() => { toggleWishlist(); showAddToCartButton = false }"
            :disabled="isLoading" :class="isLoading ? 'bg-gray-200' : ''"
            class="bg-gray-300 text-gray-700 flex items-center justify-center px-3 py-1 md:px-4 md:py-1 rounded hover:bg-gray-400 w-full md:w-auto">
            <i v-if="!isLoading" :class="isInWishlist ? 'bx bxs-heart' : 'bx bx-heart'"></i>
            <span class="hidden lg:inline ml-1"> <i v-if="isLoading" class='bx bx-loader bx-spin'></i> {{
              isInWishlist ? "Đã Yêu Thích" : "Thêm vào Yêu Thích"
            }}</span>
            <span class="inline lg:hidden ml-1"><i v-if="isLoading" class='bx bx-loader bx-spin'></i>{{
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
      showAddToCartButton: true,
      showWishlistButton: true,
      quantity: 1,
      isInWishlist: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["token", "user", "name", "role"]),
    ...mapGetters('loading', ['isLoading'])
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
      this.$emit("loading");
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
          this.showAddToCartButton = true;
        }
      }
    },
    async handleAddToCart() {
      this.$emit("loading");
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
      } finally {
        this.showWishlistButton = true;
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
