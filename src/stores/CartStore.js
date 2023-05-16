import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore("CartStore", {
  state: () => ({
    carts: [],
    cartNum: 0,
    total: 0,
    final_total: 0,
    isLoading: true,
    buttonDisable: false,
  }),
  actions: {
    getCarts() {
      this.isLoading = true;
      axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.isLoading = false;
          this.carts = res.data.data.carts;
          this.total = res.data.data.total;
          this.final_total = res.data.data.final_total;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    updateCartItem(item) {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/cart/${item.id}`;
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      axios
        .put(url, { data })
        .then(() => {
          this.getCarts();
          Swal.fire({
            icon: "success",
            title: "數量更改成功",
            confirmButtonColor: "#31523f",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    addToCart(product_id, qty = 1) {
      this.buttonDisable = true;
      const data = {
        data: {
          product_id,
          qty,
        },
      };
      axios
        .post(`${VITE_URL}v2/api/${VITE_PATH}/cart`, data)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "已加入購物車",
            confirmButtonColor: "#31523f",
          });
          this.buttonDisable = false;
          this.getCarts();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    deleteCartItem(item) {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/cart/${item.id}`;
      axios
        .delete(url)
        .then(() => {
          this.getCarts();
          Swal.fire({
            icon: "success",
            title: "刪除成功",
            confirmButtonColor: "#31523f",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    deleteAllCart() {
      this.isLoading = true;
      const url = `${VITE_URL}v2/api/${VITE_PATH}/carts`;
      axios
        .delete(url)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "購物車已清空",
            confirmButtonColor: "#31523f",
          });
          this.getCarts();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
  },
});
