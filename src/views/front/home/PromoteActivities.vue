<template>
  <section class="container py-5 overflow-hidden">
    <div class="row justify-content-center my-5">
      <div class="col-lg-9">
        <img
          src="@/assets/img/sales-product.png"
          alt="花蓮小米穗照片"
          class="img-fluid mb-3"
          data-aos="zoom-in"
          data-aos-duration="800"
        />
        <div class="d-flex py-2" data-aos="zoom-in" data-aos-duration="800">
          <RouterLink
            to="product/-NQv-51wX6Q4NDRXo1CY"
            type="button"
            class="btn btn-lg btn-primary px-5 mx-auto mb-5 fs-2 fw-bold"
          >
            搶購去
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- 特色 -->
    <div class="row justify-content-center my-5">
      <div class="col-lg-9">
        <div class="row mb-5 my-5">
          <div class="col-6">
            <img
              class="img_cover"
              src="@/assets/img/strength-1.png"
              alt="小農搬運農產品示意圖"
            />
          </div>
          <div
            class="col-6 py-3 px-auto d-flex justify-content-center align-items-center text-center"
          >
            <h3 class="fs-1 fw-bold">
              小農合作<br />
              天然栽種無農藥
            </h3>
          </div>
        </div>
        <div class="row mb-5 my-5">
          <div
            class="col-6 py-3 d-flex justify-content-center align-items-center text-center"
          >
            <h3 class="fs-1 fw-bold">
              產地直送<br />
              新鮮自然好味道
            </h3>
          </div>
          <div class="col-6">
            <img
              class="img_cover"
              src="@/assets/img/strength-2.png"
              alt="農耕車收成示意圖"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 心得 -->
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="row g-0 mb-3 comment_card">
          <div
            class="col-md-6 comment_card_img"
            data-aos="flip-up"
            data-aos-duration="800"
          >
            <img
              class="img_cover"
              src="@/assets/img/comment-2.jpg"
              alt="虎皮鸚鵡顧客照片"
            />
          </div>
          <div
            class="col-md-6 bg-light p-5 comment_card_content"
            data-aos="flip-up"
            data-aos-duration="800"
          >
            <p class="fs-3">高雄的 <span class="text-primary">芭樂</span>：</p>
            <p class="fs-3">真香~ 好吃好吃一直吃~ <br />花東米果然讚</p>
            <img
              src="@/assets/img/star.png"
              alt="5星好評圖示"
              class="w-50 mb-5"
            />
            <RouterLink
              to="product/-NQv-51wX6Q4NDRXo1CY"
              type="button"
              class="btn btn-lg btn-primary w-100"
              >花東小米穗新鮮到貨 <br />
              <i class="fa-solid fa-hand-point-right mx-2"></i>
              <p class="d-inline-block me-3 mb-0">搶購去</p>
            </RouterLink>
          </div>
        </div>
        <div class="row g-0 mb-3 comment_card">
          <div class="col-md-6" data-aos="flip-up" data-aos-duration="800">
            <img
              class="img_cover comment_card_img"
              src="@/assets/img/comment-3.jpg"
              alt="巴丹鸚鵡顧客照片"
            />
          </div>
          <div
            class="col-md-6 bg-light p-5 comment_card_content"
            data-aos="flip-up"
            data-aos-duration="800"
          >
            <p class="fs-3">新竹的 <span class="text-primary">小白</span>：</p>
            <p class="fs-3">媽咪給我這個當下午茶 <br />超級開勳的啦</p>
            <img
              src="@/assets/img/star.png"
              alt="5星好評圖示"
              class="w-50 mb-5"
            />
            <RouterLink
              to="product/-NQv-51wX6Q4NDRXo1CY"
              type="button"
              class="btn btn-lg btn-primary w-100"
              >花東小米穗新鮮到貨 <br />
              <i class="fa-solid fa-hand-point-right mx-2"></i>
              <p class="d-inline-block me-3 mb-0">搶購去</p>
            </RouterLink>
          </div>
        </div>
        <div class="row g-0 mb-3 comment_card">
          <div class="col-md-6" data-aos="flip-up" data-aos-duration="800">
            <img
              class="img_cover comment_card_img"
              src="@/assets/img/comment-1.jpg"
              alt="金太陽鸚鵡顧客照片"
            />
          </div>
          <div
            class="col-md-6 bg-light p-5 comment_card_content"
            data-aos="flip-up"
            data-aos-duration="800"
          >
            <p class="fs-3">台北的 <span class="text-primary">葵恩</span>：</p>
            <p class="fs-3">太好吃了<br />每次都要和我兄弟姊妹們搶 QQ</p>
            <img
              src="@/assets/img/star.png"
              alt="5星好評圖示"
              class="w-50 mb-5"
            />
            <RouterLink
              to="product/-NQv-51wX6Q4NDRXo1CY"
              type="button"
              class="btn btn-lg btn-primary w-100"
              >花東小米穗新鮮到貨 <br />
              <i class="fa-solid fa-hand-point-right mx-2"></i>
              <p class="d-inline-block me-3 mb-0">搶購去</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <!-- 優惠券 -->
    <div class="row justify-content-center my-5 py-5">
      <div class="col-lg-9" style="position: relative">
        <h3 class="fs-1 fw-bold" style="padding-left: 6rem">好康優惠</h3>
        <img
          src="@/assets/img/小鸚.png"
          alt="小鸚去背照"
          style="
            height: 100px;
            position: absolute;
            transform: translate(-20%, -85%);
          "
        />
        <hr />
        <div class="row">
          <div class="col-lg-6 mb-3">
            <RouterLink to="/products" class="link">
              <div class="row g-0 product_card">
                <div
                  class="col-9 pe-0 d-flex flex-column justify-content-center bg-wheat"
                >
                  <div class="p-3">
                    <h3 class="fs-1 fw-bold text-wood">新會員首購禮</h3>
                    <p class="fs-4 fw-bold m-0">
                      輸入 bird520 <br />
                      不限金額 79 折
                    </p>
                  </div>
                </div>
                <div
                  class="col-3 bg-wood d-flex justify-content-center align-items-center"
                >
                  <p class="fs-3 mb-0 text-white">去逛逛</p>
                </div>
              </div>
            </RouterLink>
          </div>
          <div class="col-lg-6 mb-3">
            <RouterLink to="/products" class="link">
              <div class="row g-0 product_card">
                <div
                  class="col-9 pe-0 d-flex flex-column justify-content-center bg-wheat"
                >
                  <div class="p-3">
                    <h3 class="fs-1 fw-bold text-wood">免費試吃包</h3>
                    <p class="fs-4 fw-bold m-0">
                      凡購買任一款鳥布窩<br />
                      即贈蔬菜滋養丸試吃包
                    </p>
                  </div>
                </div>
                <div
                  class="col-3 bg-wood d-flex justify-content-center align-items-center"
                >
                  <p class="fs-3 mb-0 text-white">去逛逛</p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="recommended_list row justify-content-center mb-5">
      <div class="col-lg-9">
        <h3 class="fs-1 fw-bold" style="padding-left: 6rem">熱銷排行榜</h3>
        <img
          src="@/assets/img/虎皮.png"
          alt="虎皮去背照"
          style="
            height: 120px;
            position: absolute;
            transform: translate(3%, -77%);
          "
        />
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
          <swiper-slide v-for="item in products" :key="item.id">
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
  </section>
</template>

<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";
import { Autoplay, Pagination, Navigation } from "swiper";
import AOS from "aos";
import "aos/dist/aos.css";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProductList(page = 1) {
      const url = `${VITE_URL}v2/api/${VITE_PATH}/products/?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          const { products } = res.data;
          this.products = products;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
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
  mounted() {
    this.getProductList(),
      AOS.init({
        offset: 120,
        duration: 600,
        easing: "ease-in-out",
        delay: 100,
        once: false,
        mirror: false,
        anchorPlacement: "top-bottom",
      });
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
