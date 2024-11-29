<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="w-full bg-white border-t border-gray-300 shadow-md mt-4">
    <div class="mx-auto max-w-7xl">
      <!--Grid-->
      <div
        class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-8 py-4 max-w-xs mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-full"
      >
     <div class="col-span-full lg:col-span-2 lg:mb-0">
  <a href="#" class="flex justify-center lg:justify-start">
    <!-- Có thể thêm logo hoặc hình ảnh tại đây -->
  </a>
  <p class="py-8 text-sm text-gray-400 lg:max-w-xs text-center lg:text-left">
    Với chúng tôi công nghệ là tất cả, những gì mới nhất, tốt nhất, hiện đại nhất sẽ đến tay bạn.
  </p>
  <ul class="flex flex-wrap justify-center lg:justify-start items-center gap-4 py-4">
    <li
      v-for="item in menuItems.slice(0, 12)"
      :key="item.id"
      class="group flex flex-col justify-center items-center text-gray-300 hover:text-gray-200 transition-all"
    >
      <img
        :src="item.image"
        alt="icon"
        class="w-8 h-8 mb-1 transition-transform duration-300"
      />
      <span class="text-xs">
        {{ item.name }}
      </span>
    </li>
  </ul>
</div>

        <!--End Col-->
        <div class="hidden lg:block lg:mx-auto text-center sm:text-left">
          <h4 class="text-lg text-gray-900 font-medium mb-7">GizmoShop</h4>
          <ul class="text-sm transition-all duration-500">
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Trang chủ</a
              >
            </li>
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Thông tin</a
              >
            </li>
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Bài viết</a
              >
            </li>
            <li>
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Thông tin</a
              >
            </li>
          </ul>
        </div>
        <!--End Col-->
        <div class="lg:mx-auto text-center sm:text-left hidden lg:block">
          <h4 class="text-lg text-gray-900 font-medium mb-7">Sản phẩm</h4>
          <ul class="text-sm transition-all duration-500">
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Hệ thống UI Figma</a
              >
            </li>
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Biểu tượng & Tài nguyên</a
              >
            </li>
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Khối đáp ứng</a
              >
            </li>
            <li>
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Thư viện thành phần</a
              >
            </li>
          </ul>
        </div>

        <!--End Col-->
        <div class="lg:mx-auto text-center sm:text-left hidden lg:block">
          <h4 class="text-lg text-gray-900 font-medium mb-7">Tài nguyên</h4>
          <ul class="text-sm transition-all duration-500">
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Câu hỏi thường gặp (FAQs)</a
              >
            </li>
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Hướng dẫn nhanh</a
              >
            </li>
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Tài liệu hướng dẫn</a
              >
            </li>
            <li>
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Hướng dẫn sử dụng</a
              >
            </li>
          </ul>
        </div>

        <!--End Col-->
        <div class="lg:mx-auto text-center sm:text-left hidden lg:block">
          <h4 class="text-lg text-gray-900 font-medium mb-7">Blog</h4>
          <ul class="text-sm transition-all duration-500">
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Tin tức</a
              >
            </li>
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Mẹo & Thủ thuật</a
              >
            </li>
            <li class="mb-6">
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Cập nhật mới</a
              >
            </li>
            <li>
              <a href="javascript:;" class="text-gray-600 hover:text-gray-900"
                >Sự kiện</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!--Grid-->
      <div class="py-7 border-t border-gray-200">
        <div
          class="flex items-center justify-center flex-col lg:justify-between lg:flex-row"
        >
          <span class="text-sm text-gray-500">
            ©<a href="#">GizmoShop</a> 2024, Bảo lưu mọi quyền.
          </span>
          <ul class="flex items-center gap-9 mt-4 lg:mt-0">
            <li>
              <a href="javascript:;" class="text-sm text-gray-500"
                >Điều khoản</a
              >
            </li>
            <li>
              <a href="javascript:;" class="text-sm text-gray-500"
                >Quyền riêng tư</a
              >
            </li>
            <li>
              <a href="javascript:;" class="text-sm text-gray-500">Cookies</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { getBrand } from "@/api/brandApi";
export default {
  computed: {
    dynamicHeightClass() {
      const itemCount = Math.min(this.menuItems.length, 10);
      return `h-[${itemCount * 48}px]`;
    },
  },
  data() {
    return {
      menuItems: [],
    };
  },
  mounted() {
    this.handleFetchBrand();
  },
  methods: {
    async handleFetchBrand() {
      try {
        const response = await getBrand();
        this.menuItems = response.data.content.map((item) => ({
          ...item,
          thumbnail:
            item.thumbnail ||
            "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg",
        }));
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
