<template>
    <div class="flex flex-col md:flex-row items-start my-1 w-full ">
        <!-- Left Section: Image -->
        <div class="md:w-1/3 w-full flex justify-start items-center mb-4 md:mb-0">
            <img src="https://via.placeholder.com/300x300" alt="Promotional Image"
                class="rounded-lg object-cover w-full md:w-auto md:h-full h-[150px]" />
        </div>

        <!-- Right Section: Categories with Swiper -->
        <div class="md:w-2/3 w-full bg-white">
            <!-- Swiper for Categories with Multiple Slides -->
            <swiper :slides-per-view="1" :loop="false" class="categories-swiper">
                <swiper-slide v-for="(slideCategories, index) in paginatedCategories" :key="index">
                    <!-- Dynamic Grid Layout: 2x3 on mobile, 3x4 on desktop -->
                    <div :class="gridLayoutClass">
                        <div v-for="(category, idx) in slideCategories" :key="idx"
                            class="flex flex-col items-center text-center p-2 border border-gray-200 rounded-md">
                            <img :src="category.icon" alt="Category Icon"
                                class="w-12 h-12 object-contain bg-white rounded-full p-1 border border-gray-200" />
                            <p class="text-xs text-gray-700 mt-1 truncate w-16">{{ category.name }}</p>
                        </div>
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
            categories: [
                { icon: 'https://via.placeholder.com/60', name: 'Thời Trang Nam' },
                { icon: 'https://via.placeholder.com/60', name: 'Điện Thoại & Phụ Kiện' },
                { icon: 'https://via.placeholder.com/60', name: 'Thiết Bị Điện Tử' },
                { icon: 'https://via.placeholder.com/60', name: 'Máy Tính & Laptop' },
                { icon: 'https://via.placeholder.com/60', name: 'Máy Ảnh & Máy Quay Phim' },
                { icon: 'https://via.placeholder.com/60', name: 'Đồng Hồ' },
                { icon: 'https://via.placeholder.com/60', name: 'Giày Dép Nam' },
                { icon: 'https://via.placeholder.com/60', name: 'Thiết Bị Điện Gia Dụng' },
                { icon: 'https://via.placeholder.com/60', name: 'Thể Thao & Du Lịch' },
                { icon: 'https://via.placeholder.com/60', name: 'Ô Tô & Xe Máy & Xe Đạp' },
                { icon: 'https://via.placeholder.com/60', name: 'Thời Trang Nữ' },
                { icon: 'https://via.placeholder.com/60', name: 'Mẹ & Bé' },
                { icon: 'https://via.placeholder.com/60', name: 'Nhà Cửa & Đời Sống' },
                { icon: 'https://via.placeholder.com/60', name: 'Sắc Đẹp' },
                { icon: 'https://via.placeholder.com/60', name: 'Sức Khỏe' },
                { icon: 'https://via.placeholder.com/60', name: 'Giày Dép Nữ' },
                { icon: 'https://via.placeholder.com/60', name: 'Túi Ví Nữ' },
                { icon: 'https://via.placeholder.com/60', name: 'Phụ Kiện & Trang Sức Nữ' },
                { icon: 'https://via.placeholder.com/60', name: 'Bách Hóa Online' },
                { icon: 'https://via.placeholder.com/60', name: 'Nhà Sách Online' },
            ],
        };
    },
    computed: {
        // Dynamically determine grid layout based on screen size
        gridLayoutClass() {
            return window.innerWidth >= 768 ? 'grid grid-cols-4 gap-2' : 'grid grid-cols-3 gap-2';
        },
        // Paginate categories based on screen size
        paginatedCategories() {
            const itemsPerPage = window.innerWidth >= 768 ? 12 : 6;
            return Array.from({ length: Math.ceil(this.categories.length / itemsPerPage) }, (_, i) =>
                this.categories.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
            );
        },
    },
    mounted() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.$forceUpdate(); // Rerender component on resize to adjust grid layout and pagination
        },
    },
};
</script>

<style scoped>
/* All styling handled by Tailwind CSS classes */
</style>
