<template>
    <div>
        <div class="discounted-products-container my-2 mx-auto  border border-gray-50 rounded-sm shadow-sm">
            <!-- Header with title and view all link -->
            <div class="header flex flex-col sm:flex-row justify-between items-center bg-red-500 text-white px-4 py-2">

                <div class="flex items-center space-x-2">
                    <!-- Lightning Icon (SVG) -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-200" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M13 2L3 14h7v8l11-12h-8z" />
                    </svg>

                    <!-- Text -->
                    <h2 class="font-bold text-sm sm:text-lg md:text-xl lg:text-2xl">Giảm Giá Sốc</h2>
                </div>


                <a href="#" class="text-xs sm:text-sm md:text-base hover:underline">Xem Thêm</a>
            </div>

            <!-- Swiper for Products with Responsive Slides Per View -->
            <swiper :slides-per-view="getSlidesPerView" :space-between="10" :loop="false" class="products-swiper  p-4">
                <swiper-slide v-for="(product, index) in products" :key="index"
                    class="product-card text-center flex flex-col items-center p-4  transition-transform transform hover:-translate-y-1 hover:shadow-md">
                    <img :src="product.image" alt="Product Image"
                        class="product-image mx-auto max-w-[120px] max-h-[120px] rounded-sm" />

                    <div
                        class="product-name font-semibold text-gray-800 mt-2 text-sm sm:text-base md:text-lg line-clamp-1">
                        {{ product.name }}
                    </div>

                    <!-- Truncated Product Description -->
                    <p class="product-description text-xs sm:text-sm text-gray-600 mt-1 text-center line-clamp-2">
                        {{ product.description }}
                    </p>

                    <div class="product-price font-bold text-red-500 mt-2 text-sm sm:text-base md:text-lg">
                        {{ product.price }} VND
                    </div>
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
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Túi Xinh HAPAS',
                    description: 'Túi xách thời trang phù hợp với mọi phong cách.',
                    price: '500,000'
                },
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Giảm 50% Atino',
                    description: 'Áo khoác nam phong cách hiện đại, chất liệu cao cấp.',
                    price: '300,000'
                },
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Tharo Clothing - Bộ trang phục dạo phố phong cách với thiết kế hiện đại và chất lượng cao.',
                    description: 'Bộ trang phục dạo phố phong cách với thiết kế hiện đại và chất lượng cao.',
                    price: '400,000'
                },
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Nồi Cơm Midea',
                    description: 'Nồi cơm điện hiện đại, tiết kiệm năng lượng.',
                    price: '1,200,000'
                },
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Máy Giặt Electrolux',
                    description: 'Máy giặt cửa trước, thiết kế tinh tế, vận hành êm.',
                    price: '7,500,000'
                },
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Nồi Chiên Không Dầu Masuto',
                    description: 'Nồi chiên không dầu giúp giảm dầu mỡ trong món ăn.',
                    price: '2,500,000'
                },
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Quạt Điều Hoà Panasonic',
                    description: 'Quạt điều hòa làm mát, tiết kiệm năng lượng.',
                    price: '3,000,000'
                },
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Tivi Sony 4K',
                    description: 'Tivi màn hình 4K với chất lượng hình ảnh sắc nét.',
                    price: '10,000,000'
                },
                {
                    image: 'https://via.placeholder.com/150',
                    name: 'Máy Lạnh LG Inverter',
                    description: 'Máy lạnh tiết kiệm năng lượng, làm mát hiệu quả.',
                    price: '8,500,000'
                },
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
/* Tailwind classes for truncation */
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

/* Custom color */
.bg-red-500 {
    background-color: #ee4d2d;
}
</style>
