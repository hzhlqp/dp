import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class filterMixin extends Vue {
  // 下拉数组
  public options = {};

  //
  public chartOptions = {};

  // 参数筛选项
  public paramFilter = {};

  [x: string]: any;

  /**
   *
   * @param callback 获取参数之后回调
   * @param filterData 指定要获取的数据
   */
  public async getParam(
    callback?: any,
    filterName?: Array<any>,
    isChart?: Boolean = false
  ): Promise<any> {
    this.paramFilter = {};
    let currentFilterData;
    // 只有 filterData 和 chartFilterData同时存在时，  才会有 this.chartFilterData
    let isChartFilter =
      this.chartFilterData && Object.keys(this.chartFilterData) && isChart;
    let currentAPI;
    if (isChartFilter) {
      currentFilterData = this.chartFilterData;
      currentAPI = this.chartParamApi;
    } else {
      currentFilterData = this.filterData;
      currentAPI = this.paramApi;
    }

    if (filterName && Array.isArray(filterName) && filterName.length) {
      for (let key in currentFilterData[filterName[0]]) {
        if (key !== "params") {
          this.paramFilter[key] = currentFilterData[filterName[0]][key];
        }
      }
    } else {
      for (let key in currentFilterData) {
        if (key !== "params") {
          this.paramFilter[key] = currentFilterData[key];
        }
      }
    }

    // 只有 filterData 和 chartFilterData同时存在时，  才会有 this.chartFilterData
    let res = await api[currentAPI](this.paramFilter);
    if (isChartFilter) {
      this.chartOptions = res;
    } else {
      this.options = res;
    }

    // 当前是表格请求
    if (this.getTable && !isChart) {
      this.getTable();
    }

    if (callback && typeof callback === "function") {
      callback(filterName);
    }
  }
}
