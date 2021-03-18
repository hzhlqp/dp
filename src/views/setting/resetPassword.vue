<template>
  <div class="order-main con-main left">
    <div class="order-con">
      <div class="con-title">EDIT PASSWORD</div>
      <el-form
        ref="form"
        :model="form"
        label-width="180px"
      >
        <el-form-item label="Account">
          <el-input
            v-model="form.loginName"
            type="text"
            :readonly="true"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="New Password"
          required
        >
          <el-input
            v-model="form.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="Re-type Password" required>
          <el-input v-model="form.repassword" type="password"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="$router.push('/setting/account')">Cancel</el-button>
          <el-button
            type="primary"
            @click="onSubmit"
          >Save</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class orderData extends Vue {
  private tableData = [];
  // 过滤表单
  private form = {
    password: "",
    userId: "",
    loginName: ""
  };

  private roles = [];

  private total: number = 0;

  private loading: boolean = false;

  mounted(): void {
    this.form.loginName = this.$route.query.loginName + "";
  }

  public async onSubmit() {
    this.form.userId = this.$route.query.userId + "";
    let res = await api.resetPwdAccount(this.form);
    if (res) {
      this.$message({
        message: "update success",
        type: "success"
      });
    }

    this.$router.push({ path: "/setting/account" });
  }
}
</script>
<style lang="less" scope>
.order-main.left {
  background: transparent;

  .title {
    padding: 20px;
    font-size: 20px;
    color: #67758d;
    background: #fff;
    font-weight: bold;
  }

  .order-con {
    margin: 20px 0 0 0;
    padding: 0 30px 100px !important;
    background: #fff;
  }

  .con-title {
    padding: 20px 0;
    font-size: 20px;
    color: #67758d;
  }

  .el-form {
    margin: 50px 0 0 100px;
    width: 500px;
  }
}
</style>
