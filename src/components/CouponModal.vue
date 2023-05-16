<template>
  <div class="modal" tabindex="-1" ref="couponModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <v-form
          ref="form"
          class="col"
          v-slot="{ errors }"
          @submit="() => $emit('emit-update-coupon', tempCoupon)"
        >
          <div class="modal-header">
            <h5 class="modal-title">
              <span v-if="option === 'build' || option === 'copy'"
                >新增優惠卷</span
              >
              <span v-else>編輯優惠卷</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Loading-overlay :active="isLoading" :z-index="1000" />
            <div class="mb-3">
              <label for="title" class="form-label">標題*</label>
              <v-field
                id="title"
                name="標題"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['標題'] }"
                placeholder="請輸入標題"
                rules="required"
                v-model="tempCoupon.title"
              ></v-field>
              <error-message
                name="標題"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="coupon_code" class="form-label">優惠碼*</label>
              <v-field
                id="coupon_code"
                name="優惠碼"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['優惠碼'] }"
                placeholder="請輸入優惠碼"
                rules="required"
                v-model="tempCoupon.code"
              ></v-field>
              <error-message
                name="優惠碼"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="due_date" class="form-label">到期日*</label>
              <v-field
                id="due_date"
                name="到期日"
                type="date"
                class="form-control"
                placeholder="請輸入到期日"
                :class="{ 'is-invalid': errors['到期日'] }"
                :rules="minDateRule"
                :min="min_date"
                v-model="due_date"
              ></v-field>
              <error-message
                name="到期日"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="discount" class="form-label">折扣百分比*</label>
              <v-field
                id="discount"
                name="折扣百分比"
                type="number"
                class="form-control"
                :class="{ 'is-invalid': errors['折扣百分比'] }"
                placeholder="請輸入折扣百分比"
                rules="required|min_value:0|max_value:100"
                min="0"
                max="100"
                v-model.number="tempCoupon.percent"
              ></v-field>
              <error-message
                name="折扣百分比"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                />
                <label class="form-check-label" for="is_enabled"> 啟用 </label>
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
            <button type="submit" class="btn btn-primary">
              <span v-if="option === 'build' || option === 'copy'"
                >新增優惠券</span
              >
              <span v-else>儲存變更</span>
            </button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import { ErrorMessage } from "vee-validate";
export default {
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    option: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modal: "",
      tempCoupon: {},
      due_date: "",
      errors: "",
      min_date: "",
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    todayDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      this.min_date = yyyy + "-" + mm + "-" + dd;
    },
    minDateRule(value) {
      return value >= this.min_date ? true : "無法指定過去的日期";
    },
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      if (this.tempCoupon.due_date) {
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
          .toISOString()
          .split("T");
        this.due_date = dateAndTime[0];
      } else {
        this.due_date = this.min_date;
        this.tempCoupon.due_date = this.min_date;
      }
      if (this.option === "copy") {
        this.tempCoupon.title = "【複製】" + this.tempCoupon.title;
      }
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  components: {
    ErrorMessage,
  },
  mounted() {
    this.modal = new Modal(this.$refs.couponModal);
    this.todayDate();
  },
};
</script>
