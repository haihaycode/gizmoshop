<template>
    <div class=" rounded-lg p-6 mb-6">
        <!-- Section Header -->
        <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Ví của bạn</h2>
        </div>

        <!-- Current Balance -->
        <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <p class="text-lg font-medium text-gray-700">Số dư hiện tại</p>
            <p class="text-xl font-bold text-blue-600">{{ formatCurrency(walletData.balance) }}</p>
        </div>

        <!-- Frozen Balance -->
        <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <p class="text-lg font-medium text-gray-700">Số dư khóa</p>
            <p class="text-xl font-bold text-red-600">{{ formatCurrency(walletData.frozen_balance) }}</p>
        </div>

        <!-- Additional Details -->
        <div>
            <p class="text-sm text-gray-500">
                <span class="font-medium text-gray-600">Đối tác : </span> {{ walletData.nameSupplier }}
            </p>
            <p class="text-sm text-gray-500">
                <span class="font-medium text-gray-600">Mã số thuế : </span> {{ walletData.tax_code }}
            </p>
            <p class="text-sm text-gray-500 mt-2">
                <span class="font-medium text-gray-600">Mô tả : </span> {{ walletData.description || "Không có " }}
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

<style>
/* Add any additional styles here if needed */
</style>