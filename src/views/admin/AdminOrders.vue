<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div>
        <h3 class="mb-0">訂單頁面</h3>
        <Loading-overlay :active="isLoading" :z-index="1000" />
      </div>
    </div>
    <div class="row">
      <div class="table-responsive table-container table-scroll">
        <table class="table my-4 text-nowrap">
          <thead class="table-light">
            <tr>
              <th scope="col" width="20%">訂單編號</th>
              <th scope="col" width="10%">姓名</th>
              <th scope="col" width="15%">購買時間</th>
              <th scope="col" width="20%">品項</th>
              <th scope="col" width="10%">總金額</th>
              <th scope="col" width="10%" class="text-end">付款狀態</th>
              <th scope="col" width="10%" class="text-end">編輯</th>
            </tr>
          </thead>
          <tbody v-for="item in orders" :key="item.id">
            <tr
              v-if="orders.length"
              :class="{ 'text-secondary': !item.is_paid }"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.user.name }}</td>
              <td>{{ $filters.date(item.create_at) }}</td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(product, i) in item.products" :key="i">
                    {{ product.product.title }} * {{ product.qty }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td class="text-end">{{ $filters.currency(item.total) }}</td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    :id="`paidSwitch${item.id}`"
                    v-model="item.is_paid"
                    @change="() => updatePaid(item)"
                  />
                  <label class="form-check-label" :for="`paidSwitch${item.id}`">
                    <span v-if="item.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="() => openOrderModal(item)"
                  >
                    查看
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="() => openDelOrderModal(item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationEffect :pages="pagination" @emit-pages="getOrderList" />
      </div>
    </div>
  </div>
  <AdminOrderModal
    ref="orderModalCom"
    :order="tempOrder"
    :is-loading="isLoading"
    @emit-change-order-data="changeOrderData"
  />
  <DeleteModal
    ref="deleteModal"
    :item="tempOrder"
    :is-loading="isLoading"
    @emit-delete="deleteOrder"
  />
</template>

<script>
import AdminOrderModal from "@/components/AdminOrderModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import PaginationEffect from "@/components/PaginationEffect.vue";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      currentPage: 1,
      isLoading: false,
    };
  },
  methods: {
    getOrderList(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/orders/?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          const { orders, pagination } = res.data;
          this.orders = orders;
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
    updatePaid(item) {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/order/${item.id}`;
      const data = {
        is_paid: item.is_paid,
        message: item.user.message,
        user: {
          address: item.user.address,
          email: item.user.email,
          name: item.user.name,
          tel: item.user.tel,
        },
      };
      this.$http
        .put(url, { data })
        .then(() => {
          this.getOrderList(this.currentPage);
          const adOrderModalComponent = this.$refs.orderModalCom;
          adOrderModalComponent.hideModal();
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "付款狀態更新成功",
            confirmButtonColor: "#31523f",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
          this.isLoading = false;
        });
    },
    openOrderModal(item) {
      this.tempOrder = { ...item };
      const adOrderModalComponent = this.$refs.orderModalCom;
      adOrderModalComponent.openModal();
    },
    changeOrderData(tempOrder) {
      Swal.fire({
        title: "確定要儲存變更嗎?",
        text: "原始資料將被覆寫",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "儲存",
        confirmButtonColor: "#31523f",
        cancelButtonText: "取消",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/order/${tempOrder.id}`;
          const data = {
            is_paid: tempOrder.is_paid,
            user: {
              address: tempOrder.user.address,
              email: tempOrder.user.email,
              name: tempOrder.user.name,
              tel: tempOrder.user.tel,
            },
          };
          this.$http
            .put(url, { data })
            .then(() => {
              this.isLoading = false;
              Swal.fire({
                icon: "success",
                title: "訂單更新成功",
                confirmButtonColor: "#31523f",
              });
              this.getOrderList(this.currentPage);
              this.$refs.orderModalCom.hideModal();
            })
            .catch((err) => {
              this.isLoading = false;
              Swal.fire({
                icon: "error",
                title: err.response.data.message,
              });
            });
        }
      });
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      const adDelOrderModalComponent = this.$refs.deleteModal;
      adDelOrderModalComponent.openModal();
    },
    deleteOrder(item) {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/order/${item.id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "訂單刪除成功",
            confirmButtonColor: "#31523f",
          });
          this.getOrderList(this.currentPage);
          const adDelOrderModalComponent = this.$refs.deleteModal;
          adDelOrderModalComponent.hideModal();
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
  },
  components: {
    AdminOrderModal,
    DeleteModal,
    PaginationEffect,
  },
  mounted() {
    this.getOrderList();
  },
};
</script>
