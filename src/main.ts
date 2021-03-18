import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import html2canvas from "html2canvas";

/**
 *
 *  charts
 */
import VCharts from "v-charts";
Vue.use(VCharts);

/**
 *  公共css
 */
import "@/assets/less/global.less";
/**
 *  element ui
 */
import "element-ui/lib/theme-chalk/index.css";
import * as element from "element-ui";
Vue.use(element);

import utils from "./utils/utils";
Vue.prototype.$dspDate = utils.DspDate;
Vue.prototype.$html2canvas = html2canvas;

/**
 * 封装的组件
 */
// import components from '@/components/index.ts'
// Vue.use(components)

Vue.prototype.apiUrl = process.env.VUE_APP_AJAX_URL;
Vue.config.productionTip = false;

import locale from "element-ui/lib/locale/lang/en";
Vue.use(element, { locale });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
