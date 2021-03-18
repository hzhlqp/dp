// 路由---dashboard
export const dashboard: any[] = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "dashboard",
      index: 1
    },
    component: () => import("../views/dashboard/index.vue")
  }
];
