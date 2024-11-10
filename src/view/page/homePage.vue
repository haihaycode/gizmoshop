<template>
  <div class="md:m-0" ref="content">
    <carouselVoucherComponent></carouselVoucherComponent>
    <ScrollingVoucherComponent></ScrollingVoucherComponent>
    <voucherHomeComponent></voucherHomeComponent>
    <TopDiscountedProductsComponent></TopDiscountedProductsComponent>
    <CarouselCategoryComponent></CarouselCategoryComponent>
    <productComponent :products="products"></productComponent>
  </div>
</template>
<script>
import CarouselCategoryComponent from "@/components/carouselHome/carouselCategoryComponent.vue";
import carouselVoucherComponent from "@/components/carouselHome/carouselVoucherComponent.vue";
import voucherHomeComponent from "@/components/carouselHome/voucherHomeComponent.vue";
import TopDiscountedProductsComponent from "@/components/product/TopDiscountedProductsComponent.vue";
import ScrollingVoucherComponent from "@/components/carouselHome/ScrollingVoucherComponent.vue";
import productComponent from "@/components/carouselHome/productComponent.vue";
export default {
  name: "demoTestDev",
  components: {
    carouselVoucherComponent,
    voucherHomeComponent,
    CarouselCategoryComponent,
    TopDiscountedProductsComponent,
    ScrollingVoucherComponent,
    productComponent
  },
  data() {
    return {
      products: [
         {
          image: "https://i.pinimg.com/564x/28/2c/0f/282c0fde41079d709992a83cf188e8ce.jpg",
          name: "PC Gaming Ryzen 9 RTX 4080",
          description: "High-end gaming PC với CPU Ryzen 9 và card đồ họa RTX 4080.",
          price: "60.000.000đ",
          old_price: "65.000.000đ",
          brand: "Custom Build",
        },
        {
          image: "https://i.pinimg.com/564x/8c/e6/b2/8ce6b207fa8cb52d5235952d118186b2.jpg",
          name: "RAM Corsair Vengeance 32GB (2x16GB)",
          description: "RAM DDR4 hiệu năng cao, tốc độ 3600MHz.",
          price: "4.000.000đ",
          old_price: "4.500.000đ",
          brand: "Corsair",
        },
        {
          image: "https://i.pinimg.com/564x/59/91/df/5991df1209d457cf8ca41ae6d526bc81.jpg",
          name: "CPU Intel Core i9-13900K",
          description: "CPU Intel thế hệ 13 với 24 lõi và xung nhịp cao.",
          price: "15.000.000đ",
          old_price: "17.000.000đ",
          brand: "Intel",
        },
        {
          image: "https://i.pinimg.com/564x/87/d6/3a/87d63a6fec8505bf92432620030076bf.jpg",
          name: "Màn hình Samsung Odyssey G7 32",
          description: "Màn hình cong 2K với tần số quét 240Hz.",
          price: "12.000.000đ",
          old_price: "14.000.000đ",
          brand: "Samsung",
        },
        {
          image: "https://i.pinimg.com/564x/2a/26/ed/2a26ed66a4858ee9db76d2c8217fb4f6.jpg",
          name: "Case NZXT H510 Elite",
          description: "Case máy tính ATX với thiết kế hiện đại và tấm kính cường lực.",
          price: "2.500.000đ",
          old_price: "3.000.000đ",
          brand: "NZXT",
        },
        {
          image: "https://i.pinimg.com/564x/f8/70/4b/f8704b994d815cb2cec024a21d90ecfd.jpg",
          name: "Card màn hình NVIDIA GeForce RTX 3060",
          description: "Card đồ họa hiệu năng cao cho gaming và đồ họa.",
          price: "10.000.000đ",
          old_price: "12.000.000đ",
          brand: "NVIDIA",
        },
        {
          image: "https://i.pinimg.com/736x/db/b5/ab/dbb5abe20a2ea246e699ef3bc6699f3c.jpg",
          name: "Ổ cứng SSD Samsung 970 Evo Plus 1TB",
          description: "SSD tốc độ cao NVMe M.2 cho hiệu năng vượt trội.",
          price: "3.500.000đ",
          old_price: "4.000.000đ",
          brand: "Samsung",
        },
        {
          image: "https://i.pinimg.com/564x/cb/04/d7/cb04d7529c23ac3aae290a032f86ccb4.jpg",
          name: "Nguồn Corsair RM850x 850W",
          description: "Nguồn máy tính chuẩn 80 Plus Gold cho hiệu suất cao.",
          price: "2.800.000đ",
          old_price: "3.200.000đ",
          brand: "Corsair",
        },
        {
          image: "https://i.pinimg.com/564x/08/f9/e4/08f9e4413c0a46b07319aa8a22bdccd5.jpg",
          name: "Tản nhiệt nước NZXT Kraken X63",
          description: "Tản nhiệt nước với hiệu năng làm mát vượt trội.",
          price: "4.500.000đ",
          old_price: "5.000.000đ",
          brand: "NZXT",
        },
        {
          image: "https://i.pinimg.com/564x/09/3e/0a/093e0a93fe64994062388e0c38870a5d.jpg",
          name: "Bàn phím cơ Razer BlackWidow V3",
          description: "Bàn phím cơ với switch cơ học và đèn RGB.",
          price: "2.000.000đ",
          old_price: "2.500.000đ",
          brand: "Razer",
        },
        {
          image: "https://i.pinimg.com/564x/2b/b7/b6/2bb7b61d1495816cd9f7f91cf8fb5af4.jpg",
          name: "Chuột gaming Logitech G502 HERO",
          description: "Chuột gaming với cảm biến HERO 25K DPI.",
          price: "1.200.000đ",
          old_price: "1.500.000đ",
          brand: "Logitech",
        },
        {
          image: "https://i.pinimg.com/564x/90/59/5e/90595e2632833656d1c0f7c53a9756ce.jpg",
          name: "Màn hình LG UltraGear 27GL850",
          description: "Màn hình 27\" QHD với tần số quét 144Hz.",
          price: "7.500.000đ",
          old_price: "8.500.000đ",
          brand: "LG",
        },
        {
          image: "https://i.pinimg.com/736x/5f/d0/3f/5fd03f5cf800b99ee467d66d1772446c.jpg",
          name: "Bo mạch chủ ASUS ROG Strix Z690",
          description: "Mainboard hỗ trợ CPU Intel thế hệ 12 và 13.",
          price: "8.000.000đ",
          old_price: "9.000.000đ",
          brand: "ASUS",
        },
        {
          image: "https://i.pinimg.com/564x/e3/70/b8/e370b8ff438debb26fa6d9bfa58cdc40.jpg",
          name: "Tai nghe gaming SteelSeries Arctis 7",
          description: "Tai nghe không dây với âm thanh vòm 7.1.",
          price: "3.000.000đ",
          old_price: "3.500.000đ",
          brand: "SteelSeries",
        },
        {
          image: "https://i.pinimg.com/736x/47/4b/a6/474ba67956d88f668fd9587e560954dd.jpg",
          name: "Router ASUS RT-AX86U WiFi 6",
          description: "Router chuẩn WiFi 6 với tốc độ cao.",
          price: "4.000.000đ",
          old_price: "4.500.000đ",
          brand: "ASUS",
        },
        {
          image: "https://i.pinimg.com/564x/11/4c/4b/114c4ba4f8c9fb63c13bc5c40d15af1b.jpg",
          name: "Bộ lưu điện APC BX1100LI-MS",
          description: "UPS cho máy tính với công suất 1100VA.",
          price: "3.000.000đ",
          old_price: "3.500.000đ",
          brand: "APC",
        },
        {
          image: "https://i.pinimg.com/564x/82/c5/af/82c5affcf42d798fa19a662dbb9a93c4.jpg",
          name: "Ổ cứng HDD Seagate Barracuda 2TB",
          description: "Ổ cứng HDD tốc độ 7200RPM.",
          price: "1.500.000đ",
          old_price: "1.800.000đ",
          brand: "Seagate",
        },
        {
          image: "https://i.pinimg.com/564x/92/14/db/9214dbd9822eafcdbe34abad565b5fa9.jpg",
          name: "SSD Kingston NV1 500GB",
          description: "SSD NVMe giá rẻ, tốc độ cao.",
          price: "1.200.000đ",
          old_price: "1.500.000đ",
          brand: "Kingston",
        },
        {
          image: "https://i.pinimg.com/564x/6c/af/eb/6cafeb9bf4235db7ef53b737c835b9dc.jpg",
          name: "RAM G.Skill Trident Z RGB 16GB",
          description: "RAM DDR4 với hiệu ứng đèn RGB.",
          price: "2.000.000đ",
          old_price: "2.500.000đ",
          brand: "G.Skill",
        },
         {
          image:
            "https://i.pinimg.com/564x/6a/cf/cd/6acfcda8d507182a09a999bb76db2714.jpg",
          name: "IPhone 16 ProMax 126GB",
          description: "Latest iPhone with cutting-edge features.",
          price: "40.000.000đ",
          old_price: "43.000.000đ",
          brand: "Apple",
        },
        {
          image:
            "https://i.pinimg.com/564x/cf/30/d6/cf30d6005ede065f9999b213e06d8c10.jpg",
          name: "iPhone 14 Pro Max",
          description: "Advanced iPhone with ProMotion display and A16 chip.",
          price: "30.000.000đ",
          old_price: "35.000.000đ",
          brand: "Apple",
        },
        {
          image:
            "https://i.pinimg.com/564x/a9/98/ed/a998ed474b5b008ac358228c8cff6ca5.jpg",
          name: "Dell XPS 13",
          description:
            "High-performance laptop with 11th Gen Intel processors.",
          price: "25.000.000đ",
          old_price: "28.000.000đ",
          brand: "Dell",
        },
        {
          image:
            "https://i.pinimg.com/564x/ef/80/21/ef802136370ef03b5149701084010e3f.jpg",
          name: "Samsung Galaxy S21 Ultra",
          description:
            "Premium smartphone with a 108MP camera and 120Hz display.",
          price: "35.000.000đ",
          old_price: "40.000.000đ",
          brand: "Samsung",
        },
        {
          image:
            "https://i.pinimg.com/564x/5f/3a/31/5f3a3124a238127a08400c303242cc24.jpg",
          name: "LG Gram 17",
          description: "Lightweight 17-inch laptop with long battery life.",
          price: "27.000.000đ",
          old_price: "32.000.000đ",
          brand: "LG",
        },
        {
          image:
            "https://i.pinimg.com/564x/f1/ef/2b/f1ef2be92c47d67a539dca1bf5b5fde2.jpg",
          name: "Xiaomi Redmi Note 11 Pro 5G",
          description:
            "Feature-rich phone with 5G connectivity and 108MP camera.",
          price: "15.000.000đ",
          old_price: "18.000.000đ",
          brand: "Xiaomi",
        },
        {
          image:
            "https://i.pinimg.com/564x/4d/14/b5/4d14b5d4ad9ae9632ff54f1fb51622fa.jpg",
          name: "HP Omen 17",
          description:
            "High-performance gaming laptop with NVIDIA GeForce RTX graphics.",
          price: "40.000.000đ",
          old_price: "45.000.000đ",
          brand: "HP",
        },
        {
          image:
            "https://i.pinimg.com/564x/91/5e/a4/915ea4ca4b118c13680a62cc1ac0eaf6.jpg",
          name: "Sony WH-1000XM4",
          description: "Top-rated noise-canceling wireless headphones.",
          price: "8.000.000đ",
          old_price: "10.000.000đ",
          brand: "Sony",
        },
        {
          image:
            "https://i.pinimg.com/564x/9a/b6/0a/9ab60a3fc57bdbd48f524199b1f0a5bc.jpg",
          name: "Apple AirPods Pro",
          description:
            "Wireless earbuds with active noise cancellation and transparency mode.",
          price: "5.000.000đ",
          old_price: "6.500.000đ",
          brand: "Apple",
        },
        {
          image:
            "https://i.pinimg.com/564x/d4/79/f7/d479f740c4bb7b5c3cc41859b65a7056.jpg",
          name: "IPhone 16 ProMax 126GB",
          description: "Latest iPhone with cutting-edge features.",
          price: "40.000.000đ",
          old_price: "43.000.000đ",
          brand: "Apple",
        },
          {
          image:
            "https://i.pinimg.com/564x/d4/79/f7/d479f740c4bb7b5c3cc41859b65a7056.jpg",
          name: "IPhone 16 ProMax 126GB",
          description: "Latest iPhone with cutting-edge features.",
          price: "40.000.000đ",
          old_price: "43.000.000đ",
          brand: "Apple",
        },
      ],
    };
  },
   mounted() {
    window.scrollTo(0, 0);
  }
};
</script>
