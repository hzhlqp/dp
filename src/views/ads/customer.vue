<template>
  <div class="ads-main con-main">
    <div class="main-title">ADS LIST</div>
    <el-form :inline="true" :model="filterData">
      <el-form-item label="Customer">
        <el-input v-model="filterData.customer"></el-input>
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
        sortable="custom"
        property="customer"
        label="Customer"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="exposure"
        label="Exposure"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="exposureUser"
        label="Exposure User"
      ></el-table-column>
      <el-table-column label="Control" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="btn"
            type="primary"
            size="small"
            @click="
              $router.push({
                path: '/ads/cdetail',
                query: { customer: scope.row.customer }
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
interface filterParams {
  adName: string;
  typeId: string;
  net: string;
  params: {
    pageNum: number;
    pageSize: number;
    orderByColumn: string;
    isAsc: string;
  };
}

@Component
export default class adsIndex extends Mixins(tableMixins, filterMixins) {
  // 后端接口名
  private tableApi = "getCustomerDataList";
  private paramApi = "getAdsFilter";

  // 过滤表单
  public filterData: filterParams = {
    customer: "",
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: ""
    }
  };

  public init() {
    this.getParam();
  }
}
</script>
<style lang="less" scope>
.ads-main {
  img {
    max-width: 1200px !important;
    height: auto;
  }

  .min-img {
    width: 70px;
    height: 40px;
  }
}
</style>
