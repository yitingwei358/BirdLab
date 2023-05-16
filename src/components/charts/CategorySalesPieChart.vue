<template>
  <div
    class="chart-container py-3 d-flex flex-column align-items-center"
    style="height: 100%; width: 100%"
  >
    <h3 class="fs-5 mb-4 fw-bold text-center">類別銷售數量統計</h3>
    <canvas id="CategorySalesPieChart"></canvas>
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
      const ctx = document.getElementById("CategorySalesPieChart");
      this.CategorySalesPieChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.categories,
          datasets: [
            {
              label: "銷售數量",
              data: this.categoriesSales,
              borderWidth: 1,
              hoverOffset: 10,
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
          plugins: {
            title: {
              display: false,
              text: "各類別銷售額佔比",
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
                boxWidth: 10,
                fontSize: 12,
                pointStyle: "circle",
              },
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
