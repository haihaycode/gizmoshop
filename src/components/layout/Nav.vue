<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav v-if="isNavOpen" class="bg-white shadow-xl z-30 sticky w-full top-0 left-0 rounded-sm">
    <div class="mx-auto">
      <div class="relative max-w-7xl flex items-center mx-auto justify-between h-auto py-2">
        <!-- Logo (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden md:flex items-center justify-center flex-shrink-0">
          <a href="/" class="text-black font-serif font-bold text-2xl ml-1">Gizmo<span class="text-red-500 underline">
              Shop
            </span>
          </a>
        </div>
        <!-- Logo (hiển thị trên màn hình điện thoại) -->
        <div class="block sm:hidden items-center justify-center flex-shrink-0">
          <a href="/" class="text-black font-serif font-bold text-2xl ml-3">Gizmo<span class="text-red-500 underline">
              Shop
            </span>
          </a>
        </div>

        <!-- Search input (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden md:flex items-center justify-center w-3/5 px-4">
          <div class="relative w-full">
            <input type="text" v-model="searchQuery" @input="handleInput" @keyup.enter="performSearch"
              placeholder="Tìm kiếm sản phẩm..."
              class="w-full px-4 py-2 pr-10 rounded-sm border border-gray-300 shadow-sm focus:outline-none ring-0 ring-red-500 focus:ring-1 focus:ring-red-500" />
            <!-- Search icon -->
            <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-red-500 cursor-pointer"
              @click="performSearch">
              <i class="bx bx-search"></i>
            </span>
          </div>
        </div>

        <!-- User icon and notification icon (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden sm:flex items-center justify-centergap-4 pr-4">
          <button type="button"
            @click="() => { isProfileOpen = false, isNoticationOpen = !isNoticationOpen, handleGetNotificationFromLocalStorage() }"
            :class="isNoticationOpen ? 'text-red-500 bg-gray-100' : 'text-gray-800 bg-white'"
            class="relative flex items-center justify-center text-2xl rounded-full  p-2 hover:bg-gray-200 transition-all duration-300 ease-in-out">
            <span class="sr-only">Notifications</span>
            <i class="bx bx-bell"></i>
            <div
              class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-red-500 -mt-2 -mr-2">
              {{ notifications.length >= 10 ? '10+' : notifications.length }}
            </div>
          </button>
          <button type="button" :class="isProfileOpen ? 'text-red-500 bg-gray-50' : ''"
            class="relative flex items-center justify-center text-2xl text-black rounded-full border-gray-300 p-2 hover:bg-gray-100"
            @click="toggleMenu">
            <span class="sr-only">menu user</span>
            <i class="bx bx-user"></i>
          </button>
        </div>



        <!-- Mobile menu button (di chuyển sang cuối cùng bên phải) -->
        <div class="absolute right-0 flex items-center sm:hidden">
          <button type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu" aria-expanded="false" @click="OpenMenu">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <div class="w-full pb-1 max-w-7xl block md:hidden">
        <div class="flex items-center justify-between h-full">
          <!-- Đảm bảo phần tử bao bọc chiếm toàn bộ chiều rộng -->
          <div class="w-full px-1">
            <div class="relative w-full">
              <input type="text" v-model="searchQuery" @input="handleInput" @keyup.enter="performSearch"
                placeholder="Tìm kiếm sản phẩm..."
                class="w-full px-4 py-2 pr-10 rounded-sm border border-gray-300 shadow-sm focus:outline-none ring-0 ring-red-500 focus:ring-1 focus:ring-red-500" />
              <!-- Search icon -->
              <span @click="performSearch"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
                <i class="bx bx-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-12 hidden sm:block bg-slate-800 pl-12">
        <div class="flex flex-col items-center justify-center sm:items-stretch sm:justify-center mx-auto">
          <div class="hidden sm:ml-6 max-w-7xl justify-center sm:block">
            <div class="flex justify-around">
              <div class="relative bg-red-500 h-12 transition-all duration-300 ease-in-out transform scale-105 pl-7">
                <button @click="toggleDropdown" ref="dropdownButton"
                  class="px-4 h-full text-base font-medium text-white bg-transparent hover:text-white hover:bg-red-500 focus:outline-none flex items-center w-full transition-all duration-300 ease-in-out transform scale-105">
                  <i class="bx bx-category mr-2 text-3xl"></i>
                  <span class="hidden lg:inline">Danh mục sản phẩm</span>

                  <i :class="isDropdownOpen
                    ? 'bx bx-chevron-up ml-2 transform rotate-180 transition-all duration-300'
                    : 'bx bx-chevron-down ml-2 transform rotate-0 transition-all duration-300'
                    "></i>
                </button>

                <transition name="dropdown">
                  <div v-show="isDropdownOpen"
                    class="absolute top-12 left-0 bg-white border border-gray-200 shadow-lg z-10 w-full rounded-b-lg">
                    <ul class="py-1">
                      <li v-for="category in categories" :key="category.id">
                        <div @click="() => { searchByCategory(category.id); isDropdownOpen = false }" href="#"
                          class="block px-4 py-2 text-black hover:bg-gray-100 transition-all cursor-pointer">
                          {{ category.name }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>

              <!-- Các link menu khác -->
              <router-link :to="{ name: 'builder' }"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i class="bx bx-notepad mr-2"></i>
                <span class="hidden lg:inline">Xây dựng cấu hình</span>
              </router-link>

              <p @click="modalSearchOrderIsOpen = !modalSearchOrderIsOpen; isCartModalOpen = false; isProfileOpen = false"
                class="rounded-none cursor-pointer px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i v-if="!modalSearchOrderIsOpen" class="bx bx-search-alt mr-2"></i>
                <i v-else class="bx bx-x mr-2"></i>
                <span class="hidden lg:inline"> {{ !modalSearchOrderIsOpen ? 'Tra cứu đơn hàng' : 'Đóng tra cứu '
                  }}</span>
              </p>

              <router-link :to="{ name: 'product' }"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i class="bx bx-gift mr-2"></i>
                <span class="hidden lg:inline">Sản phẩm</span>
              </router-link>

              <router-link :to="{ name: 'contactUs' }"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i class="bx bx-phone mr-2"></i>
                <span class="hidden lg:inline">Liên hệ</span>
              </router-link>
              <router-link :to="{ name: 'yourCart' }" @click.prevent="toggleCartModal"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i v-if="!isCartModalOpen" class="bx bx-cart mr-2"></i>
                <i v-else class="bx bx-x mr-2"></i>
                <span class="hidden lg:inline">
                  {{ isCartModalOpen ? "Đóng giỏ hàng" : "Giỏ hàng" }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="sm:hidden" id="mobile-menu" v-if="isMenuOpen" @click="isMenuOpen = !isMenuOpen">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <!-- Personal Information Link with Icon -->
        <router-link :to="{ name: 'builder' }"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black flex items-center space-x-3">
          <i class="bx bx-menu"></i> <!-- Personal Information Icon -->
          <span>Xây dựng cấu hình</span>
        </router-link>

        <!-- Offers Link with Icon -->
        <router-link :to="{ name: 'searchOrder' }"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black flex items-center space-x-3">
          <i class="bx bx-search"></i> <!-- Offers Icon -->
          <span>Tra cứu đơn hàng</span>
        </router-link>

        <!-- Contact Link with Icon -->
        <router-link :to="{ name: 'contactUs' }"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black flex items-center space-x-3">
          <i class="bx bx-phone"></i> <!-- Contact Icon -->
          <span>Liên hệ</span>
        </router-link>

        <!-- Track Order Link with Icon -->
        <a href="/forgotpassword"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black flex items-center space-x-3">
          <i class="bx bx-search"></i> <!-- Track Order Icon -->
          <span>Quên mật khẩu</span>
        </a>

        <!-- Cart Link with Icon -->
        <router-link :to="{ name: 'yourCart' }"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black flex items-center space-x-3">
          <i class="bx bx-cart"></i> <!-- Cart Icon -->
          <span>Giỏ hàng</span>
        </router-link>
      </div>

    </div>

    <transition name="fade">
      <div v-if="isCartModalOpen" class="absolute top-28 right-4 bg-white p-4 rounded-sm shadow-lg w-80 z-30">
        <ListProductComponent></ListProductComponent>
      </div>
    </transition>
    <!-- account -->
    <transition name="fade" @click="isProfileOpen = false; isCartModalOpen = false">
      <div v-if="isProfileOpen" class="absolute right-8 bg-gray-50 p-4 rounded-sm shadow-lg w-72 z-30">
        <div class="flex items-center mb-4">
          <div class="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-base font-bold">
            {{ token ? 'Gizmo' : 'Gizmo' }}
          </div>
          <div class="ml-6">
            <template v-if="token">
              <p class="text-sm text-gray-500">{{ name }}</p>
              <p class="font-semibold text-red-500 cursor-pointer" @click="logout">Đăng xuất</p>
            </template>
            <template v-else>
              <router-link to="/signin" class="font-semibold text-red-500 cursor-pointer">Đăng ký</router-link>
              |
              <router-link to="/login" class="font-semibold text-red-500 cursor-pointer">Đăng nhập</router-link>
            </template>
          </div>
        </div>
        <div class="border-t border-gray-200 my-2"></div>
        <ul>
          <router-link :to="{ name: 'profile' }" v-if="token"
            class="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
            <i class="bx bx-user mr-2"></i>
            <span>Thông tin cá nhân</span>
          </router-link>
          <router-link :to="{ name: 'orderHistory' }" v-if="token"
            class="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
            <i class="bx bx-package mr-2"></i>
            <span>Đơn mua</span>
          </router-link>
          <router-link :to="{ name: 'SupplierHome' }" v-if="token && role.includes('ROLE_SUPPLIER')"
            class="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
            <i class="bx bx-universal-access mr-2"></i>
            <span>Trang Đối tác</span>
          </router-link>
          <router-link :to="{ name: 'searchOrder' }"
            class="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
            <i class="bx bx-search-alt mr-2"></i> <!-- Icon bx-search-alt cho mục 'Tra cứu đơn hàng' -->
            <span>Tra cứu </span>
          </router-link>
          <router-link :to="{ name: 'supplierRegister' }" v-if="!role?.includes('ROLE_SUPPLIER')"
            class="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
            <i class="bx bx-clipboard mr-2"></i> <!-- Icon bx-clipboard cho mục 'Đăng ký nhà cung cấp' -->
            <span>Đăng ký nhà cung cấp</span>
          </router-link>
        </ul>
      </div>
    </transition>

    <!-- tra cứu đơ hàng  -->
    <transition name="fade">
      <div v-if="modalSearchOrderIsOpen"
        class="absolute top-30 left-0 right-0 flex items-center bg-gray-50 p-4 rounded-sm shadow-lg w-full z-30 space-x-4">
        <!-- Phone Number Input -->
        <div class="flex-1">
          <label class="text-sm text-gray-600">Số điện thoại</label>
          <input v-model="searchOrderObject.phoneNumber" type="text" placeholder="Nhập số điện thoại"
            class="w-full p-2 mt-1 border rounded-sm focus:outline-none focus:border-red-500" />
        </div>

        <!-- Order Code Input -->
        <div class="flex-1">
          <label class="text-sm text-gray-600">Mã đơn hàng</label>
          <input v-model="searchOrderObject.orderCode" type="text" placeholder="Nhập mã đơn hàng"
            class="w-full p-2 mt-1 border rounded-sm focus:outline-none focus:border-red-500" />
        </div>

        <!-- Search Button -->
        <div class="flex-none">
          <button @click="searchOrder"
            class="mt-5 p-2 bg-red-500 text-white font-semibold rounded-sm hover:bg-red-600 transition-colors whitespace-nowrap">
            Tìm kiếm
          </button>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isNoticationOpen"
        class="absolute top-15  bg-gray-50 p-4 rounded-sm shadow-lg w-full sm:w-full md:w-full z-50">
        <div v-if="notifications.length === 0" class="text-center text-gray-500">
          Không có thông báo
        </div>
        <div v-else>
          <ul>
            <li v-for="(notification, index) in notifications" :key="index"
              class="p-2 border-b flex flex-col sm:flex-row sm:items-center">
              <p class="text-sm text-gray-500 sm:w-1/3 sm:text-left">
                Thời gian: {{ formatDate(notification.timestamp) }}
              </p>
              <p class="font-semibold text-gray-800 sm:w-2/3 sm:text-right">
                {{ notification.note }}
              </p>
              <!-- Icon để xóa thông báo -->
              <button @click="deleteNotificationById(notification.id), handleGetNotificationFromLocalStorage()"
                class="text-gray-500 hover:text-red-500 ml-2 sm:ml-4">
                <i class="bx bx-x text-lg"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </transition>


  </nav>
</template>

<script>
import { getCategories } from "@/api/categoryApi";
import notificationService from "@/services/notificationService";
import { mapGetters, mapActions } from 'vuex';
import ListProductComponent from "../cart/cartNavHomeComponent.vue";
import { deleteNotificationById, getNotifications } from "@/services/notiServiceC";


export default {
  data() {
    return {
      searchOrderObject: {
        phoneNumber: '',
        orderCode: ''
      },
      categories: [],
      isProfileOpen: false,
      isMenuOpen: false,
      isDropdownOpen: false,
      isVisible: true,
      modalSearchOrderIsOpen: false,
      searchQuery: "",
      isCartModalOpen: false,
      isNoticationOpen: false,
      notifications: [],
    };
  },
  components: {
    ListProductComponent,
  },
  async mounted() {
    try {
      const response = await getCategories();
      this.categories = response.data;
      this.handleGetNotificationFromLocalStorage();
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error.message);
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    deleteNotificationById,
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    handleGetNotificationFromLocalStorage() {
      this.notifications = getNotifications();
    },
    searchOrder() {
      if (!this.searchOrderObject.phoneNumber || !this.searchOrderObject.orderCode) {
        notificationService.warning('Vui lòng nhập đầy đủ thông tin.')
        return;
      }
      this.modalSearchOrderIsOpen = !this.modalSearchOrderIsOpen
      this.$router.push({
        name: 'searchOrder',
        params: {
          phoneNumber: this.searchOrderObject.phoneNumber,
          orderCode: this.searchOrderObject.orderCode,
        },
      });
    },
    searchByCategory(id) {
      window.location.href = '/product?idDanhMuc=' + id
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        window.location.href = `/product?keyword=${this.searchQuery.trim()}`;
      }
    },
    toggleCartModal() {
      if (!this.token) {
        notificationService.info('Vui lòng đăng nhập');
        return;
      }
      this.isNoticationOpen = false
      this.isCartModalOpen = !this.isCartModalOpen;
      this.isProfileOpen = false
      this.modalSearchOrderIsOpen = false
    },
    toggleMenu() {
      this.isNoticationOpen = false
      this.isProfileOpen = !this.isProfileOpen;
      this.isCartModalOpen = false
      this.modalSearchOrderIsOpen = false
    },
    OpenMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleScroll() {
      this.isVisible = window.scrollY > 1500;
    },
    ...mapActions('auth', ['logout']),
  },
  computed: {
    ...mapGetters('auth', ['token', 'user', 'name', 'role']),
    ...mapGetters('nav', ['isNavOpen']),
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.5s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
