import VueRouter, { Route } from "vue-router";
import vuex from "vuex";
declare module "v-charts";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $store: vuex;
  }
}
