<template>
  <div v-if="product" class="fixed bottom-0 left-4 bg-white p-2 z-50 w-auto">
    <h3 class="text-sm font-sans">
      {{ product.productName }} / 
      {{ formatCurrency(product.productPrice) }} / 
      {{ product.productBrand.name }} / 
      {{ product.view }} lượt xem
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
