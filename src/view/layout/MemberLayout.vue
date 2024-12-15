<template>
  <div class="text-gray-800 font-inter">
    <!-- Header -->
    <router-view name="header"></router-view>
    <!-- main  -->
    <main class="w-full mx-auto container min-h-screen transition-all main relative ">
      <router-view name="sidebar"></router-view>
      <section class="main xl:max-w-7xl mx-auto ">
        <router-view></router-view>
      </section>
      <ScrollToTopComponent />
    </main>
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
};
</script>
