<template>
  <div class="order-main con-main">
    <!-- <div class="title">Order Data</div> -->

    <div class="order-con">
      <div class="con-title">ORDER PRODUCTION STATUS</div>
      <div class="filter-con fxj-end">
        <el-form :inline="true" :model="filterData">
          <el-form-item label="OrderId">
            <el-input
              v-model="filterData.orderId"
              placeholder="Select SoC"
            ></el-input>
          </el-form-item>
          <el-form-item label="Source">
            <el-select
              v-model="filterData.source"
              filterable
              no-match-text="No matching data"
              placeholder="Select Source"
              clearable
              @change="getParam"
            >
              <el-option
                v-for="item in options.sourceList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="SoC">
            <el-select
              v-model="filterData.model"
              filterable
              no-match-text="No matching data"
              placeholder="Select SoC"
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
          <el-form-item label="Customer">
            <el-select
              v-model="filterData.customer"
              filterable
              no-match-text="No matching data"
              placeholder="Select Customer"
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
          <el-form-item label="Status">
            <el-select
              v-model="filterData.status"
              filterable
              no-match-text="No matching data"
              placeholder="Select status"
              clearable
              @change="getParam"
            >
              <el-option
                v-for="item in options.statusList"
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
              placeholder="Select factory"
              clearable
              @change="getParam"
            >
              <el-option
                v-for="item in options.factoryList"
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
        <el-table-column
          type="index"
          label="NO"
          width="80"
          fixed
        ></el-table-column>
        <el-table-column
          width="120"
          sortable="custom"
          property="orderId"
          label="Order"
          fixed
        ></el-table-column>
        <el-table-column
          width="120"
          sortable="custom"
          property="source"
          label="Source"
        ></el-table-column>
        <el-table-column
          width="120"
          sortable="custom"
          property="model"
          label="SoC"
        ></el-table-column>
        <el-table-column
          min-width="150"
          sortable="custom"
          property="customer"
          label="Customer"
        ></el-table-column>
        <el-table-column
          width="120"
          sortable="custom"
          property="status"
          label="Status"
        ></el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="factory"
          label="Factory"
        ></el-table-column>
        <el-table-column
          width="200"
          sortable="custom"
          property="softReleaseTime"
          label="SoftReleaseTime"
        >
          <template slot-scope="scope">
            {{
              scope.row.softReleaseTime == null
                ? ""
                : scope.row.softReleaseTime.split(" ")[0]
            }}
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          sortable="custom"
          property="orderQuantity"
          label="Amount"
        ></el-table-column>
        <el-table-column
          width="180"
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
          width="120"
          sortable="custom"
          property="dValue"
          label="DValue"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.dValue >= 0" class="down">{{
              scope.row.dValue
            }}</span>
            <span v-else class="up">{{ scope.row.dValue }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
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
          width="80"
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
import filterMixins from "../../mixins/filter";
interface summationParam {
  dValue: string | null;
  endUserQuantity: number;
  orderQuantity: number;
  produceQuantity: number;
}

@Component
export default class orderData extends Mixins(tableMixins, filterMixins) {
  private paramApi = "getFactoryParam";

  // 过滤表单
  public filterData = {
    source: "",
    ignore: "true",
    orderId: "",
    factory: "",
    model: "",
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: ""
    }
  };

  private summation: summationParam = {
    dValue: null,
    endUserQuantity: 0,
    orderQuantity: 0,
    produceQuantity: 0
  };

  isEndUserQuantity = true;

  public init() {
    this.getParam();
  }

  public async getTable(currentPage: number = 1): Promise<any> {
    this.loading = true;
    this.filterData.params.pageNum = !isNaN(currentPage) ? currentPage : 1;
    // 平台用户信息
    let res = await api.getFactoryOrderList(this.filterData);
    this.total = res.total;
    res.rows.map((i: any) => {
      i.ar = this.floatMul(i.ar, 100) + "%";
      i.status = i.endUserQuantity > 0 ? "on sale" : "in production";
    });
    this.tableData = res.rows;

    this.summation = res.summation;

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
