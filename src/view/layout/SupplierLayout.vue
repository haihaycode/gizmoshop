<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
        <!-- Sidebar -->
        <router-view name="header"></router-view>

        <div class="flex ">
            <!-- Header -->
            <router-view name="sidebar"></router-view>
            <!-- Main Content -->
            <main class="p-0 md:p-6 bg-white min-h-screen w-full shadow-inner ">
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <router-view></router-view>
                </transition>
            </main>
        </div>

        <!-- Footer -->
        <router-view name="footer"></router-view>
    </div>
</template>

<script>


export default {
    name: 'SupplierLayout',
    methods: {
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = "opacity 1s ease";
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = "opacity 1s ease";
            el.style.opacity = 0;
            done();
        }
    }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>