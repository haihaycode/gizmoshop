<template>
    <div class="md:m-0 ">
        <carouselVoucherComponent></carouselVoucherComponent>
        <voucherHomeComponent></voucherHomeComponent>
        <TopDiscountedProductsComponent></TopDiscountedProductsComponent>
        <CarouselCategoryComponent></CarouselCategoryComponent>
    </div>
</template>
<script>

import CarouselCategoryComponent from '@/components/carouselHome/carouselCategoryComponent.vue';
import carouselVoucherComponent from '@/components/carouselHome/carouselVoucherComponent.vue';
import voucherHomeComponent from '@/components/carouselHome/voucherHomeComponent.vue';
import TopDiscountedProductsComponent from '@/components/product/TopDiscountedProductsComponent.vue';
export default {
    name: 'demoTestDev',
    components: {
        carouselVoucherComponent,
        voucherHomeComponent,
        TopDiscountedProductsComponent,
        CarouselCategoryComponent
    }
};
</script>
