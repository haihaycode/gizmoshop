<template>
    <div>
        <ImageCarouselComponent :items="voucher"></ImageCarouselComponent>
    </div>
</template>

<script>
import ImageCarouselComponent from '../containers/carousel/ImageCarouselComponent.vue';
import { getVoucherPage } from '@/api/voucherApi';
export default {
    name: 'carouselVoucherComponent ',
    components: {
        ImageCarouselComponent,

    },
    data() {
        return {
            voucher: [],
        }
    },
    mounted() {
        this.handleFetchVoucher();
    },
    methods: {
        async handleFetchVoucher() {
            try {
                const response = await getVoucherPage();
                this.voucher = response.data.content;
            } catch (error) {
                console.error("Failed to load vouchers:", error);
            }
        },
    },
}
</script>

<style></style>