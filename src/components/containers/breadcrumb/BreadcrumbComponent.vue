<template>
    <div class="rounded-sm my-2 bg-gray-100 p-2">
        <ol class="flex space-x-2">
            <li v-for="(item, index) in items" :key="index" class="flex items-center">
                <router-link v-if="item.name" :to="{ name: item.name }" class="text-blue-600 hover:underline">
                    {{ item.text }}
                </router-link>
                <span v-else class="text-gray-500">{{ item.text }}</span>
                <span v-if="index < items.length - 1" class="mx-2">/</span>
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
    }
}
</script>

<style scoped>
/* Styles cho breadcrumb */
nav {
    margin: 16px 0;
}
</style>