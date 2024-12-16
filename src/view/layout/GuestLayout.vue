<template>
  <!-- header  -->
  <router-view name="header"></router-view>
  <!-- main  -->
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <router-view></router-view>
  </transition>
  <!-- footer  -->
  <router-view name="footer"></router-view>

</template>

<script>
export default {
  name: 'ClientLayout',
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
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0.5;
}
</style>