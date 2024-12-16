<template>
    <aside id="sidebar" @click="toggleMenu"
        class="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform -translate-x-full md:translate-x-0 md:static flex flex-col transition-transform duration-300 ease-in-out">
        <div class="px-6 py-4 border-b">
            <h2 class="text-2xl font-semibold text-blue-600">Đối tác Gizmo</h2>
        </div>

        <nav class="flex-1 px-4 py-4 space-y-2">
            <router-link :to="{ name: 'SupplierHome' }" :class="{ 'text-red-500 ': $route.name === 'SupplierHome' }"
                class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span>Tổng quan</span>
            </router-link>
            <div class="group">
                <a href="#"
                    class="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <span>Quản lý đơn hàng</span>
                    <svg class="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
                <div class="hidden group-hover:block ml-4 mt-2 space-y-2">
                    <router-link :to="{ name: 'OrdersSupplier' }"
                        :class="{ 'text-red-500 ': $route.name === 'OrdersSupplier' }"
                        class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                        Quản lý Đơn hàng
                    </router-link>
                    <router-link :to="{ name: 'OrdersPendingSupplier' }"
                        :class="{ 'text-red-500 ': $route.name === 'OrdersPendingSupplier' }"
                        class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                        Tạo Đơn hàng
                    </router-link>
                    <router-link :to="{ name: 'renewalOrder' }"
                        :class="{ 'text-red-500 ': $route.name === 'renewalOrder' }"
                        class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                        Đơn hàng cần gia hạn
                    </router-link>
                </div>
            </div>
            <router-link :to="{ name: 'productSupplier' }"
                :class="{ 'text-red-500 ': $route.name === 'productSupplier' }"
                class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span>Sản phẩm đã cung cấp</span>
            </router-link>
            <router-link :to="{ name: 'walletSupplier' }" :class="{ 'text-red-500 ': $route.name === 'walletSupplier' }"
                class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span>Thông tin và Ví </span>
            </router-link>
            <router-link :to="{ name: 'TransactionsHistory' }"
                :class="{ 'text-red-500 ': $route.name === 'TransactionsHistory' }" class=" flex items-center px-4 py-2 text-gray-600
                hover:bg-gray-100 rounded-lg">
                <span>Lịch sử giao dịch</span>
            </router-link>
            <a href="/" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span>Quay lại cửa hàng</span>
            </a>
        </nav>
    </aside>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "SidebarComponent",
    methods: {
        ...mapActions('auth', ['logout']),
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("-translate-x-full");
        },
    }
};
</script>