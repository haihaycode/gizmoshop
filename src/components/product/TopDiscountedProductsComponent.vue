<template>
    <div>
        <div class="discounted-products-container my-2 mx-auto max-w-7xl border border-gray-200 rounded-lg shadow-lg">
            <!-- Header with title, timer, and view all link -->
            <div class="header flex flex-col sm:flex-row justify-between items-center bg-red-500 text-white px-4 py-2">
                <h2 class="font-bold text-sm sm:text-lg md:text-xl lg:text-2xl">Giảm Giá Sốc</h2>

                <a href="#" class="text-xs sm:text-sm md:text-base hover:underline">Xem Thêm</a>
            </div>

            <!-- Swiper for Products with Responsive Slides Per View -->
            <swiper :slides-per-view="getSlidesPerView" :space-between="10" :loop="false"
                class="products-swiper bg-gray-100 p-4">
                <swiper-slide v-for="(product, index) in products" :key="index"
                    class="product-card text-center flex flex-col items-center p-4 border border-gray-200 rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-md">
                    <img :src="product.image" alt="Product Image"
                        class="product-image mx-auto max-w-[100px] max-h-[100px]" />
                    <div
                        class="brand-label bg-gray-200 py-1 mt-2 rounded-md text-xs sm:text-sm font-bold text-gray-700">
                        {{ product.brand }}</div>
                    <div class="product-name font-semibold text-red-500 mt-2 text-xs sm:text-sm md:text-base">{{
                        product.name }}</div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
    components: { Swiper, SwiperSlide },
    data() {
        return {
            products: [
                { image: 'https://via.placeholder.com/150', brand: 'HAPAS', name: 'TÚI XINH' },
                { image: 'https://via.placeholder.com/150', brand: 'Atino', name: 'GIẢM 50%' },
                { image: 'https://via.placeholder.com/150', brand: 'Tharo Clothing', name: 'GIẢM 50%' },
                { image: 'https://via.placeholder.com/150', brand: 'Midea', name: 'SALE SHOCK' },
                { image: 'https://via.placeholder.com/150', brand: 'Electrolux', name: 'SALE SHOCK' },
                { image: 'https://via.placeholder.com/150', brand: 'Masuto', name: 'SALE SHOCK' },
                { image: 'https://via.placeholder.com/150', brand: 'Panasonic', name: 'SALE SHOCK' },
                { image: 'https://via.placeholder.com/150', brand: 'Sony', name: 'SALE SHOCK' },
                { image: 'https://via.placeholder.com/150', brand: 'LG', name: 'SALE SHOCK' },
            ],
        };
    },
    computed: {
        getSlidesPerView() {
            if (window.innerWidth >= 1024) return 6; // Desktop
            if (window.innerWidth >= 768) return 4; // Tablet
            return 2; // Mobile
        },
    },
    mounted() {
        window.addEventListener("resize", this.updateSlidesPerView);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateSlidesPerView);
    },
    methods: {
        updateSlidesPerView() {
            this.$forceUpdate();
        },
    },
};
</script>

<style scoped>
/* Removed custom CSS */
.bg-red-500 {
    background-color: #ee4d2d;
}
</style>
