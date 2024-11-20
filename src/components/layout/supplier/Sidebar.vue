<template>
    <aside id="sidebar"
        class="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform -translate-x-full md:translate-x-0 md:static flex flex-col transition-transform duration-300 ease-in-out">
        <div class="px-6 py-4 border-b">
            <h2 class="text-2xl font-semibold text-blue-600">Đối tác Gizmo</h2>
        </div>
        <nav class="flex-1 px-4 py-4 space-y-2">
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
                    <a href="#" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                        Đơn hàng đã gửi
                    </a>
                    <router-link :to="{ name: 'OrdersPendingSupplier' }"
                        :class="{ 'text-red-500 ': $route.name === 'OrdersPendingSupplier' }"
                        class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                        Đơn hàng chưa gửi
                    </router-link>
                </div>
            </div>
            <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span>Sản phẩm đã cung cấp</span>
            </a>
            <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span>Quản lý ví</span>
            </a>
            <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <span>Quay lại cửa hàng</span>
            </a>
            <a href="#" class="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                <span>Logout</span>
            </a>
        </nav>
    </aside>
</template>

<script>
export default {
    name: "SidebarComponent",
};
</script>