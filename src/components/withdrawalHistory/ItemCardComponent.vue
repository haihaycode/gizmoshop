<template>
    <div @click="$emit('click')"
        class="p-6 border rounded-sm shadow-md cursor-pointer hover:shadow-sm hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-101">
        <div class="flex items-center justify-between mb-3">
            <h3 v-if="withdrawal && withdrawal.amount" class="text-xl font-semibold text-gray-800"> {{
                formatCurrencyVN(withdrawal.amount) }}
            </h3>
            <span class="text-sm text-gray-500">{{ formatDay(withdrawal.withdrawalDate) }}</span>
        </div>
        <p class="text-sm text-gray-600">
            Trạng thái : <span :class="statusClass">{{ getShortStatus(withdrawal && withdrawal.status) }}</span>
        </p>
    </div>
</template>

<script>
import { formatCurrencyVN, formatDay } from '@/utils/currencyUtils';

export default {
    name: 'ItemCardComponent',
    props: {
        withdrawal: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    },
    computed: {

        statusClass() {
            switch (this.withdrawal && this.withdrawal.status) {
                case 'PENDING':
                    return 'text-yellow-600 font-semibold';
                case 'COMPETED':
                    return 'text-green-600 font-semibold';
                case 'CANCEL':
                    return 'text-red-600 font-semibold';
                default:
                    return 'text-gray-600 font-semibold';
            }
        },
    },
    methods: {
        formatCurrencyVN,
        formatDay,
        getShortStatus(status) {
            switch (status) {
                case 'PENDING':
                    return 'Đang xét duyệt.';
                case 'COMPETED':
                    return 'Xét duyệt thành công.';
                case 'CANCEL':
                    return 'Từ chối.';
                default:
                    return 'Không xác định';
            }
        },
    },
};
</script>
