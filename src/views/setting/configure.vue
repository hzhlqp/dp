<template>
  <div class="setting-main con-main">
    <div class="main-title">SYSTEM CONFIGURE</div>
    <div class="block-title fxc-between">
      <span>HeartBeat Time</span>
    </div>
    <div class="block-con">
      <div class="form-item fxj-start">
        <label>HeartBeat Time ：</label>
        <div class="input-list">
          <div class="input-item">
            <el-input
              v-model="form.configValue"
              type="text"
              @change="editConfig"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="block-title fxc-between">
        <span>Configure</span>
        <el-button
          class="primary"
          @click="dialogVisible = true"
        >Edit</el-button>
      </div>
      <div class="form-item fxj-start">
        <label>Form Email ：</label>
        <div class="input-list">
          <div class="input-item">
            <el-input
              placeholder="scbc.tom@tcl.com"
              v-model="emailFilter.name"
              :disabled="true"
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="form-item fxj-start">
        <label>Current Password：</label>
        <div class="input-list">
          <div class="input-item">
            <el-input
              type="text"
              v-model="emailForm.password"
              disabled
            ></el-input>
          </div>
        </div>
      </div>
      <div class="form-item fxj-start">
        <label>Outgoing Host：</label>
        <div class="input-list">
          <div class="input-item">
            <el-input
              type="text"
              v-model="emailForm.host"
              disabled
            ></el-input>
          </div>
        </div>
      </div>
      <div class="form-item fxj-start">
        <label>Port：</label>
        <div class="input-list">
          <div class="input-item">
            <el-input
              type="text"
              v-model="emailForm.port"
              disabled
            ></el-input>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      class="repassowrd-dialog"
      title=""
      :visible.sync="dialogVisible"
      width="660px"
      center
    >
      <el-form
        ref="rePasswordForm"
        :model="rePasswordForm"
        :rules="rules"
      >
        <el-form-item
          label="old-Password"
          prop="oldPassword"
        >
          <el-input
            v-model="rePasswordForm.oldPassword"
            placeholder="old-Password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="new-Password"
          prop="newPassword"
          required
        >
          <el-input
            v-model="rePasswordForm.newPassword"
            placeholder="new-Password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="re-Password"
          prop="rePassword"
          required
        >
          <el-input
            v-model="rePasswordForm.rePassword"
            placeholder="re-Password"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="rePasswordSubmit"
        >Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class settingConfigure extends Vue {
  tableData = [];

  dialogVisible: boolean = false;

  form = { configValue: "", configId: 0, configKey: "" };

  emailForm = {};

  email: string = "";

  filterData = {
    configName: "",
    configKey: "ruoyi:system:heartRate"
  };

  emailFilter = {
    name: "",
    password: "",
    host: "",
    port: ""
  };

  rePasswordForm = {
    id: "",
    oldPassword: "",
    newPassword: "",
    rePassword: ""
  };

  private rePwdRules = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("Please enter your password again"));
    } else if (value !== this.rePasswordForm.newPassword) {
      callback(new Error("Entered passwords differ!"));
    } else {
      callback();
    }
  };

  private rules = {
    rePassword: [
      {
        validator: this.rePwdRules,
        trigger: "blur"
      }
    ]
  };

  private loading: boolean = false;

  mounted(): void {
    this.init();
  }

  async init(): Promise<any> {
    let res = await api.getRate(this.filterData);
    let emailRes = await api.getEmailList(this.emailFilter);
    this.form = {
      configValue: res.configValue,
      configId: res.configId,
      configKey: res.configKey
    };
    this.emailForm = emailRes.rows[0];
    this.rePasswordForm.id = emailRes.rows[0].id;
  }

  async rePasswordSubmit(): Promise<any> {
    (<any>this.$refs["rePasswordForm"]).validate(async (valid: boolean) => {
      if (valid) {
        let res = await api.resetConfigPwd(this.rePasswordForm);
        this.dialogVisible = false;
        if (res) {
          this.$message({
            message: "edit success",
            type: "success"
          });
        }
      } else {
        return false;
      }
    });
  }

  async editConfig(): Promise<any> {
    let data = {
      configValue: this.form.configValue,
      configId: this.form.configId,
      configKey: this.form.configKey
    };

    let res = await api.editConfig(data);

    if (res) {
      this.$message({
        message: "edit success",
        type: "success"
      });
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

  .block-con {
    .form-item {
      margin-bottom: 20px;
      margin-top: 40px;

      &.fxj-start {
        input {
          width: 180px;
        }
      }

      label {
        color: #1d2942;
        font-size: 14px;
      }

      input {
        width: 101px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 8px 16px 0px rgba(140, 140, 140, 0.3), 0px 0px 8px 0px rgba(140, 140, 140, 0.4);
      }

      .input-list {
        display: -webkit-box;
        align-items: flex-start;
        justify-content: flex-start;

        .input-item {
          position: relative;

          .el-icon-error {
            cursor: pointer;
            position: absolute;
            font-size: 20px;
            color: #e11212;
            right: -12px;
            top: -12px;
          }
        }
      }

      .el-icon-circle-plus-outline {
        cursor: pointer;
        margin-left: 34px;
        font-size: 30px;
        color: #1d2942;
      }
    }
  }
}

.upload-con .logo i {
  background: none;
  font-size: 30px;
  color: #005cff;
}

.repassowrd-dialog .el-dialog__body {
  padding: 25px 50px 30px;
}
</style>
