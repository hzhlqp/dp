// 路由---quality
export const report: any[] = [
  {
    path: "/report",
    name: "report",
    meta: {
      title: "report",
      index: 6
    },
    component: () => import("../views/report/index.vue")
  },
  {
    path: "/report/detail",
    name: "reportDeatil",
    meta: {
      title: "reportDeatil",
      index: 6
    },
    component: () => import("../views/report/detail.vue")
  },
  {
    path: "/report/flow",
    name: "reportFlow",
    meta: {
      title: "reportFlow",
      index: 6
    },
    component: () => import("../views/report/flow.vue")
  }
];
