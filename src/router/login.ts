// 路由---登录
export const login: any[] = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      index: false
    },
    component: () => import("../views/login/login.vue")
  }
];
