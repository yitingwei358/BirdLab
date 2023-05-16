<template>
  <div class="container py-5">
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="product row mb-5">
          <div class="product_img col-lg-6" style="height: 500px">
            <img
              :src="product.imageUrl"
              class="img_cover"
              :alt="product.title"
            />
          </div>
          <div class="product_intro d-flex flex-column col-lg-6 p-3">
            <h3 class="product_intro_title fs-1 mb-5 fw-bold">
              {{ product.title }}
            </h3>
            <div
              class="product_intro_description fs-5 pb-5 mb-auto"
              v-html="product.description"
            ></div>
            <p class="product_intro_price fs-5">
              價格：{{ product.price }}元 / {{ product.unit }} &nbsp;&nbsp;
              (原價：{{ product.origin_price }})
            </p>
            <div class="d-flex align-items-center mb-3">
              <p class="mb-0 fs-5 text-nowrap flex-grow-1">數量：</p>
              <select
                name="qty"
                id="qty"
                class="form-control"
                v-model="product.qty"
              >
                <option :value="i" v-for="i in 10" :key="i + '1234'">
                  {{ i }}
                </option>
              </select>
            </div>
            <button
              type="button"
              class="btn btn-lg btn-primary"
              @click="() => addToCart(product.id, product.qty)"
              :disabled="buttonDisable"
            >
              <i class="fas fa-spinner fa-pulse" v-if="buttonDisable"></i>
              加入購物車
            </button>
          </div>
          <div class="product_content mt-5">
            <h4 class="fw-bold">產品介紹</h4>
            <hr />
            <div class="fs-5" v-html="product.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommended_list row justify-content-center mb-5">
      <div class="col-lg-9">
        <h4 class="fw-bold">你可能也會喜歡</h4>
        <hr />
        <swiper
          :slidesPerView="2"
          :spaceBetween="10"
          :pagination="{
            clickable: true,
          }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            '768': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            '1024': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="item in recommendProducts" :key="item.id">
            <div class="product_card">
              <RouterLink :to="`/product/${item.id}`" class="link text-black">
                <div class="product_card_img swiper_img">
                  <img :src="item.imageUrl" class="img_cover" />
                </div>
                <p
                  class="d-flex align-items-center justify-content-center text-wood fw-bold p-3 bg-light"
                >
                  {{ item.title }}
                </p>
              </RouterLink>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import CartStore from "@/stores/CartStore.js";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      product: {
        qty: 1,
      },
      id: "",
      products: [],
      recommendProducts: [],
      isLoading: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const progressCircle = ref(null);
    const progressContent = ref(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.value.style.setProperty("--progress", 1 - progress);
      progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return {
      onAutoplayTimeLeft,
      progressCircle,
      progressContent,
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/product/${this.id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product;
          this.product.qty = 1;
          this.getProductList();
          this.isLoading = false;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    ...mapActions(CartStore, ["addToCart"]),
    getProductList(page = 1) {
      const url = `${VITE_URL}v2/api/${VITE_PATH}/products/?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          const { products } = res.data;
          this.products = products;
          this.recommandProductFilter();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    recommandProductFilter() {
      const newList = this.products.filter(
        (item) => item.id !== this.product.id
      );
      this.recommendProducts = newList;
    },
    refreshPage(itemId) {
      this.id = itemId;
      this.getProduct();
    },
  },
  watch: {
    "$route.params": {
      handler() {
        if (this.$route.params.id) {
          const newItemId = this.$route.params.id;
          this.refreshPage(newItemId);
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(CartStore, ["carts", "buttonDisable"]),
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getProduct();
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: auto;
  padding-bottom: 3rem;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: start;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--swiper-theme-color);
}
.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: var(--swiper-theme-color);
  fill: none;
  stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}
</style>
