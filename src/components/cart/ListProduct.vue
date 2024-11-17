<!-- eslint-disable vue/no-mutating-props -->
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
      <!-- Product Name and Short Description -->
      <p class="text-gray-800 font-semibold text-sm md:text-base truncate">
        {{ product.productId.productName }}
      </p>
      <p class="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2">
        {{ product.productId.productShortDescription }}
      </p>

      <!-- Price -->
      <p class="text-red-500 text-sm font-semibold mt-2">
        {{ formatCurrency(product.productId.productPrice) }}
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
    loadImage,
  },
};
</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
</style>
