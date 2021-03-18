// 路由---客户
export const customer: any[] = [
  {
    path: "/customer",
    name: "customer",
    meta: {
      title: "客户",
      index: 5
    },
    component: () => import("../views/customer/index.vue")
  }
];
