<template>
    <div class="rounded-sm my-2">
        <!-- Back Link -->
        <div v-if="items.length > 1" class="mb-2">
            <router-link :to="{ name: items[0].name }"
                class="text-sm text-gray-700 hover:text-red-500 flex items-center">
                <i class="bx bx-arrow-back mr-1"></i> Quay lại
            </router-link>
        </div>

        <!-- Breadcrumb Items -->
        <ol :class="['flex space-x-2', alignmentClass]">
            <li v-for="(item, index) in items" :key="index" class="flex items-center text-sm">
                <!-- Breadcrumb Link -->
                <router-link v-if="item.name" :to="{ name: item.name }" class="text-red-500 hover:underline">
                    {{ item.text }}
                </router-link>
                <span v-else class="text-gray-500">{{ item.text }}</span>

                <!-- Arrow Separator -->
                <span v-if="index < items.length - 1" class="mx-2 text-gray-400"> &gt; </span>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name: 'BreadcrumbComponent',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isMobile: window.innerWidth < 768
        };
    },
    computed: {
        alignmentClass() {
            return this.isMobile ? 'justify-center' : 'justify-start';
        }
    },
    mounted() {
        window.addEventListener('resize', this.updateAlignment);
    },
    methods: {
        updateAlignment() {
            this.isMobile = window.innerWidth < 768;
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateAlignment);
    }
};
</script>

<style scoped>
/* Custom styling for the breadcrumb */
.text-sm {
    font-size: 0.875rem;
}

.bx-arrow-back {
    font-size: 1rem;
}
</style>