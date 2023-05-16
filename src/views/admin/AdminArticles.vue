<template>
  <div class="container-fluid">
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <div class="row mb-3">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="mb-0">文章列表</h3>
        <div class="text-end">
          <button
            class="btn btn-primary"
            type="button"
            @click="() => openArticleModal(true)"
          >
            建立新文章
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="table-responsive table-scroll">
        <table class="table my-4 text-nowrap">
          <thead class="table-light">
            <tr>
              <th scope="col" width="30%">標題</th>
              <th scope="col" width="10%">作者</th>
              <th scope="col" width="10%">標籤</th>
              <th scope="col" width="20%">建立日期</th>
              <th scope="col" width="10%">狀態</th>
              <th scope="col" width="20%" class="text-end">編輯</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in articles" :key="index">
            <tr
              v-if="articles.length"
              :class="{ 'text-secondary': !item.isPublic }"
            >
              <td>{{ item.title }}</td>
              <td>{{ item.author }}</td>
              <td>
                <span
                  v-for="(tag, i) in item.tag"
                  :key="i"
                  class="badge rounded-pill text-bg-primary me-1"
                >
                  {{ tag }}
                </span>
              </td>
              <td>{{ $filters.date(item.create_at) }}</td>
              <td>
                <span v-if="item.isPublic" class="text-success">公開</span>
                <span v-else class="text-muted">未公開</span>
              </td>
              <td>
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="() => getArticleId(item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="() => openDeleteModal(item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationEffect :pages="pagination" @emit-pages="getArticleList" />
      </div>
    </div>
  </div>
  <ArticleModal
    ref="editArticleModal"
    :article="tempArticle"
    :isNew="isNew"
    :is-loading="isLoading"
    @emit-update-article="updateArticle"
  />
  <DeleteModal
    ref="deleteModal"
    :item="tempArticle"
    :is-loading="isLoading"
    @emit-delete="deleteArticle"
  />
</template>

<script>
import ArticleModal from "@/components/ArticleModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import PaginationEffect from "@/components/PaginationEffect.vue";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      articles: {},
      tempArticle: {},
      isNew: false,
      isLoading: false,
      pagination: {},
      currentPage: 1,
    };
  },
  methods: {
    getArticleList(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/articles`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          const { articles, pagination } = res.data;
          this.articles = articles;
          this.pagination = pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    getArticleId(item) {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/article/${item.id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.openArticleModal(false, res.data.article);
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    openArticleModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isNew = true;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.editArticleModal.openModal();
    },
    updateArticle(item) {
      this.isLoading = true;
      let url = `${VITE_URL}v2/api/${VITE_PATH}/admin/article/${item.id}`;
      let httpMethod = "put";
      const data = item;
      if (this.isNew) {
        url = `${VITE_URL}v2/api/${VITE_PATH}/admin/article`;
        httpMethod = "post";
      }
      this.$http[httpMethod](url, { data })
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "文章更新成功",
            confirmButtonColor: "#31523f",
          });
          this.getArticleList(this.currentPage);
          this.$refs.editArticleModal.hideModal();
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    openDeleteModal(item) {
      this.tempArticle = item;
      this.$refs.deleteModal.openModal();
    },
    deleteArticle(item) {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/article/${item.id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "文章刪除成功",
            confirmButtonColor: "#31523f",
          });
          this.getArticleList(this.currentPage);
          this.$refs.deleteModal.hideModal();
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
  components: {
    ArticleModal,
    DeleteModal,
    PaginationEffect,
  },
  mounted() {
    this.getArticleList();
  },
};
</script>
