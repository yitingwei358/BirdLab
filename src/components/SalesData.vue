<template>
  <div>銷售數據</div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;
import Swal from "sweetalert2";
export default {
  data() {
    return {
      orders: [],
      salesByCategory: {},
      categories: [],
      categoriesSales: [],
    };
  },
  methods: {
    getOrders() {
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/orders`;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.calcsalesByCategory();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    calcsalesByCategory() {
      const salesByCategory = {};
      this.orders.forEach((order) => {
        const orderItems = order.products;
        countCategories(orderItems);
        function countCategories(orderItems) {
          Object.keys(orderItems).forEach((key) => {
            const category = orderItems[key].product.category;
            if (!salesByCategory[category]) {
              salesByCategory[category] = orderItems[key].qty;
            }
            salesByCategory[category] += orderItems[key].qty;
          });
          return salesByCategory;
        }
      });
      this.salesByCategory = salesByCategory;
      const categories = Object.keys(salesByCategory);
      this.$emit("emit-categories", categories);
      const categoriesSales = Object.values(salesByCategory);
      this.$emit("emit-categoriesSales", categoriesSales);
    },
  },
};
</script>
