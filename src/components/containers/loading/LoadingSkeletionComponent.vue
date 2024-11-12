<template>
    <div v-if="isLoading" class="space-y-6 p-6 w-full  mx-auto  rounded-lg animate-pulse">
        <!-- Title Placeholder -->
        <div :class="`h-8 ${titleWidth} bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md`"></div>

        <!-- Text Placeholder Lines -->
        <div class="space-y-3 mt-4">
            <div v-for="index in textLines" :key="index"
                :class="`h-4 ${getTextWidth(index)} bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md`">
            </div>
        </div>

        <!-- Circular Icons or Avatars Placeholder -->
        <div class="flex space-x-4 mt-4 justify-center">
            <div v-for="index in circles" :key="index"
                class="w-12 h-12 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkeletonLoading',
    props: {
        isLoading: {
            type: Boolean,
            required: false,
            default: true,
        },
        titleWidth: {
            type: String,
            default: 'w-3/4', // Customizable width for the title
        },
        textLines: {
            type: Number,
            default: 4, // Default to 4 lines of text
        },
        circles: {
            type: Number,
            default: 3, // Default to 3 circular placeholders
        },
    },
    methods: {
        getTextWidth(index) {
            // Cycle widths for text lines for a natural look
            const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4'];
            return widths[index % widths.length];
        },
    },
};
</script>

<style scoped>
.animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }
}
</style>
