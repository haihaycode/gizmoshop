<template>
  <div class="flex flex-col md:flex-row gap-6 py-6">
    <!-- Product Description Column -->
    <div class="w-full md:w-8/12 p-6 bg-white rounded-lg">
      <div class="flex items-center mb-4">
        <div class="w-3 h-10 bg-orange-600 mr-2"></div>
        <p class="text-xl font-bold text-gray-800">Mô tả chi tiết</p>
      </div>
      <div :class="{ 'truncate-text ': !isExpanded }">
        <p v-html="product?.productLongDescription"></p>
      </div>
      <button @click="toggleDescription" class="text-red-500 mt-2">
        {{ isExpanded ? "Thu gọn ..." : "Xem thêm ..." }}
      </button>
    </div>

    <!-- Detailed Configuration Column (Two Sections) -->
    <div class="w-full md:w-4/12 p-2">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-2 lg:px-2">
            <div class="flex items-center mb-4">
              <div class="w-3 h-10 bg-orange-600 mr-2"></div>
              <p class="text-xl font-bold text-gray-800">Thông tin kỹ thuật</p>
            </div>
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody>
                  <tr v-for="(value, key) in parsedProductDetails" :key="key"
                    :class="{ 'bg-gray-100': key % 2 === 0, 'bg-white': key % 2 !== 0 }"
                    class="border-b border-gray-200">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      {{ key }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ value }}
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
  props: {
    product: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    parsedProductDetails() {
      const description = this.product?.productShortDescription || "";
      const jsonStart = description.indexOf("[[[");
      const jsonEnd = description.indexOf("]]]", jsonStart);

      if (jsonStart !== -1 && jsonEnd !== -1) {
        try {
          const jsonString = description.slice(jsonStart + 3, jsonEnd);
          return JSON.parse(jsonString);
        } catch (e) {
          console.error("Failed to parse product details JSON:", e);
        }
      }
      return {};
    },
  },
  methods: {
    toggleDescription() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  /* Limit to 4 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
