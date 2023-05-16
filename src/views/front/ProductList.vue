<template>
  <header>
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <img
      src="@/assets/img/product-banner.jpg"
      alt="主打活動圖-夏季布窩新貨到，購買就送滋養完試吃包"
      class="img-fluid"
    />
  </header>
  <section class="container py-md-5">
    <div class="row gy-5">
      <ul
        class="col-md-2 list-unstyled list-group list-group-flush sticky_top product_category_list"
        role="tablist"
      >
        <li class="product_category_item">
          <button
            type="button"
            @click="() => getProductList()"
            class="list-group-item list-group-item-action active"
            data-bs-toggle="list"
          >
            全產品
          </button>
        </li>
        <li class="product_category_item">
          <button
            type="button"
            @click="() => getCertainCategory('點心')"
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
          >
            點心
          </button>
        </li>
        <li class="product_category_item">
          <button
            type="button"
            @click="() => getCertainCategory('玩具')"
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
          >
            玩具
          </button>
        </li>
        <li class="product_category_item">
          <button
            type="button"
            @click="() => getCertainCategory('站架')"
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
          >
            站架
          </button>
        </li>
        <li class="product_category_item">
          <button
            type="button"
            @click="() => getCertainCategory('週邊')"
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
          >
            週邊
          </button>
        </li>
      </ul>
      <div class="col-md-10">
        <div class="row gy-3">
          <div
            class="col-md-6 col-lg-3"
            v-for="item in products"
            :key="item.id"
          >
            <div class="product_card bg-light">
              <RouterLink :to="`/product/${item.id}`" class="link">
                <div class="product_card_img">
                  <img
                    :src="item.imageUrl"
                    :alt="item.title"
                    class="img_cover"
                  />
                </div>
                <div class="p-3 d-flex flex-column justify-content-between">
                  <div class="product_card_title mb-2">
                    <h3 class="fs-5">{{ item.title }}</h3>
                  </div>
                  <div class="">
                    <span
                      class="fw-bold text-decoration-line-through text-muted d-block"
                    >
                      NT${{ item.origin_price }}
                    </span>
                    <span class="fw-bold text-end fs-5">
                      NT${{ item.price }}
                    </span>
                  </div>
                </div>
              </RouterLink>
              <div class="p-2 pt-0">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm w-100"
                  @click="() => addToCart(item.id)"
                  :disabled="buttonDisable"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="d-flex justify-content-center mt-5">
          <PaginationEffect :pages="pagination" @emit-pages="getProductList" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "pinia";
import CartStore from "@/stores/CartStore.js";
import { RouterLink } from "vue-router";
import PaginationEffect from "@/components/PaginationEffect.vue";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      pagination: {},
      currentPage: 1,
      isLoading: false,
      category: "",
    };
  },
  methods: {
    getProductList(page = 1) {
      this.category = "";
      this.isLoading = true;
      this.currentPage = page;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/products/?page=${page}`;
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
    getCertainCategory(category) {
      this.isLoading = true;
      this.category = category;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/products`;
      this.$http
        .get(url)
        .then((res) => {
          const { products } = res.data;
          this.products = products;
          const category_product = this.products.filter(
            (x) => x.category === category
          );
          this.products = category_product;
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
    ...mapActions(CartStore, ["addToCart"]),
  },
  components: {
    RouterLink,
    PaginationEffect,
  },
  computed: {
    ...mapState(CartStore, ["carts", "buttonDisable"]),
  },
  mounted() {
    this.getProductList();
  },
};
</script>
