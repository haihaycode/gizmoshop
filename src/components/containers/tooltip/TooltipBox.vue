<template>
    <div v-if="isVisible" class="absolute p-2 text-sm rounded shadow-lg z-50"
         :class="bgColor + ' ' + textColor"
         :style="{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }">
        <div class="font-bold mb-1">
            <slot name="header">{{ title }}</slot>
        </div>
        <div class="mb-1" v-html="content"></div> <!-- Sử dụng v-html để hiển thị HTML -->
        <div class="text-gray-400">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TooltipBox',
    data() {
        return {
            tooltipPosition: { x: 0, y: 0 },
            isVisible: false,
            title: '',   // Khai báo title trong data
            content: '', // Khai báo content trong data
        };
    },
    props: {
        bgColor: {
            type: String,
            default: 'bg-gray-800'
        },
        textColor: {
            type: String,
            default: 'text-white'
        }
    },
    methods: {
        setTooltipPosition(event) {
            const tooltipWidth = 200;

            let tooltipX = event.clientX;
            let tooltipY = event.clientY;

            if (window.innerWidth >= 768) {
                tooltipX = event.clientX - tooltipWidth;
            }

            this.tooltipPosition.x = tooltipX;
            this.tooltipPosition.y = tooltipY;
            this.isVisible = true;
        },
        hideTooltip() {
            this.isVisible = false;
        },
        updateTooltipData(title, content) {
            this.title = title;      // Cập nhật title
            this.content = content;  // Cập nhật content
        }
    }
};
</script>

<style scoped></style>
