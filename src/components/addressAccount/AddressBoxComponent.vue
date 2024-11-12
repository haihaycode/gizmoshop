<template>
    <div
        class="address-card p-4 sm:p-6 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl transition-shadow duration-200 transform hover:scale-105">
        <!-- Header with Name and Edit Button -->
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg md:text-xl font-semibold">{{ address.fullname }}</h3>
            <button @click="$emit('edit', address)"
                class="text-blue-200 text-sm md:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded flex items-center gap-1 transition-colors duration-150">
                <i class="bx bx-edit text-blue-200 text-base"></i> Chỉnh sửa
            </button>
        </div>

        <!-- Address Details -->
        <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm sm:text-base">
                <i class="bx bx-phone text-blue-200 text-lg"></i>
                <span>Số điện thoại: <span class="font-medium">{{ address.sdt }}</span></span>
            </div>
            <div class="flex items-center gap-2 text-sm sm:text-base">
                <i class="bx bx-map text-green-200 text-lg"></i>
                <span>Địa chỉ: <span class="font-medium">{{ address.specific_address }}</span></span>
            </div>
            <div class="flex items-center gap-2 text-sm sm:text-base">
                <i class="bx bx-location-plus text-yellow-200 text-lg"></i>
                <span>Phường/Xã: <span class="font-medium">{{ address.district }}</span></span>
            </div>
            <div class="flex items-center gap-2 text-sm sm:text-base">
                <i class="bx bx-buildings text-pink-200 text-lg"></i>
                <span>Thành phố/Tỉnh: <span class="font-medium">{{ address.city }}</span></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddressBoxComponent',
    props: {
        address: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.address-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: linear-gradient(135deg, #4b6cb7, #182848);
    /* Custom gradient */
}

.address-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
</style>
