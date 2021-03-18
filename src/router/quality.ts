// 路由---quality
export const quality: any[] = [
  {
    path: "/quality",
    name: "quality",
    meta: {
      title: "quality",
      index: "8-1"
    },
    component: () => import("../views/quality/index.vue")
  },
  {
    path: "/quality/detail",
    name: "quality-detail",
    meta: {
      title: "quality-detail",
      index: "8-1"
    },
    component: () => import("../views/quality/detail.vue")
  }
];
