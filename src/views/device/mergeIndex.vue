<template>
  <div class="chart-main con-main">
    <div class="con-title">MERGE ACTIVE DEVICES</div>
    <div class="chart-con">
      <div class="chart-title">AVG TIME/DEVICE</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeLine1.dataType == 'new' }
            ]"
            @click="changeChartParam(['deviceMergeLine1'], 'dataType', 'new')"
          >
            NEW DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeLine1.dataType == 'active' }
            ]"
            @click="
              changeChartParam(['deviceMergeLine1'], 'dataType', 'active')
            "
          >
            ACTIVE DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeLine1.dataType == 'total' }
            ]"
            @click="changeChartParam(['deviceMergeLine1'], 'dataType', 'total')"
          >
            TOTAL DEVICES
          </div>
        </div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.deviceMergeLine1.value"
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
            @change="getChart(['deviceMergeLine1'])"
          ></el-date-picker>
        </div>
      </div>
      <ve-line
        :data="chartDataList.deviceMergeLine1.data"
        :settings="chartDataList.deviceMergeLine1.settings.own"
        :colors="colors"
        :extend="chartDataList.deviceMergeLine1.extend.own"
        :loading="chartDataList.deviceMergeLine1.loading"
      >
        <div
          v-if="
            !chartDataList.deviceMergeLine1.loading &&
              !chartDataList.deviceMergeLine1.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-line>
    </div>
    <div class="chart-con">
      <div class="chart-title">TOP 15 CUSTOMER</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeHistogram2.dataType == 'new' }
            ]"
            @click="
              changeChartParam(['deviceMergeHistogram2'], 'dataType', 'new')
            "
          >
            NEW DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeHistogram2.dataType == 'active' }
            ]"
            @click="
              changeChartParam(['deviceMergeHistogram2'], 'dataType', 'active')
            "
          >
            ACTIVE DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeHistogram2.dataType == 'total' }
            ]"
            @click="
              changeChartParam(['deviceMergeHistogram2'], 'dataType', 'total')
            "
          >
            TOTAL DEVICES
          </div>
        </div>
        <div class="tag-right fx-center">
          <el-date-picker
            v-model="filterData.deviceMergeHistogram2.value"
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
            @change="getChart(['deviceMergeHistogram2'])"
          ></el-date-picker>
        </div>
      </div>
      <ve-histogram
        :data="chartDataList.deviceMergeHistogram2.data"
        :settings="chartDataList.deviceMergeHistogram2.settings.own"
        :colors="colors"
        :extend="chartDataList.deviceMergeHistogram2.extend.own"
        :loading="chartDataList.deviceMergeHistogram2.loading"
      >
        <div
          v-if="
            !chartDataList.deviceMergeHistogram2.loading &&
              chartDataList.deviceMergeHistogram2.data.rows &&
              !chartDataList.deviceMergeHistogram2.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-histogram>
    </div>
    <div class="chart-con">
      <div class="chart-title">TOP 15 COUNTRY</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeHistogram3.dataType == 'new' }
            ]"
            @click="
              changeChartParam(['deviceMergeHistogram3'], 'dataType', 'new')
            "
          >
            NEW DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeHistogram3.dataType == 'active' }
            ]"
            @click="
              changeChartParam(['deviceMergeHistogram3'], 'dataType', 'active')
            "
          >
            ACTIVE DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeHistogram3.dataType == 'total' }
            ]"
            @click="
              changeChartParam(['deviceMergeHistogram3'], 'dataType', 'total')
            "
          >
            TOTAL DEVICES
          </div>
        </div>
        <div class="tag-right fx-center">
          <el-date-picker
            v-model="filterData.deviceMergeHistogram3.value"
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
            @change="getChart(['deviceMergeHistogram3'])"
          ></el-date-picker>
        </div>
      </div>
      <ve-histogram
        :data="chartDataList.deviceMergeHistogram3.data"
        :settings="chartDataList.deviceMergeHistogram3.settings.own"
        :colors="colors"
        :extend="chartDataList.deviceMergeHistogram3.extend.own"
        :loading="chartDataList.deviceMergeHistogram3.loading"
      >
        <div
          v-if="
            !chartDataList.deviceMergeHistogram3.loading &&
              chartDataList.deviceMergeHistogram3.data.rows &&
              !chartDataList.deviceMergeHistogram3.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-histogram>
    </div>
    <div class="chart-con">
      <div class="chart-title">ALL SOC ACTIVE DEVICE</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeRing4.dataType == 'new' }
            ]"
            @click="changeChartParam(['deviceMergeRing4'], 'dataType', 'new')"
          >
            NEW DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeRing4.dataType == 'active' }
            ]"
            @click="
              changeChartParam(['deviceMergeRing4'], 'dataType', 'active')
            "
          >
            ACTIVE DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.deviceMergeRing4.dataType == 'total' }
            ]"
            @click="changeChartParam(['deviceMergeRing4'], 'dataType', 'total')"
          >
            TOTAL DEVICES
          </div>
        </div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.deviceMergeRing4.value"
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
            @change="getChart(['deviceMergeRing4'])"
          ></el-date-picker>
        </div>
      </div>
      <div class="fx">
        <div class="flex chart-item">
          <ve-ring
            :data="chartDataList.deviceMergeRing4.data"
            :settings="chartDataList.deviceMergeRing4.settings.own"
            :colors="colors"
            :extend="chartDataList.deviceMergeRing4.extend.own"
            :loading="chartDataList.deviceMergeRing4.loading"
          >
            <div
              v-if="
                !chartDataList.deviceMergeRing4.loading &&
                  chartDataList.deviceMergeRing4.data.rows &&
                  !chartDataList.deviceMergeRing4.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-ring>
        </div>
        <div class="flex chart-item">
          <ve-bar
            :data="chartDataList.deviceMergeRing4.data"
            :colors="colors"
            :extend="barExtend"
            :loading="chartDataList.deviceMergeRing4.loading"
          >
            <div
              v-if="
                !chartDataList.deviceMergeRing4.loading &&
                  chartDataList.deviceMergeRing4.data.rows &&
                  !chartDataList.deviceMergeRing4.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-bar>
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
  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public filterData = {
    deviceMergeLine1: {
      dataType: "new",
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
    deviceMergeHistogram2: {
      topNumber: 20,
      dataType: "new",
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
    deviceMergeHistogram3: {
      topNumber: 20,
      dataType: "new",
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
    deviceMergeRing4: {
      dataType: "new",
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

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    deviceMergeLine1: {
      api: "getAreaTotalChart",
      data: { rows: [], columns: [] },
      settings: { own: { area: true }, inherit: "lineSetting" },
      extend: { own: {}, inherit: "lineExtend" },
      loading: true
    },
    deviceMergeHistogram2: {
      api: "getCustomerTotalChart",
      data: { rows: [], columns: [] },
      settings: { own: { area: true }, inherit: "histogramSetting" },
      extend: {
        own: {
          "xAxis.0.axisLabel.rotate": 45
        },
        inherit: "histogramExtend"
      },
      loading: true
    },
    deviceMergeHistogram3: {
      api: "getCountryTotalChart",
      data: { rows: [], columns: [] },
      settings: { own: { area: true }, inherit: "histogramSetting" },
      extend: {
        own: {
          "xAxis.0.axisLabel.rotate": 45
        },
        inherit: "histogramExtend"
      },
      loading: true
    },
    deviceMergeRing4: {
      api: "getModelTotalChart",
      data: { rows: [], columns: [] },
      extend: { own: {}, inherit: "ringExtend" },
      settings: { own: {}, inherit: "ringSetting" },
      loading: true
    }
  };

  mounted(): void {
    this.init();
  }

  init(): void {
    this.getChart();
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/chart.less";
</style>
