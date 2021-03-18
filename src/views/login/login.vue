<template>
  <div class="login-main">
    <a class="logo" href="javascript:;">
      <img src="../../assets/img/logo.png" alt="" />
    </a>
    <div class="login-con fxv-center">
      <img class="login-logo" src="../../assets/img/login-logo.png" alt="" />
      <div class="login-des">
        <p>DATA SERVICE PLATFORM</p>
      </div>
      <form ref="form">
        <div class="form-item fx-center" label="">
          <i class="font_family icon-UserName"></i>
          <input
            v-model="formData.username"
            type="text"
            placeholder="please input your user name…"
            @keyup.enter="onSubmit"
          />
        </div>
        <div class="form-item fx-center" label="">
          <i class="font_family icon-Password"></i>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Please input your password…"
            @keyup.enter="onSubmit"
          />
        </div>
        <el-button
          type="primary"
          size="medium"
          :disabled="isSumiting"
          @click="onSubmit"
        >
          LOGIN
        </el-button>
      </form>
    </div>
    <footer>
      Copyright © www.tclscbc.com, All Rights Reserved.
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Login extends Vue {
  private formData: Object = {
    username: "",
    password: "",
    rememberMe: false
  };

  isSumiting = false;

  mounted(): void {}

  async onSubmit(): Promise<any> {
    this.isSumiting = true;
    let res = await api.login(this.formData);
    if (res) {
      this.$store.commit("SET_TOKEN", res.token);
      this.$store.commit("SET_USER_INFO", res.user);

      this.$message({
        message: "login success",
        type: "success"
      });
      setTimeout(() => {
        this.isSumiting = false;
        if (this.$route.query.reurl) {
          this.$router.push(this.$route.query.reurl);
        } else {
          this.$router.push("/");
        }
      }, 1500);
    } else {
      this.isSumiting = false;
    }
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/login.less";
</style>
