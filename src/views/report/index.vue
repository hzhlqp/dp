<template>
  <div class="customer-main con-main">
    <div class="main-title">GLOBAL OTA LIST</div>
    <div class="filter-con fxj-end">
      <el-form :inline="true" :model="filterData">
        <el-form-item label="SoC：">
          <el-select
            v-model="filterData.model"
            filterable
            no-match-text="No matching data"
            placeholder="SoC…"
            clearable
            @change="getParam"
          >
            <el-option
              v-for="item in options.models"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ClientType">
          <el-select
            v-model="filterData.clientType"
            filterable
            no-match-text="No matching data"
            placeholder="Select ClientType…"
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
        <el-form-item label="Software">
          <el-select
            v-model="filterData.version"
            filterable
            no-match-text="No matching data"
            placeholder="Select Software…"
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
        <el-form-item label="ProjectID">
          <el-input
            v-model="filterData.projectId"
            placeholder="ProjectID"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTable">Search</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      empty-text="No Data"
      :data="tableData"
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column type="index" label="NO" width="80"></el-table-column>
      <el-table-column
        sortable="custom"
        property="model"
        width="100"
        label="SoC"
      ></el-table-column>
      <el-table-column
        width="150"
        sortable="custom"
        property="clientType"
        label="ClientType"
      ></el-table-column>
      <el-table-column
        width="150"
        sortable="custom"
        property="version"
        label="Software"
      ></el-table-column>
      <el-table-column
        width="150"
        sortable="custom"
        property="publishTime"
        label="Start Time"
      ></el-table-column>
      <el-table-column
        width="150"
        sortable="custom"
        property="outTime"
        label="End Time"
      ></el-table-column>
      <el-table-column
        width="200"
        sortable="custom"
        property="remainingDays"
        label="Remaining Days"
      ></el-table-column>
      <el-table-column
        width="100"
        sortable="custom"
        property="total"
        label="Total"
      ></el-table-column>
      <el-table-column
        width="150"
        sortable="custom"
        property="upgraded"
        label="Upgraded"
      ></el-table-column>
      <el-table-column
        min-width="80"
        sortable="custom"
        property="coverage"
        label="CR"
      ></el-table-column>
      <el-table-column
        min-width="150"
        sortable="custom"
        property="dlaFlow"
        label="flowGB"
      >
        <template slot-scope="scope">
          {{ (scope.row.dlaFlow / 1024 / 1024 / 1024).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="100"
        sortable="custom"
        property="cost"
        label="Cost"
      ></el-table-column>
      <el-table-column width="130" label="Control" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="btn"
            type="primary"
            size="small"
            @click="
              $router.push({
                path: '/report/detail',
                query: { planId: scope.row.id },
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
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import tableMixins from "../../mixins/table";
import filterMixins from "../../mixins/filter";
interface filterDataProps {
  version: string;
  model: string;
  clientType: string;
  projectId: string;
  params: {
    pageNum: number;
    pageSize: number;
    orderByColumn: string;
    isAsc: string;
  };
}

@Component
export default class reportIndex extends Mixins(tableMixins, filterMixins) {
  // 后端接口名
  private paramApi = "getPlanParam";

  // 导入数据统计
  private validData: Number = 0;
  private illegalData: Number = 0;
  private duplicateData: Number = 0;

  // 上传携带参数
  private uploadParam = {
    updateSupport: false,
    path: "",
  };

  public init() {
    this.getParam();
  }

  // 过滤表单
  public filterData: filterDataProps = {
    version: "", //software
    model: "", //ic Solution
    clientType: "", //clientType
    projectId: "", //projectId
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: "",
    },
  };

  public async getTable(currentPage: number = 1): Promise<any> {
    this.loading = true;
    this.filterData.params.pageNum = !isNaN(currentPage) ? currentPage : 1;
    // 平台用户信息
    let res = await api.getPlanList(this.filterData);
    this.total = res.total;
    res.rows.map((i: any) => {
      i.coverage =
        this.floatMul(i.coverage === null ? 0 : i.coverage, 100) + "%";
      i.cost = i.url.match("https://s3") ? "$" + i.cost : "￥" + i.cost;
    });

    this.tableData = res.rows;

    this.loading = false;
  }

  private floatMul(arg1: number, arg2: number) {
    var m = 0,
      s1 = arg1 + "",
      s2 = arg2 + "";
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/customer.less";
</style>
