<template>
  <div class="customer-main con-main">
    <div class="main-title">GEOGRAPHY LIST</div>
    <el-form
      :inline="true"
      :model="filterData"
    >
      <el-form-item label>
        <el-select filterable no-match-text="No matching data"
          v-model="filterData.subGroup"
          style="width:200px"
          placeholder="Add Fiter"
          @change="getTable"
        >
          <el-option
            v-for="item in fliterSelect"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      empty-text="No Data"
      :data="tableData"
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        type="index"
        label="NO"
        width="50"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="content"
        label="SoC"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="subContent"
        :label="label"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="quantity"
        label="Quantity"
      ></el-table-column>
      <el-table-column
        label="Control"
        width="250"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            class="btn"
            type="primary"
            size="small"
            @click="getFileName(scope.row.subContent)"
          >Download</el-button>
          <a
            :ref="scope.row.subContent"
            :href="apiUrl + '/common/download?fileName=' + downLink"
            :download="downLink"
          ></a>
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
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import tableMixins from "../../mixins/table";
import filterMixins from "../../mixins/filter";
@Component
export default class deviceChildTwosIndex extends Mixins(tableMixins, filterMixins) {
  // 后端接口名
  private tableApi = "getChildDetail";

  // 筛选数据=
  private fliterSelect = [
    { name: "SoC", value: "model" },
    { name: "Region", value: "area" },
    { name: "Customer", value: "customer" },
    { name: "Country", value: "country" }
  ];

  // 过滤表单
  public filterData = {
    params: { pageNum: 1, pageSize: 10, orderByColumn: "", isAsc: "" },
    group: "",
    subGroup: ""
  };

  // 文件路径
  private downLink: string = "";

  public mounted() {
    this.fliterSelect = this.fliterSelect.filter(i => {
      return i.value !== this.$route.query.group && i.value !== this.$route.query.filterGroup;
    });

    this.filterData = Object.assign(this.filterData, this.$route.query, {
      params: { pageNum: 1, pageSize: 10, orderByColumn: "", isAsc: "" },
      subGroup: this.fliterSelect[0].value
    });
    this.init();
  }

  private get label(): string {
    let labelArr = this.fliterSelect.filter(i => {
      return i.value === this.filterData.subGroup;
    });
    return labelArr.length ? labelArr[0].name : "";
  }

  private async getFileName(subContent: string): Promise<any> {
    let data = Object.assign({ subContent }, this.filterData);
    let res = await api.getChildDetailExport(data);
    this.downLink = res.fileName;
    setTimeout(() => {
      (<HTMLImageElement>this.$refs[`${subContent}`]).click();
    }, 10);
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/customer.less";
</style>
