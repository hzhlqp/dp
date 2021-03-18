/* eslint-disable no-undef */
import Vue from "vue";
import Router from "vue-router";

// 登录
import { login } from "./login";
// 看板
import { dashboard } from "./dashboard";
// ads
import { ads } from "./ads";
// 客户
import { customer } from "./customer";
// 日常数据
import { daily } from "./daily";
// 设备
import { device } from "./device";
// 报告
import { report } from "./report";
// 订单
import { order } from "./order";
// 质量控制
import { quality } from "./quality";
// 设置
import { setting } from "./setting";
// 事件
import { event } from "./event";
// 搜索
import { search } from "./search";

Vue.use(Router);

// 合并 -- 路由
let routes: Array<any> = [
  ...login,
  ...dashboard,
  ...customer,
  ...ads,
  ...daily,
  ...device,
  ...report,
  ...order,
  ...quality,
  ...setting,
  ...event,
  ...search
];

export default new Router({
  routes
});
