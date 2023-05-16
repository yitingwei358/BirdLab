<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row">
          <div class="mb-5">
            <MonthlySalesLineChart />
          </div>
          <div class="col-xl-4">
            <div class="row justify-content-center">
              <div class="col-8 col-xl-11">
                <CategorySalesPieChart />
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <CategorySalesLineChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategorySalesPieChart from "@/components/charts/CategorySalesPieChart.vue";
import CategorySalesLineChart from "@/components/charts/CategorySalesLineChart.vue";
import MonthlySalesLineChart from "@/components/charts/MonthlySalesLineChart.vue";
export default {
  components: {
    CategorySalesPieChart,
    CategorySalesLineChart,
    MonthlySalesLineChart,
  },
};
</script>
