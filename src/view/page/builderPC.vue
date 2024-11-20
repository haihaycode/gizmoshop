<template>
  <div class="flex flex-wrap w-full" ref="content">
    <!-- Thành phần danh sách sản phẩm chiếm 7 phần -->
    <div class="w-full">
      <buildPCComponent />
    </div>

  </div>
</template>

<script>
import buildPCComponent from "@/components/buildPC/buildPCComponent.vue";


export default {
  name: "yourCart",
  components: {
    buildPCComponent,
  },
};
</script>

<style scoped>
/* Không cần thêm nhiều CSS, vì Tailwind đã xử lý hầu hết các trường hợp */
</style>
