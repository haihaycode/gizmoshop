<template>
  <div class="flex flex-wrap w-full" ref="content">
    <!-- Thành phần danh sách sản phẩm chiếm 7 phần -->
    <div class="w-full">
      <ListProduct />
    </div>

  </div>
</template>

<script>
import ListProduct from "@/components/cart/listProductComponent.vue";


export default {
  name: "yourCart",
  components: {
    ListProduct,
  },
};
</script>

<style scoped>
/* Không cần thêm nhiều CSS, vì Tailwind đã xử lý hầu hết các trường hợp */
</style>
