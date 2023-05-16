import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      component: () => import("../views/FrontLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "blog",
          name: "blog",
          component: () => import("../views/front/ArticleList.vue"),
        },
        {
          path: "article/:id",
          component: () => import("../views/front/ArticleDetail.vue"),
        },
        {
          path: "products",
          component: () => import("../views/front/ProductList.vue"),
        },
        {
          path: "product/:id",
          component: () => import("../views/front/ProductDetail.vue"),
        },
        {
          path: "faq",
          component: () => import("../views/front/FaqView.vue"),
        },
        {
          path: "cart",
          component: () => import("../views/front/MyCart.vue"),
        },
        {
          path: "order",
          component: () => import("../views/front/OrderComplete.vue"),
        },
        {
          path: "login",
          component: () => import("../views/front/LoginView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/DashboardView.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/admin/AdminProducts.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/admin/AdminOrders.vue"),
        },
        {
          path: "coupon",
          component: () => import("../views/admin/AdminCoupons.vue"),
        },
        {
          path: "article",
          component: () => import("../views/admin/AdminArticles.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
