<template>
  <div
    class="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition duration-200 border border-gray-200"
  >
    <!-- Product Image -->
    <img
      :src="
        product.productId.thumbnail
          ? loadImage(product.productId.thumbnail, 'product')
          : 'https://i.pinimg.com/736x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg'
      "
      alt="Product Image"
      class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border border-gray-300"
    />

    <div class="flex-1 ml-4">
      <p class="text-gray-800 font-semibold text-sm md:text-base truncate">
        {{ truncateText(product.productId.productName, 50) }}
      </p>

      <p class="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2">
        {{ truncateText(product.productId.productShortDescription, 70) }}
      </p>
      <div class="flex items-center space-x-2 mt-2">
        <p
          v-if="product.productId.discountProduct > 0"
          class="text-gray-400 text-sm line-through"
        >
          {{ formatCurrency(product.productId.productPrice) }}
        </p>
        <p class="text-red-500 text-sm font-semibold">
          {{
            formatCurrency(
              discountedPrice(
                product.productId.productPrice,
                product.productId.discountProduct
              )
            )
          }}
        </p>
      </div>
      <p
        v-if="product.productId.discountProduct > 0"
        class="text-green-500 text-xs mt-1"
      >
        Giảm {{ product.productId.discountProduct }}%
      </p>

      <!-- Category -->
      <p class="text-gray-400 text-xs mt-1">
        Danh mục:
        {{ product.productId.productCategories || "Chưa có danh mục" }}
      </p>
    </div>

    <!-- Quantity Section -->
    <div class="flex items-center space-x-2 ml-4">
      <p class="text-gray-600 font-medium text-sm">
        Số lượng: {{ product.quantity }}
      </p>
    </div>
  </div>
</template>

<script>
import { loadImage } from "@/services/imageService";
export default {
  props: {
    product: Object,
    index: Number,
    formatCurrency: Function,
    updateQuantity: Function,
    removeProduct: Function,
  },
  methods: {
    truncateText(text, maxLength) {
      if (!text || typeof text !== "string") {
        return "";
      }
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    },
    discountedPrice(price, discount) {
      return price - (price * discount) / 100;
    },
    loadImage,
  },
};
</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
</style>
