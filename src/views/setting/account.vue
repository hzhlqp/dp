<template>
  <div class="order-main con-main">
    <div class="order-con">
      <div class="con-title">SYSTEM ACCOUNT</div>
      <el-form :inline="true" :model="filterData">
        <el-form-item label="Account">
          <el-input
            v-model="filterData.loginName"
            placeholder="Account"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTable">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            @click="
              $router.push({
                path: '/setting/editAccount'
              })
            "
            >Create</el-button
          >
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
          property="loginName"
          label="Account"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          min-width="150"
          sortable="custom"
          property="userName"
          label="UserName"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          min-width="120"
          sortable="custom"
          property="email"
          label="E-mail"
        ></el-table-column>
        <el-table-column
          min-width="120"
          property="roles"
          label="Role"
        ></el-table-column>
        <el-table-column
          min-width="180"
          sortable="custom"
          property="createTime"
          label="Createtime"
        ></el-table-column>
        <el-table-column label="Control" width="320" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              plain
              @click="
                $router.push({
                  path: '/setting/editAccount',
                  query: { userId: scope.row.userId }
                })
              "
              >Edit</el-button
            >
            <template>
              <el-popconfirm
                title="Are you sure you would like to delete this user"
                confirm-button-text="sure"
                cancel-button-text="cancel"
                @onConfirm="deleteAccount(scope.row.userId)"
              >
                <el-button
                  slot="reference"
                  class="middle-btn"
                  type="danger"
                  size="small"
                  plain
                  >Delete</el-button
                >
              </el-popconfirm>
            </template>
            <el-button
              type="warning"
              size="small"
              plain
              @click="
                $router.push({
                  path: '/setting/resetPassword',
                  query: {
                    userId: scope.row.userId,
                    loginName: scope.row.loginName
                  }
                })
              "
              >Reset Password</el-button
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
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import tableMixins from "../../mixins/table";
@Component
export default class systemAccount extends Mixins(tableMixins) {
  // 过滤表单
  public filterData = {
    loginName: "",
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
    let res = await api.getAccountList(this.filterData);
    res.rows.map((i: any) => {
      var roles = "";
      if (i.roles.length) {
        i.roles.forEach(
          (j: any, index: number) =>
            (roles += (index === 0 ? "" : ",") + j.roleName)
        );
      }
      i.roles = roles;
      return i;
    });
    this.total = res.total;
    this.tableData = res.rows;
    this.loading = false;
  }

  public async deleteAccount(userId: number) {
    let res = await api.deleteAccount({ userId });
    if (res) {
      this.$message({
        message: "delete success",
        type: "success"
      });
    }
    this.init();
  }
}
</script>
<style lang="less" scope>
.order-main {
  background: transparent;

  .title {
    padding: 20px;
    font-size: 20px;
    color: #67758d;
    background: #fff;
    font-weight: bold;
  }

  .order-con {
    padding: 0 30px;
    margin-top: 20px;
    background: #fff;
  }

  .con-title {
    padding: 20px 0;
    font-size: 20px;
    color: #67758d;
  }

  /deep/ .middle-btn {
    margin: 0 5px;
  }
}
</style>
