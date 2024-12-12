<template>
  <div class="min-h-screen bg-white text-gray-800">
    <!-- Header -->
    <header class="p-6 bg-white shadow-sm sticky top-0 z-10">
      <div class="flex justify-between items-center container mx-auto">
        <div class="text-start">
          <div class="text-3xl font-extrabold text-gray-800 tracking-tight">
            Xây dựng cấu hình
          </div>
          <div class="text-base text-gray-600 mt-2">
            Tạo ra chiếc PC mơ ước của bạn với hiệu năng tối ưu và phong cách độc đáo.
          </div>
        </div>

        <div class="w-1/3 hidden">
          <input v-model="searchQuery" @input="filterComponents" type="text"
            class="w-full p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Tìm kiếm linh kiện..." />
        </div>
      </div>
    </header>

    <div class="container mx-auto flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 mt-6">
      <!-- Sidebar -->
      <div class="w-full lg:w-1/4 bg-gray-50 p-6 rounded-xl shadow-sm">
        <div class="space-y-4">
          <p class="font-mono">Các linh cần thiết để xây dựng 1 bộ pc cho bạn</p>
          <div v-for="(component, key) in components" :key="key">
            <h4 class="text-md font-medium mb-2">{{ component.label }}</h4>
            <button @click="openModal(component.categoryId, key)"
              class="w-full bg-gray-800 text-white py-2 px-4 rounded-sm hover:bg-gray-700 transition">
              Chọn {{ component.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Config Display -->
      <div class="flex-1 space-y-6">
        <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 class="text-lg font-mono mb-2">Cấu hình của bạn</h3>
          <div class="space-y-2">
            <div v-for="(component, key) in components" :key="key"
              class="flex items-center justify-between p-2 rounded-lg"
              :class="{ 'bg-green-100': component.selected.name }">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg">
                  <img v-if="component.selected.image" :src="loadImage(component.selected.image, 'product')"
                    :alt="component.label" class="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <p class="text-md font-medium">{{ component.label }}</p>
                  <p class="text-sm text-gray-500">
                    {{ component.selected.name || "Chưa chọn" }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-500">Số lượng: 1</p>
            </div>
          </div>
          <button @click="finalizeBuild" :disabled="isLoading"
            class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-sm hover:bg-blue-500 transition flex items-center justify-center">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Hoàn tất cấu hình</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-lg max-h-[500px] h-auto flex flex-col overflow-hidden">
        <h3 class="text-lg font-semibold mb-4">Chọn {{ modalLabel }}</h3>
        <div class="space-y-4 flex-1 overflow-auto" v-if="!isLoadingModal">
          <div v-for="item in modalItems" :key="item.id"
            class="flex items-center justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <div class="flex items-center space-x-4">
              <img v-if="item.image" :src="loadImage(item.image, 'product')" alt="" class="w-16 h-16 object-cover" />
              <p class="text-md font-medium">{{ item.name }}</p>
            </div>

            <!-- Hiển thị số lượng còn lại trong kho -->
            <p class="text-sm text-gray-500">
              Số lượng còn lại: {{ item.stockQuantity }}
            </p>

            <button @click="selectComponent(item)"
              class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
              Chọn
            </button>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">Đang tải...</div>

        <button @click="closeModal"
          class="bottom-0 w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition">
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { getProductByCategoryInventory } from "@/api/productApi";
import { loadImage } from "@/services/imageService";
import notificationService from "@/services/notificationService";
import { addProductToCart } from "@/api/CartApi";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters('auth', ['token', 'user', 'name', 'role']),
  },
  data() {
    return {
      isLoading: false,
      searchQuery: "",
      isModalOpen: false,
      isLoadingModal: false,
      modalItems: [],
      modalLabel: "",
      modalKey: "",
      components: [
        { label: "CPU", categoryId: 77, selected: {} },
        { label: "SSD", categoryId: 76, selected: {} },
        { label: "RAM", categoryId: 2, selected: {} },
        { label: "Main", categoryId: 59, selected: {} },
        { label: "PSU", categoryId: 78, selected: {} },
        { label: "Vỏ Case", categoryId: 80, selected: {} },
        { label: "Tản Nhiệt", categoryId: 82, selected: {} },
      ],
    };
  },
  methods: {
    loadImage,
    async addProductToCart(productId, quantity) {
      if (!productId || quantity <= 0) {
        notificationService.error(
          "Thông tin sản phẩm hoặc số lượng không hợp lệ!"
        );
        console.error("Thông tin không hợp lệ:", { productId, quantity });
        return;
      }

      try {
        const response = await addProductToCart(productId, quantity);
        this.$emit("cart-updated", response);
        return response; // Trả về kết quả nếu cần dùng
      } catch (error) {
        notificationService.error(
          "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!"
        );
        throw error; // Ném lỗi nếu cần xử lý thêm ở nơi khác
      }
    },
    async openModal(categoryId, key) {
      try {
        this.isLoadingModal = true;
        this.isModalOpen = true;
        this.modalKey = key;
        this.modalLabel = this.components[key].label;

        const response = await getProductByCategoryInventory(categoryId);
        if (response.data && Array.isArray(response.data.content)) {
          this.modalItems = response.data.content.map((item) => ({
            id: item.id,
            name: item.productName,
            image: item.thumbnail
              ? item.thumbnail
              : "IMG_20241115231421_716.jpg",
            stockQuantity:
              item.productInventoryResponse?.quantity || "Chưa có thông tin", // Đảm bảo lấy thumbnail
          }));
        } else {
          console.error("Dữ liệu không hợp lệ:", response);
          this.modalItems = [];
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        this.modalItems = [];
      } finally {
        this.isLoadingModal = false;
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
    selectComponent(item) {
      this.components[this.modalKey].selected = item;
      this.closeModal();
    },
    async finalizeBuild() {
      if (!this.token) {
        notificationService.info("Vui lòng đăng nhập");
        return;
      }
      const allSelected = this.components.every(
        (component) => component.selected && component.selected.name
      );

      if (allSelected) {
        this.isLoading = true;
        const addPromises = []; // Danh sách các promise để thêm sản phẩm

        for (const component of this.components) {
          if (component.selected.id) {
            const promise = this.addProductToCart(component.selected.id, 1)
              .then(() => {
                console.log(`Đã thêm ${component.selected.name} vào giỏ hàng`);
              })
              .catch((error) => {
                console.error(
                  `Lỗi khi thêm ${component.selected.name}:`,
                  error
                );
              });
            addPromises.push(promise);
          }
        }

        try {
          await Promise.all(addPromises); // Đợi tất cả yêu cầu hoàn tất
          notificationService.success(
            "Tất cả sản phẩm đã được thêm vào giỏ hàng!"
          );
        } catch (error) {
          notificationService.error(
            "Có lỗi xảy ra khi thêm một số sản phẩm vào giỏ hàng!"
          );
        }
      } else {
        notificationService.error("Vui lòng chọn đầy đủ cấu hình!");
      }
    },
  },
};
</script>
<style scoped>
.loader {
  border: 2px solid transparent;
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
