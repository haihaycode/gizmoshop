<template>
  <div class="flex flex-wrap w-full" ref="content">
    <div class="w-full ">
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