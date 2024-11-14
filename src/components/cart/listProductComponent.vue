<template>
  <div class="rounded-md">
    <div class="flex items-center mb-4">
      <button class="text-red-600 font-semibold">Giỏ hàng</button>
    </div>
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" checked />
        <label class="ml-2 text-gray-700">Bỏ chọn tất cả</label>
      </div>
      <button class="text-gray-500 text-sm">Xóa sản phẩm đã chọn</button>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div class="flex items-center">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600 mr-4" checked />
        <img src="https://via.placeholder.com/60" alt="Product Image" class="w-16 h-16 object-cover rounded-lg" />
        <div class="ml-4">
          <p class="text-gray-700 font-medium">Tai nghe Bluetooth True Wireless Baseus Bowie E11-Đen</p>
          <div class="flex items-center mt-1">
            <p class="text-red-500 text-lg font-semibold">270.000đ</p>
            <p class="text-gray-400 text-sm line-through ml-2">690.000đ</p>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <button class="text-gray-500 border rounded-full w-8 h-8 flex items-center justify-center">-</button>
        <input type="text" class="w-10 text-center border border-gray-300 mx-2 rounded-md" value="1" />
        <button class="text-gray-500 border rounded-full w-8 h-8 flex items-center justify-center">+</button>
        <button class="text-gray-500 ml-4">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartComponent",
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
