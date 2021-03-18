<template>
  <div class="setting-main con-main">
    <div class="main-title">SECURITY AND LOGIN</div>
    <div class="block-title fxc-between">
      <span>Where You're Logged In </span>
      <router-link
        :to="{ path: '/setting/list' }"
        class="more-more"
      >
        <span></span>
      </router-link>
    </div>
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
    <div class="block-title ">
      <span> Login</span>
    </div>
    <div class="block-con">
      <div class="block-top fxc-between">
        <div class="top-left fx-center">
          <img
            src="../../assets/img/key.png"
            alt=""
          />
          <div class="con-title">
            <p class="title">Change password</p>
            <p class="tip">
              It's a good idea to use a strong password that you're not using
              elsewhere
            </p>
          </div>
        </div>
        <el-button
          v-if="!isshowBottom"
          type="primary"
          @click="showBottom(true)"
        >Edit</el-button>
        <el-button
          v-if="isshowBottom"
          @click="showBottom(false)"
        >Close</el-button>
      </div>
      <div
        v-if="isshowBottom"
        class="block-bottom"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="120"
        >
          <el-form-item label="Current：">
            <el-input
              v-model="form.oldPassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="New：">
            <el-input
              v-model="form.newPassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="Re-type new：">
            <el-input
              v-model="form.reNewPassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >Save Chanages</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class settingIndex extends Vue {
  tableData = [];

  form = {
    oldPassword: "",
    newPassword: "",
    reNewPassword: ""
  };

  filterData = {
    loginName: "",
    ipaddr: "",
    loginLocation: "",
    params: {
      pageNum: 1,
      pageSize: 3
    }
  };

  isshowBottom = false;

  private loading: boolean = false;

  mounted(): void {
    this.init();
  }

  async init(): Promise<any> {
    this.loading = true;
    let res = await api.loginList(this.filterData);
    this.tableData = res.rows;
    this.loading = false;
  }

  showBottom(value: boolean) {
    this.isshowBottom = value;
  }

  async onSubmit(): Promise<any> {
    if (this.form.newPassword !== this.form.reNewPassword) {
      this.$message({
        message: "password and Re-entered password do not match",
        type: "error"
      });
      return;
    }
    let res = await api.resetPwd(this.form);
    if (res) {
      this.$message({
        message: "reset password successfully, please login again",
        type: "success"
      });
      setTimeout(() => {
        this.$router.push("/login");
      }, 1500);
    }
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
    padding: 0 15px;
  }

  .el-table .cell {
    img,
    span {
      padding: 0 12px;
      display: inline-block;
      vertical-align: middle;
      color: #606a81;
    }

    img {
      width: 44px;
      height: auto;
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

  .block-top {
    padding: 15px 25px;
    img {
      margin-right: 25px;
    }

    .title {
      font-size: 14px;
      line-height: 20px;
      color: #1d2942;
    }

    .tip {
      font-size: 14px;
      line-height: 20px;
      color: #94979b;
    }
  }

  .block-bottom {
    padding-bottom: 40px;
    width: 400px;
    margin: auto;
    text-align: center;
  }
}
</style>
