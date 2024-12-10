<template>
    <div>
        <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">Cập nhật</h3>
            </template>
            <template #body>
                <div class="flex flex-col items-center gap-6 px-4 md:px-0 ">
                    <!-- Current Image Preview and Image Selection -->
                    <div class="relative flex flex-col items-center">
                        <p class="text-gray-600 mb-3 md:mb-2">Ảnh Đại Diện</p>
                        <div class="relative w-80 h-80 md:w-96 md:h-96">
                            <img :src="newImagePreview ? newImagePreview : loadImage(currentImage, 'account')"
                                alt="Current Image"
                                class="w-full h-full rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300"
                                @click="triggerFileInput" @error="onImageError" />
                            <!-- Camera Icon Overlay -->
                            <div class="absolute bottom-2 right-2 bg-white bg-opacity-75 rounded-full p-1 cursor-pointer hover:bg-opacity-100 transition-opacity duration-300"
                                @click="triggerFileInput">
                                <i class="bx bx-camera text-gray-700 text-xl"></i>
                            </div>
                        </div>
                        <!-- Hidden file input -->
                        <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden" />
                    </div>

                    <!-- Save Button -->
                    <Button :text="'Lưu'" :isLoading="isLoading" @click="saveImage"
                        class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-sm">
                        Lưu
                    </Button>
                </div>
            </template>
        </ModalBox>
    </div>
</template>

<script>
import { loadImage } from '@/services/imageService';
import ModalBox from '../containers/modal/ModalBox.vue';
import { updateMe } from '@/api/auth/meApi';
import { mapGetters } from 'vuex';
import notificationService from '@/services/notificationService';
import Button from '../containers/buttons/button.vue';
export default {
    components: {
        ModalBox,
        Button
    },
    computed: {
        ...mapGetters("loading", ["isLoading"]),
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        currentImage: {
            type: String,
            required: true
        },
        account: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            newImagePreview: null, // Base64 encoded preview of the new image
            newImageFile: null, // Original file of the new image for saving
            isLoading: false
        };
    },
    methods: {
        onImageError(event) {
            event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbE6u36DvNqhRgUJtDR3MQDBcPkC3n83uXw&s';
        },
        loadImage,
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.newImageFile = file; // Store the original file for saving

                // Generate a base64 preview of the image
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newImagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async saveImage() {
            if (this.newImageFile) {
                this.$emit('update-image', this.newImageFile);
                await this.handleUpdateImage();
            }
        },
        closeModal() {
            this.$emit('close');
            this.newImagePreview = null;
            this.newImageFile = null;
        },
        async handleUpdateImage() {
            try {
                const formData = new FormData();
                if (this.newImageFile) {
                    formData.append('file', this.newImageFile);
                }
                const birthday = `${this.account.year}-${String(this.account.month).padStart(2, '0')}-${String(this.account.day).padStart(2, '0')}`;
                const accountRequest = {
                    fullname: this.account.fullname,
                    sdt: this.account.phone,
                    birthday: birthday,
                    extraInfo: this.account.extraInfo
                };
                formData.append('accountRequest', new Blob([JSON.stringify(accountRequest)], { type: 'application/json' }));
                const response = await updateMe(formData);
                this.$emit('update-success');
                notificationService.success(response.data.message)
                this.closeModal();
            } catch (error) {
                console.error(error);
            }

        }
    }
};
</script>

<style scoped>
/* Add custom styling if needed */
</style>
