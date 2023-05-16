<template>
  <div
    class="chart-container py-3 ps-xl-5 d-flex flex-column align-items-center"
  >
    <h3 class="fs-5 mb-3 fw-bold text-center">類別銷售數量統計</h3>
    <canvas id="CategorySalesLineChart"></canvas>
    <template>
      <SalesData
        @emit-categories="getCategories"
        @emit-categoriesSales="getCategoriesSales"
        ref="salesData"
      />
    </template>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import SalesData from "../SalesData.vue";
export default {
  data() {
    return {
      categories: [],
      categoriesSales: [],
    };
  },
  methods: {
    getCategories(categories) {
      this.categories = categories;
    },
    getCategoriesSales(categoriesSales) {
      this.categoriesSales = categoriesSales;

      this.updateChart();
    },
    updateChart() {
      const ctx = document.getElementById("CategorySalesLineChart");
      this.CategorySalesLineChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.categories,
          datasets: [
            {
              axis: "y",
              label: "依產品類別",
              data: this.categoriesSales,
              fill: false,
              backgroundColor: [
                "rgb(104, 134, 143)",
                "rgb(243, 142, 146)",
                "rgb(247, 201, 161)",
                "rgb(191, 211, 212)",
                "rgb(144, 189, 184)",
              ],
            },
          ],
        },
        options: {
          indexAxis: "y",
          plugins: {
            title: {
              display: false,
              text: "每日銷售折線圖",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },

          animation: {
            duration: 1500,
            easing: "easeInOutQuart",
          },
        },
      });
    },
  },
  components: {
    SalesData,
  },
  mounted() {
    this.$refs.salesData.getOrders();
  },
};
</script>
