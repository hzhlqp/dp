<template>
  <div class="chart-main con-main">
    <div class="chart-con">
      <div class="main-title">EVENT SUMMARY</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="filterData.eventHistogram1">
          <el-form-item label="Customer">
            <el-select
              v-model="filterData.eventHistogram1.customer"
              filterable
              no-match-text="No matching data"
              placeholder="Select Customer"
              clearable
              @change="
                getParam(getChart, [
                  'eventHistogram1',
                  'eventPie2',
                  'eventLineList4'
                ])
              "
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
              v-model="filterData.eventHistogram1.area"
              filterable
              no-match-text="No matching data"
              placeholder="Select Area"
              clearable
              @change="
                getParam(getChart, [
                  'eventHistogram1',
                  'eventPie2',
                  'eventLineList4'
                ])
              "
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
              v-model="filterData.eventHistogram1.country"
              filterable
              no-match-text="No matching data"
              placeholder="Select Country"
              clearable
              @change="
                getParam(getChart, [
                  'eventHistogram1',
                  'eventPie2',
                  'eventLineList4'
                ])
              "
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
              v-model="filterData.eventHistogram1.model"
              filterable
              no-match-text="No matching data"
              placeholder="Select Model"
              clearable
              @change="
                getParam(getChart, [
                  'eventHistogram1',
                  'eventPie2',
                  'eventLineList4'
                ])
              "
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
              @click="
                getParam(getChart, [
                  'eventHistogram1',
                  'eventPie2',
                  'eventLineList4'
                ])
              "
              >Search</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div class="chart-tag fxc-between">
          <div class="tag-left"></div>
          <div class="tag-right">
            <el-date-picker
              v-model="filterData.eventHistogram1.value"
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
              @change="
                getChart(['eventHistogram1', 'eventPie2', 'eventLineList4'])
              "
            ></el-date-picker>
          </div>
        </div>

        <div class="chart-left">
          <ve-histogram
            :data="chartDataList.eventHistogram1.data"
            :extend="chartDataList.eventHistogram1.extend.own"
            :colors="colors"
            :loading="chartDataList.eventHistogram1.loading"
          >
            <div
              v-if="
                !chartDataList.eventHistogram1.loading &&
                  !chartDataList.eventHistogram1.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-histogram>
        </div>
        <div class="chart-right">
          <ve-pie
            :data="chartDataList.eventPie2.data"
            :colors="colors"
            :extend="chartDataList.eventPie2.extend.own"
            :loading="chartDataList.eventHistogram1.loading"
          >
            <div
              v-if="
                !chartDataList.eventPie2.loading &&
                  !chartDataList.eventPie2.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-pie>
        </div>
      </div>
    </div>

    <div class="chart-con">
      <div class="main-title">APP USEAGE TREND</div>
      <ve-line
        :data="chartDataList.eventLineList4.data"
        :settings="chartDataList.eventLineList4.settings.own"
        :loading="chartDataList.eventLineList4.loading"
      >
        <div
          v-if="
            !chartDataList.eventLineList4.loading &&
              !chartDataList.eventLineList4.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-line>
    </div>

    <div class="chart-con">
      <div class="main-title">TOP 10 APP</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left"></div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.eventRingList3.value"
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
            @change="getChart(['eventRingList3'])"
          ></el-date-picker>
        </div>
      </div>
      <div class="pie-con">
        <div
          v-for="(item, index) in chartDataList.eventRingList3.data"
          :key="'pie' + index"
          class="pie-item"
        >
          <ve-ring
            :data="item"
            :settings="ringSetting"
            :colors="colors"
            :loading="chartDataList.eventRingList3.loading"
          >
            <div v-if="!item.rows.length" class="data-empty">
              no data
            </div>
          </ve-ring>
          <div class="pie-title">{{ item.area }}</div>
        </div>
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
  public paramApi = "getParamEvent";

  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public filterData = {
    eventHistogram1: {
      area: "",
      country: "",
      model: "",
      customer: "",
      beginDate: new this.$dspDate(
        new Date().valueOf() - 3600 * 1000 * 24 * 30
      ).format("YY|MM|DD", "-"),
      value: [
        new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 30).format(
          "YY|MM|DD",
          "-"
        ),
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
      ],
      endDate: new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
    },
    eventPie2: {},
    eventRingList3: {
      areaList: ["LA", "NA", "AP", "ME", "AF", "EU"],
      topNumber: "10",
      beginDate: new this.$dspDate(
        new Date().valueOf() - 3600 * 1000 * 24 * 30
      ).format("YY|MM|DD", "-"),
      value: [
        new this.$dspDate(new Date().valueOf() - 3600 * 1000 * 24 * 30).format(
          "YY|MM|DD",
          "-"
        ),
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
      ],
      endDate: new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-")
    }
  };

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    eventHistogram1: {
      data: { rows: [], columns: [] },
      api: "getEventChart",
      extend: { own: {}, inherit: "histogramExtend" },
      loading: true
    },
    eventPie2: {
      api: "getEventChart",
      data: { rows: [], columns: [] },
      name: "pie",
      extend: { own: {}, inherit: "pieExtend" },
      loading: true
    },
    eventRingList3: {
      api: "getPieChart",
      data: [],
      loading: true
    },
    eventLineList4: {
      api: "getAppChart",
      filterName: "eventHistogram1",
      data: { rows: [], columns: [] },
      loading: true,
      settings: { own: {}, inherit: "lineSetting" }
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
  width: 62%;
}
.chart-right {
  display: inline-block;
  width: 38%;
}
.pie-con {
  text-align: center;
}
.pie-item {
  margin-bottom: 30px;
  display: inline-block;
  margin-right: 5%;
  width: 28% !important;

  .ve-ring {
    margin-bottom: 0;
  }

  .pie-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 40px;
  }

  &:nth-child(3),
  &:nth-child(6) {
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
