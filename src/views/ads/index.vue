<template>
  <div class="ads-main con-main">
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
        min-width="180"
        sortable="custom"
        property="adName"
        label="ADs Name"
      ></el-table-column>
      <el-table-column
        min-width="180"
        sortable="custom"
        property="typeName"
        label="Type"
      ></el-table-column>
      <el-table-column min-width="180" label="ADs Image">
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
        property="startTime"
        label="Start Date"
        min-width="180"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="endTime"
        label="End Date"
        min-width="180"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="exposure"
        label="Exposure"
        width="130"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="exposureUser"
        label="Exposure User"
        min-width="180"
      ></el-table-column>
      <el-table-column min-width="100" label="Control" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="btn"
            type="primary"
            size="small"
            @click="
              $router.push({
                path: '/ads/detail',
                query: { area: scope.row.region, adId: scope.row.adId }
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
  private tableApi = "getAdsList";
  private paramApi = "getAdsFilter";

  // 过滤表单
  public filterData: filterParams = {
    adName: "",
    typeId: "",
    net: "",
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
