<template>
  <div class="container-fluid">
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <div class="row mb-3">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="mb-0">產品頁面</h3>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            @click="() => openProductModal(true)"
          >
            建立新的產品
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="table-responsive table-scroll">
        <table class="table my-4 text-nowrap">
          <thead class="table-light">
            <tr>
              <th scope="col" width="30%">產品名稱</th>
              <th scope="col" width="15%">分類</th>
              <th scope="col" width="10%" class="text-end pe-5">原價</th>
              <th scope="col" width="10%" class="text-end pe-5">售價</th>
              <th scope="col" width="15%">是否啟用</th>
              <th scope="col" width="20%" class="text-end">編輯</th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item.id">
            <tr
              v-if="products.length"
              :class="{ 'text-secondary': !item.is_enabled }"
            >
              <td>{{ item.title }}</td>
              <td>{{ item.category }}</td>
              <td class="text-end pe-5">
                {{ $filters.currency(item.origin_price) }}
              </td>
              <td class="text-end pe-5">{{ $filters.currency(item.price) }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="() => openProductModal(false, item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="() => openDelProductModel(item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationEffect :pages="pagination" @emit-pages="getData" />
      </div>
    </div>
  </div>
  <ProductModal
    :product="tempProduct"
    :is-new="isNew"
    :is-loading="isLoading"
    @emit-update-item="updateItem"
    ref="openModal"
  />
  <DeleteModal
    :item="tempProduct"
    :is-loading="isLoading"
    @update="getData"
    @emit-delete="deleteItem"
    ref="deleteModal"
  />
</template>

<script>
import PaginationEffect from "@/components/PaginationEffect.vue";
import ProductModal from "@/components/ProductModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      pagination: {},
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      currentPage: 1,
      isLoading: false,
    };
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/products/?page=${page}`;

      this.$http
        .get(url)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    openProductModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      const productComponent = this.$refs.openModal;
      productComponent.openModal();
    },
    updateItem(item) {
      this.isLoading = true;
      this.tempProduct = item;
      let url = `${VITE_URL}v2/api/${VITE_PATH}/admin/product`;
      let httpMethod = "post";
      if (!this.isNew) {
        httpMethod = "put";
        url = `${VITE_URL}v2/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      }
      this.$http[httpMethod](url, { data: this.tempProduct })
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "產品更新成功",
            confirmButtonColor: "#31523f",
          });
          this.getData(this.currentPage);
          this.$refs.openModal.hideModal();
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    openDelProductModel(item) {
      this.tempProduct = { ...item };
      const delProductModalComponent = this.$refs.deleteModal;
      delProductModalComponent.openModal();
    },
    deleteItem(item) {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/product/${item.id}`;

      this.$http
        .delete(url)
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "產品刪除成功",
            confirmButtonColor: "#31523f",
          });
          const delProductModalComponent = this.$refs.deleteModal;
          delProductModalComponent.hideModal();
          this.getData(this.currentPage);
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
    PaginationEffect,
    ProductModal,
    DeleteModal,
  },
  mounted() {
    this.getData();
  },
};
</script>
