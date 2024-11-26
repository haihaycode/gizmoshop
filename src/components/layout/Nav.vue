<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="bg-white shadow-xl z-50 fixed w-full top-0 left-0 rounded-sm">
    <div class="mx-auto">
      <div class="relative max-w-7xl flex items-center mx-auto justify-between h-16">
        <!-- Logo (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden md:flex items-center justify-center flex-shrink-0">
          <a href="/" class="text-black font-serif text-2xl ml-1">GizmoShop</a>
        </div>
        <div class="block sm:hidden items-center justify-center flex-shrink-0">
          <a href="/" class="text-black font-serif text-2xl ml-1">GizmoShop</a>
        </div>

        <!-- Search input (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden md:flex items-center justify-center w-3/5 px-4">
          <div class="relative w-full">
            <input type="text" v-model="searchQuery" @input="handleInput" @keyup.enter="performSearch"
              placeholder="Tìm kiếm sản phẩm..."
              class="w-full px-4 py-2 pr-10 rounded-sm border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <!-- Search icon -->
            <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-red-500 cursor-pointer"
              @click="performSearch">
              <i class="bx bx-search"></i>
            </span>
          </div>
        </div>

        <!-- User icon and notification icon (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden sm:flex items-center justify-centergap-4 pr-4">
          <!-- Notification icon -->
          <!-- Notification icon button -->
          <button type="button"
            class="relative flex items-center justify-center text-2xl text-black rounded-full border-gray-300 p-2 hover:bg-gray-100">
            <span class="sr-only">View notifications</span>
            <i class="bx bx-bell bx-tada bx-rotate-280"></i>
          </button>

          <!-- User menu icon button -->
          <button type="button"
            class="relative flex items-center justify-center text-2xl text-black rounded-full border-gray-300 p-2 hover:bg-gray-100"
            @click="toggleMenu">
            <span class="sr-only">Open user menu</span>
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

      <div class="w-full h-16 max-w-7xl block lg:hidden" v-show="isVisible">
        <div class="flex items-center justify-between h-full">
          <!-- Đảm bảo phần tử bao bọc chiếm toàn bộ chiều rộng -->
          <div class="w-full px-4">
            <div class="relative w-full">
              <input type="text" v-model="searchQuery" @input="handleInput" @keyup.enter="performSearch"
                placeholder="Tìm kiếm sản phẩm..."
                class="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <!-- Search icon -->
              <span @click="performSearch"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
                <i class="bx bx-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-12 hidden sm:block bg-slate-800 pl-12" v-show="isVisible">
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
                        <div
                          @click="() => { this.$router.push({ name: 'product', query: { idDanhMuc: category.id } }); }"
                          href="#" class="block px-4 py-2 text-black hover:bg-gray-100 transition-all cursor-pointer">
                          {{ category.name }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>

              <!-- Các link menu khác -->
              <a href="/builder"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i class="bx bx-notepad mr-2"></i>
                <span class="hidden lg:inline">Xây dựng cấu hình</span>
              </a>

              <a href="#" @click="modalSearchOrderIsOpen = !modalSearchOrderIsOpen"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i class="bx bx-search-alt mr-2"></i>
                <span class="hidden lg:inline">Tra cứu đơn hàng</span>
              </a>

              <a href="#"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i class="bx bx-gift mr-2"></i>
                <span class="hidden lg:inline">Khuyến mãi</span>
              </a>

              <a href="#"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i class="bx bx-phone mr-2"></i>
                <span class="hidden lg:inline">Liên hệ</span>
              </a>
              <a href="#" @click.prevent="toggleCartModal"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all">
                <i v-if="!isCartModalOpen" class="bx bx-cart mr-2"></i>
                <i v-else class="bx bx-x mr-2"></i>
                <!-- Thay đổi icon khi mở -->
                <span class="hidden lg:inline">
                  {{ isCartModalOpen ? "Đóng giỏ hàng" : "Giỏ hàng" }}
                  <!-- Thay đổi text -->
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu" v-if="isMenuOpen">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black">Doanh
          mục</a>
        <a href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black">Ưu
          đãi</a>
        <a href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black">Liên
          hệ</a>
        <a href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black">Tra
          cứu</a>
        <a href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black">Giỏ
          hàng</a>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isCartModalOpen" v-show="isVisible"
        class="absolute top-28 right-4 bg-white p-4 rounded-sm shadow-lg w-80 z-50">
        <ListProductComponent></ListProductComponent>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isProfileOpen" class="absolute top-20 right-8 bg-gray-50 p-4 rounded-sm shadow-lg w-72 z-50">
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
            <i class="bx bx-package mr-2"></i> <!-- Icon bx-package cho mục 'Trang Đối tác' -->
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


  </nav>




</template>

<script>
import { getCategories } from "@/api/categoryApi";
import notificationService from "@/services/notificationService";
import { mapGetters, mapActions } from 'vuex';
import ListProductComponent from "../cart/cartNavHomeComponent.vue";


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
    };
  },
  components: {
    ListProductComponent, // Khai báo component
  },
  async mounted() {
    try {
      const response = await getCategories();
      this.categories = response.data;
      console.log(this.categories);
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
    searchOrder() {
      if (!this.searchOrderObject.phoneNumber || !this.searchOrderObject.orderCode) {
        notificationService.warning('Vui lòng nhập đầy đủ thông tin.')
        return;
      }
      this.$router.push({
        name: 'searchOrder',
        params: {
          phoneNumber: this.searchOrderObject.phoneNumber,
          orderCode: this.searchOrderObject.orderCode,
        },
      });
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        // Navigate to the product route with the query parameter
        this.$router.push({ name: 'product', query: { keyword: this.searchQuery.trim() } });
      }
    },
    toggleCartModal() {
      this.isCartModalOpen = !this.isCartModalOpen;
    },
    toggleMenu() {
      this.isProfileOpen = !this.isProfileOpen;
    },
    OpenMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleScroll() {
      this.isVisible = window.scrollY < window.innerHeight / 2;
    },
    ...mapActions('auth', ['logout']),
  },
  computed: {
    ...mapGetters('auth', ['token', 'user', 'name', 'role']),
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
