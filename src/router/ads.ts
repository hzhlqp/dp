// 路由---ads
export const ads: any[] = [
  {
    path: "/ads",
    name: "ads",
    meta: {
      title: "ads",
      index: "2-1"
    },
    component: () => import("../views/ads/index.vue")
  },
  {
    path: "/ads/detail",
    name: "adsDetail",
    meta: {
      title: "ads",
      index: "2-1"
    },
    component: () => import("../views/ads/detail.vue")
  },
  {
    path: "/ads/customer",
    name: "ads",
    meta: {
      title: "ads",
      index: "2-2"
    },
    component: () => import("../views/ads/customer.vue")
  },
  {
    path: "/ads/cdetail",
    name: "adsCDetail",
    meta: {
      title: "ads",
      index: "2-1"
    },
    component: () => import("../views/ads/cdetail.vue")
  }
];
