<template>
  <div class="ads-main con-main">
    <a href="javascript:;" class="back" @click="$router.go(-1)"> < Back</a>
    <div class="main-title">ADS LIST</div>
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
        property="userId"
        label="UserID"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="clientType"
        label="ClientType"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="adName"
        label="ADs Name"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="typeName"
        label="Type"
      ></el-table-column>
      <el-table-column label="Image">
        <template slot-scope="scope">
          <el-image
            class="min-img"
            :src="scope.row.adImg"
            :alt="scope.row.adImgId"
            :preview-src-list="[scope.row.adImg]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        property="countryName"
        label="Country"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="province"
        label="Province"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="recieveTime"
        label="Exposure Time"
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
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import tableMixins from "../../mixins/table";
import filterMixins from "../../mixins/filter";
@Component
export default class adsDetail extends Mixins(tableMixins, filterMixins) {
  // 后端接口名
  private tableApi = "getAdsCustomerDetail";

  public filterData: any = {
    customer: "",
    params: {
      orderByColumn: "",
      isAsc: "",
      pageNum: 1,
      pageSize: 10
    }
  };

  public init() {
    this.getTable();
  }

  public mounted(): void {
    this.filterData.customer = this.$route.query.customer;
    this.init();
  }
}
</script>
<style lang="less" scope></style>
