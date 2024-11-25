<template>
    <div>
        <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div class="container mx-auto flex items-center justify-between py-4 px-6">
                <!-- Logo/Title -->
                <h1 class="text-2xl font-mono">GizmoShop - Trang Nhà cung cấp</h1>

                <!-- Mobile Menu Button -->
                <button @click="toggleMenu" class="block md:hidden text-white focus:outline-none">
                    <!-- Hiển thị SVG "Menu" khi isMenuOpen = false -->
                    <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>

                    <!-- Hiển thị SVG "X" khi isMenuOpen = true -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-4">
                    <router-link :to="{ name: 'SupplierHome' }"
                        :class="{ 'underline ': $route.name === 'SupplierHome' }" class="hover:underline">Trang
                        chủ</router-link>
                    <router-link :to="{ name: 'ContactUs' }" :class="{ 'underline ': $route.name === 'ContactUs' }"
                        class="hover:underline">Liên hệ
                    </router-link>
                    <router-link :to="{ name: 'AboutUs' }" :class="{ 'underline ': $route.name === 'AboutUs' }"
                        class="hover:underline">Giới Thiệu</router-link>
                </nav>
            </div>

            <!-- Mobile Dropdown Navigation -->
            <div id="mobileMenu"
                class="hidden md:hidden bg-blue-700 text-white space-y-2 px-6 py-4 transition-all duration-300">
                <router-link :to="{ name: 'SupplierHome' }" class="block hover:underline">Trang chủ</router-link>
                <router-link :to="{ name: 'ContactUs' }" class="block hover:underline">Liên hệ</router-link>
                <router-link :to="{ name: 'AboutUs' }" class="block hover:underline">Giới Thiệu</router-link>
            </div>
        </header>

        <!-- mobile header  -->
        <nav
            class="fixed inset-x-0 bottom-0 bg-white border-t shadow-lg md:hidden flex justify-around py-3 items-center">
            <router-link :to="{ name: 'SupplierHome' }" :class="{ 'text-blue-600 ': $route.name === 'SupplierHome' }"
                class="flex flex-col items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 6h18" />
                </svg>
                <span class="text-xs">Home</span>
            </router-link>
            <a href="#" class="flex flex-col items-center text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5.121 17.804A6 6 0 1118.878 6.196a6 6 0 01-13.757 0z" />
                </svg>
                <span class="text-xs">Search</span>
            </a>
            <a href="#" class="flex flex-col items-center text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 10l4.553 7.599L9 17M4 6h16m-8 8l-4.553-7.599" />
                </svg>
                <span class="text-xs">Notifications</span>
            </a>
            <a href="#" class="flex flex-col items-center text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 14l2-2-2-2m0 0l-2 2m2-2v8m0 4v-4m0-8V4m0-2v2m0-2V2" />
                </svg>
                <span class="text-xs">Profile</span>
            </a>
        </nav>
    </div>


</template>

<script>
export default {
    name: "HeaderComponent",
    data() {
        return {
            isMenuOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("-translate-x-full");
        },
    },
};
</script>