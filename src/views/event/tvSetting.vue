<template>
  <div class="chart-main con-main">
    <div class="chart-con">
      <div class="main-title">TV SETTING</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="chartFilterData.settingRing1">
          <el-form-item label="Model">
            <el-select
              v-model="chartFilterData.settingRing1.model"
              filterable
              no-match-text="No matching data"
              placeholder="Select Model"
              clearable
              @change="getParam(getChart, ['settingRing1'], true)"
            >
              <el-option
                v-for="item in options.model"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Area">
            <el-select
              v-model="chartFilterData.settingRing1.area"
              filterable
              no-match-text="No matching data"
              placeholder="Select Area"
              clearable
              @change="getParam(getChart, ['settingRing1'], true)"
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
              v-model="chartFilterData.settingRing1.country"
              filterable
              no-match-text="No matching data"
              placeholder="Select Country"
              clearable
              @change="getParam(getChart, ['settingRing1'], true)"
            >
              <el-option
                v-for="item in chartOptions.country"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Customer">
            <el-select
              v-model="chartFilterData.settingRing1.customer"
              filterable
              no-match-text="No matching data"
              placeholder="Select Model"
              clearable
              @change="getParam(getChart, ['settingRing1'], true)"
            >
              <el-option
                v-for="item in chartOptions.customer"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getParam(getChart, ['settingRing1'], true)"
              >Search</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-tag fxc-between">
        <div class="tag-left  fx-center"></div>
        <div class="tag-right">
          <el-date-picker
            v-model="chartFilterData.settingRing1.value"
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
            @change="getParam(getChart, ['settingRing1'], true)"
          ></el-date-picker>
        </div>
      </div>
      <div class="fx">
        <div
          v-for="(item, index) in chartDataList.settingRing1.data.rows"
          :key="item + index"
          class="ring-item flex fx-center"
        >
          <div class="ring-left">
            <ve-ring
              height="150px"
              width="150px"
              :data="{
                columns: ['content', 'rate'],
                rows: [
                  { content: item.content + 1, rate: 1 - item.rate },
                  { content: item.content + 2, rate: item.rate }
                ]
              }"
              :colors="['#b4bbc5', colors[index]]"
              :extend="chartDataList.settingRing1.extend.own"
              :settings="chartDataList.settingRing1.settings.own"
              :loading="chartDataList.settingRing1.loading"
              :tooltip-visible="false"
            >
              <div v-if="![item].length" class="data-empty">
                no data
              </div>
            </ve-ring>
          </div>
          <div class="ring-right">
            <p class="name">{{ item.content }}</p>
            <p class="num">ON：{{ item.quantity }}</p>
            <p class="rate">{{ (item.rate * 100).toFixed(0) + "%" }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="table-con customer-main con-main">
      <div class="main-title">CUSTOMER INFORMATION</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="filterData">
          <el-form-item label="isWilling">
            <el-select
              v-model="filterData.isWilling"
              filterable
              no-match-text="No matching data"
              placeholder="Select isWilling"
              clearable
              @change="getParam(exportData)"
            >
              <el-option
                v-for="item in isWillingOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Gender">
            <el-select
              v-model="filterData.gender"
              filterable
              no-match-text="No matching data"
              placeholder="Select Gender"
              clearable
              @change="getParam(exportData)"
            >
              <el-option
                v-for="item in options.gender"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Age">
            <el-select
              v-model="filterData.age"
              filterable
              no-match-text="No matching data"
              placeholder="Select Age"
              clearable
              @change="getParam(exportData)"
            >
              <el-option
                v-for="item in ageOption"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getParam">Search</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-control fxc-between">
        <a href=""></a>
        <div class="import fx-center">
          <a
            class="fx-center"
            :href="apiUrl + '/common/download?fileName=' + downLink"
            :download="downLink"
          >
            <i class="icon icon-import"></i>
            <span>Export Legal Data</span>
          </a>
        </div>
      </div>
      <el-table
        v-loading="loading"
        empty-text="No Data"
        :data="tableData"
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column type="index" label="NO" width="80"> </el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="userId"
          label="UserID"
        >
        </el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="name"
          label="Name"
        >
        </el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="email"
          label="E-mail"
        ></el-table-column>
        <el-table-column
          min-width="100"
          sortable="custom"
          property="age"
          label="Age"
        ></el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="gender"
          label="Gender"
        >
        </el-table-column>
        <el-table-column
          min-width="150"
          sortable="custom"
          property="isWilling"
          label="isWilling"
        >
          <template slot-scope="scope">
            {{
              scope.row.isWilling == 0
                ? "YES"
                : scope.row.isWilling == 1
                ? "NO"
                : "Skip"
            }}
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="filterData.params.pageNum"
          @current-change="getTable"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import filterMixins from "../../mixins/filter";
import chartMixins from "../../mixins/chart";
import dateMixins from "../../mixins/date";
import tableMixins from "../../mixins/table";
@Component
export default class eventIndex extends Mixins(
  filterMixins,
  chartMixins,
  dateMixins,
  tableMixins
) {
  // 后端接口名
  private tableApi = "getEventUserList";
  private chartParamApi = "getSeviceParam";
  private paramApi = "getUserInfoParam";

  private ageOption = [
    "0-14",
    "15-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "Over 65 years old"
  ];
  private isWillingOption = [
    { value: 0, label: "YES" },
    { value: 1, label: "NO" },
    { value: 2, label: "Skip" }
  ];

  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public chartFilterData = {
    settingRing1: {
      isWilling: "",
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
    }
  };

  // 过滤表单
  public filterData = {
    userId: "",
    name: "",
    gender: "",
    age: "",
    isWilling: ""
  };

  private downLink = "";

  private uploadParam = "";

  // 导入弹窗
  private importDialogVisible: Boolean = false;

  // 导出弹窗
  private exportDialogVisible: Boolean = false;

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
    settingRing1: {
      api: "getSeviceChart",
      extend: {
        own: {
          legend: {
            show: false
          },
          series: {
            center: ["50%", "50%"]
          }
        },
        inherit: "ringExtend"
      },
      settings: {
        own: {
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          hoverAnimation: false,

          radius: ["60%", "70%"]
        },
        inherit: "ringSetting"
      },
      data: { rows: [], columns: [] },
      loading: true
    }
  };

  // 导出数据
  private async exportData(): Promise<any> {
    this.downLink = await api.exportUserInfo(this.filterData);
  }

  public init() {
    this.getChart();
    this.getParam();
    this.getParam(this.chartDataList, ["settingRing1"], true);
    this.exportData();
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/chart.less";
@import "../../assets/less/page/customer.less";
@import "../../assets/less/module/date.less";
.ring-item {
  margin: 0;
  position: relative;

  .ring-left {
    display: inline-block;
  }

  .ring-right {
    flex: 1;
    position: relative;
    margin-top: 30px;

    .rate {
      position: absolute;
      top: 12px;
      left: -100px;
      color: #666;
      font-size: 20px;
      width: 50px;
      text-align: center;
    }

    .name {
      font-size: 16px;
      margin-bottom: 20px;
      color: #333;
    }

    .num {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
}
</style>
