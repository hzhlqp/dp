<template>
  <div class="order-main con-main">
    <!-- <div class="title">SoC Data</div> -->

    <div class="order-con">
      <div class="con-title">SoC SOLUTION PRODUCTION STATUS</div>
      <el-form :inline="true" :model="filterData">
        <el-form-item label="Source">
          <el-select
            v-model="filterData.source"
            filterable
            no-match-text="No matching data"
            placeholder="Select Source"
          >
            <el-option value="huan" label="huan"></el-option>
            <el-option value="scbc" label="scbc"></el-option>
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
        <el-table-column type="index" label="NO" width="80"></el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="source"
          label="Source"
        ></el-table-column>
        <el-table-column
          min-width="100"
          sortable="custom"
          property="model"
          label="SoC"
        ></el-table-column>
        <el-table-column
          min-width="100"
          sortable="custom"
          property="orderQuantity"
          label="Total"
        ></el-table-column>
        <el-table-column
          min-width="180"
          sortable="custom"
          property="produceQuantity"
          label="Productived"
        >
          <template slot-scope="scope">
            <el-tooltip
              v-if="scope.row.model == 'MT5659'"
              content="Production data not reported"
              placement="top"
            >
              <div class="warn">
                <span>{{ scope.row.produceQuantity }}</span>
                <i class="el-icon-warning"></i>
              </div>
            </el-tooltip>
            <span v-else>{{ scope.row.produceQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="endUserQuantity"
          label="Actived"
        >
          <template slot-scope="scope">
            <el-tooltip
              v-if="scope.row.source == 'huan'"
              content="The data is not connected"
              placement="top"
            >
              <div class="warn">
                <span>{{ scope.row.endUserQuantity }}</span>
                <i class="el-icon-warning"></i>
              </div>
            </el-tooltip>
            <span v-else>{{ scope.row.endUserQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="staticQuantity"
          label="Default"
        ></el-table-column>
        <el-table-column
          min-width="100"
          property="ar"
          label="AR"
          sortable="custom"
        ></el-table-column>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import tableMixins from "../../mixins/table";
@Component
export default class orderIc extends Mixins(tableMixins) {
  // 过滤表单
  public filterData = {
    source: "",
    ignore: "true",
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: ""
    }
  };

  public async getTable(currentPage: number = 1): Promise<any> {
    this.loading = true;
    this.filterData.params.pageNum = !isNaN(currentPage) ? currentPage : 1;
    // 平台用户信息
    let res = await api.getFactoryList(this.filterData);
    this.total = res.total;
    res.rows.map((i: any) => {
      i.ar = this.floatMul(i.ar, 100) + "%";
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
@import "../../assets/less/page/order.less";
.warn i {
  margin-left: 3px;
  color: #e6a23c;
  font-size: 15px;
}
</style>
