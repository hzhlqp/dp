// 路由---search
export const search: any[] = [
  {
    path: "/search",
    name: "search",
    meta: {
      title: "search",
      index: ""
    },
    component: () => import("../views/search/list.vue")
  }
];
