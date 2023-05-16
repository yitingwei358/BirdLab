<template>
  <div class="container py-5" style="min-height: 80vh">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h3>登入畫面</h3>
        <hr />
        <v-form ref="form" v-slot="{ errors }" @submit="login">
          <div class="form-floating mb-3">
            <v-field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="name@example.com"
              rules="email|required"
              v-model="user.username"
            ></v-field>
            <label for="username">Email address</label>
            <error-message
              name="email"
              class="invalid-feedback"
            ></error-message>
          </div>
          <div class="form-floating">
            <v-field
              id="password"
              name="密碼"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors['密碼'] }"
              placeholder="請輸入密碼"
              rules="required"
              v-model="user.password"
            ></v-field>
            <label for="password">Password</label>
            <error-message name="密碼" class="invalid-feedback"></error-message>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            :disabled="isLoading"
          >
            <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
            登入
          </button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { ErrorMessage } from "vee-validate";
const { VITE_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      const url = `${VITE_URL}v2/admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "登入成功",
            confirmButtonColor: "#31523f",
          });
          this.$router.push("/admin");
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
            text: "請輸入正確的帳號密碼",
          });
        });
    },
  },
  components: { ErrorMessage },
};
</script>
