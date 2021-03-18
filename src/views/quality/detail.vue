<template>
  <div class="order-main con-main">
    <div class="order-con">
      <div class="con-title ">DATA LIST</div>
      <el-form :inline="true" :model="filterData">
        <el-form-item label="Mac name">
          <el-select
            v-model="filterData.mac"
            filterable
            no-match-text="No matching data"
            placeholder="Select PC’s MAC…"
            clearable
          >
            <el-option
              v-for="item in options.macs"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTable">Search</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        empty-text="No Data"
        :data="tableData"
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column type="index" label="NO" width="70"> </el-table-column>
        <el-table-column
          sortable="custom"
          property="reportData"
          label="Error summary"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column sortable="custom" property="factory" label="Factory">
        </el-table-column>
        <el-table-column sortable="custom" property="mac" label="PC-MAC">
        </el-table-column>
        <el-table-column sortable="custom" property="version" label="Version">
        </el-table-column>
        <el-table-column
          sortable="custom"
          property="createTime"
          label="Init Time"
        >
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
import tableMixins from "../../mixins/table";
import fliterMixins from "../../mixins/filter";
@Component
export default class qualityIndex extends Mixins(tableMixins, fliterMixins) {
  // 后端接口名
  private tableApi = "getFactoryReportDetail";
  private paramApi = "getFactoryReportDetailParam";

  // 过滤表单
  public filterData = {
    parentId: "",
    mac: "",
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: ""
    }
  };

  public init() {
    this.filterData.parentId = this.$route.query.parentId + "";
    this.getParam();
  }

  private async changeStatus(id: number, status: string) {
    let res = await api.getFactoryReportEdit({ id, status });
    if (res) {
      this.$message({
        message: "edit success",
        type: "success"
      });
    }
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/order.less";
</style>
