<template>
  <div
    class="fixed bottom-0 left-0 w-full bg-white shadow-lg flex  justify-between px-4 py-3 md:max-w-lg md:mx-auto items-center rounded-t-lg"
  style="z-index: 50;"
  >
    <!-- Home Icon -->
    <button class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-store text-2xl md:text-3xl hover:text-red-600"></i>
    </button>

    <!-- Cart Icon -->
    <button class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-cart text-2xl md:text-3xl hover:text-red-600"></i>
    </button>

    <!-- Add Product Icon -->
    <button class="icon w-12 h-12 flex items-center bg-gray-100 justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-plus-circle text-2xl md:text-3xl hover:text-red-600"></i>
    </button>

    <!-- Contact Icon -->
    <button class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-envelope text-2xl md:text-3xl hover:text-red-600"></i>
    </button>

    <!-- Categories Icon -->
    <button class="icon w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-gray-100">
      <i class="bx bx-category text-2xl md:text-3xl hover:text-red-600"></i>
    </button>
  </div>
</template>

<style scoped>
.icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Modern hover effect */
.icon:hover {
  transform: scale(1.15);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  background-color: #f0f0f0;
}

/* Underline on hover */
.icon:hover::after {
  content: '';
  position: absolute;
  top: -5px; /* Position the underline slightly above the button */
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ab1616; /* Custom color */
}

</style>
