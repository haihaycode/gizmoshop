<template>
  <div>
    <div class="flex items-center mb-4">
      <div class="w-3 h-10 bg-orange-600 mr-1"></div>
      <p class="text-xl font-bold text-gray-800">Sản phẩm liên quan</p>
    </div>
    <div
      class="discounted-products-container my-2 mx-auto border border-gray-50 rounded-lg shadow-md"
    >
      <swiper
        :slides-per-view="getSlidesPerView"
        :space-between="10"
        :loop="false"
        class="products-swiper p-4"
      >
        <swiper-slide
          v-for="(product, index) in products"
          :key="index"
          class="product-card-wrapper"
        >
          <!-- Sử dụng component ProductCard -->
          <ProductCard :product="product" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="flex justify-end px-3">
      <span
        class="font-semibold cursor-pointer text-base text-red-500 transition"
      >
        Xem tất cả
      </span>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import ProductCard from "@/components/productDetail/ProductCard.vue"; // Import component mới

export default {
  components: { Swiper, SwiperSlide, ProductCard },
  data() {
    return {
      products: [
        {
          image:
            "https://i.pinimg.com/564x/28/2c/0f/282c0fde41079d709992a83cf188e8ce.jpg",
          name: "PC Gaming Ryzen 9 RTX 4080",
          description:
            "High-end gaming PC với CPU Ryzen 9 và card đồ họa RTX 4080.",
          price: "60.000.000đ",
          old_price: "65.000.000đ",
          brand: "Custom Build",
        },
        {
          image:
            "https://i.pinimg.com/564x/8c/e6/b2/8ce6b207fa8cb52d5235952d118186b2.jpg",
          name: "RAM Corsair Vengeance 32GB (2x16GB)",
          description: "RAM DDR4 hiệu năng cao, tốc độ 3600MHz.",
          price: "4.000.000đ",
          old_price: "4.500.000đ",
          brand: "Corsair",
        },
        {
          image:
            "https://i.pinimg.com/564x/59/91/df/5991df1209d457cf8ca41ae6d526bc81.jpg",
          name: "CPU Intel Core i9-13900K",
          description: "CPU Intel thế hệ 13 với 24 lõi và xung nhịp cao.",
          price: "15.000.000đ",
          old_price: "17.000.000đ",
          brand: "Intel",
        },
        {
          image:
            "https://i.pinimg.com/564x/87/d6/3a/87d63a6fec8505bf92432620030076bf.jpg",
          name: "Màn hình Samsung Odyssey G7 32",
          description: "Màn hình cong 2K với tần số quét 240Hz.",
          price: "12.000.000đ",
          old_price: "14.000.000đ",
          brand: "Samsung",
        },
        {
          image:
            "https://i.pinimg.com/564x/2a/26/ed/2a26ed66a4858ee9db76d2c8217fb4f6.jpg",
          name: "Case NZXT H510 Elite",
          description:
            "Case máy tính ATX với thiết kế hiện đại và tấm kính cường lực.",
          price: "2.500.000đ",
          old_price: "3.000.000đ",
          brand: "NZXT",
        },
        {
          image:
            "https://i.pinimg.com/564x/f8/70/4b/f8704b994d815cb2cec024a21d90ecfd.jpg",
          name: "Card màn hình NVIDIA GeForce RTX 3060",
          description: "Card đồ họa hiệu năng cao cho gaming và đồ họa.",
          price: "10.000.000đ",
          old_price: "12.000.000đ",
          brand: "NVIDIA",
        },
        {
          image:
            "https://i.pinimg.com/736x/db/b5/ab/dbb5abe20a2ea246e699ef3bc6699f3c.jpg",
          name: "Ổ cứng SSD Samsung 970 Evo Plus 1TB",
          description: "SSD tốc độ cao NVMe M.2 cho hiệu năng vượt trội.",
          price: "3.500.000đ",
          old_price: "4.000.000đ",
          brand: "Samsung",
        },
        {
          image:
            "https://i.pinimg.com/564x/cb/04/d7/cb04d7529c23ac3aae290a032f86ccb4.jpg",
          name: "Nguồn Corsair RM850x 850W",
          description: "Nguồn máy tính chuẩn 80 Plus Gold cho hiệu suất cao.",
          price: "2.800.000đ",
          old_price: "3.200.000đ",
          brand: "Corsair",
        },
        {
          image:
            "https://i.pinimg.com/564x/08/f9/e4/08f9e4413c0a46b07319aa8a22bdccd5.jpg",
          name: "Tản nhiệt nước NZXT Kraken X63",
          description: "Tản nhiệt nước với hiệu năng làm mát vượt trội.",
          price: "4.500.000đ",
          old_price: "5.000.000đ",
          brand: "NZXT",
        },
        {
          image:
            "https://i.pinimg.com/564x/09/3e/0a/093e0a93fe64994062388e0c38870a5d.jpg",
          name: "Bàn phím cơ Razer BlackWidow V3",
          description: "Bàn phím cơ với switch cơ học và đèn RGB.",
          price: "2.000.000đ",
          old_price: "2.500.000đ",
          brand: "Razer",
        },
        {
          image:
            "https://i.pinimg.com/564x/2b/b7/b6/2bb7b61d1495816cd9f7f91cf8fb5af4.jpg",
          name: "Chuột gaming Logitech G502 HERO",
          description: "Chuột gaming với cảm biến HERO 25K DPI.",
          price: "1.200.000đ",
          old_price: "1.500.000đ",
          brand: "Logitech",
        },
        {
          image:
            "https://i.pinimg.com/564x/90/59/5e/90595e2632833656d1c0f7c53a9756ce.jpg",
          name: "Màn hình LG UltraGear 27GL850",
          description: 'Màn hình 27" QHD với tần số quét 144Hz.',
          price: "7.500.000đ",
          old_price: "8.500.000đ",
          brand: "LG",
        },
        {
          image:
            "https://i.pinimg.com/736x/5f/d0/3f/5fd03f5cf800b99ee467d66d1772446c.jpg",
          name: "Bo mạch chủ ASUS ROG Strix Z690",
          description: "Mainboard hỗ trợ CPU Intel thế hệ 12 và 13.",
          price: "8.000.000đ",
          old_price: "9.000.000đ",
          brand: "ASUS",
        },
        {
          image:
            "https://i.pinimg.com/564x/e3/70/b8/e370b8ff438debb26fa6d9bfa58cdc40.jpg",
          name: "Tai nghe gaming SteelSeries Arctis 7",
          description: "Tai nghe không dây với âm thanh vòm 7.1.",
          price: "3.000.000đ",
          old_price: "3.500.000đ",
          brand: "SteelSeries",
        },
        {
          image:
            "https://i.pinimg.com/564x/47/4b/a6/474ba67956d88f668fd9587e560954dd.jpg",
          name: "Router ASUS RT-AX86U WiFi 6",
          description: "Router chuẩn WiFi 6 với tốc độ cao.",
          price: "4.000.000đ",
          old_price: "4.500.000đ",
          brand: "ASUS",
        },
      ],
    };
  },
  computed: {
    getSlidesPerView() {
      if (window.innerWidth >= 1024) return 6; // Desktop
      if (window.innerWidth >= 768) return 4; // Tablet
      return 2; // Mobile
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateSlidesPerView);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSlidesPerView);
  },
  methods: {
    updateSlidesPerView() {
      this.$forceUpdate();
    },
  },
};
</script>
