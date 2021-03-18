<template>
  <div class="customer-main con-main">
    <div class="main-title">DEVICE SULOTION LIST</div>
    <el-form :inline="true" :model="filterData">
      <el-form-item label>
        <el-select filterable no-match-text="No matching data"
          v-model="filterData.group"
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
      <el-form-item label>
        <el-select filterable no-match-text="No matching data"
          v-if="filterData.date"
          v-model="filterData.area"
          style="width:200px"
          placeholder="Add Fiter"
          @change="getTable"
        >
          <el-option
            v-for="item in fliterArea"
            :key="item"
            :label="item"
            :value="item"
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
      <el-table-column type="index" label="NO" width="150"></el-table-column>
      <el-table-column
        sortable="custom"
        property="content"
        :label="label"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="quantity"
        label="Quantity"
      ></el-table-column>
      <el-table-column label="Control" width="250" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="btn"
            type="primary"
            size="small"
            @click="toChild(scope.row.content, scope.row.quantity)"
            >Detail</el-button
          >
          <el-button
            class="btn"
            type="primary"
            size="small"
            @click="getFileName(scope.row.content, scope.row.quantity)"
            >Download</el-button
          >
          <a
            :ref="scope.row.content + '_' + scope.row.quantity"
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
export default class deviceChildsIndex extends Mixins(
  tableMixins,
  filterMixins
) {
  // 后端接口名
  private tableApi = "getChildGroupList";

  // 筛选数据=
  private fliterSelect = [
    { name: "SoC", value: "model" },
    { name: "Region", value: "area" },
    { name: "Customer", value: "customer" },
    { name: "Country", value: "country" },
  ];

  // area列表
  private fliterArea = ["AP", "LA", "EU", "AF", "ME", "NA", "CN"];

  // 文件路径
  private downLink: string = "";

  // 过滤表单
  public filterData = {
    params: { pageNum: 1, pageSize: 10, orderByColumn: "", isAsc: "" },
    group: "",
    date: "",
    area: "",
    path: "",
  };

  public init() {
    this.fliterSelect = this.fliterSelect.filter((i) => {
      return i.value !== this.$route.query.group;
    });

    this.filterData = Object.assign(this.filterData, this.$route.query, {
      group: this.fliterSelect[0].value,
      path: this.$route.query.group,
    });

    if (this.filterData.date) {
      this.filterData.area = "AP";
    }

    this.getTable();
  }

  private get label(): string {
    let labelArr = this.fliterSelect.filter((i) => {
      return i.value === this.filterData.group;
    });
    return labelArr.length ? labelArr[0].name : "";
  }

  private async getFileName(content: string, quantity: number): Promise<any> {
    let data = Object.assign({ content: quantity }, this.filterData);
    let res = await api.getChildExport(data);
    this.downLink = res.fileName;
    setTimeout(() => {
      (<HTMLImageElement>this.$refs[`${content}_${quantity}`]).click();
    }, 10);
  }

  // 跳转到三级页面
  private toChild(content: string, quantity: number) {
    let newArr = this.fliterSelect.filter((i) => {
      return i.value !== this.filterData.group;
    });

    this.$router.push({
      path: "/device/childTwosIndex",
      query: Object.assign({}, this.filterData, {
        content,
        filterGroup: this.$route.query.group,
        subGroup: newArr[0].value,
        params: "",
      }),
    });
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/customer.less";
.customer-main .el-form--inline .el-form-item {
  flex: none !important;
}
</style>
