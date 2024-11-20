<template>
    <div>
        <ImageViewerComponent :isOpen="viewImageSelected ? true : false" :image="viewImageSelected"
            @close="viewImageSelected = null" />

        <draggable :itemKey="''" v-model="images" :tag="'div'"
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2" @change="updateFileOrder">

            <template v-slot:item="{ element, index }">
                <div class="relative">
                    <div v-if="element.isAddButton" @click="selectImages"
                        class="flex items-center justify-center w-full h-32 md:h-48 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer">
                        <span class="text-3xl font-bold text-gray-400">+</span>
                    </div>
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

        <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*" multiple hidden />

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
            images: [{ isAddButton: true }], // Nút dấu cộng mặc định
            showAlert: false
        };
    },
    props: {
        listImages: {
            type: Array,
            default: () => []
        }
    },
    methods: {

        selectImages() {
            this.$refs.fileInput.click();
        },

        handleFileSelect(event) {
            const files = Array.from(event.target.files);
            const maxImages = 7;
            if (this.images.length - 1 + files.length > maxImages) {
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 3000);
                return;
            }

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = e => {
                    if (this.images.length - 1 < maxImages) {
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

        async convertListImage(files) {
            try {
                this.images = [
                    { isAddButton: true },
                    ...(await Promise.all(
                        files.map(file => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve({
                                file: file,
                                preview: reader.result,
                                isAddButton: false
                            });
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        }))
                    ))
                ];
            } catch (error) {
                //
            }
        },

        updateFileOrder() {
            const filteredImages = this.images.filter(img => !img.isAddButton).map(image => image.file);
            console.log(filteredImages);
            this.$emit('update-images', filteredImages);
        },

        removeImage(index) {
            this.images.splice(index, 1);
            this.$emit('update-images', this.images.filter(img => !img.isAddButton).map(image => image.file));
        },

        viewImage(image) {
            if (image) {
                this.viewImageSelected = image;
            }
        }
    },
    watch: {
        listImages: {
            handler(newImages) {
                this.convertListImage(newImages);
            },
            immediate: true,
            deep: true,
        }
    }
};
</script>