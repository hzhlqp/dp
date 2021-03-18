import { http } from "./common";

const baseUrl: String = process.env.VUE_APP_AJAX_URL;

/**
 * 公共接口
 */

// 登录
export const login = (data: any) => http("post", `${baseUrl}/login`, data, "");
export const resetConfigPwd = (data: any) =>
  http("post", `${baseUrl}/system/mailbox/resetPwd`, data, "");

// 登出
export const logout = (data: any) =>
  http("post", `${baseUrl}/logout`, data, "");

// 登录信息
export const loginList = (data: any) =>
  http("post", `${baseUrl}/monitor/logininfor/loginList`, data, "");

// 修改密码
export const resetPwd = (data: any) =>
  http("post", `${baseUrl}/sys/user/updatePwd`, data, "");

// 用户列表
export const getUserList = (data: any) =>
  http("post", `${baseUrl}/system/user/list`, data, "");

// 导出异常客户数据 excel
export const exportFile = (data: any) =>
  http("get", `${baseUrl}/system/customer/export`, data, "");
// 导出部门异常数据 excel
export const exportDepartmentFile = (data: any) =>
  http("get", `${baseUrl}/system/customer/exportDepartment`, data, "");

// 查询客户信息
export const getCustomerList = (data: any) =>
  http("post", `${baseUrl}/system/customer/list`, data, "");

// 导入数据
export const importData = (data: any) =>
  http("post", `${baseUrl}/system/customer/importData`, data, "");

// 检查数据
export const checkData = (data: any) =>
  http("post", `${baseUrl}/system/customer/check`, data, "");

// 获取配置列表
export const getRate = (data: any) =>
  http("post", `${baseUrl}/system/config/rate`, data, "");

// 设置配置列表
export const editConfig = (data: any) =>
  http("post", `${baseUrl}/system/config/editConfig`, data, "");

// 统计数据
export const totalData = (data: any) =>
  http("get", `${baseUrl}/system/customer/checkData`, data, "");

// 获取统计数据
export const getTotalCharts = (data: any) =>
  http("post", `${baseUrl}/dashboard/active/data`, data, "");

// 数据下拉列表
export const getFilter = (data: any) =>
  http("get", `${baseUrl}/system/customer/show`, data, "");

// 获取邮箱列表
export const getEmailList = (data: any) =>
  http("post", `${baseUrl}/system/mailbox/list`, data, "");

// 修改邮箱
export const setEmail = (data: any) =>
  http("post", `${baseUrl}/system/mailbox/edit`, data, "");

// 客户信息
export const getCustomerData = (data: any) =>
  http("post", `${baseUrl}/dashboard/customer/data`, data, "");

// ADS
export const getAdsList = (data: any) =>
  http("post", `${baseUrl}/scbc/dp/ad/list`, data, "");
export const getAdsFilter = (data: any) =>
  http("post", `${baseUrl}/scbc/dp/ad/params`, data, "");
export const getCustomerDataList = (data: any) =>
  http("post", `${baseUrl}/scbc/dp/ad/customerList`, data, "");

// ADS-Detail
export const getAdsDetail = (data: any) =>
  http("post", `${baseUrl}/scbc/dp/ad/detail`, data, "");
export const getAdsCustomerDetail = (data: any) =>
  http("post", `${baseUrl}/scbc/dp/ad/customerDescList`, data, "");

// Plan list
export const getPlanList = (data: any) =>
  http("post", `${baseUrl}/plan/list`, data, "");

// Plan Detail
export const getPlanDetail = (data: any) =>
  http("post", `${baseUrl}/plan/detail`, data, "");

// Plan Active
export const getActiveDetail = (data: any) =>
  http("post", `${baseUrl}/plan/active`, data, "");

// Plan Total
export const getPlanChart = (data: any) =>
  http("post", `${baseUrl}/plan/total`, data, "");

// Plan Param
export const getPlanParam = (data: any) =>
  http("post", `${baseUrl}/plan/param`, data, "");

// Plan Export
export const getPlanExport = (data: any) =>
  http("post", `${baseUrl}/plan/export`, data, "");

/**
 *
 * 环网数据
 */
// 获取 区域 图表数据
export const getRegionCharts = (data: any) =>
  http("post", `${baseUrl}/huan/group/day/chart`, data, "");

// 获取 国家 图表数据
export const getCountryChart = (data: any) =>
  http("post", `${baseUrl}/huan/country/chart`, data, "");

// 获取 客户 图表数据
export const getCustomerCharts = (data: any) =>
  http("post", `${baseUrl}/huan/customer/chart`, data, "");

// 获取 机芯 图表数据
export const getModelCharts = (data: any) =>
  http("post", `${baseUrl}/huan/active/project/chart`, data, "");

/**
 * 设备
 * 获取 合并 图表数据
 */
export const getCustomerTotalChart = (data: any) =>
  http("post", `${baseUrl}/total/customer/chart`, data, "");
export const getCountryTotalChart = (data: any) =>
  http("post", `${baseUrl}/total/country/chart`, data, "");
export const getAreaTotalChart = (data: any) =>
  http("post", `${baseUrl}/total/area/chart`, data, "");
export const getModelTotalChart = (data: any) =>
  http("post", `${baseUrl}/total/model/chart`, data, "");

// 环网设备
export const getHWAreaChart = (data: any) =>
  http("post", `${baseUrl}/hw/area/chart`, data, "");
export const getHWCountryChart = (data: any) =>
  http("post", `${baseUrl}/hw/country/chart`, data, "");
export const getHWCustomerChart = (data: any) =>
  http("post", `${baseUrl}/hw/customer/chart`, data, "");
export const getHWModelChart = (data: any) =>
  http("post", `${baseUrl}/hw/model/chart`, data, "");

/**
 *
 * 环网数据
 */
// 获取 区域 图表数据
export const getsRegionCharts = (data: any) =>
  http("post", `${baseUrl}/scbc/group/day/chart`, data, "");

// 获取 国家 图表数据
export const getsCountryChart = (data: any) =>
  http("post", `${baseUrl}/scbc/country/chart`, data, "");

// 获取 客户 图表数据
export const getsCustomerCharts = (data: any) =>
  http("post", `${baseUrl}/scbc/customer/chart`, data, "");

// 获取 机芯 图表数据
export const getsModelCharts = (data: any) =>
  http("post", `${baseUrl}/scbc/active/project/chart`, data, "");

/**
 *
 * 图标多级页面
 */

// 国家多级页面
export const getChildGroupList = (data: any) =>
  http("post", `${baseUrl}/scbc/${data.path}/group/list`, data, "");
export const getChildExport = (data: any) =>
  http("post", `${baseUrl}/scbc/${data.path}/group/list/export`, data, "");
export const getChildDetail = (data: any) =>
  http("post", `${baseUrl}/scbc/${data.path}/group/detail`, data, "");
export const getChildDetailExport = (data: any) =>
  http("post", `${baseUrl}/scbc/${data.path}/group/detail/export`, data, "");

/**
 * order
 */
export const getFactoryList = (data: any) =>
  http("post", `${baseUrl}/scbc/factory/model/list`, data, "");
export const getFactoryTotalChart = (data: any) =>
  http("post", `${baseUrl}/scbc/factory/produce/total/chart`, data, "");
export const getFactoryGroupChart = (data: any) =>
  http("post", `${baseUrl}/scbc/factory/produce/group/chart`, data, "");
export const getFactoryAreaList = (data: any) =>
  http("post", `${baseUrl}/scbc/factory/area/list`, data, "");
export const getFactoryOrderList = (data: any) =>
  http("post", `${baseUrl}/scbc/factory/order/list`, data, "");
export const getFactoryParam = (data: any) =>
  http("post", `${baseUrl}/scbc/factory/order/params`, data, "");

/**
 * 抄写软件检测
 */
export const getFactoryReportList = (data: any) =>
  http("post", `${baseUrl}/quality/factory/report/list`, data, "");
export const getFactoryReportEdit = (data: any) =>
  http("post", `${baseUrl}/quality/factory/report/edit`, data, "");
export const getFactoryReportDetail = (data: any) =>
  http("post", `${baseUrl}/quality/factory/report/detail`, data, "");
export const getFactoryReportParam = (data: any) =>
  http("post", `${baseUrl}/quality/factory/report/param`, data, "");
export const getFactoryReportDetailParam = (data: any) =>
  http("post", `${baseUrl}/quality/factory/report/detailParam`, data, "");
export const getFlowCost = (data: any) =>
  http("post", `${baseUrl}/ota/flowCost/cost`, data, "");
export const getFlowflow = (data: any) =>
  http("post", `${baseUrl}/ota/flowCost/flow`, data, "");

/**
 * 账号管理
 */
export const getAccountList = (data: any) =>
  http("post", `${baseUrl}/sys/user/list`, data, "");
export const getAccount = (data: any) =>
  http("post", `${baseUrl}/sys/user/info`, data, "");
export const deleteAccount = (data: any) =>
  http("post", `${baseUrl}/sys/user/delete`, data, "");
export const resetPwdAccount = (data: any) =>
  http("post", `${baseUrl}/sys/user/resetPwd`, data, "");
export const updateAccount = (data: any) =>
  http("post", `${baseUrl}/sys/user/update`, data, "");
export const addAccount = (data: any) =>
  http("post", `${baseUrl}/sys/user/add`, data, "");
export const getParamAccount = (data: any) =>
  http("get", `${baseUrl}/sys/user/param`, data, "");
export const getMyInfo = (data: any) =>
  http("get", `${baseUrl}/sys/user/myInfo`, data, "");
export const getUpdateMyInfo = (data: any) =>
  http("post", `${baseUrl}/sys/user/updateInfo`, data, "");

/*
 * 事件
 */
export const getEventChart = (data: any) =>
  http("post", `${baseUrl}/scbc/app/sort/chart`, data, "");
export const getParamEvent = (data: any) =>
  http("post", `${baseUrl}/scbc/app/sort/params`, data, "");
export const getPieChart = (data: any) =>
  http("post", `${baseUrl}/scbc/app/area/pie/chart`, data, "");
export const getDistributeParam = (data: any) =>
  http("post", `${baseUrl}/scbc/poweron/day/distribute/params`, data, "");
export const getDistributeChart = (data: any) =>
  http("post", `${baseUrl}/scbc/poweron/day/distribute/chart`, data, "");
export const getDurationeChart = (data: any) =>
  http("post", `${baseUrl}/scbc/poweron/duration/distribute/chart`, data, "");
export const getOnDeviceChart = (data: any) =>
  http("post", `${baseUrl}/scbc/poweron/duration/oneDevice/chart`, data, "");

/**
 * 搜索模块
 */

//  列表
export const getModelList = (data: any) =>
  http("post", `${baseUrl}/scbc/factory/model/type/list`, data, "");
export const getModelParams = (data: any) =>
  http("post", `${baseUrl}/scbc/factory/model/type/params`, data, "");

// event
export const getEventUserList = (data: any) =>
  http("post", `${baseUrl}/event/userInfo/list`, data, "");
export const exportUserInfo = (data: any) =>
  http("post", `${baseUrl}/event/userInfo/export`, data, "");
export const getSeviceParam = (data: any) =>
  http("post", `${baseUrl}/event/serviceOption/params`, data, "");
export const getSeviceChart = (data: any) =>
  http("post", `${baseUrl}/event/serviceOption/distribute`, data, "");
export const getUserInfoParam = (data: any) =>
  http("post", `${baseUrl}/event/userInfo/params`, data, "");

// event tvEvent
export const getSourceParam = (data: any) =>
  http("post", `${baseUrl}/event/source/params`, data, "");
export const getSourceChart = (data: any) =>
  http("post", `${baseUrl}/event/source/num`, data, "");
export const getNetworkChart = (data: any) =>
  http("post", `${baseUrl}/event/network/isp`, data, "");
export const getNetworkTypeChart = (data: any) =>
  http("post", `${baseUrl}/event/network/type`, data, "");
export const getAppList = (data: any) =>
  http("post", `${baseUrl}/event/applicationFormat/list`, data, "");
export const setApp = (data: any) =>
  http("post", `${baseUrl}/event/applicationFormat/update`, data, "");

export const getChartParam = (data: any) =>
  http("post", `${baseUrl}/event/channel/params`, data, "");
export const getChannelTitle = (data: any) =>
  http("post", `${baseUrl}/event/channel/title`, data, "");
export const getChannelRate = (data: any) =>
  http("post", `${baseUrl}/event/channel/rate`, data, "");

// youtube
export const getYoutubeDistribution = (data: any) =>
  http("post", `${baseUrl}/event/youtube/distribution`, data, "");
export const getYoutubeView = (data: any) =>
  http("post", `${baseUrl}/event/youtube/views`, data, "");
export const getYoutubeParam = (data: any) =>
  http("post", `${baseUrl}/event/youtube/params`, data, "");

export const getAppChart = (data: any) =>
  http("post", `${baseUrl}/scbc/app/trend`, data, "");

//daily
export const getYoutubeChannel = (data: any) =>
  http("post", `${baseUrl}/event/youtube/channel`, data, "");
export const getAppTop = (data: any) =>
  http("post", `${baseUrl}/scbc/app/top`, data, "");
export const getCoverage = (data: any) =>
  http("post", `${baseUrl}/scbc/dp/ad/coverage`, data, "");
export const getGrowth = (data: any) =>
  http("post", `${baseUrl}/scbc/dp/ad/growth`, data, "");
export const getDistributionChart = (data: any) =>
  http("post", `${baseUrl}/total/customer/model/distribution`, data, "");
export const getTrendChart = (data: any) =>
  http("post", `${baseUrl}/total/customer/trend`, data, "");
export const getDeviceDistributionChart = (data: any) =>
  http("post", `${baseUrl}/scbc/device/distribution`, data, "");
export const getCustomerParam = (data: any) =>
  http("get", `${baseUrl}/system/customer/customerList`, data, "");
