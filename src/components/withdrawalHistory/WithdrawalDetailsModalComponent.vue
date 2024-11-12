<template>
    <!-- Use ModalBox as the wrapper -->
    <ModalBox :isOpen="isOpen" :closeModal="() => $emit('close')" header="Chi tiết " closeText="Đóng">
        <!-- Modal Content -->
        <template #body>
            <div class=" w-full sm:w-[500px] md:w-[600px] lg:w-[700px]">
                <p class="text-sm text-gray-600 mb-2">
                    <strong>Số tiền:</strong> {{ withdrawal.amount }} VND
                </p>
                <p class="text-sm text-gray-600 mb-2">
                    <strong>Ngày rút:</strong> {{ withdrawal.date }}
                </p>
                <p class="text-sm text-gray-600 mb-4">
                    <strong>Trạng thái:</strong> {{ withdrawal.status }}
                </p>
            </div>
        </template>
    </ModalBox>
</template>

<script>
import ModalBox from '@/components/containers/modal/ModalBox.vue';
export default {
    name: 'WithdrawalDetailsModal',
    components: {
        ModalBox,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        withdrawal: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style scoped>
/* Optional custom styles */
</style>