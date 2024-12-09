<template>
    <div v-if="isLoading && isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75 backdrop-blur-md">
        <div class="animate-pulse  rounded-lg p-6 max-w-md w-full space-y-6">
            <img class="w-[400px]  mx-auto" :src="require('@/assets/gizmoImageLoading/gizmo.png')" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkeletonLoading',
    props: {
        isOpen: {
            type: Boolean,
            default: true,
        },
        isLoading: {
            type: Boolean,
            default: true,
        },
        titleWidth: {
            type: String,
            default: 'w-3/4',
        },
        textLines: {
            type: Number,
            default: 4,
        },
        circles: {
            type: Number,
            default: 3,
        },
    },
    methods: {
        getTextWidth(index) {
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
