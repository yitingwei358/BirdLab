<template>
  <div class="container py-5">
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <div class="row justify-content-center">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <div
            v-if="articles.length !== 0"
            class="article_card border rounded bg-light mb-5 article_card"
          >
            <RouterLink :to="`/article/${articles[0].id}`" class="link">
              <div class="article_card_img" style="height: 50vh">
                <img
                  :src="articles[0].imageUrl"
                  :alt="articles[0].title"
                  class="img_cover"
                />
              </div>
              <div class="row p-3">
                <div class="col-lg-10">
                  <h4 class="article_card_title">{{ articles[0].title }}</h4>
                  <p class="article_card_description">
                    {{ articles[0].description }}
                  </p>
                </div>
                <div class="col-lg-2">
                  <button class="btn btn-outline-primary w-100 h-100">
                    閱讀全文
                  </button>
                </div>
              </div>
            </RouterLink>
          </div>
          <ul
            class="article_category_list nav nav-pills border-bottom bg-white my-3 sticky_top"
            id="nav-tab"
            role="tablist"
          >
            <li class="article_category_item">
              <button
                class="nav-link active py-3"
                id="nav-intro-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-selected="true"
                @click="() => getArticleList()"
              >
                全文章
              </button>
            </li>
            <li class="article_category_item">
              <button
                class="nav-link py-3"
                id="nav-intro-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-selected="true"
                @click="() => getTagArticle('鳥奴')"
              >
                鳥奴必看
              </button>
            </li>
            <li class="article_category_item">
              <button
                class="nav-link py-3"
                id="nav-intro-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-selected="true"
                @click="() => getTagArticle('日常')"
              >
                日常科普
              </button>
            </li>
            <li class="article_category_item">
              <button
                class="nav-link py-3"
                id="nav-intro-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-selected="true"
                @click="() => getTagArticle('世界鸚鵡')"
              >
                世界鸚鵡尋奇
              </button>
            </li>
          </ul>
          <ul class="row gy-4 list-unstyled">
            <li
              class="swiper_item col-xl-6"
              v-for="item in articles"
              :key="item.id"
            >
              <RouterLink :to="`/article/${item.id}`" class="link">
                <div
                  class="article_card mb-3 bg-light d-flex flex-column h-100"
                >
                  <div class="article_card_img swpier_img p-0">
                    <img
                      :src="item.imageUrl"
                      :alt="item.title"
                      class="img_cover mb-4"
                    />
                  </div>
                  <div class="article_card_content mb-auto p-3">
                    <h4 class="mb-3 article_card_title">
                      {{ item.title }}
                    </h4>
                    <p class="fs-6 align-top article_card_description">
                      {{ item.description }}
                    </p>
                  </div>
                  <button class="btn btn-outline-primary w-100">
                    閱讀全文
                  </button>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      articles: [],
      tag_articles: [],
      tag: "",
      isLoading: false,
    };
  },
  methods: {
    getArticleList() {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/articles`;
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.isLoading = false;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    getTagArticle(tag) {
      this.tag = tag;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/articles`;
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.tag_articles = [];
          this.articles.forEach((article) => {
            article.tag.forEach((t) => {
              if (t === tag) {
                this.tag_articles.push(article);
              }
            });
          });
          this.articles = this.tag_articles;
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getArticleList();
  },
};
</script>
