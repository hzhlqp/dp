<template>
  <div class="chart-main con-main">
    <div class="chart-con">
      <div class="main-title">TV SOURCE</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="filterData.tveventHistogram1">
          <el-form-item label="Customer">
            <el-select
              v-model="filterData.tveventHistogram1.customer"
              filterable
              no-match-text="No matching data"
              placeholder="Select Customer"
              clearable
              @change="
                getParam(
                  getChart,
                  ['tveventHistogram1', 'tveventBar2', 'tveventRing3'],
                  true
                )
              "
            >
              <el-option
                v-for="item in options.customer"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Area">
            <el-select
              v-model="filterData.tveventHistogram1.area"
              filterable
              no-match-text="No matching data"
              placeholder="Select Area"
              clearable
              @change="
                getParam(
                  getChart,
                  ['tveventHistogram1', 'tveventBar2', 'tveventRing3'],
                  true
                )
              "
            >
              <el-option
                v-for="item in options.area"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Country">
            <el-select
              v-model="filterData.tveventHistogram1.country"
              filterable
              no-match-text="No matching data"
              placeholder="Select Country"
              clearable
              @change="
                getParam(
                  getChart,
                  ['tveventHistogram1', 'tveventBar2', 'tveventRing3'],
                  true
                )
              "
            >
              <el-option
                v-for="item in options.country"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Model">
            <el-select
              v-model="filterData.tveventHistogram1.model"
              filterable
              no-match-text="No matching data"
              placeholder="Select Model"
              clearable
              @change="
                getParam(
                  getChart,
                  ['tveventHistogram1', 'tveventBar2', 'tveventRing3'],
                  true
                )
              "
            >
              <el-option
                v-for="item in options.model"
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
                getParam(
                  getChart,
                  ['tveventHistogram1', 'tveventBar2', 'tveventRing3'],
                  true
                )
              "
              >Search</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-tag fxc-between">
        <div class="tag-left"></div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.tveventHistogram1.value"
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
              getParam(
                getChart,
                ['tveventHistogram1', 'tveventBar2', 'tveventRing3'],
                true
              )
            "
          ></el-date-picker>
        </div>
      </div>
      <ve-histogram
        :data="chartDataList.tveventHistogram1.data"
        :extend="chartDataList.tveventHistogram1.extend.own"
        :colors="colors"
        :loading="chartDataList.tveventHistogram1.loading"
      >
        <div
          v-if="
            !chartDataList.tveventHistogram1.loading &&
              !chartDataList.tveventHistogram1.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-histogram>
    </div>
    <div class="chart-con">
      <div class="main-title">NETWORK OPERATOR AND CONNECTION MODE</div>
      <div class="chart-left">
        <ve-bar
          :data="chartDataList.tveventBar2.data"
          :extend="chartDataList.tveventBar2.extend.own"
          :colors="colors"
          :loading="chartDataList.tveventBar2.loading"
        >
          <div
            v-if="
              !chartDataList.tveventBar2.loading &&
                !chartDataList.tveventBar2.data.rows.length
            "
            class="data-empty"
          >
            no data
          </div>
        </ve-bar>
      </div>
      <div class="chart-right">
        <ve-ring
          :data="chartDataList.tveventRing3.data"
          :colors="colors"
          :extend="chartDataList.tveventRing3.extend.own"
          :loading="chartDataList.tveventRing3.loading"
        >
          <div
            v-if="
              !chartDataList.tveventRing3.loading &&
                !chartDataList.tveventRing3.data.rows.length
            "
            class="data-empty"
          >
            no data
          </div>
        </ve-ring>
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
export default class tveventIndex extends Mixins(
  filterMixins,
  chartMixins,
  dateMixins
) {
  public paramApi = "getSourceParam";

  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public filterData = {
    tveventHistogram1: {
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
    tveventBar2: {},
    tveventRing3: {}
  };

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    tveventHistogram1: {
      api: "getSourceChart",
      data: { rows: [], columns: [] },
      filterName: "tveventHistogram1",
      extend: { own: {}, inherit: "histogramExtend" },
      loading: true
    },
    tveventBar2: {
      api: "getNetworkChart",
      filterName: "tveventHistogram1",
      extend: { own: { barWidth: "30px" }, inherit: "barExtend" },
      data: { rows: [], columns: [] },
      loading: true
    },
    tveventRing3: {
      api: "getNetworkTypeChart",
      filterName: "tveventHistogram1",
      extend: {
        own: {
          label: {
            normal: {
              show: false
            }
          },
          emphasis: {
            show: false
          }
        },
        inherit: "ringExtend"
      },
      data: { rows: [], columns: [] },
      loading: true
    }
  };

  public mounted(): void {
    this.init();
  }

  public init() {
    this.getParam(
      this.getChart,
      ["tveventHistogram1", "tveventBar2", "tveventRing3"],
      true
    );
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
</style>
