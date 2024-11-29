<template>
    <div>
        <div class="table-container overflow-x-auto">
            <table class="min-w-full border-collapse table-auto">
                <!-- Table Header -->
                <thead>
                    <tr class="bg-[#113254]">
                        <slot name="header"></slot>
                    </tr>
                </thead>

                <!-- Table Body -->
                <tbody class="bg-white">
                    <tr v-if="!items || items.length === 0">
                        <td colspan="100%" class="text-center py-4">Không có dữ liệu</td>
                    </tr>
                    <template v-else>
                        <slot name="body"></slot>
                    </template>
                </tbody>

                <!-- Table Footer -->
                <tfoot v-if="$slots.footer">
                    <tr>
                        <slot name="footer"></slot>
                    </tr>
                </tfoot>
            </table>
            <!-- pagination -->


        </div>

        <div class="bg-white p-2 ">
            <slot name="pagination"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableComponent",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
/*(Chrome, Safari) */
::-webkit-scrollbar {
    width: 8px;
    /* Độ rộng của scrollbar */
    height: 8px;
    /* Chiều cao của scrollbar cho cuộn ngang */
}

::-webkit-scrollbar-thumb {
    background-color: #88888855;
    /* Màu của thanh cuộn */
    border-radius: 2px;
    /* Bo tròn góc thanh cuộn */
}

::-webkit-scrollbar-thumb:hover {
    background-color: #55555593;
    /* Màu khi hover thanh cuộn */
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}
</style>
