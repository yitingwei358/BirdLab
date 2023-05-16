<template>
  <div class="container py-5">
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <div class="row justify-content-center mb-5">
      <div class="col-lg-9">
        <img
          :src="article.imageUrl"
          :alt="article.title"
          class="w-100 mb-3 rounded-top"
          style="height: 50vh; object-fit: cover"
        />
        <div class="d-flex align-items-end mb-2">
          <h2 class="p-0 m-0 me-2">{{ article.title }}</h2>
          <p
            class="fs-5 p-0 m-0 mx-1"
            v-for="(item, index) in article.tag"
            :key="index + '1'"
          >
            <span class="badge rounded-pill text-bg-primary">{{ item }}</span>
          </p>
        </div>
        <p class="">
          <small>{{ $filters.date(article.create_at) }}</small> -
          <small>作者：{{ article.author }}</small>
        </p>
        <hr class="mb-4" />
        <div v-html="article.content" class=""></div>
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
          <swiper-slide v-for="item in recommendArticles" :key="item.id">
            <div class="article_card">
              <RouterLink :to="`/article/${item.id}`" class="link text-black">
                <div class="article_card_img swiper_img">
                  <img :src="item.imageUrl" class="img_cover" />
                </div>
                <p
                  class="d-flex align-items-center justify-content-center text-wood fw-bold p-3 text-start bg-light"
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
      article: {},
      id: "",
      articles: [],
      recommendArticles: [],
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
    getArticle() {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/article/${this.id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.article = res.data.article;
          this.getArticleList();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    getArticleList() {
      const url = `${VITE_URL}v2/api/${VITE_PATH}/articles`;
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.recommandArticletFilter();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    recommandArticletFilter() {
      const newList = this.articles.filter(
        (item) => item.id !== this.article.id
      );
      this.recommendArticles = newList;
      this.isLoading = false;
    },
    refreshPage(itemId) {
      this.id = itemId;
      this.getArticle();
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
  mounted() {
    this.id = this.$route.params.id;
    this.getArticle();
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
