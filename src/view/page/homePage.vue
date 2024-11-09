<template>
    <div class="md:m-0 ">
        <carouselVoucherComponent></carouselVoucherComponent>
        <ScrollingVoucherComponent> </ScrollingVoucherComponent>
        <voucherHomeComponent></voucherHomeComponent>
        <TopDiscountedProductsComponent></TopDiscountedProductsComponent>
    </div>
</template>
<script>

import carouselVoucherComponent from '@/components/carouselHome/carouselVoucherComponent.vue';
import voucherHomeComponent from '@/components/carouselHome/voucherHomeComponent.vue';
import TopDiscountedProductsComponent from '@/components/product/TopDiscountedProductsComponent.vue';
import ScrollingVoucherComponent from '@/components/carouselHome/ScrollingVoucherComponent.vue'
export default {
    name: 'demoTestDev',
    components: {
        carouselVoucherComponent,
        voucherHomeComponent,
        TopDiscountedProductsComponent,
        ScrollingVoucherComponent

    }
};
</script>
