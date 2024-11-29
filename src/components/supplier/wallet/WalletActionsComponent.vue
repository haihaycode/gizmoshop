<template>
    <div class="flex justify-center space-x-2">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-sm" @click="onDeposit">
            Nạp tiền
        </button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-sm" @click="onWithdraw">
            Rút tiền
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        onDeposit() {
            this.$emit("deposit");
        },
        onWithdraw() {
            this.$emit("withdraw");
        },
    },
};
</script>