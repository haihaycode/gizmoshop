<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="bg-white shadow-xl z-50 fixed w-full top-0 left-0 rounded-sm">
    <div class="mx-auto">
      <div
        class="relative max-w-7xl flex items-center mx-auto justify-between h-16"
      >
        <!-- Logo (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden md:flex items-center justify-center flex-shrink-0">
          <p class="text-black font-serif text-2xl ml-1">GizmoShop</p>
        </div>
        <div class="block sm:hidden items-center justify-center flex-shrink-0">
          <p class="text-black font-serif text-2xl ml-1">GizmoShop</p>
        </div>

        <!-- Search input (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden md:flex items-center justify-center w-3/5 px-4">
          <div class="relative w-full">
            <input
              type="text"
              v-model="searchQuery"
              @input="handleSearch"
              placeholder="Tìm kiếm sản phẩm..."
              class="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <!-- Search icon -->
            <span
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
            >
              <i class="bx bx-search"></i>
            </span>
          </div>
        </div>

        <!-- User icon and notification icon (hiển thị trên màn hình từ tablet trở lên) -->
        <div class="hidden sm:flex items-center justify-centergap-4 pr-4">
          <!-- Notification icon -->
          <!-- Notification icon button -->
          <button
            type="button"
            class="relative flex items-center justify-center text-2xl text-black rounded-full border-gray-300 p-2 hover:bg-gray-100"
          >
            <span class="sr-only">View notifications</span>
            <i class="bx bx-bell bx-tada bx-rotate-280"></i>
          </button>

          <!-- User menu icon button -->
          <button
            type="button"
            class="relative flex items-center justify-center text-2xl text-black rounded-full border-gray-300 p-2 hover:bg-gray-100"
            @click="toggleMenu"
          >
            <span class="sr-only">Open user menu</span>
            <i class="bx bx-user"></i>
          </button>
        </div>

        <!-- Mobile menu button (di chuyển sang cuối cùng bên phải) -->
        <div class="absolute right-0 flex items-center sm:hidden">
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="OpenMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="w-full h-16 max-w-7xl block lg:hidden" v-show="isVisible">
        <div class="flex items-center justify-between h-full">
          <!-- Đảm bảo phần tử bao bọc chiếm toàn bộ chiều rộng -->
          <div class="w-full px-4">
            <div class="relative w-full">
              <input
                type="text"
                v-model="searchQuery"
                @input="handleSearch"
                placeholder="Tìm kiếm sản phẩm..."
                class="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <!-- Search icon -->
              <span
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
              >
                <i class="bx bx-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-12 hidden sm:block bg-slate-800 pl-12" v-show="isVisible">
        <div
          class="flex flex-col items-center justify-center sm:items-stretch sm:justify-center mx-auto"
        >
          <div class="hidden sm:ml-6 max-w-7xl justify-center sm:block">
            <div class="flex justify-around">
              <div
                class="relative bg-red-500 h-12 transition-all duration-300 ease-in-out transform scale-105 pl-7"
              >
                <button
                  @click="toggleDropdown"
                  ref="dropdownButton"
                  class="px-4 h-full text-base font-medium text-white bg-transparent hover:text-white hover:bg-red-500 focus:outline-none flex items-center w-full transition-all duration-300 ease-in-out transform scale-105"
                >
                  <i class="bx bx-category mr-2 text-3xl"></i>
                  <span class="hidden lg:inline">Danh mục sản phẩm</span>

                  <i
                    :class="
                      isDropdownOpen
                        ? 'bx bx-chevron-up ml-2 transform rotate-180 transition-all duration-300'
                        : 'bx bx-chevron-down ml-2 transform rotate-0 transition-all duration-300'
                    "
                  ></i>
                </button>

                <transition name="dropdown">
                  <div
                    v-show="isDropdownOpen"
                    class="absolute top-12 left-0 bg-white border border-gray-200 shadow-lg z-10 w-full rounded-b-lg"
                  >
                    <ul class="py-1">
                      <li v-for="category in categories" :key="category.id">
                        <a
                          href="#"
                          class="block px-4 py-2 text-black hover:bg-gray-100 transition-all"
                        >
                          {{ category.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>

              <!-- Các link menu khác -->
              <a
                href="#"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all"
              >
                <i class="bx bx-notepad mr-2"></i>
                <span class="hidden lg:inline">Xây dựng cấu hình</span>
              </a>

              <a
                href="#"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all"
              >
                <i class="bx bx-search-alt mr-2"></i>
                <span class="hidden lg:inline">Tra cứu</span>
              </a>
              <a
                href="#"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all"
              >
                <i class="bx bx-search-alt mr-2"></i>
                <span class="hidden lg:inline">Tra cứu</span>
              </a>

              <a
                href="#"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all"
              >
                <i class="bx bx-cart mr-2"></i>
                <span class="hidden lg:inline">Giỏ hàng</span>
              </a>
              <a
                href="#"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all"
              >
                <i class="bx bx-gift mr-2"></i>
                <span class="hidden lg:inline">Khuyến mãi</span>
              </a>

              <a
                href="#"
                class="rounded-none px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black flex items-center transition-all"
              >
                <i class="bx bx-phone mr-2"></i>
                <span class="hidden lg:inline">Liên hệ</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu" v-if="isMenuOpen">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black"
          >Doanh mục</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black"
          >Ưu đãi</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black"
          >Liên hệ</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black"
          >Tra cứu</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black"
          >Giỏ hàng</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
import { getCategories } from "@/api/categoryApi";

export default {
  data() {
    return {
      categories: [],
      isProfileOpen: false,
      isMenuOpen: false,
      isDropdownOpen: false,
      isVisible: true,
    };
  },
  async mounted() {
    try {
      // Gọi API và lấy danh mục
      const response = await getCategories();
      this.categories = response.data; // Gán đúng phần mảng từ response.data
      console.log(this.categories); // Kiểm tra lại dữ liệu
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
  },
};
</script>

<style scoped>
/* Hiệu ứng chuyển động */
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
