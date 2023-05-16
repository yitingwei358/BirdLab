<template>
  <div class="modal" tabindex="-1" ref="adOrderModalTest">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">訂單內容</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Loading-overlay :active="isLoading" :z-index="1000" />
          <div class="row">
            <div class="col-lg-4">
              <h3 class="fw-bold">顧客資料</h3>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th>顧客姓名</th>
                    <td>
                      <input
                        type="text"
                        v-model="tempOrder.user.name"
                        class="form-control"
                        aria-label="CustomerName"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>
                      <input
                        type="email"
                        v-model="tempOrder.user.email"
                        class="form-control"
                        aria-label="CustomerName"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>
                      <input
                        type="tel"
                        v-model="tempOrder.user.tel"
                        class="form-control"
                        aria-label="CustomerName"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>
                      <input
                        type="text"
                        v-model="tempOrder.user.address"
                        class="form-control"
                        aria-label="CustomerName"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>留言</th>
                    <td v-if="tempOrder.message">
                      {{ tempOrder.message }}
                    </td>
                    <td v-else>( 無留言 )</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-8">
              <h3 class="fw-bold">訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th>訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else>無法讀取付款時間</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          :id="`paidSwitch2${tempOrder.id}`"
                          v-model="tempOrder.is_paid"
                        />
                        <label
                          class="form-check-label"
                          :for="`paidSwitch2${tempOrder.id}`"
                        >
                          <span v-if="tempOrder.is_paid">已付款</span>
                          <span v-else>未付款</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ $filters.currency(tempOrder.total) }}</td>
                  </tr>
                </tbody>
              </table>
              <h3 class="mt-5 fw-bold">選購商品</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th>品名</th>
                    <th>產品編號</th>
                    <th class="text-end">原價</th>
                    <th class="text-end">售價</th>
                    <th class="text-end">數量</th>
                    <th class="text-end">金額</th>
                  </tr>
                </thead>
                <tbody
                  v-for="(product, index) in tempOrder.products"
                  :key="index"
                >
                  <tr>
                    <td>{{ product.product.title }}</td>
                    <td>{{ product.product.id }}</td>
                    <td class="text-end">
                      {{ $filters.currency(product.product.origin_price) }}
                    </td>
                    <td class="text-end">
                      {{ $filters.currency(product.product.price) }}
                    </td>
                    <td class="text-end">{{ product.qty }}</td>
                    <td class="text-end">
                      {{ $filters.currency(product.total) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="text-end">
                    <td colspan="6">
                      總金額 NT$ {{ $filters.currency(tempOrder.total) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="() => $emit('emit-changeOrderData', tempOrder)"
          >
            儲存變更
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modal: "",
      tempOrder: {},
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.adOrderModalTest);
  },
};
</script>
