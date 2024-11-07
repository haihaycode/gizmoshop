<template>
  <div
    class="fixed top-1/2 left-0 ml-2.5 w-[56px] max-h-[75vh] bg-white shadow-lg z-50 transform -translate-y-1/2 rounded-lg border border-gray-200 overflow-hidden hidden sm:block lg:block"
  >
    <ul :class="['flex flex-col items-center p-2', dynamicHeightClass]">
      <li
        v-for="item in menuItems.slice(0, 10)"
        :key="item.id"
        class="relative group w-full py-2 flex justify-center items-center border-b last:border-b-0 border-gray-200 cursor-pointer text-gray-800 hover:bg-gray-100 transition-all ease-in-out"
      >
        <img
          :src="require(`@/assets/image/Categories/${item.icon}.png`)"
          alt="icon"
          class="w-6 h-6 group-hover:scale-125 transition-transform duration-300"
        />
        <span
          class="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {{ item.name }}
        </span>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  computed: {
    dynamicHeightClass() {
      const itemCount = Math.min(this.menuItems.length, 10);
      return `h-[${itemCount * 48}px]`; // 48px cho mỗi mục bao gồm khoảng cách
    },
  },
  data() {
    return {
      menuItems: [
        { id: 1, icon: "circuit-board", name: "Circuit Board" },
        { id: 2, icon: "wifi", name: "WiFi" },
        { id: 3, icon: "graphics-card", name: "Graphics Card" },
        { id: 4, icon: "memory-card", name: "Memory Card" },
        { id: 5, icon: "microchip", name: "Microchip" },
        { id: 6, icon: "processor", name: "Processor" },
        { id: 7, icon: "display", name: "Display" },
        { id: 8, icon: "ssd-card", name: "SSD" },
        { id: 9, icon: "web-camera", name: "Web camera" },
        { id: 10, icon: "memory-card", name: "Memory Card" },
        { id: 11, icon: "wifi-router", name: "Wifi Router" },
        { id: 12, icon: "fan", name: "FAN" },
      ],
    };
  },
};
</script>

<style scoped>
/* Thêm các style tuỳ chỉnh nếu cần */
</style>
