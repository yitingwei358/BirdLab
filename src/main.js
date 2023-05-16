import { createApp } from "vue";
import { createPinia } from "pinia";
import { date, currency } from "./methods/filters";
import App from "./App.vue";
import router from "./router";

//Sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const options = {
  confirmButtonColor: "#31523f",
  cancelButtonColor: "#ff7674",
};

// axios
import axios from "axios";
import VueAxios from "vue-axios";

// bootstrap
import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.bundle"; //popper才能一起

// vue3-loading-overlay'
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

// CKEditor
import CKEditor from "@ckeditor/ckeditor5-vue";

// veevalidate
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules";
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
//地區化
import { configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import zh_TW from "@vee-validate/i18n/dist/locale/zh_TW.json";
configure({
  generateMessage: localize({ zh_TW }),
  validateOnInput: true,
});
setLocale("zh_TW");

const app = createApp(App);
app.use(VueSweetalert2, options);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);
app.config.globalProperties.$filters = {
  date,
  currency,
};
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.component("LoadingOverlay", Loading);

app.mount("#app");
