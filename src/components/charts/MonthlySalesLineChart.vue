<template>
  <div class="chart-container py-3 d-flex flex-column align-items-center">
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <h3 class="fs-5 mb-3 fw-bold text-center">月銷售金額折線圖</h3>
    <canvas id="MonthlySalesLineChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      orders: [],
      ordersByMonth: [],
      monthlySalesTotals: [],
      isLoading: false,
    };
  },
  methods: {
    getOrders() {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/orders`;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.getOrdersDate(this.orders);
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    getOrdersDate() {
      this.orders.forEach((order) => {
        const orderMonth = this.stampToUnix(order.create_at);
        order.orderMonth = orderMonth;
      });
      this.groupByMonth();
    },
    stampToUnix(timeStamp) {
      const date = new Date(timeStamp * 1000);
      const orderMonth = date.getMonth() + 1;
      return orderMonth;
    },
    groupByMonth() {
      const ordersByMonth = {};
      for (let i = 1; i <= 12; i++) {
        ordersByMonth[i] = [];
      }
      this.orders.forEach((order) => {
        ordersByMonth[order.orderMonth].push(order);
      });
      this.ordersByMonth = ordersByMonth;
      this.calcMonthlySalesTotal();
    },
    calcMonthlySalesTotal() {
      let monthlySalesTotals = [];
      Object.keys(this.ordersByMonth).forEach((month) => {
        let monthlySalesTotal = 0;
        this.ordersByMonth[month].forEach((order) => {
          monthlySalesTotal += order.total;
        });
        monthlySalesTotals.push(monthlySalesTotal);
      });
      this.monthlySalesTotals = monthlySalesTotals;
      this.updateChart();
    },
    updateChart() {
      const ctx = document.getElementById("MonthlySalesLineChart");
      this.MonthlySalesLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            // "6月",
            // "7月",
            // "8月",
            // "9月",
            // "10月",
            // "11月",
            // "12月",
          ],
          datasets: [
            {
              label: "銷售總金額",
              data: this.monthlySalesTotals,
              fill: false,
              borderColor: "rgb(104, 134, 143)",
              tension: 0.1,
            },
          ],
        },
        options: {
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
      this.isLoading = false;
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
