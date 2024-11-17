<template>
  <div
    class="w-full sm:max-w-xs md:max-w-sm  rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 relative">
    <div class="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-lg cursor-pointer ">
      <img :src="loadImage(product.thumbnail, 'product')" :alt="product.productName"
        class="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90" @error="handleImageError" />
      <div @click="handleForwardProductDetail"
        class="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex items-center justify-center text-white font-semibold text-xs sm:text-sm transition-opacity duration-300">
        Xem chi tiết
      </div>
      <div v-if="product.discountProduct"
        class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-sm shadow">
        -{{ product.discountProduct }}%
      </div>

      <div v-if="product.productBrand"
        class="absolute bottom-0 right-0 bg-blue-400 text-white text-xs font-semibold px-2 py-1  ">
        {{ product.productBrand.name }}
      </div>
    </div>

    <div class="p-4 space-y-2">
      <h3 class="text-sm sm:text-base md:text-lg font-semibold text-gray-800  overflow-hidden">
        {{ product.productName }}
      </h3>

      <div class="flex items-center space-x-2">
        <span class="text-base md:text-lg font-bold text-red-600">{{ formatCurrency(product.productPrice) }}</span>
        <span v-if="product.discountProduct" class="text-xs md:text-sm line-through text-gray-400">
          {{ formatCurrency(calculateOldPrice(product.productPrice, product.discountProduct)) }}
        </span>
      </div>

      <div class="flex justify-between items-center space-x-4">
        <div class="flex items-center space-x-1">
          <span class="text-xs sm:text-sm font-semibold text-blue-700">Danh mục:</span>
          <span class="text-xs sm:text-sm text-gray-600">{{ product?.productCategories?.name || 'No Category' }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between w-full mt-2">
        <div class="flex items-center space-x-1">
          <span class="text-xs sm:text-sm font-thin text-gray-700">
            {{ product.soldProduct ? product.soldProduct : 0 }} Đã bán
          </span>
        </div>
        <button @click="toggleFavorite"
          class="text-gray-500 hover:text-red-500 text-sm transition duration-200 flex items-center space-x-2 relative group">
          <span v-if="deleteFavorite" class="text-sm font-serif">bỏ</span>
          <i v-if="deleteFavorite" class="bx bxs-heart text-2xl text-gray-500"></i>
          <i v-else class="bx bx-heart text-xl text-gray-500"></i>
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import { loadImage } from "@/services/imageService";
import { toggleProductFavorite } from "@/api/auth/favoriteApi";
import notificationService from "@/services/notificationService";
import { mapGetters } from "vuex";
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
    deleteFavorite: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('auth', ['token', 'user', 'name', 'role']),
  },
  emits: ["load-product"],
  methods: {
    loadImage,
    handleForwardProductDetail() {
      const slug = this.product?.productName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      this.$router.push({
        path: '/product/detail',
        query: { slug: `${slug}-${this.product.id}` }
      });
    },
    calculateOldPrice(productPrice, discountProduct) {
      if (discountProduct && productPrice) {
        return productPrice * (1 + discountProduct / 100);
      }
      return productPrice;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    handleImageError(event) {
      event.target.src = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
    },
    async toggleFavorite() {

      if (!this.token) {
        notificationService.info("Vui lòng đăng nhập")
        return;
      } else {
        try {
          notificationService.success("Thành công");
          await toggleProductFavorite(this.product.id);

        } catch (error) {
          console.error("Failed to toggle favorite:", error);
        } finally {
          this.$emit("load-product", this.product);
        }
      }
    }

  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
