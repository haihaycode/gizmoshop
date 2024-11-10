<template>
    <div class="w-full md:w-96 mx-auto">
        <!-- Hình ảnh chính -->
        <div class="relative">
            <img :src="images[currentImageIndex]" alt="image" class="w-full h-80 md:h-full rounded-md object-cover" />
            <div class="absolute inset-0 flex items-center justify-between p-4">
                <!-- Nút chuyển qua hình trước -->
                <button @click="previousImage" class="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400"
                    :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === 0 }"
                    :disabled="currentImageIndex === 0">
                    &#10094;
                </button>

                <!-- Nút chuyển qua hình kế tiếp -->
                <button @click="nextImage" class="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400"
                    :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === images.length - 1 }"
                    :disabled="currentImageIndex === images.length - 1">
                    &#10095;
                </button>
            </div>
        </div>

        <!-- Danh sách hình nhỏ dưới dạng Swiper -->
        <div class="mt-4">
            <swiper ref="thumbnailSwiper" :slides-per-view="5" space-between="10" class="mySwiper" :loop="false">
                <swiper-slide v-for="(image, index) in images" :key="index" @click="selectImage(index)"
                    class="cursor-pointer">
                    <img :src="image" alt="thumbnail" class="w-16 h-16 md:w-12 md:h-12 object-cover rounded-md border-2"
                        :class="{ 'border-blue-500': currentImageIndex === index }" />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        images: {
            type: Array,
            required: true,
            default: () => [
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150?text=2',
                'https://via.placeholder.com/150?text=3',
                'https://via.placeholder.com/150?text=4',
                'https://via.placeholder.com/150?text=5',
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150?text=2',
                'https://via.placeholder.com/150?text=3',
                'https://via.placeholder.com/150?text=4',
                'https://via.placeholder.com/150?text=5',
            ],
        },
    },
    data() {
        return {
            currentImageIndex: 0,
        };
    },
    methods: {
        nextImage() {
            if (this.currentImageIndex < this.images.length - 1) {
                this.currentImageIndex++;
                this.updateThumbnailSwiper();
            }
        },
        previousImage() {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
                this.updateThumbnailSwiper();
            }
        },
        selectImage(index) {
            this.currentImageIndex = index;
            this.updateThumbnailSwiper();
        },
        updateThumbnailSwiper() {
            const swiperInstance = this.$refs.thumbnailSwiper.swiper;
            if (swiperInstance) {
                const visibleSlides = 5; // số lượng slide hiển thị cùng lúc
                if (this.currentImageIndex >= swiperInstance.activeIndex + visibleSlides) {
                    swiperInstance.slideTo(this.currentImageIndex - visibleSlides + 1);
                } else if (this.currentImageIndex < swiperInstance.activeIndex) {
                    swiperInstance.slideTo(this.currentImageIndex);
                }
            }
        },
    },
};
</script>

<style scoped>
/* Thêm style tùy chỉnh nếu cần */
</style>