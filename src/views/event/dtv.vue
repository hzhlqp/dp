<template>
  <div class="chart-main con-main">
    <div class="chart-con">
      <div class="main-title">DTV AUDIENCE RATINGS</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="filterData.dtvHistogram1">
          <el-form-item label="Customer">
            <el-select
              v-model="filterData.dtvHistogram1.customer"
              filterable
              no-match-text="No matching data"
              placeholder="Select Customer"
              clearable
              @change="getParam(getOtherChart, ['dtvHistogram1', ''])"
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
              v-model="filterData.dtvHistogram1.area"
              filterable
              no-match-text="No matching data"
              placeholder="Select Area"
              clearable
              @change="getParam(getOtherChart, ['dtvHistogram1', ''])"
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
              v-model="filterData.dtvHistogram1.country"
              filterable
              no-match-text="No matching data"
              placeholder="Select Country"
              clearable
              @change="getParam(getOtherChart, ['dtvHistogram1', ''])"
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
              v-model="filterData.dtvHistogram1.model"
              filterable
              no-match-text="No matching data"
              placeholder="Select Model"
              clearable
              @change="getParam(getOtherChart, ['dtvHistogram1', ''])"
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
              @click="getParam(getOtherChart, ['dtvHistogram1', ''])"
              >Search</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-tag fxc-between">
        <div class="tag-left"></div>
        <div class="tag-right">
          <el-date-picker
            v-model="filterData.dtvHistogram1.value"
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
            @change="getParam(getOtherChart, ['dtvHistogram1'])"
          ></el-date-picker>
        </div>
      </div>
      <div class="chart-view fx-starts ">
        <div class="chart-left w50">
          <div class="line-title">TV Channel Ratings</div>
          <div class="line-list">
            <div
              v-for="(item, index) in otherChartList.line1"
              :key="item"
              class="line-item"
            >
              <div v-if="index <= 19">
                <div class="name">
                  <span class="index">{{ index + 1 }}.</span> {{ item.content }}
                </div>
                <div class="bar fx">
                  <div class="bar-con ">
                    <div
                      class="on "
                      :style="
                        'background:' +
                          colors[index] +
                          ';width:' +
                          (item.rate * 100).toFixed(1) +
                          '%'
                      "
                    ></div>
                  </div>
                  <div class="num flex">
                    {{ (item.rate * 100).toFixed(1) + "%" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-right w50">
          <div class="line-title">TV Shows Ratings</div>
          <div class="line-list">
            <div
              v-for="(item, index) in otherChartList.line2"
              :key="item"
              class="line-item"
            >
              <div v-if="index <= 19">
                <div class="name">
                  <span class="index">{{ index + 1 }}.</span> {{ item.content }}
                </div>
                <div class="bar fx">
                  <div class="bar-con ">
                    <div
                      class="on "
                      :style="
                        'background:' +
                          colors[index] +
                          ';width:' +
                          (item.rate * 100).toFixed(1) +
                          '%'
                      "
                    ></div>
                  </div>
                  <div
                    class="
                    num
                    flex"
                  >
                    {{ (item.rate * 100).toFixed(1) + "%" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
export default class tveventIndex extends Mixins(
  filterMixins,
  chartMixins,
  dateMixins
) {
  public paramApi = "getChartParam";

  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public filterData = {
    dtvHistogram1: {
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
        new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-"),
      ],
      endDate: new this.$dspDate(new Date().valueOf()).format("YY|MM|DD", "-"),
    },
  };

  private otherChartList = {
    line1: [],
    line2: [],
  };

  line1Max = 0;

  public mounted(): void {
    this.init();
  }

  public init() {
    this.getOtherChart();
    this.getParam();
  }

  private async getOtherChart() {
    // 有开始结束日期，需要重新赋值
    this.filterData.dtvHistogram1.beginDate = this.filterData.dtvHistogram1.value[0];
    this.filterData.dtvHistogram1.endDate = this.filterData.dtvHistogram1.value[1];

    let res1 = await api.getChannelRate(this.filterData.dtvHistogram1);
    let res2 = await api.getChannelTitle(this.filterData.dtvHistogram1);

    res2.list.sort((i: any, j: any) => {
      return j.quantity - i.quantity;
    });

    res2.list.forEach((i) => {
      if (i.quantity > this.line1Max) {
        this.line1Max = i.quantity;
      }
    });

    this.otherChartList.line1 = res1.list;
    this.otherChartList.line2 = res2.list;
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/chart.less";
@import "../../assets/less/module/date.less";
.chart-left {
  display: inline-block;
  width: 50%;
}
.chart-right {
  display: inline-block;

  &.w50 {
    width: 50%;
  }
}

.chart-view {
  padding: 50px 0;
}

.line-title {
  font-size: 20px;
  margin-bottom: 30px;
  color: #666;
}

.line-item {
  margin-bottom: 20px;

  .name {
    margin-bottom: 10px;
    font-size: 14px;
    color: #666;

    .index {
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .bar {
    .bar-con {
      position: relative;
      width: 80%;
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

    .num {
      margin-left: 20px;
      line-height: 8px;
    }
  }
}
</style>
