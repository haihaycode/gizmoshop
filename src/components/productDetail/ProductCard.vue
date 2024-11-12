<template>
  <div
    class="product-card text-center flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 max-w-xs h-80 relative"
  >
    <!-- Discount label on top of the image -->
    <div
      class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded"
    >
      {{ discountPercentage }}%
    </div>

    <img
      :src="product.image"
      alt="Product Image"
      class="product-image mx-auto"
    />
    <div
      class="product-name font-semibold text-gray-800 mt-2 text-sm sm:text-base md:text-lg line-clamp-2"
    >
      {{ product.name }}
    </div>

    <!-- <p
      class="product-description text-xs sm:text-sm text-gray-600 mt-1 text-center line-clamp-2"
    >
      {{ product.description }}
    </p> -->
    <div
      class="product-price font-bold text-red-500 mt-2 text-sm sm:text-base md:text-lg"
    >
      {{ product.price }} 
    </div>

    <!-- Display sale price if available -->
    <div
      v-if="product.salePrice"
      class="product-sale-price mt-2 text-sm text-red-500 line-through"
    >
      Giá khuyến mãi: {{ product.salePrice }} 
    </div>
  </div>
</template>


<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // Tính phần trăm giảm giá
    discountPercentage() {
      const price = parseInt(this.product.price.replace(/\D/g, ""), 10); // Xóa các ký tự không phải số và chuyển thành số
      const salePrice = parseInt(this.product.old_price.replace(/\D/g, ""), 10); // Làm tương tự cho giá cũ

      if (salePrice && price) {
        const discount = ((price - salePrice) / price) * 100;
        return discount.toFixed(0); // Làm tròn số phần trăm
      }
      return 0; // Trả về 0 nếu không có giá sale
    },
  },
};
</script>

<style scoped>
/* Product image styles */
.product-image {
  width: 170px;
  height: 150px;
  object-fit: cover;
}
</style>
