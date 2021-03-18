// 路由---device
export const device: any[] = [
  {
    path: "/device",
    name: "device",
    meta: {
      title: "device",
      index: "4-1",
    },
    component: () => import("../views/device/index.vue"),
  },
  {
    path: "/device/sIndex",
    name: "deviceSindex",
    meta: {
      title: "device",
      index: "4-2",
    },
    component: () => import("../views/device/sIndex.vue"),
  },
  {
    path: "/device/dpIndex",
    name: "dpIndex",
    meta: {
      title: "device",
      index: "4-3",
    },
    component: () => import("../views/device/dpIndex.vue"),
  },
  {
    path: "/device/mergeIndex",
    name: "mergeIndex",
    meta: {
      title: "device",
      index: "4-4",
    },
    component: () => import("../views/device/mergeIndex.vue"),
  },
  {
    path: "/device/childsIndex",
    name: "deviceChildsIndex",
    meta: {
      title: "device",
      index: "4-2",
    },
    component: () => import("../views/device/childsIndex.vue"),
  },
  {
    path: "/device/childTwosIndex",
    name: "deviceChildTwosIndex",
    meta: {
      title: "device",
      index: "4-2",
    },
    component: () => import("../views/device/childTwosIndex.vue"),
  },
];
