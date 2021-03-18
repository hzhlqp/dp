// 路由---order
export const order: any[] = [
  {
    path: "/order",
    name: "order",
    meta: {
      title: "order",
      index: "7-1"
    },
    component: () => import("../views/order/dashboard.vue")
  },
  {
    path: "/order/data",
    name: "orderData",
    meta: {
      title: "orderData",
      index: "7-2"
    },
    component: () => import("../views/order/data.vue")
  },
  {
    path: "/order/region",
    name: "orderRegion",
    meta: {
      title: "orderRegion",
      index: "7-3"
    },
    component: () => import("../views/order/region.vue")
  },
  {
    path: "/order/ic",
    name: "orderIc",
    meta: {
      title: "orderIc",
      index: "7-4"
    },
    component: () => import("../views/order/ic.vue")
  }
];
