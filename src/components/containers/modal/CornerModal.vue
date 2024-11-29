<template>
    <transition name="fade">
        <div v-if="isOpen" :class="modalContainerClass">
            <div class="relative w-full max-w-xs p-4 bg-white shadow-lg rounded-md transition-transform transform scale-95"
                :class="{ 'scale-100': isOpen, 'opacity-0': !isOpen }">
                <!-- Loading state -->
                <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <svg class="w-10 h-10 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </div>

                <!-- Modal Header -->
                <div class="flex justify-between mb-2">
                    <h3 class="text-lg font-bold">{{ header }}</h3>
                    <button @click="closeModal" class="text-gray-400 hover:text-gray-600 text-2xl">
                        &times;
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="mb-4 max-h-[50vh] overflow-y-auto">
                    <slot name="body">{{ body }}</slot>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-end">
                    <Button v-if="closeText" @click="closeModal" :text="closeText || 'Đóng'"
                        class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Button from '@/components/containers/buttons/button.vue';
export default {
    components: {
        Button
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        header: {
            type: String,
            default: '....Custom',
        },
        body: {
            type: String,
            default: '....',
        },
        loading: {
            type: Boolean,
            default: false,
        },
        closeText: {
            type: String,
            default: null,
        },
        closeModal: {
            type: Function,
        },
        position: {
            type: String,
            default: 'top-right', // Accept values: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
        },
        offset: {
            type: Number,
            default: 10
        }
    },
    computed: {
        modalContainerClass() {
            const positionClasses = {
                'top-left': `fixed top-${this.offset} left-${this.offset}`,
                'top-right': `fixed top-${this.offset} right-${this.offset}`,
                'bottom-left': `fixed bottom-${this.offset} left-${this.offset}`,
                'bottom-right': `fixed bottom-${this.offset} right-${this.offset}`,
            };
            return positionClasses[this.position];
        }
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>
