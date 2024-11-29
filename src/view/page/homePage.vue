<template>
  <div class="md:m-0" ref="content">
    <div v-if="isLoading">
      <LoadingSkeletionComponent />
    </div>
    <div v-else>
      <carouselVoucherComponent></carouselVoucherComponent>
      <ScrollingVoucherComponent></ScrollingVoucherComponent>
      <voucherHomeComponent></voucherHomeComponent>
      <TopDiscountedProductsComponent></TopDiscountedProductsComponent>
      <CarouselCategoryComponent></CarouselCategoryComponent>
      <FeaturedProductsComponent></FeaturedProductsComponent>
    </div>
  </div>
</template>

<script>
import CarouselCategoryComponent from "@/components/carouselHome/carouselCategoryComponent.vue";
import carouselVoucherComponent from "@/components/carouselHome/carouselVoucherComponent.vue";
import voucherHomeComponent from "@/components/carouselHome/voucherHomeComponent.vue";
import TopDiscountedProductsComponent from "@/components/product/TopDiscountedProductsComponent.vue";
import ScrollingVoucherComponent from "@/components/carouselHome/ScrollingVoucherComponent.vue";
import FeaturedProductsComponent from "@/components/product/FeaturedProductsComponent.vue";
import LoadingSkeletionComponent from "@/components/containers/loading/LoadingSkeletionComponent.vue";

export default {
  name: "demoTestDev",
  components: {
    carouselVoucherComponent,
    voucherHomeComponent,
    CarouselCategoryComponent,
    TopDiscountedProductsComponent,
    FeaturedProductsComponent,
    ScrollingVoucherComponent,
    LoadingSkeletionComponent

  },
  data() {
    return {
      hoveredProduct: null,
      isLoading: true,
    };
  },
  methods: {
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  },
};
</script>

<style scoped></style>
