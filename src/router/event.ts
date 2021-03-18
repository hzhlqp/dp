// 路由---事件
export const event: any[] = [
  {
    path: "/event",
    name: "event",
    meta: {
      title: "事件",
      index: "9-1"
    },
    component: () => import("../views/event/summary.vue")
  },
  {
    path: "/event/power",
    name: "eventPower",
    meta: {
      title: "事件",
      index: "9-2"
    },
    component: () => import("../views/event/power.vue")
  },
  {
    path: "/event/youtube",
    name: "eventYoutube",
    meta: {
      title: "事件",
      index: "9-3"
    },
    component: () => import("../views/event/youtube.vue")
  },
  // {
  //   path: "/event/tvsetting",
  //   name: "tvSetting",
  //   meta: {
  //     title: "tvSetting",
  //     index: "9-4"
  //   },
  //   component: () => import("../views/event/tvSetting.vue")
  // },
  {
    path: "/event/tvevent",
    name: "tvEvent",
    meta: {
      title: "tvEvent",
      index: "9-5"
    },
    component: () => import("../views/event/tvEvent.vue")
  },
  {
    path: "/event/dtv",
    name: "dtv",
    meta: {
      title: "dtv",
      index: "9-6"
    },
    component: () => import("../views/event/dtv.vue")
  }
];
