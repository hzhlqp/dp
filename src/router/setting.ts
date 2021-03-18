// 路由---setting
export const setting: any[] = [
  {
    path: "/setting",
    name: "setting",
    meta: {
      title: "setting",
      index: "11-1"
    },
    component: () => import("../views/setting/index.vue")
  },
  {
    path: "/setting/info",
    name: "settingInfo",
    meta: {
      title: "settingInfo",
      index: "11-2"
    },
    component: () => import("../views/setting/info.vue")
  },
  {
    path: "/setting/list",
    name: "settingList",
    meta: {
      title: "settingList",
      index: "11-2"
    },
    component: () => import("../views/setting/list.vue")
  },
  {
    path: "/setting/configure",
    name: "settingConfigure",
    meta: {
      title: "settingConfigure",
      index: "11-3"
    },
    component: () => import("../views/setting/configure.vue")
  },
  {
    path: "/setting/account",
    name: "settingAccount",
    meta: {
      title: "settingAccount",
      index: "11-4"
    },
    component: () => import("../views/setting/account.vue")
  },
  {
    path: "/setting/editAccount",
    name: "settingEditAccount",
    meta: {
      title: "settingEditAccount",
      index: "11-4"
    },
    component: () => import("../views/setting/editAccount.vue")
  },
  {
    path: "/setting/resetPassword",
    name: "settingResetPassword",
    meta: {
      title: "settingResetPassword",
      index: "11-4"
    },
    component: () => import("../views/setting/resetPassword.vue")
  },
  {
    path: "/setting/appconfig",
    name: "settingAppConfig",
    meta: {
      title: "settingAppConfig",
      index: "11-5"
    },
    component: () => import("../views/setting/appConfig.vue")
  }
];
