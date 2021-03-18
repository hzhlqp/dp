<template>
  <div class="app-main con-main">
    <div class="main-title">APP LIST</div>
    <el-form :inline="true" :model="filterData">
      <el-form-item label="APP-SQL">
        <el-input v-model="filterData.uniformName"> </el-input>
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
      <el-table-column label="APP-SQL">
        <template slot-scope="scope">
          <el-input
            :ref="'input_' + scope.$index"
            v-model="scope.row.uniformName"
            :disabled="inputList[scope.$index]"
            @change="EditApp(scope.row, scope.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        sortable="custom"
        property="application"
        label="APP-TV"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="createTime"
        label="Createtime"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="updateTime"
        label="Updatetime"
      ></el-table-column>
      <el-table-column label="Control" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="btn"
            type="primary"
            plain
            size="small"
            @click="EditApp(scope.row, scope.$index)"
            >Edit</el-button
          >
          <el-button
            class="btn"
            type="primary"
            size="small"
            @click="SaveApp(scope.row, scope.$index)"
            >Save</el-button
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

@Component
export default class adsIndex extends Mixins(tableMixins, filterMixins) {
  // 后端接口名
  private tableApi = "getAppList";

  // 过滤表单
  public filterData = {
    application: "",
    uniformName: "",
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: "",
    },
  };

  public inputList = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  };

  private EditApp(item, index): void {
    this.inputList[index] = false;
    setTimeout(() => {
      this.$refs["input_" + index].focus();
    }, 10);
  }

  private async SaveApp(item, index): void {
    this.inputList[index] = true;
    let res = await api.setApp({ id: item.id, uniformName: item.uniformName });
    if (res) {
      this.$message({
        message: "edit success",
        type: "success",
      });

      setTimeout(() => {
        this.getTable();
      }, 1500);
    }
  }
}
</script>
<style lang="less" scope>
.app-main {
  .el-table .el-input__inner {
    border: none;
    outline: none;
  }
}
</style>
