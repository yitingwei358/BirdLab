<template>
  <nav
    class="container-fluid px-4 navbar navbar-expand-lg navbar-text fixed-top bg-light shadow-sm fw-bold"
  >
    <RouterLink to="/" class="navbar-brand" @click="() => (visible = !visible)"
      ><img
        src="../assets/img/logo.png"
        alt="bird lab logo"
        style="height: 40px; padding-bottom: 10px"
    /></RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      @click="() => (visible = !visible)"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse justify-content-end"
      id="navbarNav"
      :class="!visible ? 'collapse' : ''"
    >
      <ul class="navbar-nav">
        <li class="nav-item col-6 col-lg-auto">
          <RouterLink
            to="/products"
            class="nav-link"
            @click="() => (visible = !visible)"
            >全系列產品</RouterLink
          >
        </li>
        <li class="nav-item col-6 col-lg-auto">
          <RouterLink
            to="/blog"
            class="nav-link"
            @click="() => (visible = !visible)"
            >鳥博士研究所</RouterLink
          >
        </li>
        <li class="nav-item col-6 col-lg-auto">
          <RouterLink
            to="/faq"
            class="nav-link"
            @click="() => (visible = !visible)"
            >常見問答</RouterLink
          >
        </li>
        <li class="nav-item col-6 col-lg-auto">
          <RouterLink
            to="/login"
            class="nav-link"
            @click="() => (visible = !visible)"
            >登入</RouterLink
          >
        </li>
        <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
          <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-black"></div>
          <hr class="d-lg-none my-2 text-black-50" />
        </li>
        <li class="nav-item col-6 col-lg-auto">
          <RouterLink
            to="/cart"
            class="nav-link d-flex align-items-center"
            @click="() => (visible = !visible)"
          >
            <span class="pe-2">
              <i class="fa-solid fa-cart-shopping pe-2"></i>
              購物車
            </span>
            <span v-if="carts" class="badge rounded-pill text-bg-danger">{{
              carts.length
            }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "pinia";
import CartStore from "@/stores/CartStore.js";
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    ...mapActions(CartStore, ["getCarts"]),
  },
  computed: {
    ...mapState(CartStore, ["carts"]),
  },
  mounted() {
    this.getCarts();
  },
};
</script>
