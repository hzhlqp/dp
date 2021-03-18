<template>
  <div class="chart-main con-main">
    <div class="chart-con">
      <div class="main-title">POWERON DISTRIBUTION</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="filterData.powerLine1">
          <el-form-item label="Customer">
            <el-select
              v-model="filterData.powerLine1.customer"
              filterable
              no-match-text="No matching data"
              placeholder="Select Customer"
              clearable
              @change="getParam(getChart, ['powerLine1', 'powerHistogram2'])"
            >
              <el-option
                v-for="item in options.customerList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Area">
            <el-select
              v-model="filterData.powerLine1.area"
              filterable
              no-match-text="No matching data"
              placeholder="Select Area"
              clearable
              @change="getParam(getChart, ['powerLine1', 'powerHistogram2'])"
            >
              <el-option
                v-for="item in options.areaList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Country">
            <el-select
              v-model="filterData.powerLine1.country"
              filterable
              no-match-text="No matching data"
              placeholder="Select Country"
              clearable
              @change="getParam(getChart, ['powerLine1', 'powerHistogram2'])"
            >
              <el-option
                v-for="item in options.countryList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Model">
            <el-select
              v-model="filterData.powerLine1.model"
              filterable
              no-match-text="No matching data"
              placeholder="Select Model"
              clearable
              @change="getParam(getChart, ['powerLine1', 'powerHistogram2'])"
            >
              <el-option
                v-for="item in options.modelList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getParam(getChart, ['powerLine1', 'powerHistogram2'])"
              >Search</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-tag fxc-between">
        <div class="tag-left  fx-center"></div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.powerLine1.value"
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
            @change="getParam(getChart, ['powerLine1', 'powerHistogram2'])"
          ></el-date-picker>
        </div>
      </div>
      <ve-line
        :data="chartDataList.powerLine1.data"
        :extend="chartDataList.powerLine1.extend.own"
        :colors="colors"
        :settings="{ yAxisName: ['Sets'] }"
        :loading="chartDataList.powerLine1.loading"
      >
        <div
          v-if="
            !chartDataList.powerLine1.loading &&
              !chartDataList.powerLine1.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-line>
    </div>

    <div class="chart-con">
      <div class="main-title">DAILY USER DURATION</div>
      <div class="pie-con">
        <ve-histogram
          :data="chartDataList.powerHistogram2.data"
          :extend="chartDataList.powerHistogram2.extend.own"
          :colors="colors"
          :settings="{ yAxisName: ['Sets'] }"
          :loading="chartDataList.powerHistogram2.loading"
        >
          <div
            v-if="
              !chartDataList.powerHistogram2.loading &&
                !chartDataList.powerHistogram2.data.rows.length
            "
            class="data-empty"
          >
            no data
          </div>
        </ve-histogram>
      </div>
    </div>

    <div class="chart-con">
      <div class="main-title">WATCHING TV DURATION</div>
      <el-form :inline="true" :model="filterData.powerHistogram3">
        <el-form-item label="UserId">
          <el-input v-model="filterData.powerHistogram3.userId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeChartParam">Search</el-button>
        </el-form-item>
      </el-form>
      <div class="chart-tag fxc-between">
        <div class="tag-left  fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.powerHistogram3.timeType == 'day' }
            ]"
            @click="changeChartParam(['powerHistogram3'], 'timeType', 'day')"
          >
            DAILY
          </div>
          <div
            :class="[
              'tag-item',
              {
                on: filterData.powerHistogram3.timeType == 'week'
              }
            ]"
            @click="changeChartParam(['powerHistogram3'], 'timeType', 'week')"
          >
            WEEKS
          </div>
          <div
            :class="[
              'tag-item',
              {
                on: filterData.powerHistogram3.timeType == 'month'
              }
            ]"
            @click="changeChartParam(['powerHistogram3'], 'timeType', 'month')"
          >
            MONTHS
          </div>
        </div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.powerHistogram3.value"
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
            @change="getChart(['powerHistogram3'])"
          ></el-date-picker>
        </div>
      </div>
      <div class="pie-con">
        <ve-histogram
          :data="chartDataList.powerHistogram3.data"
          :mark-line="markLine"
          :extend="chartDataList.powerHistogram3.extend.own"
          :colors="colors"
          :settings="{ yAxisName: ['min'] }"
          :loading="chartDataList.powerHistogram3.loading"
        >
          <div
            v-if="
              !chartDataList.powerHistogram3.loading &&
                !chartDataList.powerHistogram3.data.rows.length
            "
            class="data-empty"
          >
            no data
          </div>
        </ve-histogram>
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
export default class eventIndex extends Mixins(
  filterMixins,
  chartMixins,
  dateMixins
) {
  public paramApi = "getDistributeParam";

  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public filterData = {
    powerLine1: {
      area: "",
      country: "",
      model: "",
      customer: "",
      beginDate: new this.$dspDate(
        new Date().valueOf() - 3600 * 1000 * 24 * 7
      ).format("YY|MM|DD", "-"),
      endDate: new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-"),
      value: [
        new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 7).format(
          "YY|MM|DD",
          "-"
        ),
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
      ]
    },
    powerHistogram3: {
      userId: "",
      timeType: "day",
      beginDate: new this.$dspDate(
        new Date().valueOf() - 3600 * 1000 * 24 * 7
      ).format("YY|MM|DD", "-"),
      endDate: new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-"),
      value: [
        new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 7).format(
          "YY|MM|DD",
          "-"
        ),
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
      ]
    }
  };

  private markLine = {
    data: [
      {
        name: "平均线",
        type: "average"
      }
    ]
  };

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    powerLine1: {
      api: "getDistributeChart",
      extend: { own: {}, inherit: "lineExtend" },
      data: { rows: [], columns: [] },
      loading: true
    },
    powerHistogram2: {
      // 共用条件
      filterName: "powerLine1",
      api: "getDurationeChart",
      extend: { own: {}, inherit: "histogramExtend" },
      data: { rows: [], columns: [] },
      loading: true
    },
    powerHistogram3: {
      api: "getOnDeviceChart",
      extend: {
        own: {
          grid: {
            right: "100"
          }
        },
        inherit: "histogramExtend"
      },
      data: { rows: [], columns: [] },
      loading: true
    }
  };

  public mounted(): void {
    this.init();
  }

  public init() {
    this.getChart();
    this.getParam();
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
</style>
