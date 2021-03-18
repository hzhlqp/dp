<template>
  <div class="chart-main con-main">
    <div class="chart-con">
      <div class="chart-title">DAILY PRODUCTION QUANTITY</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.oDashboardHistogram1.timeType == 'day' }
            ]"
            @click="
              changeChartParam(
                ['oDashboardHistogram1', 'oDashboardLine2'],
                'timeType',
                'day'
              )
            "
          >
            DAILY
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.oDashboardHistogram1.timeType == 'week' }
            ]"
            @click="
              changeChartParam(
                ['oDashboardHistogram1', 'oDashboardLine2'],
                'timeType',
                'week'
              )
            "
          >
            WEEKS
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.oDashboardHistogram1.timeType == 'month' }
            ]"
            @click="
              changeChartParam(
                ['oDashboardHistogram1', 'oDashboardLine2'],
                'timeType',
                'month'
              )
            "
          >
            MONTHS
          </div>
        </div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.oDashboardHistogram1.value"
            type="daterange"
            :picker-options="pickerOptions()"
            range-separator="-"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :clearable="false"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            prefix-icon="el-icon-date"
            :unlink-panels="false"
            @change="getChart(['oDashboardHistogram1', 'oDashboardLine2'])"
          ></el-date-picker>
        </div>
      </div>
      <ve-histogram
        :data="chartDataList.oDashboardHistogram1.data"
        :extend="chartDataList.oDashboardHistogram1.extend.own"
        :colors="colors"
        :loading="chartDataList.oDashboardHistogram1.loading"
      >
        <div
          v-if="
            !chartDataList.oDashboardHistogram1.loading &&
              !chartDataList.oDashboardHistogram1.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-histogram>
      <div class="line"></div>
      <ve-line
        :data="chartDataList.oDashboardLine2.data"
        :settings="chartDataList.oDashboardLine2.settings.own"
        :colors="colors"
        :loading="chartDataList.oDashboardLine2.loading"
      >
        <div
          v-if="
            !chartDataList.oDashboardLine2.loading &&
              !chartDataList.oDashboardLine2.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-line>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import filterMixins from "../../mixins/filter";
import chartMixins from "../../mixins/chart";
import dateMixins from "../../mixins/date";

@Component
export default class eventIndex extends Mixins(filterMixins, chartMixins, dateMixins) {
  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public filterData = {
    oDashboardHistogram1: {
      timeType: "day",
      beginDate: new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 7).format("YY|MM|DD", "-"),
      endDate: new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-"),
      value: [
        new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 7).format("YY|MM|DD", "-"),
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
      ]
    },
    oDashboardLine2: {}
  };

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    oDashboardHistogram1: {
      api: "getFactoryTotalChart",
      extend: { own: {}, inherit: "histogramExtend" },
      data: { rows: [], columns: [] },
      settings: {
        own: {},
        inherit: "histogramSetting"
      }
    },
    oDashboardLine2: {
      filterName: "oDashboardHistogram1",
      api: "getFactoryGroupChart",
      extend: { own: {}, inherit: "lineExtend" },
      data: { rows: [], columns: [] },
      settings: { own: { area: true } }
    }
  };

  public mounted() {
    this.init();
  }

  public init() {
    this.getChart();
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/chart.less";
@import "../../assets/less/module/date.less";
.line {
  height: 1px;
  width: 100%;
  margin: 20px 0 50px;
  background: #eee;
}
</style>
