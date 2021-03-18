/**
 *
 */
import { Setting } from "./interface";
const state: Setting = {
  isCollapse: true,
  collapseCall: "open"
};

const getters = {
  getCollapse: (state: Setting) => state.isCollapse,
  getCollapseCall: (state: Setting) => state.collapseCall
};

const mutations = {
  SET_COLLAPSE(state: Setting, data: Boolean) {
    state.isCollapse = data;
  },
  SET_COLLAPSE_CALL(state: Setting, data: string) {
    state.collapseCall = data;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
