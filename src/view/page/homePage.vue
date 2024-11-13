<template>
  <div class="md:m-0" ref="content">
    <carouselVoucherComponent class="md:mt-[120px]"></carouselVoucherComponent>
    <ScrollingVoucherComponent></ScrollingVoucherComponent>
    <voucherHomeComponent></voucherHomeComponent>
    <TopDiscountedProductsComponent></TopDiscountedProductsComponent>
    <CarouselCategoryComponent></CarouselCategoryComponent>
    <productComponent></productComponent>
    <!-- :products="products" -->
  </div>
</template>
<script>
import CarouselCategoryComponent from "@/components/carouselHome/carouselCategoryComponent.vue";
import carouselVoucherComponent from "@/components/carouselHome/carouselVoucherComponent.vue";
import voucherHomeComponent from "@/components/carouselHome/voucherHomeComponent.vue";
import TopDiscountedProductsComponent from "@/components/product/TopDiscountedProductsComponent.vue";
import ScrollingVoucherComponent from "@/components/carouselHome/ScrollingVoucherComponent.vue";
import productComponent from "@/components/carouselHome/productComponent.vue";
// import { getProduct } from "@/api/productApi";

export default {
  name: "demoTestDev",
  components: {
    carouselVoucherComponent,
    voucherHomeComponent,
    CarouselCategoryComponent,
    TopDiscountedProductsComponent,
    ScrollingVoucherComponent,
    productComponent,
  },
  // data() {
  //   return {
  //     products: [], // Khai báo đúng
  //   };
  // },
  // async mounted() {
  //   try {
  //     // Gọi API và lấy sản phẩm
  //     const response = await getProduct();
  //     this.products = response.data; // Gán vào products thay vì categories
  //     console.log(this.products); // Kiểm tra lại dữ liệu
  //   } catch (error) {
  //     console.error("Lỗi khi lấy danh mục:", error.message);
  //   }
  //   window.addEventListener("scroll", this.handleScroll);
  //   window.scrollTo(0, 0);
  // },
};
</script>