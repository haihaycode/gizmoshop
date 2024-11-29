<template>
    <button @click="goBack" class="flex items-center text-red transition duration-200">
        <i class='bx bx-left-arrow-alt'></i> Quay lại </button>
</template>

<script>
export default {
    name: 'BackComponent',
    methods: {
        goBack() {
            this.$router ? this.$router.go(-1) : window.history.back();
        }
    }
}
</script>

<style scoped>
button {
    cursor: pointer;
    font-weight: bold;
}
</style>
