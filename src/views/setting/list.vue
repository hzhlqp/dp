<template>
  <div class="setting-main con-main">
    <div class="main-title">SECURITY AND LOGIN</div>
    <div class="block-title">Where You're Logged In</div>
    <el-table
      v-loading="loading"
      empty-text="No Data"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        sortable="custom"
        property="date"
        label=""
        width="300"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.os.match('Windows')"
            src="../../assets/img/window.png"
            alt=""
          />
          <img
            v-else
            src="../../assets/img/mac.png"
            alt=""
          />
          <span class="system-name">{{ scope.row.os }}</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        property="loginName"
        label=""
      >
      </el-table-column>
      <el-table-column
        sortable="custom"
        property="ipaddr"
        label=""
      ></el-table-column>
      <el-table-column
        sortable="custom"
        property="loginTime"
        label=""
      ></el-table-column>
    </el-table>

    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="filterData.params.pageNum"
        @current-change="init"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class settingList extends Vue {
  tableData = [];

  total = 0;

  filterData = {
    loginName: "",
    ipaddr: "",
    loginLocation: "",
    params: {
      pageNum: 1,
      pageSize: 10
    }
  };

  isshowBottom = false;

  private loading: boolean = false;

  mounted(): void {
    this.init();
  }

  async init(currentPage: number = 1): Promise<any> {
    this.loading = true;
    this.filterData.params.pageNum = !isNaN(currentPage) ? currentPage : 1;
    let res = await api.loginList(this.filterData);
    this.tableData = res.rows;
    this.total = res.total;
    this.loading = false;
  }
}
</script>
<style lang="less" scope>
.setting-main {
  .block-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgba(246, 249, 252, 1);
    font-size: 14px;
    color: #1e273b;
    text-indent: 15px;
  }

  .el-table .cell {
    img,
    span {
      padding: 0 12px;
      display: inline-block;
      vertical-align: middle;
      color: #606a81;
    }
  }

  .el-table {
    padding-bottom: 50px;
    color: #606a81;
    font-size: 14px;
    &::before {
      display: none;
    }

    thead {
      display: none;
    }
  }
}
</style>
