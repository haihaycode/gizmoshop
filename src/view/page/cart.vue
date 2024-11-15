<template>
  <div class="flex  w-full " ref="content">
    <!-- Thành phần danh sách sản phẩm chiếm 7 phần -->
    <div class="flex-grow-[7] p-4">
      <ListProduct />
    </div>

    <!-- Thành phần chọn voucher chiếm 3 phần -->
    <div class="flex-grow-[3] p-4 ">
      <voucherAmoutComponentVue />
    </div>
  </div>
</template>

<script>
import ListProduct from "@/components/cart/listProductComponent.vue";
import voucherAmoutComponentVue from "@/components/cart/voucherAmoutComponent.vue";

export default {
  name: "yourCart",
  components: {
    ListProduct,
    voucherAmoutComponentVue,
  },
};
</script>

<style scoped>
/* Thêm các tùy chỉnh CSS nếu cần */
</style>
