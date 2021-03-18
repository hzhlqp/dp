<template>
  <div class="daily-main con-main">
    <div class="search-con fxc-between">
      <el-form class="title-search" :inline="true">
        <el-form-item>
          <el-select
            v-model="chartFilterData.dailyLine1.customer"
            filterable
            clearable
            no-match-text="No matching data"
            @change="
              getParam(
                getChart,
                [
                  'dailyLine1',
                  'dailyLine2',
                  'dailyLine3',
                  'dailyLine4',
                  'dailyRing5',
                  'dailyHistogram6',
                  'dailyMap7',
                ],
                true
              )
            "
          >
            <el-option
              v-for="item in chartOptions.customers"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="chartFilterData.dailyLine1.date"
            type="month"
            :clearable="false"
            placeholder="Select Date"
            value-format="yyyy-MM"
            @change="
              getParam(
                getChart,
                [
                  'dailyLine1',
                  'dailyLine2',
                  'dailyLine3',
                  'dailyLine4',
                  'dailyRing5',
                  'dailyHistogram6',
                  'dailyMap7',
                ],
                true
              )
            "
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="toCanvas">Print Chart</el-button>
    </div>
    <div id="print-wrapper">
      <div class="print-wrapper">
        <div class="print-title">
          <span
            >{{ chartFilterData.dailyLine1.customer }} SMART TV OPERATION
            DASHBOARD</span
          >
        </div>

        <div class="time">DATA TIME：{{ chartFilterData.dailyLine1.date }}</div>
        <div class="chart-view fxc-between">
          <div
            v-if="chartDataList.dailyRing5.data.rows.length"
            class="chart-item chart-1"
          >
            <div class="item-title">New Active TV</div>
            <div class="fxc-between">
              <div class="item fxv-center">
                <div class="new-num">
                  {{ chartDataList.dailyRing5.data.total.toLocaleString() }}
                </div>
                <div class="new-name">pre/Month</div>
              </div>
              <div class="item fxv-center">
                <div
                  class="new-num"
                  :class="[
                    chartDataList.dailyRing5.data.increase >= 0 ? 'up' : 'down',
                  ]"
                >
                  {{ chartDataList.dailyRing5.data.increase.toLocaleString() }}
                </div>
                <div class="new-name">than last Month</div>
              </div>
            </div>
            <ve-ring
              height="300px"
              :settings="chartDataList.dailyRing5.settings.own"
              :data="chartDataList.dailyRing5.data"
              :extend="chartDataList.dailyRing5.extend.own"
              :loading="chartDataList.dailyRing5.loading"
              :after-config="chartDataList.dailyRing5.afterConfig"
              :colors="chartDataList.dailyRing5.colors"
            >
              <div
                v-if="
                  !chartDataList.dailyRing5.loading &&
                    !chartDataList.dailyRing5.data.rows.length
                "
                class="data-empty"
              >
                no data
              </div>
            </ve-ring>
          </div>
          <div
            v-if="chartDataList.dailyHistogram6.data.rows.length"
            class="chart-item chart-1"
          >
            <div class="item-title fxc-between">
              <div class="item-title">Total Active Distribution</div>
              <div class="tr-num">
                {{ chartDataList.dailyHistogram6.data.total.toLocaleString() }}
              </div>
            </div>
            <ve-histogram
              height="360px"
              :data="chartDataList.dailyLine2.data"
              :settings="chartDataList.dailyHistogram6.settings.own"
              :extend="chartDataList.dailyHistogram6.extend.own"
              :loading="chartDataList.dailyLine2.loading"
              :colors="chartDataList.dailyHistogram6.colors"
            >
              <div
                v-if="
                  !chartDataList.dailyHistogram6.loading &&
                    !chartDataList.dailyHistogram6.data.rows.length
                "
                class="data-empty"
              >
                no data
              </div>
            </ve-histogram>
          </div>
        </div>
        <div class="chart-view fxc-between">
          <div
            v-if="chartDataList.dailyLine1.data.rows.length"
            class="chart-item chart-2"
          >
            <div class="des-list">
              <div
                v-for="(item, index) in chartDataList.dailyLine1.data.rows"
                :key="item.content + index"
                class="des-item"
              >
                <div v-if="index === 0" class="fxj-start item-con first">
                  <img :src="appImage[item.content]" />
                  <div class="first-right">
                    <div class="first-title">{{ item.content }}</div>
                    <div class="first-txt">
                      {{ item.quantity.toLocaleString() }} Times
                    </div>
                  </div>
                </div>
                <div v-else class="bar-con">
                  <p class="name">{{ item.content }}</p>
                  <div class="bar-line">
                    <div
                      class="bar-on"
                      :style="
                        'background:' +
                          colors[index] +
                          ';width:' +
                          (item.quantity /
                            chartDataList.dailyLine1.data.rows[0].quantity) *
                            100 +
                          '%'
                      "
                    ></div>
                  </div>
                  <p class="number">
                    {{ item.quantity.toLocaleString() }} Times
                  </p>
                </div>
              </div>
            </div>
            <div class="bottom-title">
              Top Local App
            </div>
          </div>
          <div class="chart-item chart-2">
            <div class="item-title fxc-between">
              <div class="item-title">New Active Distribution</div>
            </div>
            <ve-histogram
              height="330px"
              :data="chartDataList.dailyHistogram6.data"
              :settings="chartDataList.dailyHistogram6.settings.own"
              :extend="chartDataList.dailyHistogram6.extend.own"
              :loading="chartDataList.dailyLine2.loading"
              :colors="chartDataList.dailyHistogram6.colors"
            >
              <div
                v-if="
                  !chartDataList.dailyHistogram6.loading &&
                    !chartDataList.dailyHistogram6.data.rows.length
                "
                class="data-empty"
              >
                no data
              </div>
            </ve-histogram>
          </div>
        </div>
        <div class="chart-view fxc-between">
          <div
            v-if="
              !chartDataList.dailyLine3.loading &&
                chartDataList.dailyLine3.data.rows.length &&
                chartDataList.dailyLine3.data.rows[1].quantity != 0 &&
                chartDataList.dailyLine3.data.rows[0].quantity != 0
            "
            class="chart-item chart-3 fxc-between nt-padding flex-chart"
          >
            <div class="item fxv-start">
              <div class="top-img fxv-center">
                <img src="../../assets/img/app/tv.png" alt />
              </div>
              <div class="cnum">
                {{
                  chartDataList.dailyLine3.data.rows[1].quantity.toLocaleString()
                }}
              </div>
              <div class="cname">Device Coverage</div>
            </div>
            <div class="item fxv-start">
              <div class="top-name fxv-center">AD</div>
              <div class="cnum">
                {{
                  chartDataList.dailyLine3.data.rows[0].quantity.toLocaleString()
                }}
              </div>
              <div class="cname">AD Exposure Times</div>
            </div>
          </div>

          <div
            v-if="
              chartDataList.dailyLine4.data.rows.length &&
                chartDataList.dailyLine4.data.rows[0].total
            "
            class="chart-item chart-3"
          >
            <div class="item-title my-font">Top AD Exposure</div>
            <div class="line-list">
              <div
                v-for="(item, index) in chartDataList.dailyLine4.data.rows"
                :key="item.content + index"
                class="bar-con column"
              >
                <div class="name">
                  {{ item.content }}
                </div>
                <div class="bar-line fx">
                  <div
                    class="bar-on"
                    :style="
                      'background:' +
                        colors[index] +
                        ';width:' +
                        (
                          (item.total /
                            chartDataList.dailyLine4.data.rows[0].total) *
                          100
                        ).toFixed(1) +
                        '%'
                    "
                  ></div>
                </div>
                <div class="number fxv-end">
                  <div class="top-num fx-center">
                    {{ item.growth.toLocaleString() }}
                    <div class="qu " :class="{ up: item.growth > 0 }"></div>
                  </div>
                  <div class="bottom-num">
                    {{ item.total.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="chartDataList.dailyMap7.data.rows.length" class="chart-view">
          <div class="block-chart">
            <ve-map
              :data="chartDataList.dailyMap7.data"
              height="1000px"
              :extend="chartDataList.dailyMap7.extend.own"
              :visual-map="chartDataList.dailyMap7.chartVisualMap"
              :settings="chartDataList.dailyMap7.settings.own"
              :loading="chartDataList.dailyMap7.loading"
              :title="chartDataList.dailyMap7.title"
            >
              <div
                v-if="
                  !chartDataList.dailyMap7.loading &&
                    !chartDataList.dailyMap7.data.rows.length
                "
                class="data-empty"
              >
                no data
              </div>
            </ve-map>
          </div>
        </div>
      </div>
    </div>
    <uiPrint ref="print" :html="printHtml"></uiPrint>
    <div id="canvas-wrapper" class="print-wrapper">
      <div class="print-title">
        <span
          >{{ chartFilterData.dailyLine1.customer }} SMART TV OPERATION
          DASHBOARD</span
        >
      </div>

      <div class="time">DATA TIME：{{ chartFilterData.dailyLine1.date }}</div>
      <div class="chart-view fxc-between">
        <div
          v-if="chartDataList.dailyRing5.data.rows.length"
          class="chart-item chart-1"
        >
          <div class="item-title">New Active TV</div>
          <div class="fxc-between">
            <div class="item fxv-center">
              <div class="new-num">
                {{ chartDataList.dailyRing5.data.total.toLocaleString() }}
              </div>
              <div class="new-name">pre/Month</div>
            </div>
            <div class="item fxv-center">
              <div
                class="new-num"
                :class="[
                  chartDataList.dailyRing5.data.increase >= 0 ? 'up' : 'down',
                ]"
              >
                {{ chartDataList.dailyRing5.data.increase.toLocaleString() }}
              </div>
              <div class="new-name">than last Month</div>
            </div>
          </div>
          <ve-ring
            height="300px"
            :settings="chartDataList.dailyRing5.settings.own"
            :data="chartDataList.dailyRing5.data"
            :extend="chartDataList.dailyRing5.extend.own"
            :loading="chartDataList.dailyRing5.loading"
            :after-config="chartDataList.dailyRing5.afterConfig"
            :colors="chartDataList.dailyRing5.colors"
          >
            <div
              v-if="
                !chartDataList.dailyRing5.loading &&
                  !chartDataList.dailyRing5.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-ring>
        </div>
        <div
          v-if="chartDataList.dailyHistogram6.data.rows.length"
          class="chart-item chart-1"
        >
          <div class="item-title fxc-between">
            <div class="item-title">Total Active Distribution</div>
            <div class="tr-num">
              {{ chartDataList.dailyHistogram6.data.total.toLocaleString() }}
            </div>
          </div>
          <ve-histogram
            height="360px"
            :data="chartDataList.dailyLine2.data"
            :settings="chartDataList.dailyHistogram6.settings.own"
            :extend="chartDataList.dailyHistogram6.extend.own"
            :loading="chartDataList.dailyLine2.loading"
            :colors="chartDataList.dailyHistogram6.colors"
          >
            <div
              v-if="
                !chartDataList.dailyHistogram6.loading &&
                  !chartDataList.dailyHistogram6.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-histogram>
        </div>
      </div>
      <div class="chart-view fxc-between">
        <div
          v-if="chartDataList.dailyLine1.data.rows.length"
          class="chart-item chart-2"
        >
          <div class="des-list">
            <div
              v-for="(item, index) in chartDataList.dailyLine1.data.rows"
              :key="item.content + index"
              class="des-item"
            >
              <div v-if="index === 0" class="fxj-start item-con first">
                <img :src="appImage[item.content]" />
                <div class="first-right">
                  <div class="first-title">{{ item.content }}</div>
                  <div class="first-txt">
                    {{ item.quantity.toLocaleString() }} Times
                  </div>
                </div>
              </div>
              <div v-else class="bar-con">
                <p class="name">{{ item.content }}</p>
                <div class="bar-line">
                  <div
                    class="bar-on"
                    :style="
                      'background:' +
                        colors[index] +
                        ';width:' +
                        (item.quantity /
                          chartDataList.dailyLine1.data.rows[0].quantity) *
                          100 +
                        '%'
                    "
                  ></div>
                </div>
                <p class="number">{{ item.quantity.toLocaleString() }} Times</p>
              </div>
            </div>
          </div>
          <div class="bottom-title">
            Top Local App
          </div>
        </div>
        <div class="chart-item chart-2">
          <div class="item-title fxc-between">
            <div class="item-title">New Active Distribution</div>
          </div>
          <ve-histogram
            height="330px"
            :data="chartDataList.dailyHistogram6.data"
            :settings="chartDataList.dailyHistogram6.settings.own"
            :extend="chartDataList.dailyHistogram6.extend.own"
            :loading="chartDataList.dailyLine2.loading"
            :colors="chartDataList.dailyHistogram6.colors"
          >
            <div
              v-if="
                !chartDataList.dailyHistogram6.loading &&
                  !chartDataList.dailyHistogram6.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-histogram>
        </div>
      </div>
      <div class="chart-view fxc-between">
        <div
          v-if="
            !chartDataList.dailyLine3.loading &&
              chartDataList.dailyLine3.data.rows.length &&
              chartDataList.dailyLine3.data.rows[1].quantity != 0 &&
              chartDataList.dailyLine3.data.rows[0].quantity != 0
          "
          class="chart-item chart-3 fxc-between nt-padding flex-chart"
        >
          <div class="item fxv-start">
            <div class="top-img fxv-center">
              <img src="../../assets/img/app/tv.png" alt />
            </div>
            <div class="cnum">
              {{
                chartDataList.dailyLine3.data.rows[1].quantity.toLocaleString()
              }}
            </div>
            <div class="cname">Device Coverage</div>
          </div>
          <div class="item fxv-start">
            <div class="top-name fxv-center">AD</div>
            <div class="cnum">
              {{
                chartDataList.dailyLine3.data.rows[0].quantity.toLocaleString()
              }}
            </div>
            <div class="cname">AD Exposure Times</div>
          </div>
        </div>

        <div
          v-if="
            chartDataList.dailyLine4.data.rows.length &&
              chartDataList.dailyLine4.data.rows[0].total
          "
          class="chart-item chart-3"
        >
          <div class="item-title my-font">Top AD Exposure</div>
          <div class="line-list">
            <div
              v-for="(item, index) in chartDataList.dailyLine4.data.rows"
              :key="item.content + index"
              class="bar-con column"
            >
              <div class="name">
                {{ item.content }}
              </div>
              <div class="bar-line fx">
                <div
                  class="bar-on"
                  :style="
                    'background:' +
                      colors[index] +
                      ';width:' +
                      (
                        (item.total /
                          chartDataList.dailyLine4.data.rows[0].total) *
                        100
                      ).toFixed(1) +
                      '%'
                  "
                ></div>
              </div>
              <div class="number fxv-end">
                <div class="top-num fx-center">
                  {{ item.growth.toLocaleString() }}
                  <div class="qu " :class="{ up: item.growth > 0 }"></div>
                </div>
                <div class="bottom-num">
                  {{ item.total.toLocaleString() }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="chartDataList.dailyMap7.data.rows.length" class="chart-view">
        <div class="block-chart">
          <ve-map
            :data="chartDataList.dailyMap7.data"
            height="1000px"
            :extend="chartDataList.dailyMap7.extend.own"
            :visual-map="chartDataList.dailyMap7.chartVisualMap"
            :settings="chartDataList.dailyMap7.settings.own"
            :loading="chartDataList.dailyMap7.loading"
            :title="chartDataList.dailyMap7.title"
          >
            <div
              v-if="
                !chartDataList.dailyMap7.loading &&
                  !chartDataList.dailyMap7.data.rows.length
              "
              class="data-empty"
            >
              no data
            </div>
          </ve-map>
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
import dict from "../../utils/dict";
import "echarts/lib/component/visualMap";
import VeMap from "v-charts/lib/map.common";
import "echarts/lib/component/title";
import uiPrint from "../../components/print.vue";
@Component({
  components: {
    uiPrint,
  },
})
export default class eventIndex extends Mixins(
  filterMixins,
  chartMixins,
  dateMixins
) {
  public chartParamApi = "getCustomerParam";

  public appImage = dict.appImage;

  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public chartFilterData = {
    dailyLine1: {
      country: "",
      model: "",
      customer: "KALLEY",
      area: "",
      date:
        "2020-" +
        (new Date().getMonth() > 9
          ? new Date().getMonth()
          : "0" + new Date().getMonth()),
    },
    dailyLine2: {},
    dailyLine3: {},
    dailyLine4: {},
    dailyRing5: {},
    dailyHistogram6: {},
    dailyMap7: {},
  };

  private printHtml = "";

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    dailyLine1: {
      api: "getAppTop",
      filterName: "dailyLine1",
      extend: { own: {}, inherit: "lineExtend" },
      data: { rows: [], columns: [] },
      loading: true,
    },
    dailyLine2: {
      api: "getTrendChart",
      filterName: "dailyLine1",
      extend: { own: {}, inherit: "lineExtend" },
      data: { rows: [], columns: ["content", "total"] },
      loading: true,
    },
    dailyLine3: {
      api: "getCoverage",
      filterName: "dailyLine1",
      extend: { own: {}, inherit: "lineExtend" },
      data: { rows: [], columns: [] },
      loading: true,
    },
    dailyLine4: {
      api: "getGrowth",
      filterName: "dailyLine1",
      extend: { own: {}, inherit: "lineExtend" },
      data: { rows: [], columns: [] },
      loading: true,
    },
    dailyRing5: {
      api: "getDistributionChart",
      filterName: "dailyLine1",
      extend: {
        own: {
          legend: {
            orient: "vertical",
            right: "0%",
            y: "center",
          },
          series: {
            center: ["30%", "50%"],
            label: {
              show: false,
            },
          },
          // icon: "pin",
        },
        inherit: "ringExtend",
      },
      settings: {
        own: {
          radius: [60, 100],
        },
        inherit: "ringSetting",
      },
      colors: [
        "rgb(132, 121, 255",
        "rgb(255, 201, 53)",
        "rgb(88, 208, 255)",
        "rgb(191, 91, 255)",
        "rgb(255, 97, 97)",
      ],
      data: { rows: [], columns: [], total: "", increase: "" },
      loading: true,
    },
    dailyHistogram6: {
      api: "getTrendChart",
      filterName: "dailyLine1",
      extend: {
        own: {
          series: {
            barWidth: 5,
          },

          legend: {
            show: false,
          },
          xAxis: {
            axisLabel: {
              rotate: 45,
            },
          },
          yAxis: {
            splitLine: { show: false },
          },
          grid: { top: 30, right: 0, left: 0 },
        },
        inherit: "histogramExtend",
      },
      settings: {
        own: {
          scale: [true, true],
        },
        inherit: "",
      },
      colors: ["#6672fb", "#e2e2e2"],
      data: { rows: [], columns: ["content", "active"], total: "" },
      loading: true,
    },
    dailyMap7: {
      api: "getDeviceDistributionChart",
      filterName: "dailyLine1",
      extend: {
        own: {
          series: {
            showLegendSymbol: false,
          },
          legend: {
            show: false,
          },
        },
        inherit: "mapExtend",
      },
      settings: {
        own: {
          aspectScale: 1,
          position: "",
          mapOrigin: "",
          label: false,
          itemStyle: {
            normal: {
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        },
        inherit: "",
      },
      data: { rows: [], columns: ["content", "quantity"] },
      loading: true,
      chartVisualMap: {
        splitNumber: "",
        min: "",
        max: "",
        show: true,
        left: "20%",
        bottom: "10%",
        inRange: {
          color: ["#ff999d", "#ff666b", "#ff333a", "#920005"],
        },
      },
      title: { text: "New Active User Distribution", x: "center", y: "bottom" },
    },
  };

  public mounted(): void {
    this.init();
  }

  public async init() {
    await this.getParam(
      this.getChart,
      [
        "dailyLine1",
        "dailyLine2",
        "dailyLine3",
        "dailyLine4",
        "dailyRing5",
        "dailyHistogram6",
        "dailyMap7",
      ],
      true
    );
  }

  changeLegend(index) {
    let metrics = [].concat(
      this.chartDataList.dailyHistogram6.settings.own.metrics
    );

    if (index === 0 && metrics.indexOf("active") > -1) {
      metrics.splice(0, 1);
      this.chartDataList.dailyHistogram6.colors.splice(0, 1);
    } else if (index === 0 && metrics.indexOf("active") < 0) {
      metrics.unshift("active");
      this.chartDataList.dailyHistogram6.colors.unshift("#6672fb");
    } else if (index === 1 && metrics.indexOf("num") > -1) {
      metrics.splice(1, 1);
      this.chartDataList.dailyHistogram6.colors = ["#6672fb"];
    } else if (index === 1 && metrics.indexOf("num") < 0) {
      this.chartDataList.dailyHistogram6.colors.push("#e2e2e2");
      metrics.push("num");
    }

    this.chartDataList.dailyHistogram6.settings.own.metrics = metrics;
  }

  printContent(e) {
    this.printHtml = document.getElementById("print-wrapper");
    this.$refs.print.print(this.printHtml);
  }

  toCanvas() {
    const dom = document.getElementById("canvas-wrapper");
    const pos = dom.getBoundingClientRect();
    console.log(pos);
    const width = pos.width;
    // let height = pos.height;
    const nX = this.$store.getters.getCollapse ? pos.x - 18.6 : pos.x - 90;
    this.$html2canvas(document.getElementById("canvas-wrapper"), {
      x: pos.x,
      width,
    }).then((cc) => {
      // var canvas = document.createElement("canvas");
      // canvas.setAttribute("width", width);
      // canvas.setAttribute("height", height);
      // var ctx = canvas.getContext("2d");
      // console.log(width, height);
      // ctx.drawImage(cc, 0, 0, width, height);
      this.downLoad(cc.toDataURL("image/jpg"));
    });
  }

  downLoad(url) {
    var oA = document.createElement("a");
    oA.download = `${
      this.chartFilterData.dailyLine1.customer
    } SMART TV OPERATION DASHBOARD-${new Date().getFullYear()}-${new Date().getMonth()}`;
    oA.href = url;
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); // 下载之后把创建的元素删除
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/kalley.less";
@import "../../assets/less/module/date.less";
.el-picker-panel__body .el-month-table /deep/td.current {
  background: rgb(64, 158, 255);
  border-radius: 10px;

  a.cell {
    color: #fff;
  }
}
#canvas-wrapper {
  left: 0;
  top: 0;
  position: fixed;
  z-index: -1;
}
</style>
