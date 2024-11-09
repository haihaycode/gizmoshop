<template>
    <div class="md:m-0 ">
        <carouselVoucherComponent></carouselVoucherComponent>
        <voucherHomeComponent></voucherHomeComponent>
        <TopDiscountedProductsComponent></TopDiscountedProductsComponent>
    </div>
</template>
<script>

import carouselVoucherComponent from '@/components/carouselHome/carouselVoucherComponent.vue';
import voucherHomeComponent from '@/components/carouselHome/voucherHomeComponent.vue';
import TopDiscountedProductsComponent from '@/components/product/TopDiscountedProductsComponent.vue';
export default {
    name: 'demoTestDev',
    components: {
        carouselVoucherComponent,
        voucherHomeComponent,
        TopDiscountedProductsComponent
    }
};
</script>
