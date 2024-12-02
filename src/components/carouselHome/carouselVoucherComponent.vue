<template>
  <div>

    <ImageCarouselComponent :items="voucher"></ImageCarouselComponent>
  </div>
</template>

<script>
import ImageCarouselComponent from "../containers/carousel/ImageCarouselComponent.vue";
import { getVoucherPage } from "@/api/voucherApi";

export default {
  name: "carouselVoucherComponent",
  components: {
    ImageCarouselComponent,
  },
  data() {
    return {
      voucher: [
        {
          name: "Slide 1",
          description: "",
          image: "https://i.pinimg.com/736x/e3/67/d1/e367d1a755da5347f53541f77ad85d32.jpg",
        },
        {
          name: "Slide 2",
          description: "Giảm giá sập sàn tháng 11",
          image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/may-choi-game-sony-playstation-5-slim-home.png",
        },
        {
          name: "Slide 3",
          description: "Giảm giá sập sàn tháng 11",
          image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/may-choi-game-sony-playstation-5-slim-home.png",
        },
        {
          name: "Slide 4",
          description: "Giảm giá sập sàn tháng 11",
          image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/may-choi-game-sony-playstation-5-slim-home.png",
        },
      ],
    };
  },
  mounted() {
    this.handleFetchVoucher();
  },
  methods: {
    async handleFetchVoucher() {
      try {
        const response = await getVoucherPage();
        this.voucher = response.data.content;
      } catch (error) {
        console.error("Failed to load vouchers:", error);
      }
    },
  },
};
</script>

<style scoped></style>
