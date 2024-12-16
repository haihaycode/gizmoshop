<template>
    <div id="app" class="relative mt-[20px]">
        <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" @click="toggleSidebar">
        </div>
        <div class="flex">
            <!-- Sidebar -  -->
            <aside :class="[
                'w-64  p-4 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out  md:mt-0',
                isSidebarOpen ? 'translate-x-0 bg-white z-20' : '-translate-x-full',
                'md:translate-x-0 md:relative'
            ]" id="sidebar">
                <!--  Profile Section -->
                <div class="flex items-center space-x-3 p-4 border-b border-gray-200">
                    <img :src="user.image ? loadImage(user.image, 'account') : 'https://via.placeholder.com/40'"
                        @error="onImageError" alt="User avatar" class="w-10 h-10 object-cover rounded-full" />
                    <div>
                        <p class="text-gray-700 font-semibold">{{ user.fullname ? user.fullname : 'Người dùng Gizmo'
                            }}
                        </p>
                        <router-link to="/account/profile" class="text-xs text-red-500 hover:underline">Sửa Hồ
                            Sơ</router-link>
                    </div>
                </div>

                <!-- Sidebar -->
                <ul class="space-y-4 mt-6">
                    <li>
                        <router-link :to="{ name: 'profile' }"
                            class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                            active-class="text-red-500 font-semibold">
                            <i class="bx bx-user text-lg" :class="{ 'bx-burst': $route.name === 'profile' }"></i>
                            <span>Hồ Sơ</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'favorite' }"
                            class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                            active-class="text-red-500 font-semibold">
                            <i class="bx bx-heart text-lg" :class="{ 'bx-burst': $route.name === 'favorite' }"></i>
                            <span>Yêu thích</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'address' }"
                            class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                            active-class="text-red-500 font-semibold">
                            <i class="bx bx-map text-lg" :class="{ 'bx-burst': $route.name === 'address' }"></i>
                            <span>Địa Chỉ</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'bank' }"
                            class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                            active-class="text-red-500 font-semibold">
                            <i class="bx bxs-credit-card text-lg" :class="{ 'bx-burst': $route.name === 'bank' }"></i>
                            <span>Ngân Hàng</span>
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
                        <router-link :to="{ name: 'orderHistory' }"
                            class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                            active-class="text-red-500 font-semibold">
                            <i class="bx bx-cart text-lg" :class="{ 'bx-burst': $route.name === 'orderHistory' }"></i>
                            <span>Đơn hàng</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'withdrawalHistory' }"
                            class="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition duration-300"
                            active-class="text-red-500 font-semibold">
                            <i class="bx bx-money-withdraw text-lg"
                                :class="{ 'bx-burst': $route.name === 'withdrawalHistory' }"></i>
                            <span>Lịch sử Giao dịch</span>
                        </router-link>
                    </li>



                </ul>
            </aside>

            <!-- Main Content -->
            <main :class="[
                'flex-grow transition-all duration-300 relative z-0  shadow-none bg-white sm:bg-gray-200 sm:bg-opacity-5 sm:rounded-4xl',
                isSidebarOpen ? 'md:ml-64' : 'ml-0'
            ]">
                <!-- breadcrums  -->
                <div class="px-6">
                    <BackComponent></BackComponent>
                </div>

                <!-- loader  -->
                <LoadingSkeletionComponent :isLoading="isLoading" titleWidth="w-3/4" :textLines="4" :circles="2">
                </LoadingSkeletionComponent>

                <!-- thông tin cá nhân  -->
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <router-view @load="fetchUserInfo"></router-view>
                </transition>
                <!-- thông tin cá nhân  -->
            </main>

        </div>
    </div>
</template>

<script>
import { getinfo } from '@/api/auth/meApi';
import { loadImage } from '@/services/imageService';
import LoadingSkeletionComponent from '@/components/containers/loading/LoadingSkeletionComponent.vue';

import { mapGetters } from 'vuex';
import BackComponent from '@/components/containers/breadcrumb/backComponent.vue';

export default {
    name: 'App',
    components: {
        LoadingSkeletionComponent,
        BackComponent
    },
    data() {
        return {
            isSidebarOpen: false,
            user: {
                fullname: 'Đang tải...',
                image: null
            }
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
        ...mapGetters('auth', ['token', 'user', 'name', 'role']),
    },
    methods: {
        loadImage,
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        onImageError(event) {
            event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbE6u36DvNqhRgUJtDR3MQDBcPkC3n83uXw&s';
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
        },
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = "opacity 1s ease";
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = "opacity 1s ease";
            el.style.opacity = 0;
            done();
        }
    },
    mounted() {
        this.fetchUserInfo();
    }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>