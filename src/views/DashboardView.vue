<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-1">
    <div class="container-fluid">
      <!-- sidebar trigger -->
      <button
        class="navbar-toggler me-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        aria-controls="sidebarOffcanvas"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <RouterLink to="/admin" class="navbar-brand me-auto" href="#"
        >Bird Lab 管理後台
      </RouterLink>
      <!-- navbarSupportedContent trigger -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav d-flex ms-auto my-2">
          <li class="nav-item dropdown ms-1 me-3">
            <router-link to="/" class="link text-white"> 回前台 </router-link>
          </li>
          <li class="nav-item dropdown ms-1">
            <a href="#" @click.prevent="logout" class="link text-white">
              <i class="bi bi-person"></i>
              登出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 左側sidebar -->
  <div
    class="offcanvas offcanvas-start bg-dark text-white sidebar_nav"
    tabindex="-1"
    id="sidebarOffcanvas"
    aria-labelledby="sidebarOffcanvasLabel"
    :class="isCollapse ? 'collapse' : ''"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="sidebarOffcanvasLabel">功能列表</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body p-0 mt-3">
      <nav class="navbar-dark">
        <ul class="navbar-nav">
          <li class="mb-3">
            <div class="text-muted fw-bold px-3">功能選單</div>
          </li>
          <li>
            <RouterLink
              to="/admin/products"
              class="nav-link px-3"
              @click="() => collapseSidebar()"
            >
              <span class="me-2"><i class="bi bi-pin"></i></span>
              <span>產品列表</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/orders"
              class="nav-link px-3"
              @click="() => collapseSidebar()"
            >
              <span class="me-2"><i class="bi bi-pin"></i></span>
              <span>訂單列表</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/coupon"
              class="nav-link px-3"
              @click="() => collapseSidebar()"
            >
              <span class="me-2"><i class="bi bi-pin"></i></span>
              <span>優惠券列表</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/article"
              class="nav-link px-3"
              @click="() => collapseSidebar()"
            >
              <span class="me-2"><i class="bi bi-pin"></i></span>
              <span>文章列表</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <main class="dashboard_main">
    <AdminOverview v-if="status && this.path === '/admin'" />
    <RouterView v-else-if="status && this.path !== '/admin'" />
  </main>
</template>

<script>
import AdminOverview from "./admin/AdminOverview.vue";
const { VITE_URL } = import.meta.env;
import Swal from "sweetalert2";
export default {
  data() {
    return {
      status: false,
      path: "/admin",
      isCollapse: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.path = to.path;
    });
  },
  components: { AdminOverview },
  methods: {
    logout() {
      document.cookie = `hexToken=; expires=${new Date()}`;
      this.$router.push("/");
      Swal.fire({
        icon: "success",
        title: "您已成功登出",
        confirmButtonColor: "#31523f",
      });
    },
    checkAdmin() {
      const url = `${VITE_URL}v2/api/user/check`;
      this.$http
        .post(url)
        .then(() => {
          this.status = true;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
          this.$router.push("/login");
        });
    },
    collapseSidebar() {
      const mediaQuery = window.matchMedia("(min-width: 992px)").matches;
      if (mediaQuery) {
        this.isCollapse = false;
      } else {
        this.isCollapse = !this.isCollapse;
        const backdrop = document.querySelector(".offcanvas-backdrop");
        backdrop.classList.remove("show");
      }
    },
  },
  watch: {
    $route() {
      const { path } = this.$route;
      this.path = path;
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
};
</script>

<style lang="scss" scoped>
$offcanvas-width: 270px;
.offcanvas {
  width: $offcanvas-width;
  @media (min-width: 992px) {
    &-header {
      display: none;
    }
  }
}
.sidebar_nav {
  width: $offcanvas-width;
  @media (min-width: 992px) {
    transform: none;
    visibility: visible !important;
    height: calc(100% - 56px);
    top: 56px;
  }
}
.dashboard_main {
  margin-top: 72px;
  padding: 25px;
  @media (min-width: 992px) {
    margin-left: $offcanvas-width;
  }
}
</style>
