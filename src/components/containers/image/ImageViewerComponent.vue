<template>
    <ModalBox v-if="image" :isOpen="image ? true : false" :loading="false" :closeModal="closeModal" :closeText="'Đóng'"
        class="z-30 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold"> Hình ảnh {{ name }} </h3>
        </template>
        <template #body>
            <!-- Optional Loading State -->
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                <svg class="w-10 h-10 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>
            <div class="flex justify-center items-center max-h-[70vh] max-w-[90vw]">
                <img :src="imageUrl" alt="không tải được ảnh" class="object-contain max-h-full max-w-full">
            </div>
        </template>
    </ModalBox>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';

export default {
    components: {
        ModalBox
    },
    props: {
        name: {
            type: String,
            required: false,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            required: false,
        },
    },
    computed: {
        imageUrl() {
            return `${this.image}`;
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    },
};
</script>
