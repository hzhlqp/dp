<template>
  <div class="order-main con-main">
    <div class="order-con">
      <div class="con-title ">ERROR LIST</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="filterData">
          <el-form-item label="Error Type">
            <el-select
              v-model="filterData.type"
              filterable
              no-match-text="No matching data"
              placeholder="Select Error Type…"
              clearable
              @change="getParam"
            >
              <el-option
                v-for="item in options.types"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Factory">
            <el-select
              v-model="filterData.factory"
              filterable
              no-match-text="No matching data"
              placeholder="Select Factory…"
              clearable
              @change="getParam"
            >
              <el-option
                v-for="item in options.factories"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Version">
            <el-select
              v-model="filterData.version"
              filterable
              no-match-text="No matching data"
              placeholder="Select Version…"
              clearable
              @change="getParam"
            >
              <el-option
                v-for="item in options.versions"
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
      <el-table
        v-loading="loading"
        empty-text="No Data"
        :data="tableData"
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column type="index" label="NO" width="70"> </el-table-column>
        <el-table-column
          min-width="150"
          sortable="custom"
          property="type"
          label="Error Type"
        >
        </el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="factory"
          label="Factory"
        >
        </el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="version"
          label="Version"
        >
        </el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="times"
          label="Times"
        >
        </el-table-column>
        <el-table-column
          min-width="180"
          sortable="custom"
          property="createTime"
          label="Init Time"
        >
        </el-table-column>
        <el-table-column
          min-width="180"
          sortable="custom"
          property="updateTime"
          label="Update Time"
        >
        </el-table-column>
        <el-table-column
          min-width="150"
          sortable="custom"
          property="updateBy"
          label="Operator"
        >
        </el-table-column>
        <el-table-column label="Status" width="140">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.status"
              filterable
              no-match-text="No matching data"
              @change="changeStatus(scope.row.id, scope.row.status)"
            >
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="Control" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button
              class="btn"
              type="primary"
              size="small"
              @click="
                $router.push({
                  path: '/quality/detail',
                  query: { parentId: scope.row.id }
                })
              "
              >Detail</el-button
            >
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
import tableMixins from "../../mixins/table";
import filterMixins from "../../mixins/filter";

@Component
export default class qualityIndex extends Mixins(tableMixins, filterMixins) {
  // 后端接口名
  private tableApi = "getFactoryReportList";
  private paramApi = "getFactoryReportParam";

  // 过滤表单
  public filterData = {
    type: "",
    version: "",
    factory: "",
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: ""
    }
  };

  private status = [
    { name: "未修复", value: "0" },
    { name: "处理中", value: "1" },
    { name: "已忽略", value: "2" },
    { name: "已修复", value: "3" },
    { name: "修复失败", value: "4" }
  ];

  public init() {
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
