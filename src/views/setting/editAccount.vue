<template>
  <div class="order-main con-main left">
    <div class="order-con">
      <div class="con-title">
        {{ $route.query.userId ? "EDIT" : "CREATE" }} ACCOUNT
      </div>
      <el-form
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="180px"
      >
        <el-form-item
          label="Account"
          prop="loginName"
          required
        >
          <el-input v-model="formData.loginName"></el-input>
        </el-form-item>
        <el-form-item
          label="User Name"
          prop="userName"
          required
        >
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item
          label="E-Mail"
          prop="email"
          required
        >
          <el-input
            v-model="formData.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Role"
          required
          prop="roleIds"
        >
          <el-select filterable no-match-text="No matching data"
            v-model="formData.roleIds"
            multiple
            placeholder="select Role"
          >
            <el-option
              v-for="item in roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="formData.remark"
            type="textarea"
          ></el-input>
        </el-form-item>
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
  private rePwdRules = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("Please enter your password again"));
    } else if (value !== this.formData.password) {
      callback(new Error("Entered passwords differ!"));
    } else {
      callback();
    }
  };

  private rules = {
    rePwd: [
      {
        validator: this.rePwdRules,
        trigger: "blur"
      }
    ],
    loginName: [{ required: true, message: "Please enter the account", trigger: "blur" }],
    userName: [{ required: true, message: "Please enter the user name", trigger: "blur" }],
    roleIds: [{ required: true, message: "Please select the role", trigger: "blur" }],
    password: [{ required: true, message: "Please enter the password", trigger: "blur" }],
    email: [
      { required: true, message: "Please enter the email", trigger: "blur" },
      {
        type: "email",
        message: "Please enter the correct email",
        trigger: ["blur", "change"]
      }
    ]
  };

  // 过滤表单
  private formData = {
    loginName: "",
    email: "",
    remark: "",
    password: "",
    rePwd: "",
    deptId: 103,
    roleIds: []
  };

  private roles = [];

  mounted(): void {
    this.getRoles();
    if (this.$route.query.userId) {
      this.getAccount();
    }
  }

  public async getAccount() {
    let res = await api.getAccount({ userId: this.$route.query.userId });
    this.formData = res.user;
  }

  public async getRoles() {
    let res = await api.getParamAccount();
    this.roles = res.roleList;
  }

  public async deleteAccount(userId: number) {
    let res = await api.deleteAccount({ userId });
    if (res) {
      this.$message({
        message: "delete success",
        type: "success"
      });
    }
  }

  public async onSubmit() {
    (<any>this.$refs["formData"]).validate(async (valid: boolean) => {
      if (valid) {
        if (this.$route.query.userId) {
          let res = await api.updateAccount(this.formData);
          if (res) {
            this.$message({
              message: "update success",
              type: "success"
            });
          }
        } else {
          let res = await api.addAccount(this.formData);
          if (res) {
            this.$message({
              message: "create success",
              type: "success"
            });
          }
        }

        this.$router.push({ path: "/setting/account" });
      } else {
        return false;
      }
    });
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
