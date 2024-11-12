<template>
    <div class="max-w-xs md:max-w-sm lg:max-w-md mx-auto">
        <section class=" rounded-lg  overflow-hidden">
            <div class="flex items-center space-x-3 p-4 border-b border-gray-200">
                <img :src="user.image ? loadImage(user.image, 'account') : 'https://via.placeholder.com/40'"
                    alt="User avatar" class="w-10 h-10 rounded-full" />
                <div>
                    <p class="text-gray-700 font-semibold text-sm md:text-base">
                        {{ user.fullname ? user.fullname : 'Người dùng Gizmo' }}
                    </p>
                    <router-link to="/account/profile" class="text-xs text-red-500 hover:underline">
                        Sửa Hồ Sơ
                    </router-link>
                </div>
            </div>

            <ul class="space-y-4 mt-6 px-4">
                <li>
                    <router-link :to="{ name: 'profile' }"
                        class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                        active-class="text-red-500 font-semibold">
                        <i class="bx bx-user text-lg" :class="{ 'bx-burst': $route.name === 'profile' }"></i>
                        <span class="text-sm md:text-base">Hồ Sơ</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'address' }"
                        class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                        active-class="text-red-500 font-semibold">
                        <i class="bx bx-map text-lg" :class="{ 'bx-burst': $route.name === 'address' }"></i>
                        <span class="text-sm md:text-base">Địa Chỉ</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'bank' }"
                        class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                        active-class="text-red-500 font-semibold">
                        <i class="bx bxs-bank text-lg" :class="{ 'bx-burst': $route.name === 'bank' }"></i>
                        <span class="text-sm md:text-base">Ngân Hàng</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'changepassword' }"
                        class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                        active-class="text-red-500 font-semibold">
                        <i class="bx bx-lock text-lg" :class="{ 'bx-burst': $route.name === 'changepassword' }"></i>
                        <span>Đổi mật khẩu</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'withdrawalHistory' }"
                        class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                        active-class="text-red-500 font-semibold">
                        <i class="bx bx-money-withdraw text-lg"
                            :class="{ 'bx-burst': $route.name === 'withdrawalHistory' }"></i>
                        <span>Lịch sử rút tiền</span>
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import { getinfo } from '@/api/auth/meApi';
import { loadImage } from '@/services/imageService';

export default {
    data() {
        return {
            user: {
                fullname: 'Đang tải...',
                image: null
            }
        };
    },
    methods: {
        loadImage,
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        async fetchUserInfo() {
            try {
                const response = await getinfo();
                this.user = {
                    fullname: response.data.fullname,
                    image: response.data.image || 'https://via.placeholder.com/40'
                };
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }
    },
    mounted() {
        this.fetchUserInfo();

        if (window.innerWidth >= 1024) {
            // Desktop view - Navigate to a specific route for desktop
            this.$router.push({ name: 'profile' });
        } else if (window.innerWidth >= 768) {
            // Tablet view - Navigate to a specific route for tablet
            this.$router.push({ name: 'profile' });
        }

    }
};
</script>

<style>
/* Additional styling for responsive layouts */
@media (min-width: 768px) {

    /* Styling for tablets and larger */
    .max-w-xs {
        max-width: 100%;
    }
}

@media (min-width: 1024px) {

    /* Styling for desktops */
    .max-w-xs {
        max-width: 400px;
    }
}
</style>
