import { Component, Vue } from "vue-property-decorator";
@Component
export default class tableMixin extends Vue {
  public mounted(): void {
    this.init();
  }

  public init() {
    this.getTable();
  }

  [x: string]: any;
  public filterData = {
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: "",
    },
  };

  //  表格数据
  public tableData = [];

  //数据条数
  public total: number = 0;

  // 加载状态
  public loading: boolean = false;

  // 获取表格数据
  public async getTable(currentPage: number = 1): Promise<any> {
    this.loading = true;
    this.filterData.params.pageNum = !isNaN(currentPage) ? currentPage : 1;
    let res = await api[this.tableApi](this.filterData);
    this.tableData = res.rows;
    this.total = res.total;
    this.loading = false;
  }

  // 排序
  public async sortChange(column: any) {
    // 字段重复特殊处理
    if (column.prop === "status" && this.isEndUserQuantity) {
      this.filterData.params.orderByColumn = "endUserQuantity";
    } else {
      this.filterData.params.orderByColumn = column.prop;
    }
    this.filterData.params.isAsc =
      column.order === "ascending"
        ? "asc"
        : column.order === "descending"
        ? "desc"
        : "";
    this.getTable();
  }
}
