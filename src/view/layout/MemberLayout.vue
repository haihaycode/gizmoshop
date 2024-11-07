<template>
  <div class="text-gray-800 font-inter">
    <!-- <router-view name="sideBar"></router-view> -->
      <!-- Navbar -->
      <router-view name="header"></router-view>
      <!-- End Navbar -->
    <main class="w-full  bg-gray-50 min-h-screen transition-all main relative">


      <!-- Content -->
      <section class="main mt-10   ">
        <!-- Use Vuex's isLoading state -->
        <LoadingComponent v-if="isLoading" :loading="isLoading"></LoadingComponent>
        <router-view></router-view>
      </section>
    
      <ScrollToTopComponent />
        <!-- End Content -->
      <router-view name="footer" class="footer"></router-view>
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
