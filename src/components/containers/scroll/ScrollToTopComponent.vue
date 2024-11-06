<template>
    <transition name="fade">
        <button v-if="isVisible" @click="scrollToTop"
            class="fixed bottom-6 right-6 w-8 h-8 bg-blue-600 text-white rounded transition duration-300 ease-in-out opacity-30 hover:opacity-100 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            ↑
        </button>
    </transition>
</template>

<script>
export default {
    name: 'ScrollToTop',
    data() {
        return {
            isVisible: false
        };
    },
    mounted() {
        window.addEventListener('scroll', this.checkScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.checkScroll);
    },
    methods: {
        checkScroll() {
            // Check if the page has been scrolled down 100 pixels
            this.isVisible = window.scrollY > 100;
        },
        scrollToTop() {
            // Smooth scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>
