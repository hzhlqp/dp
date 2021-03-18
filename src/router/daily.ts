// 路由---daily
export const daily: any[] = [
  {
    path: "/daily",
    name: "daily",
    meta: {
      title: "daily",
      index: 3,
    },
    component: () => import("../views/daily/index.vue"),
  },
  // {
  //   path: "/daily/index2",
  //   name: "daily",
  //   meta: {
  //     title: "daily",
  //     index: 3,
  //   },
  //   component: () => import("../views/daily/index2.vue"),
  // },
];
