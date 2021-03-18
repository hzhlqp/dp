import { Component, Vue, Watch } from "vue-property-decorator";
// loading 样式
import "v-charts/lib/style.css";

declare module "vue/types/vue" {
  interface Vue {
    [key: string]: any;
  }
}
@Component
export default class filterMixin extends Vue {
  // 色系
  public colors = [
    "#0084F4",
    "#00C48C",
    "#6979F8",
    "#FFA26B",
    "#DBA5F5",
    "#FF5C00",
    "#33CCFF",
    "#6610C8",
    "#FFEC00",
    "#E400F4"
  ];
  public chartDataList: any = {};

  // [x: string]: any;

  // 折线图 extend
  public lineExtend = {
    legend: {},
    grid: {
      top: 30,
      left: 30,
      bottom: 30,
      right: 60
    }
  };

  // 折线图 setting
  public lineSetting = {
    area: true
  };

  public barExtend = {
    legend: {
      show: false
    },
    grid: {
      right: 30,
      left: 30,
      bottom: 30,
      top: 60
    }
  };

  // 饼状图 extend
  public pieExtend = {
    legend: {
      show: false
    }
  };

  // 环状图 extend
  public ringExtend = {
    series: {
      label: {
        show: false
      }
    }
  };

  // 环状图 setting
  public ringSetting = {
    selectedMode: true,
    offsetY: "55%",
    label: {
      normal: {
        show: false,
        position: "center"
      },
      emphasis: {
        show: true,
        textStyle: {
          fontSize: "24",
          fontWeight: "bold"
        }
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    }
  };

  // 柱状图
  public histogramExtend = {
    barWidth: "30px",
    xAxis: {
      axisLabel: {
        interval: 0
      }
    },
    legend: {
      show: false
    },
    grid: { top: 30, right: 60, left: 30 }
  };

  // 存储数据
  public storeData: any = {};

  /**
   * chart: 指定图表请求
   * @param chartNameArray 图表列表
   */
  public async getChart(chartNameArray?: Array<any>) {
    this.storeData = {};
    this.mergeSet();

    let apiChart = chartNameArray || this.chartDataList;

    // 图表和表格共存的时候，需要把字段修改成 chartFilterData
    let isChartFilter =
      this.chartFilterData && Object.keys(this.chartFilterData);
    let currentFilterData;
    if (isChartFilter) {
      currentFilterData = this.chartFilterData;
    } else {
      currentFilterData = this.filterData;
    }

    // 遍历请求
    if (Array.isArray(apiChart)) {
      for (let key = 0, len = apiChart.length; key < len; key++) {
        let dataItem = this.chartDataList[apiChart[key]];
        if (!this.storeData[dataItem.api]) {
          let filterData = dataItem.filterName
            ? currentFilterData[dataItem.filterName]
            : currentFilterData[apiChart[key]];

          // 有开始结束日期，需要重新赋值
          if (filterData.beginDate) {
            filterData.beginDate = filterData.value[0];
            filterData.endDate = filterData.value[1];
          }

          // 在筛选条件中，如果选择全部，这日期也默认为all
          if (filterData.dataType == "total" && filterData.timeType) {
            let newFilterData = Object.assign({}, filterData);
            newFilterData.timeType = "all";
            dataItem.loading = true;
            this.storeData[dataItem.api] = await api[dataItem.api](
              newFilterData
            );
            dataItem.loading = false;

            // 其他的正常进行
          } else {
            dataItem.loading = true;
            this.storeData[dataItem.api] = await api[dataItem.api](filterData);
            dataItem.loading = false;
          }

          // 当图表加载完整之后触发window的resize，让图表显示正常
          if (len - 1 === key) {
            if (document.createEvent) {
              var event = document.createEvent("HTMLEvents");
              event.initEvent("resize", true, true);
              window.dispatchEvent(event);
            } else if (document.createEventObject) {
              window.fireEvent("onresize");
            }
          }
        }

        // 柱状图叠
        if (dataItem.overlay && this.storeData[dataItem.api].list.length) {
          let keys = Object.keys(this.storeData[dataItem.api].list[0]).filter(
            (i: string) => {
              return i != "timeStamp";
            }
          );
          dataItem.settings.own.stack.chartName = keys;
        }

        this.convertData(dataItem, this.storeData[dataItem.api]);
      }
    } else {
      for (let key in apiChart) {
        // 开始请求接口

        if (!this.storeData[apiChart[key].api]) {
          // 如果查询条件公用，则定义filterName指向公用的名字
          let filterData = apiChart[key].filterName
            ? currentFilterData[apiChart[key].filterName]
            : currentFilterData[key];

          apiChart[key].loading = true;
          this.storeData[apiChart[key].api] = await api[apiChart[key].api](
            filterData
          );
          // 请求接口结束
          apiChart[key].loading = false;
        }

        // 柱状图叠
        if (
          apiChart[key].overlay &&
          this.storeData[apiChart[key].api].list.length
        ) {
          let keys: Array<string> = Object.keys(
            this.storeData[apiChart[key].api].list[0]
          ).filter((i: string) => {
            return i != "timeStamp";
          });
          apiChart[key].settings.own.stack.chartName = keys;
        }
        this.convertData(apiChart[key], this.storeData[apiChart[key].api]);
      }
    }
  }

  // 合并图表设置
  public mergeSet(): void {
    for (let key in this.chartDataList) {
      // settings设置
      if (
        this.chartDataList[key].settings &&
        this.chartDataList[key].settings.inherit &&
        this[this.chartDataList[key].settings.inherit]
      ) {
        this.mergeDeep(
          this.chartDataList[key].settings.own,
          this[this.chartDataList[key].settings.inherit]
        );
      }

      // extend设置
      if (
        this.chartDataList[key].extend &&
        this.chartDataList[key].extend.inherit &&
        this[this.chartDataList[key].extend.inherit]
      ) {
        this.mergeDeep(
          this.chartDataList[key].extend.own,
          this[this.chartDataList[key].extend.inherit]
        );
      }
    }
  }

  /**
   *
   * @param target 目标对象
   * @param sources 合并对象
   */
  public mergeDeep(target: any, ...sources: any) {
    if (!sources.length) return;
    const source = sources.shift();
    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          this.mergeDeep(target[key], source[key]);
        } else {
          if (target[key] === undefined) {
            this.$set(target, key, source[key]);
          }
        }
      }
    }
  }

  /**
   * Simple object check.
   * @param item
   * @returns {boolean}
   */
  private isObject(item: any): boolean {
    return item && typeof item === "object" && !Array.isArray(item);
  }

  /**
   * @param chart chart对象
   * @param data chart数据
   */
  private convertData(chart: any, data: any) {
    if (Array.isArray(data.items)) {
      chart.data.rows = data.items[0].list;
      chart.data.columns = data.items[0].title;
      let country = data.items[0].country;
      if (!chart.data.rows.length || !country || country == "Unknown") return;

      // 数据特殊处理----- 哥伦比亚
      if (country === "Colombia") {
        chart.data.rows.map(item => {
          if (item.content.match("Departamento del")) {
            item.content = item.content.split("Departamento del ")[1];
          } else if (item.content.match("Departamento de")) {
            item.content = item.content.split("Departamento de ")[1];
          } else if (item.content.match(" Department")) {
            item.content = item.content.split(" Department")[0];
          } else if (item.content.match("D.C.")) {
            item.content = item.content.split(" D.C.")[0];
          }
          return item;
        });
      }

      // 数据特殊处理----- 越南
      if (country === "Vietnam") {
        let cityNum = 0;
        chart.data.rows.forEach((item, index: number) => {
          if (item.content.match("Hoanh Bo")) {
            cityNum = item.quantity;
            chart.data.rows.splice(index, 1);
          }
        });

        chart.data.rows = chart.data.rows.map(item => {
          if (item.content.match("Tinh Quang Ninh")) {
            item.quantity += cityNum;
          }
          return item;
        });
      }

      let util = 0;
      let max = chart.data.rows[0].quantity;
      if (max >= 10 && max < 100) {
        util = 10;
      } else if (max >= 100 && max < 1000) {
        util = 100;
      } else if (max >= 1000 && max < 10000) {
        util = 1000;
      }

      chart.chartVisualMap.splitNumber = 4;
      chart.chartVisualMap.min =
        Math.floor(
          chart.data.rows[chart.data.rows.length - 1].quantity / util
        ) * util;
      chart.chartVisualMap.max =
        Math.ceil(chart.data.rows[0].quantity / util) * util;
      chart.data.rows[chart.data.rows.length - 1].quantity;
      chart.settings.own.position = country;
      chart.settings.own.mapOrigin = require(`../country/json/${country}.json`);
      return;
    }

    // 可能是数组
    if (data.list && data.list.length && Array.isArray(data.list[0].list)) {
      data.list.sort((i: any, j: any) => {
        return i - j;
      });

      data.list.filter((i: any) => {
        return i != "date";
      });

      let res = data.list;
      res.map((i: any) => {
        i.rows = i.list;
        i.columns = i.title;
      });
      chart.data = res;
    } else {
      //数据名，有些数据名不是list和title
      if (chart.name) {
        chart.data.rows = data[chart.name + "List"];
        chart.data.columns = data[chart.name + "Title"];
      } else {
        if (!data.title) return;

        if (
          data.title &&
          (data.title.indexOf("quantity") === 0 ||
            data.title.indexOf("modelQuantity") === 0 ||
            data.title.indexOf("customerQuantity") === 0)
        ) {
          data.title.reverse();
        }

        // 排序
        if (
          data.list &&
          data.list.length &&
          !(data.list[0].content && data.list[0].content.match("-")) &&
          (data.title.indexOf("customerQuantity") >= 0 ||
            data.title.indexOf("modelQuantity") >= 0 ||
            data.title.indexOf("countryQuantity") >= 0 ||
            data.title.indexOf("quantity") >= 0)
        ) {
          if (data.list[0].quantity) {
            data.list.sort((i: any, j: any) => {
              return j.quantity - i.quantity;
            });
          } else {
            data.list.sort((i: any, j: any) => {
              return i.modelQuantity - j.modelQuantity;
            });
          }
        }
        chart.data.rows = data.list;
        if (!chart.data.columns.length) chart.data.columns = data.title;

        if (data.increase || data.increase === 0)
          chart.data.increase = data.increase;
        if (data.total || data.total === 0) chart.data.total = data.total;
      }
    }
  }

  // 当图表和表格同时存在的时候
  public changeChartParam(
    chartNames: Array<string>,
    parmaName: string,
    value: any
  ) {
    chartNames.forEach(i => {
      this.filterData[i][parmaName] = value;
    });

    this.getChart(chartNames);
  }
}
