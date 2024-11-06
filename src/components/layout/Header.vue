<template>
    <div>
        <div class="py-2 px-6 bg-[#113254] flex items-center shadow-lg shadow-black/5 sticky top-0 left-0 z-30">
            <button @click="toggleLeftMenu" type="button"
                class="text-lg text-white font-semibold sidebar-toggle block md:hidden ">
                <i class='bx bx-menu'></i>
            </button>
            <ul class="ml-auto flex items-center">
                <!-- tìm kiếm  -->
                <li class="mr-1 ">
                    <button type="button"
                        class="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            class="hover:bg-gray-100 hover:bg-opacity-5 rounded-full" viewBox="0 0 24 24"
                            style="fill: white;">
                            <path
                                d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z">
                            </path>
                        </svg>
                    </button>

                </li>
                <!-- thông báo -->
                <li class="mr-1">
                    <button type="button"
                        class="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            class="hover:bg-gray-100 hover:bg-opacity-15 rounded-full" viewBox="0 0 24 24"
                            style="fill: white;">
                            <path
                                d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z">
                            </path>
                        </svg>
                    </button>
                </li>
                <!-- thông tin cá nhân  -->
                <li class=" ml-3">
                    <button @click="modalInfoIsOpen = !modalInfoIsOpen" type="button" class=" flex items-center">
                        <div class="flex-shrink-0 w-10 h-10 relative">
                            <div class="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                <img class="w-8 h-8 rounded-full" :src="require('@/assets/image/Gizmo.png')" alt="" />
                                <div
                                    class="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping">
                                </div>
                                <div
                                    class="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full">
                                </div>
                            </div>
                        </div>
                        <div class="p-2 md:block text-left">
                            <h2 class=" font-semibold text-white text-xs">Xin chào, {{ name }}
                            </h2>
                            <p class="text-xs text-white opacity-45">Nhân viên quản lý</p>
                        </div>
                    </button>
                    <CornerModal :closeModal="() => (modalInfoIsOpen = !modalInfoIsOpen)" :isOpen="modalInfoIsOpen"
                        :offset="10" :position="'top-right'" :header="'Thông tin cá nhân'">
                        <template #body>
                            <div>
                                <div class="p-4">
                                    <div class="mb-4 flex flex-col items-center justify-center">
                                        <!-- Change to flex-col for vertical stacking -->
                                        <div class="flex-shrink-0">
                                            <img class="w-16 h-16 rounded-full" :src="loadImage(user.image, 'account')"
                                                alt="User Avatar" />
                                        </div>
                                        <div class="text-center mt-2"> <!-- Added mt-2 for some spacing -->
                                            <h3 class="font-bold text-lg">{{ user.fullname }}</h3>
                                            <p class="text-sm text-gray-600">{{ user.email }}</p>
                                        </div>
                                    </div>
                                    <div class="mb-4">
                                        <h4 class="font-semibold">THÔNG TIN CÁ NHÂN</h4>
                                        <p><strong>Điện thoại :</strong> {{ user.sdt }}</p>
                                        <p><strong>Ngày sinh:</strong> {{ formatBirthDay(user.birthday) }}</p>
                                        <p><strong>Tiểu sử :</strong> {{ user.extraInfo }}</p>
                                    </div>
                                    <div class="mb-4">
                                        <h4 class="font-semibold">QUYỀN HẠN</h4>
                                        <p class="text-gray-700">
                                            <span v-for="(role, index) in translatedRoles" :key="index"
                                                :style="{ color: role.color }" class="inline">
                                                {{ role.name }}<span v-if="index < translatedRoles.length - 1">, </span>
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold mb-4">THÔNG TIN KHÁC</h4>
                                        <div class="grid grid-cols-1 sm:grid-cols-1 gap-2"> <!-- Using grid layout -->
                                            <router-link :to="{ name: 'info' }"
                                                @click="modalInfoIsOpen = !modalInfoIsOpen"
                                                class="px-4 text-center py-2 border border-blue-600 text-blue-600 rounded-sm hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
                                                Quản lý thông tin
                                            </router-link>
                                            <button @click="logout"
                                                class="px-4 py-2 border border-red-600 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition duration-300 ease-in-out">
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CornerModal>
                </li>
            </ul>
        </div>
    </div>
    <!-- modal thông tin cá nhân -->

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getinfo } from '@/api/auth/meApi';
import CornerModal from '@/components/containers/modal/CornerModal.vue';
import { loadImage } from '@/services/imageService';
import { formatBirthDay, translatedRoles } from '@/utils/currencyUtils';

export default {
    name: 'HeaderComponent',
    data() {
        return {
            modalInfoIsOpen: false,
            user: {}

        }
    },
    components: {
        CornerModal,
    },
    mounted() {
        this.handleGetInfoAccount();
    },
    computed: {
        translatedRoles() {
            return translatedRoles(this.user.roles || []); // Call the function with the provided roles
        },
        ...mapGetters('auth', ['name'])
    },
    methods: {
        formatBirthDay,
        loadImage,
        ...mapActions('leftMenu', ['toggleLeftMenu']),
        ...mapActions('auth', ['logout']),
        async handleGetInfoAccount() {
            try {
                this.user = await getinfo().then(res => res.data);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style scoped></style>