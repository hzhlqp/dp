import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import setting from "./setting";
import user from "./user";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setting,
    user
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3600 }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ] // 状态持久化
});
