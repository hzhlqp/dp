<template>
  <div class="customer-main con-main">
    <a href="javascript:;" class="back" @click="$router.go(-1)"> < Back</a>
    <div class="main-title">GLOBAL OTA DETAIL</div>
    <div class="chart-title fxj-end">
      <a
        class="import fx-center"
        :href="apiUrl + '/common/download?fileName=' + downLink"
        :download="downLink"
      >
        <i class="icon icon-import"></i>
        <span>Export</span>
      </a>
      <a class="chose-time fx-center" href="javascript:;" @click="choseSelect">
        <i class="icon icon-time"></i>
        <span>Daily</span>
      </a>
      <ul v-if="isShowSelect" class="time-select">
        <li :class="{ on: timeType === 1 }" @click="getPlanChart(1)">
          Last Week
        </li>
        <li :class="{ on: timeType === 2 }" @click="getPlanChart(2)">
          Last Months
        </li>
        <li :class="{ on: timeType === 3 }" @click="getPlanChart(3)">
          Last Three Months
        </li>
      </ul>
    </div>
    <div class="chart-con">
      <ve-histogram
        :events="chartEvents"
        :data="adsChartData"
        :extend="TopExtend"
        :settings="chartSettings"
      ></ve-histogram>
    </div>
    <el-table
      v-loading="loading"
      empty-text="No Data"
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      @sort-change="sortChange"
    >
      <el-table-column type="index" label="NO" width="100"></el-table-column>
      <el-table-column
        sortable="custom"
        property="dnum"
        label="UserID"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="model"
        label="SoC"
      ></el-table-column>
      <!-- <el-table-column sortable="custom"property="ip" label="IP" width="300"></el-table-column> -->
      <el-table-column
        sortable="custom"
        property="area"
        label="Country"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="createTime"
        label="Upgrade Time"
      ></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="filterData.params.pageNum"
        @current-change="getTable"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import tableMixins from "../../mixins/table";
import filterMixins from "../../mixins/filter";
@Component
export default class reportDetail extends Mixins(tableMixins, filterMixins) {
  constructor() {
    super();
    // 图表事件
    this.chartEvents = {
      click: this.chartClick
    };
  }

  // 后端接口名
  private tableApi = "getPlanDetail";

  private timeType: number | undefined = 1;

  private chartSettings = {
    axisSite: { right: ["coverage"] },
    yAxisType: ["MB", "percent"],
    yAxisName: ["", ""]
  };

  private TopExtend = {
    barWidth: "20px",
    legend: {
      show: true
    },
    grid: {
      right: "20"
    },
    "yAxis.0": { max: 2000 },
    yAxis(item: Array<any>) {
      let max0 = item[0].max | 2000;
      Object.assign(item[0], {
        min: 0,
        max: max0,
        interval: (max0 / 5) | 0
      });
      Object.assign(item[1], {
        min: 0,
        max: 1,
        interval: 1 / 5
      });
      return item;
    }
  };

  maxActive = 0;
  maxCoverage = 0;

  private adsChartData = {
    columns: [],
    rows: []
  };

  private downLink: string = "";

  // 过滤表单
  public filterData = {
    planId: "", //software
    updateWeek: "",
    updateDay: "",
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "createTime",
      isAsc: "desc"
    }
  };

  private filterChartData = {
    planId: "", //software
    startTime: "",
    endTime: ""
  };

  // 下拉框控制
  private isShowSelect: boolean = false;

  //
  public mounted() {
    this.filterData.planId = String(this.$route.query.planId);
    this.filterChartData.planId = String(this.$route.query.planId);

    this.init();
  }

  public init() {
    this.getTable();
    this.getPlanChart(1);
  }

  private async getPlanExport() {
    let res = await api.getPlanExport(this.filterChartData);
    this.downLink = res.fileName;
  }

  private async getPlanChart(value?: number) {
    this.isShowSelect = false;
    this.startSum = 0;
    this.timeType = value;
    if (this.timeType === 1) {
      this.startSum -= 1000 * 3600 * 24 * 7;
    } else if (this.timeType === 2) {
      this.startSum -= 1000 * 3600 * 24 * 7 * 4;
    } else if (this.timeType === 3) {
      this.startSum -= 1000 * 3600 * 24 * 7 * 4 * 3;
    }

    this.filterChartData.endTime = new this.$dspDate(
      new Date().valueOf()
    ).format("YY|MM|DD|HH:MM:SS", "-");

    this.filterChartData.startTime = new this.$dspDate(
      new Date().valueOf() + this.startSum
    ).format("YY|MM|DD|HH:MM:SS", "-");

    let res = await api.getPlanChart(this.filterChartData);
    var coverageArr: Array<number> = [];
    var activeArr: Array<number> = [];
    if (res.list.length) {
      res.list.map((i: any) => {
        i.coverage = i.coverage.split("%")[0] / 100;
        coverageArr.push(i.coverage);
        activeArr.push(i.active);
      });
    }
    this.maxActive = Math.max(...activeArr);
    this.maxCoverage = Math.max(...coverageArr);
    this.adsChartData.rows = res.list;
    this.adsChartData.columns = res.title;
    this.TopExtend["yAxis.0"].max = this.maxActive;

    // 调用下载接口
    this.getPlanExport();
  }

  // 图表点击事件
  chartClick(e: any) {
    if (this.timeType === 1) {
      this.filterData.updateDay = e.name;
      this.filterData.updateWeek = "";
    } else {
      this.filterData.updateWeek = e.name;
      this.filterData.updateDay = "";
    }

    if (e.seriesName === "upgrade") {
      this.tableApi = "getPlanDetail";
    } else if (e.seriesName === "active") {
      this.tableApi = "getActiveDetail";
    }

    this.getTable();
  }

  private async choseSelect() {
    this.isShowSelect = !this.isShowSelect;
  }
}
</script>

<style lang="less" scoped>
.customer-main {
  padding-bottom: 30px;
}
.chart-title {
  position: relative;
  .import {
    color: #1b253a;
    font-size: 16px;
  }
  .icon-import {
    margin-right: 10px;
    width: 26px;
    height: 20px;
    background-image: url("../../assets/img/import.png");
  }

  .chose-time {
    margin-left: 20px;
    padding-right: 20px;
    color: #1b253a;
    font-size: 16px;
  }
  .icon-time {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    background-image: url("../../assets/img/time.png");
  }

  .time-select {
    position: absolute;
    right: 20px;
    top: 40px;
    z-index: 1;
    border: 1px solid #eee;
    padding: 0 10px;
    background: #fff;

    li {
      cursor: pointer;
      line-height: 30px;

      &.on {
        color: #409eff;
      }
    }
  }
}
</style>
