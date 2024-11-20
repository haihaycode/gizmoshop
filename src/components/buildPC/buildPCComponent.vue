<template>
  <div class="min-h-screen bg-white text-gray-800">
    <!-- Header -->
    <header class="p-6 bg-white shadow-sm sticky top-0 z-10">
      <div class="flex justify-between items-center container mx-auto">
        <div
          class="text-3xl font-extrabold text-gray-800 tracking-tight cursor-pointer"
        >
          PC Builder
        </div>
        <div class="w-1/3">
          <input
            v-model="searchQuery"
            @input="filterComponents"
            type="text"
            class="w-full p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Tìm kiếm linh kiện..."
          />
        </div>
      </div>
    </header>

    <div
      class="flex flex-col lg:flex-row container mx-auto space-y-6 lg:space-y-0 lg:space-x-8"
    >
      <!-- Sidebar -->
      <div class="w-full lg:w-1/4 bg-gray-50 p-6 rounded-xl shadow-sm">
        <div class="space-y-2">
          <!-- CPU -->
          <div>
            <h4 class="text-md font-medium mb-2">CPU</h4>
            <select
              v-model="selectedCpu"
              class="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option v-for="cpu in filteredCpus" :key="cpu.id" :value="cpu">
                {{ cpu.name }}
              </option>
            </select>
          </div>

          <!-- GPU -->
          <div>
            <h4 class="text-md font-medium mb-2">GPU</h4>
            <select
              v-model="selectedGpu"
              class="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option v-for="gpu in filteredGpus" :key="gpu.id" :value="gpu">
                {{ gpu.name }}
              </option>
            </select>
          </div>

          <!-- RAM -->
          <div>
            <h4 class="text-md font-medium mb-2">RAM</h4>
            <select
              v-model="selectedRam"
              class="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option v-for="ram in filteredRams" :key="ram.id" :value="ram">
                {{ ram.name }}
              </option>
            </select>
          </div>

          <!-- Storage -->
          <div>
            <h4 class="text-md font-medium mb-2">Storage</h4>
            <select
              v-model="selectedStorage"
              class="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option
                v-for="storage in filteredStorages"
                :key="storage.id"
                :value="storage"
              >
                {{ storage.name }}
              </option>
            </select>
          </div>

          <!-- PSU -->
          <div>
            <h4 class="text-md font-medium mb-2">PSU</h4>
            <select
              v-model="selectedPsu"
              class="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option v-for="psu in filteredPsus" :key="psu.id" :value="psu">
                {{ psu.name }}
              </option>
            </select>
          </div>

          <!-- Case -->
          <div>
            <h4 class="text-md font-medium mb-2">Vỏ Case</h4>
            <select
              v-model="selectedCase"
              class="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option
                v-for="caseItem in filteredCases"
                :key="caseItem.id"
                :value="caseItem"
              >
                {{ caseItem.name }}
              </option>
            </select>
          </div>

          <!-- Cooling -->
          <div>
            <h4 class="text-md font-medium mb-2">Tản Nhiệt</h4>
            <select
              v-model="selectedCooling"
              class="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option
                v-for="cooling in filteredCoolings"
                :key="cooling.id"
                :value="cooling"
              >
                {{ cooling.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Config Display -->
      <div class="flex-1 space-y-6">
        <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold mb-2">Cấu hình của bạn</h3>
          <div class="space-y-2">
            <!-- Selected CPU -->
            <div
              :class="[
                'flex items-center justify-between p-2 rounded-lg',
                selectedCpu.name ? 'bg-green-100' : '',
              ]"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg relative"
                >
                  <img
                    v-if="selectedCpu.image"
                    :src="selectedCpu.image"
                    alt="CPU"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-if="selectedCpu.name"
                    class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <i class="bx bx-check bx-tada"></i>
                  </div>
                </div>
                <div>
                  <p class="text-md font-medium">CPU</p>
                  <p class="text-sm text-gray-500">
                    {{ selectedCpu.name || "Chưa chọn" }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-500">Số lượng: 1</p>
            </div>

            <!-- Selected GPU -->
            <div
              :class="[
                'flex items-center justify-between p-2 rounded-lg',
                selectedGpu.name ? 'bg-green-100' : '',
              ]"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg relative"
                >
                  <img
                    v-if="selectedGpu.image"
                    :src="selectedGpu.image"
                    alt="GPU"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-if="selectedGpu.name"
                    class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <i class="bx bx-check bx-tada"></i>
                  </div>
                </div>
                <div>
                  <p class="text-md font-medium">GPU</p>
                  <p class="text-sm text-gray-500">
                    {{ selectedGpu.name || "Chưa chọn" }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-500">Số lượng: 1</p>
            </div>

            <!-- Selected RAM -->
            <div
              :class="[
                'flex items-center justify-between p-2 rounded-lg',
                selectedRam.name ? 'bg-green-100' : '',
              ]"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg relative"
                >
                  <img
                    v-if="selectedRam.image"
                    :src="selectedRam.image"
                    alt="RAM"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-if="selectedRam.name"
                    class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <i class="bx bx-check bx-tada"></i>
                  </div>
                </div>
                <div>
                  <p class="text-md font-medium">RAM</p>
                  <p class="text-sm text-gray-500">
                    {{ selectedRam.name || "Chưa chọn" }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-500">Số lượng: 1</p>
            </div>

            <!-- Selected Storage -->
            <div
              :class="[
                'flex items-center justify-between p-2 rounded-lg',
                selectedStorage.name ? 'bg-green-100' : '',
              ]"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg relative"
                >
                  <img
                    v-if="selectedStorage.image"
                    :src="selectedStorage.image"
                    alt="Storage"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-if="selectedStorage.name"
                    class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <i class="bx bx-check bx-tada"></i>
                  </div>
                </div>
                <div>
                  <p class="text-md font-medium">Storage</p>
                  <p class="text-sm text-gray-500">
                    {{ selectedStorage.name || "Chưa chọn" }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-500">Số lượng: 1</p>
            </div>

            <!-- Selected PSU -->
            <div
              :class="[
                'flex items-center justify-between p-2 rounded-lg',
                selectedPsu.name ? 'bg-green-100' : '',
              ]"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg relative"
                >
                  <img
                    v-if="selectedPsu.image"
                    :src="selectedPsu.image"
                    alt="PSU"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-if="selectedPsu.name"
                    class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <i class="bx bx-check bx-tada"></i>
                  </div>
                </div>
                <div>
                  <p class="text-md font-medium">PSU</p>
                  <p class="text-sm text-gray-500">
                    {{ selectedPsu.name || "Chưa chọn" }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-500">Số lượng: 1</p>
            </div>

            <!-- Selected Case -->
            <div
              :class="[
                'flex items-center justify-between p-2 rounded-lg',
                selectedCase.name ? 'bg-green-100' : '',
              ]"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg relative"
                >
                  <img
                    v-if="selectedCase.image"
                    :src="selectedCase.image"
                    alt="Case"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-if="selectedCase.name"
                    class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <i class="bx bx-check bx-tada"></i>
                  </div>
                </div>
                <div>
                  <p class="text-md font-medium">Vỏ Case</p>
                  <p class="text-sm text-gray-500">
                    {{ selectedCase.name || "Chưa chọn" }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-500">Số lượng: 1</p>
            </div>

            <!-- Selected Cooling -->
            <div
              :class="[
                'flex items-center justify-between p-2 rounded-lg',
                selectedCooling.name ? 'bg-green-100' : '',
              ]"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg relative"
                >
                  <img
                    v-if="selectedCooling.image"
                    :src="selectedCooling.image"
                    alt="Cooling"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-if="selectedCooling.name"
                    class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <i class="bx bx-check bx-tada"></i>
                  </div>
                </div>
                <div>
                  <p class="text-md font-medium">Tản Nhiệt</p>
                  <p class="text-sm text-gray-500">
                    {{ selectedCooling.name || "Chưa chọn" }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-500">Số lượng: 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: "",
      cpus: [
        {
          id: 1,
          name: "Intel i9-13900K",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "AMD Ryzen 9 7950X",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Intel i7-12700K",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "AMD Ryzen 5 5600X",
          image: "https://via.placeholder.com/150",
        },
      ],
      gpus: [
        {
          id: 1,
          name: "NVIDIA RTX 4090",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "AMD Radeon RX 7900 XT",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "NVIDIA RTX 3080",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "NVIDIA RTX 3070",
          image: "https://via.placeholder.com/150",
        },
      ],
      rams: [
        {
          id: 1,
          name: "Corsair Vengeance 16GB",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "G.SKILL Trident Z 32GB",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Kingston HyperX 16GB",
          image: "https://via.placeholder.com/150",
        },
      ],
      storages: [
        {
          id: 1,
          name: "Samsung 970 Evo 1TB",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Western Digital 2TB",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Seagate FireCuda 1TB",
          image: "https://via.placeholder.com/150",
        },
      ],
      psus: [
        {
          id: 1,
          name: "Corsair RM850X 850W",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "EVGA SuperNOVA 750 G5",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Seasonic Focus GX-750W",
          image: "https://via.placeholder.com/150",
        },
      ],
      cases: [
        { id: 1, name: "NZXT H510", image: "https://via.placeholder.com/150" },
        {
          id: 2,
          name: "Fractal Design Meshify C",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Corsair 4000D",
          image: "https://via.placeholder.com/150",
        },
      ],
      coolings: [
        {
          id: 1,
          name: "Cooler Master Hyper 212",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "NZXT Kraken X63",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Corsair iCUE H150i Elite",
          image: "https://via.placeholder.com/150",
        },
      ],
      filteredCpus: [],
      filteredGpus: [],
      filteredRams: [],
      filteredStorages: [],
      filteredPsus: [],
      filteredCases: [],
      filteredCoolings: [],
      selectedCpu: {},
      selectedGpu: {},
      selectedRam: {},
      selectedStorage: {},
      selectedPsu: {},
      selectedCase: {},
      selectedCooling: {},
    };
  },
  created() {
    this.filteredCpus = this.cpus;
    this.filteredGpus = this.gpus;
    this.filteredRams = this.rams;
    this.filteredStorages = this.storages;
    this.filteredPsus = this.psus;
    this.filteredCases = this.cases;
    this.filteredCoolings = this.coolings;
  },
  methods: {
    filterComponents() {
      const query = this.searchQuery.toLowerCase();
      this.filteredCpus = this.cpus.filter((cpu) =>
        cpu.name.toLowerCase().includes(query)
      );
      this.filteredGpus = this.gpus.filter((gpu) =>
        gpu.name.toLowerCase().includes(query)
      );
      this.filteredRams = this.rams.filter((ram) =>
        ram.name.toLowerCase().includes(query)
      );
      this.filteredStorages = this.storages.filter((storage) =>
        storage.name.toLowerCase().includes(query)
      );
      this.filteredPsus = this.psus.filter((psu) =>
        psu.name.toLowerCase().includes(query)
      );
      this.filteredCases = this.cases.filter((caseItem) =>
        caseItem.name.toLowerCase().includes(query)
      );
      this.filteredCoolings = this.coolings.filter((cooling) =>
        cooling.name.toLowerCase().includes(query)
      );
    },
    finalizeBuild() {
      alert("Cấu hình PC của bạn đã hoàn thành!");
    },
  },
};
</script>
