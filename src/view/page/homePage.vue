<template>
  <div class="md:m-0" ref="content">
    <carouselVoucherComponent></carouselVoucherComponent>
    <ScrollingVoucherComponent></ScrollingVoucherComponent>
    <voucherHomeComponent></voucherHomeComponent>
    <TopDiscountedProductsComponent></TopDiscountedProductsComponent>
    <CarouselCategoryComponent></CarouselCategoryComponent>
    <FeaturedProductsComponent></FeaturedProductsComponent>
  </div>
</template>

<script>
import CarouselCategoryComponent from "@/components/carouselHome/carouselCategoryComponent.vue";
import carouselVoucherComponent from "@/components/carouselHome/carouselVoucherComponent.vue";
import voucherHomeComponent from "@/components/carouselHome/voucherHomeComponent.vue";
import TopDiscountedProductsComponent from "@/components/product/TopDiscountedProductsComponent.vue";
import ScrollingVoucherComponent from "@/components/carouselHome/ScrollingVoucherComponent.vue";
import FeaturedProductsComponent from "@/components/product/FeaturedProductsComponent.vue";

export default {
  name: "demoTestDev",
  components: {
    carouselVoucherComponent,
    voucherHomeComponent,
    CarouselCategoryComponent,
    TopDiscountedProductsComponent,
    FeaturedProductsComponent,
    ScrollingVoucherComponent,

  },
  data() {
    return {
      hoveredProduct: null,
    };
  },
  methods: {
  },
};
</script>

<style scoped></style>
