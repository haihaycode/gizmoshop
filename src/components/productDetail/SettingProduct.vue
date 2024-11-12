<template>
  <div class="flex flex-col md:flex-row gap-6 py-6">
    <div class="w-full md:w-8/12 p-6 bg-white shadow-lg border-2 rounded-lg">
      <h2 class="text-xl font-semibold text-gray-800">Mô Tả Sản Phẩm</h2>
      <div class="mt-2 px-5">
        <img
          src="https://via.placeholder.com/600x400"
          alt="Sản phẩm"
          class="w-full h-auto rounded-lg shadow-md mb-2"
        />

        <p class="text-gray-700 text-sm leading-relaxed mb-4">
          Đây là mô tả chi tiết về sản phẩm. Sản phẩm này được thiết kế để mang
          lại trải nghiệm tuyệt vời cho người dùng. Được trang bị các tính năng
          ưu việt, sản phẩm giúp bạn giải quyết các nhu cầu của công việc cũng
          như giải trí.
        </p>

        <p class="text-gray-700 text-sm leading-relaxed mb-4">
          Sản phẩm có thể sử dụng cho nhiều mục đích khác nhau, từ văn phòng đến
          giải trí, mang lại sự tiện ích và hiệu quả trong công việc hàng ngày.
        </p>

        <button @click="toggleDescription" class="text-blue-500 text-sm mt-2">
          {{ isExpanded ? "Thu gọn" : "Xem thêm" }}
        </button>
      </div>
    </div>

    <!-- Cột Cấu Hình Chi Tiết (2 phần) -->
    <div class="w-full md:w-4/12 p-6 border-2 bg-white shadow-lg rounded-lg">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-2 lg:px-2">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Thông tin
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Giá trị
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-gray-100 border-b">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      Model
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      G.Skill Trident Z RGB 16GB
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      Dung lượng
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      16GB (2 x 8GB)
                    </td>
                  </tr>
                  <tr class="bg-gray-100 border-b">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      Tốc độ
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      3200 MHz
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      Loại RAM
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      DDR4
                    </td>
                  </tr>
                  <tr class="bg-gray-100 border-b">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      Đèn RGB
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      Có
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      Điện áp
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      1.35V
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Điều khiển việc mở rộng mô tả sản phẩm
      isExpanded: false,
    };
  },
  methods: {
    // Hàm toggle để mở rộng/thu gọn mô tả sản phẩm
    toggleDescription() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped>
/* Tùy chỉnh để mô tả sản phẩm ngắn gọn và ẩn đi khi không mở rộng */
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Giới hạn 4 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
