<template>
  <div class="container py-5" style="min-height: 80vh">
    <Loading-overlay :active="isLoading" :z-index="1000" />
    <div class="row justify-content-center">
      <div class="col-lg-6 p-3">
        <h3 class="fs-2 text-center fw-bold mb-2">您的購物車清單</h3>
        <div v-if="this.carts.length === 0" class="text-center">
          <p class="fs-4 text-forest fw-bold mt-5 mb-3">您還沒加入任何商品呦</p>
          <RouterLink
            to="/products"
            type="button"
            class="btn btn-lg btn-primary"
            >去逛逛
          </RouterLink>
        </div>
        <div class="d-flex justify-content-end mb-3">
          <button
            class="btn btn-outline-danger p-2"
            type="button"
            @click="deleteAllCart"
            v-show="this.carts.length !== 0"
          >
            清空購物車
          </button>
        </div>
        <div class="bg-light p-2" v-show="this.carts.length !== 0">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="this.carts">
                <tr v-for="item in carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="() => deleteCartItem(item)"
                    >
                      x
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group my-2">
                        <input
                          type="number"
                          class="form-control"
                          min="1"
                          max="50"
                          v-model="item.qty"
                          @change="() => updateCartItem(item)"
                        />
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    {{ $filters.currency(item.total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">
                  <div class="input-group d-flex align-items-center">
                    <label for="couponCode" class="me-3">折扣碼</label>
                    <input
                      type="text"
                      class="form-control"
                      id="couponCode"
                      v-model="couponCode"
                      placeholder="請輸入折扣代碼"
                    />
                    <button
                      type="submit"
                      @click="() => getCoupon(couponCode)"
                      class="btn btn-outline-primary"
                      :disabled="!couponCode || checkingCoupon"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="checkingCoupon"
                      ></i>
                      使用
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ $filters.currency(this.total) }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">
                  {{ $filters.currency(this.final_total) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <OrderForm
          @emit-refresh="() => getCarts()"
          v-show="this.carts.length !== 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import CartStore from "@/stores/CartStore.js";
import OrderForm from "./OrderForm.vue";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      productId: "",
      cart: {
        carts: {},
      },
      couponCode: "",
      checkingCoupon: false,
      footerSticky: false,
    };
  },
  components: {
    OrderForm,
  },
  methods: {
    ...mapActions(CartStore, [
      "getCarts",
      "updateCartItem",
      "deleteCartItem",
      "deleteAllCart",
    ]),
    getCoupon(couponCode) {
      this.checkingCoupon = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/coupon`;
      const data = {
        code: couponCode,
      };
      this.$http
        .post(url, { data })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: res.data.message,
            confirmButtonColor: "#31523f",
          });
          this.checkingCoupon = false;
          this.couponCode = "";
          this.getCarts();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
            text: "請輸入正確的優惠代碼",
          });
          this.checkingCoupon = false;
          this.couponCode = "";
        });
    },
  },
  computed: {
    ...mapState(CartStore, ["carts", "total", "final_total", "isLoading"]),
  },
  mounted() {
    this.getCarts();
  },
};
</script>
