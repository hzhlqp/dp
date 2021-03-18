/**
 *
 */
import { User } from "./interface";
const state: User = {
  token: "",
  userInfo: {
    avatar: "",
    email: "",
    id: -1,
    name: "",
    phone: "",
    sex: ""
  }
};

const getters = {
  getToken: (state: User) => state.token,
  getUserInfo: (state: User) => state.userInfo
};

const mutations = {
  SET_TOKEN(state: User, data: string) {
    state.token = data;
  },
  SET_USER_INFO(state: User, data: User["userInfo"]) {
    state.userInfo = data;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
