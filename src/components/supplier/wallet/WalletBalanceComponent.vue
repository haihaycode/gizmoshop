<template>
    <div class="rounded-lg p-6 mb-6">
        <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Ví của bạn</h2>
        </div>
        <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <p class="text-lg font-medium text-gray-700">Số dư hiện tại</p>
            <p class="text-xl font-bold text-blue-600">{{ formatCurrency(walletData.balance) }}</p>
        </div>
        <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <p class="text-lg font-medium text-gray-700">Số dư khóa</p>
            <p class="text-xl font-bold text-red-600">{{ formatCurrency(walletData.frozen_balance) }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">
                <span class="font-medium text-gray-600">Tên nhà cung cấp : </span> {{ walletData.nameSupplier }}
            </p>
            <p class="text-sm text-gray-500">
                <span class="font-medium text-gray-600">Mã số thuế : </span> {{ walletData.tax_code }}
            </p>
            <p class="text-sm text-gray-500 mt-2">
                <span class="font-medium text-gray-600">Mô tả (Ghi chú và note) : </span> {{ walletData.description ||
                    "Không có " }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        walletData: {
            type: Object,
            required: true,
            default: () => ({
                currentBalance: 0,
                frozenBalance: 0,
                taxCode: "",
                description: "",
            }),
        },
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(amount);
        },
    },
};
</script>