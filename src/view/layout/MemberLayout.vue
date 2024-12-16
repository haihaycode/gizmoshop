<template>
  <div class="text-gray-800 font-inter">
    <!-- Header -->
    <router-view name="header"></router-view>
    <!-- main  -->
    <main class="w-full mx-auto container min-h-screen transition-all main relative ">
      <router-view name="sidebar"></router-view>
      <section class="main xl:max-w-7xl mx-auto ">
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <router-view></router-view>
        </transition>
      </section>
      <ScrollToTopComponent />
    </main>
    <!-- navigation moblie  -->
    <router-view name="mobile" class="block md:hidden"></router-view>
    <!-- Footer -->
    <router-view name="footer" class="footer"></router-view>
  </div>
</template>
<script>
import ScrollToTopComponent from '@/components/containers/scroll/ScrollToTopComponent.vue';
import { mapGetters } from 'vuex';


export default {
  name: "AdminLayout",
  components: {
    ScrollToTopComponent
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
  },
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
  },

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
