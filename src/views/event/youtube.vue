<template>
  <div class="chart-main con-main">
    <div class="chart-con">
      <div class="main-title">YOUTUBE HISTORY</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="chartFilterData.youtubeLine1">
          <el-form-item label="Customer">
            <el-select
              v-model="chartFilterData.youtubeLine1.customer"
              filterable
              no-match-text="No matching data"
              placeholder="Select Customer"
              clearable
              @change="
                getParam(getChart, ['youtubeLine1', 'youtubeRing2'], true)
              "
            >
              <el-option
                v-for="item in chartOptions.customer"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Area">
            <el-select
              v-model="chartFilterData.youtubeLine1.area"
              filterable
              no-match-text="No matching data"
              placeholder="Select Area"
              clearable
              @change="
                getParam(getChart, ['youtubeLine1', 'youtubeRing2'], true)
              "
            >
              <el-option
                v-for="item in chartOptions.area"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Country">
            <el-select
              v-model="chartFilterData.youtubeLine1.country"
              filterable
              no-match-text="No matching data"
              placeholder="Select Country"
              clearable
              @change="
                getParam(getChart, ['youtubeLine1', 'youtubeRing2'], true)
              "
            >
              <el-option
                v-for="item in chartOptions.country"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Model">
            <el-select
              v-model="chartFilterData.youtubeLine1.model"
              filterable
              no-match-text="No matching data"
              placeholder="Select Model"
              clearable
              @change="
                getParam(getChart, ['youtubeLine1', 'youtubeRing2'], true)
              "
            >
              <el-option
                v-for="item in chartOptions.model"
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
                getParam(getChart, ['youtubeLine1', 'youtubeRing2'], true)
              "
              >Search</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-tag fxc-between">
        <div class="tag-left  fx-center"></div>
        <div class="tag-right">
          <el-date-picker
            v-model="chartFilterData.youtubeLine1.value"
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
            @change="getParam(getChart, ['youtubeLine1', 'youtubeRing2'], true)"
          ></el-date-picker>
        </div>
      </div>
      <div class="chart-view fx-starts">
        <div class="chart-left">
          <div class="title fx">
            <div class="title-item flex">NO</div>
            <div class="title-item flex">ChannelTitle</div>
            <div class="title-item flex">Views</div>
            <div class="title-item line"></div>
          </div>
          <div class="des-list ">
            <div
              v-for="(item, index) in chartDataList.youtubeLine1.data.rows"
              :key="item"
              class="des-item "
            >
              <div class="fx" v-if="index <= 19">
                <p class="no flex">
                  {{ index + 1 }}
                </p>
                <p class="ct flex">
                  {{ item.content }}
                </p>
                <p class="views flex">
                  {{ item.quantity }}
                </p>
                <div class="cbar fx">
                  <div
                    class="on "
                    :style="
                      'background:' +
                        colors[index] +
                        ';width:' +
                        (item.quantity /
                          chartDataList.youtubeLine1.data.rows[0].quantity) *
                          100 +
                        '%'
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-right">
          <ve-ring
            :data="chartDataList.youtubeRing2.data"
            :extend="chartDataList.youtubeRing2.extend.own"
            :colors="colors"
            :settings="{ yAxisName: ['Sets'] }"
            :loading="chartDataList.youtubeRing2.loading"
          >
            <div
              v-if="
                !chartDataList.youtubeRing2.loading &&
                  !chartDataList.youtubeRing2.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-ring>
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
  public chartParamApi = "getYoutubeParam";

  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public chartFilterData = {
    youtubeLine1: {
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
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-"),
      ],
    },
    youtubeRing2: {},
  };

  private markLine = {
    data: [
      {
        name: "平均线",
        type: "average",
      },
    ],
  };

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    youtubeLine1: {
      api: "getYoutubeView",
      extend: { own: {}, inherit: "lineExtend" },
      data: { rows: [], columns: [] },
      loading: true,
    },
    youtubeRing2: {
      // 共用条件
      filterName: "youtubeLine1",
      api: "getYoutubeDistribution",
      extend: { own: {}, inherit: "ringExtend" },
      data: { rows: [], columns: [] },
      loading: true,
    },
  };

  public mounted(): void {
    this.init();
  }

  public init() {
    this.getChart();
    this.getParam("", ["youtubeLine1", "youtubeRing2"], true);
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/chart.less";
@import "../../assets/less/module/date.less";
.chart-view {
  padding: 50px 0;
}
.chart-left {
  display: inline-block;
  width: 65%;
}
.chart-right {
  display: inline-block;
  width: 35%;
}

.des-list {
  margin-top: 50px;
  .des-item {
    padding: 0 30px 0 0;
    margin-bottom: 30px;
    color: #999;
  }
}

.chart-view {
  .title-item {
    font-size: 16px;
    color: #666;
    font-weight: bold;
  }

  .line {
    flex: 3;
  }
}

.cbar {
  flex: 3;
  position: relative;
  height: 8px;
  border-radius: 4px;
  background: rgba(228, 228, 228, 1);

  .on {
    position: absolute;
    border-radius: 4px;
    height: 8px;
    left: 0;
    top: 0;
  }
}
</style>
