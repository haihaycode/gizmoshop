<template>
  <LoadingSkeletionComponent :isLoading="isLoading" :isOpen="checkLoading" titleWidth="w-3/4" :textLines="4"
    :circles="2">
  </LoadingSkeletionComponent>

  <BreadcrumbComponent class="hidden sm:block px-4 md:px-4 mt-[140px]" :items="breadCrumItems"></BreadcrumbComponent>
  <div class="flex flex-col sm:flex-row w-full ">
    <div class="w-full sm:w-1/2 p-2">
      <leftpageComponent :images="productDetail?.productImageMappingResponse"></leftpageComponent>
    </div>
    <div class="w-full sm:w-1/2 p-2">
      <rightpageComponent :product="productDetail" @loading="checkLoading = false"></rightpageComponent>
    </div>
  </div>
  <SettingProductVue :product="productDetail"></SettingProductVue>
  <ProductRelatedVue :product="productDetail"></ProductRelatedVue>
</template>

<script>
import leftpageComponent from "@/components/productDetail/LeftViewComponent.vue";
import rightpageComponent from "@/components/productDetail/RightPageComponent.vue";
import ProductRelatedVue from "@/components/productDetail/ProductRelated.vue";
import SettingProductVue from "@/components/productDetail/SettingProduct.vue";
import { getProductDetail } from "@/api/productApi";
import LoadingSkeletionComponent from "@/components/containers/loading/LoadingSkeletionComponent.vue";
import { mapGetters } from "vuex";
import BreadcrumbComponent from "@/components/containers/breadcrumb/BreadcrumbComponent.vue";

export default {
  name: "demoTestDev",
  components: {
    LoadingSkeletionComponent,
    leftpageComponent,
    rightpageComponent,
    ProductRelatedVue,
    SettingProductVue,
    BreadcrumbComponent
  },
  watch: {
    //thay thế tham số title
    '$route.query.slug': {
      immediate: true,
      handler(newSlug) {
        if (newSlug) {
          const formattedTitle = newSlug.replace(/-/g, ' ');
          document.title = formattedTitle;
        } else {
          document.title = "Sản phẩm mô tả";
        }
      }
    }
  },
  data() {
    return {
      checkLoading: true,
      breadCrumItems: [],
      productDetail: null,
    };
  },
  methods: {
    //lấy dữ liệu sản phẩm
    async handleFetchProductDetail(id) {
      try {
        const res = await getProductDetail(id);
        this.productDetail = res.data;
        if (this.productDetail) {
          const { productCategories, productBrand, productName } = this.productDetail;
          this.breadCrumItems = [
            { text: 'Trang chủ', name: 'home' },
            { text: 'Sản phẩm', name: 'product' },
            { text: productCategories?.name || 'Danh mục', name: '' },
            { text: productBrand?.name || 'Thương hiệu', name: '' },
            { text: productName || 'Tên sản phẩm', name: '' }
          ];
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
    slug() {
      return this.$route.query.slug;
    },
    productId() {
      if (this.slug) {
        const parts = this.slug.split("-");
        return parts[parts.length - 1];
      }
      return null;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.handleFetchProductDetail(this.productId);
  }
};
</script>
