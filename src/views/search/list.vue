<template>
  <div class="order-main con-main">
    <div class="order-con no-title">
      <el-form :inline="true" :model="filterData">
        <el-form-item label="Customer">
          <el-select
            v-model="filterData.customer"
            filterable
            no-match-text="No matching data"
            placeholder="Select Customer..."
            clearable
            @change="getParam"
          >
            <el-option
              v-for="item in options.customerList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Model">
          <el-select
            v-model="filterData.model"
            filterable
            no-match-text="No matching data"
            placeholder="Select Model..."
            clearable
            @change="getParam"
          >
            <el-option
              v-for="item in options.modelList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Soc">
          <el-select
            v-model="filterData.modelType"
            filterable
            no-match-text="No matching data"
            placeholder="Select Soc..."
            clearable
            @change="getParam"
          >
            <el-option
              v-for="item in options.modelTypeList"
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
      <el-table
        v-loading="loading"
        empty-text="No Data"
        :data="tableData"
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column type="index" label="NO" width="80"></el-table-column>
        <el-table-column
          min-width="150"
          property="customer"
          sortable="custom"
          label="Customer"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          min-width="120"
          property="model"
          label="Model"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          min-width="150"
          property="modelType"
          label="ModelType"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          min-width="180"
          sortable="custom"
          property="orderQuantity"
          label="OrderQuantity"
        ></el-table-column>
        <el-table-column
          min-width="200"
          sortable="custom"
          property="produceQuantity"
          label="ProduceQuantity"
        ></el-table-column>
        <el-table-column
          min-width="200"
          sortable="custom"
          property="endUserQuantity"
          label="EndUserQuantity"
          align="center"
        ></el-table-column>
        <el-table-column
          min-width="180"
          sortable="custom"
          property="staticQuantity"
          label="StaticQuantity"
        ></el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="dValue"
          label="dValue"
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
import filterMixins from "../../mixins/filter";
@Component
export default class systemAccount extends Mixins(tableMixins, filterMixins) {
  // 后端接口名
  private tableApi = "getModelList";
  private paramApi = "getModelParams";

  // 过滤表单
  public filterData = {
    modelType: "",
    customer: "",
    model: "",
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
@import "../../assets/less/page/customer.less";
.order-con.no-title {
  padding-top: 50px;
}
</style>
