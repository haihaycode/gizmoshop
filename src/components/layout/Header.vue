<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="bg-white shadow-xl z-50 fixed w-full top-0 left-0">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
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
        <div class="hidden md:flex items-center justify-center">
          <div class="flex flex-shrink-0 items-center">
            <!-- <img class="h-8 w-auto" :src="logo" alt="My logo" /> -->
            <p class="text-black font-serif text-2xl ml-1">GizmoShop</p>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center sm:items-stretch sm:justify-center mx-auto">
          <div class="flex flex-shrink-0 items-center sm:hidden">
            <!-- <img class="h-8 w-auto" :src="logo" alt="My logo" /> -->
            <p class="text-black font-serif ml-1">GizmoShop</p>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <div class="relative">
                <!-- Nút Danh mục sản phẩm với mũi tên lên/xuống -->
                <button @click="toggleDropdown" ref="dropdownButton"
                  class="px-4 py-2 text-base font-medium text-black bg-gray-100 min-w-[150px] hover:bg-red-500 flex items-center w-full h-full">
                  <i class="bx bx-notepad mr-2"></i>
                  <span class="hidden lg:inline">Danh mục sản phẩm</span>
                  <!-- Biểu tượng mũi tên -->
                  <i :class="isDropdownOpen
                    ? 'bx bx-chevron-up ml-2'
                    : 'bx bx-chevron-down ml-2'
                    "></i>
                </button>

                <transition name="dropdown">
                  <div v-show="isDropdownOpen"
                    class="absolute top-12 left-0 bg-white border border-gray-200 shadow-lg z-10 w-full">
                    <ul class="py-1">
                      <li v-for="category in categories" :key="category.id">
                        <a href="#" class="block px-4 py-2 text-black hover:bg-gray-100">
                          {{ category.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>
              <a href="#"
                class="rounded-md px-2 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black">
                <i class="bx bx-search-alt mr-2"></i>
                <span class="hidden lg:inline">Tra cứu</span>
              </a>
              <form class="flex items-center mx-auto">
                <div class="relative w-full">
                  <input type="text" id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5 focus:outline-none focus:ring-0"
                    placeholder="Tìm kiếm sản phẩm ..." required />
                </div>
              </form>

              <a href="#"
                class="rounded-md px-1.5 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black pr-5">
                <i class="bx bx-notepad mr-2"></i>
                <span class="hidden lg:inline">Xây dựng cấu hình</span>
              </a>
              <a href="#"
                class="rounded-md px-2 py-2 text-base font-medium text-black hover:bg-gray-100 hover:text-black">
                <i class="bx bx-cart mr-2"></i><span class="hidden lg:inline">Giỏ hàng</span>
              </a>
            </div>
          </div>
        </div>
        <div class="hidden sm:block lg:block">
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button"
              class="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <!-- Đổi sang Boxicons và tăng kích thước -->
              <i class="bx bx-bell text-2xl"></i>
            </button>

            <!-- Profile dropdown -->
            <div class="relative ml-5">
              <div>
                <button type="button"
                  class="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button" @click="() => { toggleMenu, isProfileOpen = true }">
                  <i class="bx bx-user text-2xl"></i>
                </button>
              </div>
              <!-- Dropdown menu -->
              <div v-if="isProfileOpen">
                <ModalAccount :isOpen="isProfileOpen" @close="isProfileOpen = false"></ModalAccount>
              </div>
            </div>
          </div>
        </div>
        <div class="block sm:hidden pr-3">
          <!-- Thẻ icon Search chỉ hiển thị ở chế độ điện thoại -->
          <button type="button"
            class="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="sr-only">Search</span>
            <!-- Đổi sang Boxicons và tăng kích thước -->
            <i class="bx bx-search text-2xl"></i>
          </button>
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
      this.isVisible = window.scrollY < window.innerHeight;
    },
  },
};
</script>


<style scoped>
/* Hiệu ứng chuyển động */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.7s ease;
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