<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
        <!-- Sidebar -->
        <router-view name="header"></router-view>

        <div class="flex ">
            <!-- Header -->
            <router-view name="sidebar"></router-view>
            <!-- Main Content -->
            <main class="p-0 md:p-6 bg-white min-h-screen w-full shadow-inner ">
                <router-view />
            </main>
        </div>

        <!-- Footer -->
        <router-view name="footer"></router-view>
    </div>
</template>

<script>


export default {
    name: 'SupplierLayout',
};
</script>

<style>
/* Additional custom styles can go here */
</style>