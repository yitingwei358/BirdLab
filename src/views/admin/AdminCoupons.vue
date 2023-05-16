<template>
  <div class="container-fluid">
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <div class="row mb-3">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="mb-0">優惠券列表</h3>
        <div class="text-end">
          <button
            class="btn btn-primary"
            type="button"
            @click="() => openCouponModal('build')"
          >
            建立新的優惠券
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="table-responsive table-scroll">
        <table class="table my-4 text-nowrap">
          <thead class="table-light">
            <tr>
              <th scope="col" width="15%">名稱</th>
              <th scope="col" width="15%">代碼</th>
              <th scope="col" width="10%">折扣</th>
              <th scope="col" width="20%">
                到期日
                <i
                  class="bi bi-caret-down-fill ms-1"
                  @click="() => sortDates('descending')"
                  style="cursor: pointer"
                ></i>
                <i
                  class="bi bi-caret-up-fill ms-1"
                  @click="() => sortDates('ascending')"
                  style="cursor: pointer"
                ></i>
              </th>
              <th scope="col" width="10%">狀態</th>
              <th scope="col" width="30%" class="text-end">編輯</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in coupons" :key="index">
            <tr
              v-if="coupons.length"
              :class="{ 'text-secondary': !item.is_enabled }"
            >
              <td>{{ item.title }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.percent }}%</td>
              <td>{{ $filters.date(item.due_date) }}</td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else class="text-muted">未啟用</span>
              </td>
              <td>
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    @click="() => openCouponModal('copy', item)"
                    class="btn btn-outline-wood btn-sm"
                  >
                    複製
                  </button>
                  <button
                    type="button"
                    @click="() => openCouponModal('edit', item)"
                    class="btn btn-outline-primary btn-sm me-3"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    @click="() => openDeleteModal(item)"
                    class="btn btn-outline-danger btn-sm"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <PaginationEffect :pages="pagination" @emit-pages="getCouponList" />
  <CouponModal
    ref="couponModal"
    :coupon="tempCoupon"
    :option="option"
    :is-loading="isLoading"
    @emit-update-coupon="updateCoupon"
  />
  <DeleteModal
    ref="deleteModal"
    :item="tempCoupon"
    :is-loading="isLoading"
    @emit-delete="deleteCoupon"
  />
</template>

<script>
import CouponModal from "@/components/CouponModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import PaginationEffect from "@/components/PaginationEffect.vue";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
      },
      isNew: true,
      isLoading: false,
      pagination: {},
      currentPage: 1,
      option: "",
    };
  },
  methods: {
    getCouponList(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/coupons?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          const { coupons, pagination } = res.data;
          this.coupons = coupons;
          this.pagination = pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    openCouponModal(option, item) {
      if (option === "build") {
        this.tempCoupon = {
          is_enabled: 0,
        };
        this.isNew = true;
        this.option = "build";
      } else if (option === "edit") {
        this.tempCoupon = { ...item };
        this.isNew = false;
        this.option = "edit";
      } else {
        this.tempCoupon = { ...item };
        this.isNew = true;
        this.option = "copy";
      }
      this.$refs.couponModal.openModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let url = `${VITE_URL}v2/api/${VITE_PATH}/admin/coupon/${tempCoupon.id}`;
      let httpMethod = "put";
      const data = tempCoupon;
      if (this.isNew) {
        url = `${VITE_URL}v2/api/${VITE_PATH}/admin/coupon`;
        httpMethod = "post";
      }
      this.$http[httpMethod](url, { data })
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "優惠券更新成功",
            confirmButtonColor: "#31523f",
          });
          this.getCouponList(this.currentPage);
          this.$refs.couponModal.hideModal();
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    openDeleteModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.deleteModal.openModal();
    },
    deleteCoupon(item) {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/coupon/${item.id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "優惠券刪除成功",
            confirmButtonColor: "#31523f",
          });
          this.$refs.deleteModal.hideModal();
          this.getCouponList(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    sortDates(effect) {
      if (effect === "descending") {
        this.coupons.sort((a, b) => {
          return b.due_date - a.due_date;
        });
      } else if (effect === "ascending") {
        this.coupons.sort((a, b) => {
          return a.due_date - b.due_date;
        });
      }
    },
  },
  components: {
    CouponModal,
    DeleteModal,
    PaginationEffect,
  },
  mounted() {
    this.getCouponList();
  },
};
</script>
