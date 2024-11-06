<template>
    <div>
        <ImageViewerComponent :isOpen="viewImageSelected ? true : false" :image="viewImageSelected"
            @close="viewImageSelected = null" />

        <!-- Sử dụng draggable để sắp xếp hình ảnh -->
        <draggable v-model="images" :tag="'div'" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
            @change="updateFileOrder">
            <!-- Thẻ hình ảnh -->
            <template v-slot:item="{ element, index }">
                <div class="relative">
                    <!-- Hiển thị dấu + khi element là add-button -->
                    <div v-if="element.isAddButton" @click="selectImages"
                        class="flex items-center justify-center w-full h-32 md:h-48 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer">
                        <span class="text-3xl font-bold text-gray-400">+</span>
                    </div>

                    <!-- Hiển thị hình ảnh khi element không phải là add-button -->
                    <div v-else class="relative">
                        <img :src="element.preview" @click="viewImage(element.preview)"
                            class="w-full border border-gray-300 h-32 md:h-48 object-cover rounded-lg shadow-md" />
                        <span @click="removeImage(index)"
                            class="absolute top-1 right-1 bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                            X
                        </span>
                    </div>
                </div>
            </template>
        </draggable>

        <!-- Input chọn file (ẩn) -->
        <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*" multiple hidden />

        <!-- Thông báo (hiển thị khi vượt quá số lượng cho phép) -->
        <div v-if="showAlert" class="col-span-3 p-2 bg-red-100 text-red-700 rounded-md text-center">
            Bạn chỉ có thể chọn tối đa 7 hình ảnh.
        </div>
    </div>
</template>

<script>
import ImageViewerComponent from './ImageViewerComponent.vue';
import draggable from 'vuedraggable';

export default {
    components: {
        ImageViewerComponent,
        draggable
    },
    data() {
        return {
            viewImageSelected: '',
            images: [
                { isAddButton: true } // Dấu cộng nằm trong danh sách ảnh
            ],
            showAlert: false
        };
    },
    methods: {
        // Mở hộp thoại chọn file
        selectImages() {
            this.$refs.fileInput.click();
        },

        // Xử lý khi chọn file
        handleFileSelect(event) {
            const files = Array.from(event.target.files);
            const maxImages = 7;

            // Kiểm tra nếu thêm các file này sẽ vượt quá giới hạn
            if (this.images.length - 1 + files.length > maxImages) { // Trừ phần tử add-button
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 3000);
                return;
            }

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = e => {
                    if (this.images.length - 1 < maxImages) { // Trừ phần tử add-button
                        this.images.splice(this.images.length - 1, 0, {
                            file: file,
                            preview: e.target.result
                        });
                        this.$emit('update-images', this.images.filter(img => !img.isAddButton).map(image => image.file));
                    }
                };
                reader.readAsDataURL(file);
            });

            this.$refs.fileInput.value = "";
        },

        // Cập nhật thứ tự danh sách file khi thứ tự thay đổi
        updateFileOrder() {
            // Lọc bỏ add-button và emit thứ tự file mới
            this.$emit('update-images', this.images.filter(img => !img.isAddButton).map(image => image.file));
        },

        // Xóa một hình ảnh khỏi mảng hình ảnh
        removeImage(index) {
            this.images.splice(index, 1);
            this.$emit('update-images', this.images.filter(img => !img.isAddButton).map(image => image.file));
        },

        // Xem hình ảnh
        viewImage(image) {
            this.viewImageSelected = image;
        }
    }
};
</script>

<style scoped>
/* CSS tùy chọn cho component */
</style>
