<template>
  <div class="md:m-0" ref="content">
    <carouselVoucherComponent></carouselVoucherComponent>
    <ScrollingVoucherComponent></ScrollingVoucherComponent>
    <voucherHomeComponent></voucherHomeComponent>
    <TopDiscountedProductsComponent></TopDiscountedProductsComponent>
    <CarouselCategoryComponent></CarouselCategoryComponent>
    <productComponent
      @hovered="onProductHovered"
      @mouseleave="onMouseLeave"
      :products="products"
    />

    <ProductHoverInfoComponent
      v-if="hoveredProduct"
      :product="hoveredProduct"
    />
  </div>
</template>

<script>
import CarouselCategoryComponent from "@/components/carouselHome/carouselCategoryComponent.vue";
import carouselVoucherComponent from "@/components/carouselHome/carouselVoucherComponent.vue";
import voucherHomeComponent from "@/components/carouselHome/voucherHomeComponent.vue";
import TopDiscountedProductsComponent from "@/components/product/TopDiscountedProductsComponent.vue";
import ScrollingVoucherComponent from "@/components/carouselHome/ScrollingVoucherComponent.vue";
import productComponent from "@/components/carouselHome/productComponent.vue";
import ProductHoverInfoComponent from "@/components/carouselHome/ProductHoverInfoComponent.vue";

export default {
  name: "demoTestDev",
  components: {
    carouselVoucherComponent,
    voucherHomeComponent,
    CarouselCategoryComponent,
    TopDiscountedProductsComponent,
    ScrollingVoucherComponent,
    productComponent,
    ProductHoverInfoComponent,
  },
  data() {
    return {
      hoveredProduct: null,
    };
  },
  methods: {
    onProductHovered(product) {
      this.hoveredProduct = product;
    },
    onMouseLeave() {
      this.hoveredProduct = null;
    },
  },
};
</script>

<style scoped>
/* Định vị thành phần ở góc dưới bên trái */
.ProductHoverInfoComponent {
  position: fixed;
  left: 20px;
  z-index: 1000; /* Đảm bảo thành phần nổi trên các phần khác */
}
</style>
