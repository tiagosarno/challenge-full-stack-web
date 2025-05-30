import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL =
  process.env.VUE_APP_API_URL || "http://localhost:3333/api";

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios;
  },
});
