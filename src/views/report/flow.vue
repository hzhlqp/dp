<template>
  <div class="chart-main con-main">
    <div class="chart-con">
      <div class="main-title">DOWNLOAD TRAFFIC</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left  fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.flowHistogram1.type == 'day' }
            ]"
            @click="changeChartParam(['flowHistogram1'], 'type', 'day')"
          >
            DAILY
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.flowHistogram1.type == 'week' }
            ]"
            @click="changeChartParam(['flowHistogram1'], 'type', 'week')"
          >
            WEEKS
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.flowHistogram1.type == 'month' }
            ]"
            @click="changeChartParam(['flowHistogram1'], 'type', 'month')"
          >
            MONTHS
          </div>
        </div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.flowHistogram1.value"
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
            @change="getChart(['flowHistogram1'])"
          ></el-date-picker>
        </div>
      </div>
      <div class="pie-con">
        <ve-histogram
          :data="chartDataList.flowHistogram1.data"
          :extend="chartDataList.flowHistogram1.extend.own"
          :settings="chartDataList.flowHistogram1.settings.own"
          :colors="colors"
          :loading="chartDataList.flowHistogram1.loading"
        >
          <div
            v-if="
              !chartDataList.flowHistogram1.loading &&
                !chartDataList.flowHistogram1.data.rows.length
            "
            class="data-empty"
          >
            no data
          </div>
        </ve-histogram>
      </div>
    </div>
    <div class="chart-con">
      <div class="main-title">OTA COST</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left  fx-center">
          <div
            :class="['tag-item', { on: filterData.flowLine2.type == 'day' }]"
            @click="changeChartParam(['flowLine2'], 'type', 'day')"
          >
            DAILY
          </div>
          <div
            :class="['tag-item', { on: filterData.flowLine2.type == 'week' }]"
            @click="changeChartParam(['flowLine2'], 'type', 'week')"
          >
            WEEKS
          </div>
          <div
            :class="['tag-item', { on: filterData.flowLine2.type == 'month' }]"
            @click="changeChartParam(['flowLine2'], 'type', 'month')"
          >
            MONTHS
          </div>
        </div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.flowLine2.value"
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
            @change="getChart(['flowLine2'])"
          ></el-date-picker>
        </div>
      </div>
      <div class="pie-con">
        <ve-line
          :data="chartDataList.flowLine2.data"
          :extend="chartDataList.flowLine2.extend.own"
          :colors="colors"
          :settings="chartDataList.flowLine2.settings.own"
          :loading="chartDataList.flowLine2.loading"
        >
          <div
            v-if="
              !chartDataList.flowLine2.loading &&
                !chartDataList.flowLine2.data.rows.length
            "
            class="data-empty"
          >
            no data
          </div>
        </ve-line>
      </div>
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
    flowHistogram1: {
      type: "day",
      beginDate: new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 7).format("YY|MM|DD", "-"),
      endDate: new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-"),
      value: [
        new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 7).format("YY|MM|DD", "-"),
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
      ]
    },
    flowLine2: {
      type: "day",
      beginDate: new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 7).format("YY|MM|DD", "-"),
      endDate: new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-"),
      value: [
        new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 7).format("YY|MM|DD", "-"),
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
      ]
    }
  };

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    flowHistogram1: {
      api: "getFlowflow",
      extend: {
        own: {
          tooltip(v: any) {
            v.textStyle = {
              align: "left"
            };
            v.formatter = function(params: Array<any>) {
              var relVal = params[0].name;
              var value = 0;
              for (var i = 0, l = params.length; i < l; i++) {
                value += params[i].value;
              }

              for (var j = 0, len = params.length; j < len; j++) {
                if (j === 0) {
                  relVal +=
                    "<br/> <i style='width:10px;height:10px;border-radius:50%;background:#ff2d2d;display:inline-block; margin-right:4px;'></i>total : " + value;
                }
                relVal +=
                  "<br/> <i style='width:10px;height:10px;border-radius:50%;background:" +
                  params[j].color +
                  ";display:inline-block;margin-right:4px;'></i>" +
                  params[j].seriesName +
                  " : " +
                  params[j].value;
              }

              return relVal;
            };
            return v;
          }
        },
        inherit: "histogramExtend"
      },
      data: { rows: [], columns: [] },

      // 柱状图叠加
      overlay: true,
      settings: {
        own: { stack: { chartName: [] }, yAxisName: ["GB"] }
      },
      loading: true
    },
    flowLine2: {
      api: "getFlowCost",
      extend: { own: {}, inherit: "histogramExtend" },
      data: { rows: [], columns: [] },
      settings: { own: { yAxisName: ["Amount（￥）"], area: true } },
      loading: true
    }
  };

  public mounted() {
    this.init();
  }

  public init() {
    this.getChart();
  }

  public changeChart(filterName: string, type: string) {
    this.filterData[filterName].type = type;
    this.getChart([filterName]);
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/chart.less";
@import "../../assets/less/module/date.less";
.chart-left {
  display: inline-block;
  width: 65%;
}
.chart-right {
  display: inline-block;
  width: 35%;
}
.pie-con {
  text-align: center;
}
.pie-item {
  margin-bottom: 30px;
  display: inline-block;
  margin-right: 5%;
  width: 20% !important;

  .pie-title {
    font-size: 16px;
    color: #333;
  }

  &:nth-child(4),
  &:nth-child(7) {
    margin-right: 0%;
  }

  .v-charts-data-empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    color: #888;
    font-size: 14px;
  }
}
</style>
