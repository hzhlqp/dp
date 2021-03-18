<template>
  <div class="chart-main con-main">
    <div class="con-title">DP ACTIVE DEVICES</div>
    <div class="chart-con">
      <div class="chart-title">AVG TIME/DEVICE</div>
      <div class="chart-tag fxc-between">
        <div class="tag-left fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexLine1.dataType == 'new' }
            ]"
            @click="changeChartParam(['devicesIndexLine1'], 'dataType', 'new')"
          >
            NEW DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexLine1.dataType == 'active' }
            ]"
            @click="
              changeChartParam(['devicesIndexLine1'], 'dataType', 'active')
            "
          >
            ACTIVE DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexLine1.dataType == 'total' }
            ]"
            @click="
              changeChartParam(['devicesIndexLine1'], 'dataType', 'total')
            "
          >
            TOTAL DEVICES
          </div>
        </div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.devicesIndexLine1.value"
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
            @change="getChart(['devicesIndexLine1'])"
          ></el-date-picker>
        </div>
      </div>
      <ve-line
        :data="chartDataList.devicesIndexLine1.data"
        :settings="chartDataList.devicesIndexLine1.settings.own"
        :colors="colors"
        :extend="chartDataList.devicesIndexLine1.extend.own"
        :loading="chartDataList.devicesIndexLine1.loading"
      >
        <div
          v-if="
            !chartDataList.devicesIndexLine1.loading &&
              !chartDataList.devicesIndexLine1.data.rows.length
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
              { on: filterData.devicesIndexHistogram2.dataType == 'new' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram2'], 'dataType', 'new')
            "
          >
            NEW DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram2.dataType == 'active' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram2'], 'dataType', 'active')
            "
          >
            ACTIVE DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram2.dataType == 'total' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram2'], 'dataType', 'total')
            "
          >
            TOTAL DEVICES
          </div>
        </div>
        <div class="tag-right fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram2.timeType == 'day' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram2'], 'timeType', 'day')
            "
          >
            YESTERDAY
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram2.timeType == 'week' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram2'], 'timeType', 'week')
            "
          >
            LAST 7 DAYS
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram2.timeType == 'month' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram2'], 'timeType', 'month')
            "
          >
            LAST MONTHS
          </div>
        </div>
      </div>
      <ve-histogram
        :data="chartDataList.devicesIndexHistogram2.data"
        :settings="chartDataList.devicesIndexHistogram2.settings.own"
        :colors="colors"
        :extend="chartDataList.devicesIndexHistogram2.extend.own"
        :loading="chartDataList.devicesIndexHistogram2.loading"
      >
        <div
          v-if="
            !chartDataList.devicesIndexHistogram2.loading &&
              !chartDataList.devicesIndexHistogram2.data.rows.length
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
              { on: filterData.devicesIndexHistogram3.dataType == 'new' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram3'], 'dataType', 'new')
            "
          >
            NEW DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram3.dataType == 'active' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram3'], 'dataType', 'active')
            "
          >
            ACTIVE DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram3.dataType == 'total' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram3'], 'dataType', 'total')
            "
          >
            TOTAL DEVICES
          </div>
        </div>
        <div class="tag-right fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram3.timeType == 'day' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram3'], 'timeType', 'day')
            "
          >
            YESTERDAY
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram3.timeType == 'week' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram3'], 'timeType', 'week')
            "
          >
            LAST 7 DAYS
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexHistogram3.timeType == 'month' }
            ]"
            @click="
              changeChartParam(['devicesIndexHistogram3'], 'timeType', 'month')
            "
          >
            LAST MONTHS
          </div>
        </div>
      </div>
      <ve-histogram
        :data="chartDataList.devicesIndexHistogram3.data"
        :settings="chartDataList.devicesIndexHistogram3.settings.own"
        :colors="colors"
        :extend="chartDataList.devicesIndexHistogram3.extend.own"
        :loading="chartDataList.devicesIndexHistogram3.loading"
      >
        <div
          v-if="
            !chartDataList.devicesIndexHistogram3.loading &&
              !chartDataList.devicesIndexHistogram3.data.rows.length
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
              { on: filterData.devicesIndexRing4.dataType == 'new' }
            ]"
            @click="changeChartParam(['devicesIndexRing4'], 'dataType', 'new')"
          >
            NEW DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexRing4.dataType == 'active' }
            ]"
            @click="
              changeChartParam(['devicesIndexRing4'], 'dataType', 'active')
            "
          >
            ACTIVE DEVICES
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexRing4.dataType == 'total' }
            ]"
            @click="
              changeChartParam(['devicesIndexRing4'], 'dataType', 'total')
            "
          >
            TOTAL DEVICES
          </div>
        </div>
        <div class="tag-right fx-center">
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexRing4.timeType == 'day' }
            ]"
            @click="changeChartParam(['devicesIndexRing4'], 'timeType', 'day')"
          >
            YESTERDAY
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexRing4.timeType == 'week' }
            ]"
            @click="changeChartParam(['devicesIndexRing4'], 'timeType', 'week')"
          >
            LAST 7 DAYS
          </div>
          <div
            :class="[
              'tag-item',
              { on: filterData.devicesIndexRing4.timeType == 'month' }
            ]"
            @click="
              changeChartParam(['devicesIndexRing4'], 'timeType', 'month')
            "
          >
            LAST MONTHS
          </div>
        </div>
      </div>
      <div class="fx">
        <div class="flex chart-item">
          <ve-ring
            :data="chartDataList.devicesIndexRing4.data"
            :settings="chartDataList.devicesIndexRing4.settings.own"
            :colors="colors"
            :extend="chartDataList.devicesIndexRing4.extend.own"
            :loading="chartDataList.devicesIndexRing4.loading"
          >
            <div
              v-if="
                !chartDataList.devicesIndexRing4.loading &&
                  !chartDataList.devicesIndexRing4.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-ring>
        </div>
        <div class="flex chart-item">
          <ve-bar
            :data="chartDataList.devicesIndexRing4.data"
            :colors="colors"
            :extend="chartDataList.devicesIndexRing4.extend.own"
            :loading="chartDataList.devicesIndexRing4.loading"
          >
            <div
              v-if="
                !chartDataList.devicesIndexRing4.loading &&
                  !chartDataList.devicesIndexRing4.data.rows.length
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
    devicesIndexLine1: {
      app: "dp",
      month: "2019-12",
      type: "area",
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
    devicesIndexHistogram2: {
      app: "dp",
      month: "2019-12",
      topNumber: "15",
      dataType: "new",
      timeType: "day"
    },
    devicesIndexHistogram3: {
      app: "dp",
      month: "2019-12",
      topNumber: 15,
      dataType: "new",
      timeType: "day"
    },
    devicesIndexRing4: {
      app: "dp",
      month: "2019-12",
      type: "model",
      dataType: "new",
      timeType: "day"
    }
  };

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    devicesIndexLine1: {
      api: "getsRegionCharts",
      data: { rows: [], columns: [] },
      settings: { own: { area: true }, inherit: "lineSetting" },
      extend: {
        own: {
          tooltip: {
            formatter: (params: any[]) => {
              let newParams = params.sort((i: any, j: any) => {
                return j.value[1] - i.value[1];
              });
              let out = newParams.map((i: any) => {
                return `<span style="margin-right:5px; width:10px;height:10px;display:inline-block;background:${i.color};border-radius:50%"></span>${i.seriesName}：${i.value[1]}</br>`;
              });
              return out.join("");
            }
          }
        },
        inherit: "lineExtend"
      },
      loading: true
    },
    devicesIndexHistogram2: {
      api: "getsCustomerCharts",
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
    devicesIndexHistogram3: {
      api: "getsCountryChart",
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
    devicesIndexRing4: {
      api: "getsModelCharts",
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
