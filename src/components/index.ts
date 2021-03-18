import Vue from "vue";

import header from "./header.vue";
import menu from "./menu.vue";
import print from "./print.vue";

//
Vue.component(header.name, header);
Vue.component(menu.name, menu);
Vue.component(print.name, print);

export default {
  header,
  menu,
  print,
};
