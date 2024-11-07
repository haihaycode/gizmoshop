<template>
  <div class="text-gray-800 font-inter">
    <!-- <router-view name="sideBar"></router-view> -->

    <main class="w-full  bg-gray-50 min-h-screen transition-all main relative">
      <!-- Navbar -->
      <router-view name="header"></router-view>
      <!-- End Navbar -->

      <!-- Content -->
      <section class="main mt-7">
        <!-- Use Vuex's isLoading state -->
        <LoadingComponent v-if="isLoading" :loading="isLoading"></LoadingComponent>
        <router-view></router-view>
      </section>
      <!-- End Content -->
      <router-view name="footer" class="footer"></router-view>
      <ScrollToTopComponent />
    </main>
  </div>
</template>

<script>
import LoadingComponent from '@/components/containers/loading/LoadingComponent.vue';
import ScrollToTopComponent from '@/components/containers/scroll/ScrollToTopComponent.vue';
import { mapGetters } from 'vuex';


export default {
  name: "AdminLayout",
  components: {
    LoadingComponent,
    ScrollToTopComponent
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
  },


};
</script>
