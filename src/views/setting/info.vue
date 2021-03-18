<template>
  <div class="order-main con-main left">
    <div class="order-con">
      <div class="con-title">YOUR INFORMATION</div>
      <el-upload
        :action="apiUrl + '/sys/user/updateAvatar'"
        :auto-upload="true"
        :multiple="false"
        name="avatarFile"
        :with-credentials="true"
        :file-list="fileList"
        class="upload-image"
        :on-success="onSuccess"
      >
        <i
          v-if="!photoUrl"
          slot="default"
          class="el-icon-upload"
        ></i>
        <div
          v-if="photoUrl"
          class="el-upload-list el-upload-list--picture-card"
        >
          <template>
            <img
              class="el-upload-list__item-thumbnail"
              :src="apiUrl + photoUrl"
            />

            <span class="el-upload-list__item-actions">
              <span
                v-if="photoUrl"
                class="el-upload-list__item-delete"
                @click.stop="handleRemove()"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </template>
        </div>
      </el-upload>
      <el-form
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="180px"
      >
        <el-form-item
          label="Account"
          prop="Account"
        >
          <el-input
            v-model="formData.loginName"
            disabled
          ></el-input>
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
          prop="roleIds"
        >
          <el-select filterable no-match-text="No matching data"
            v-model="formData.roleIds"
            multiple
            placeholder="select Role"
            disabled
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
interface fileListInterface {
  url: string;
  name: string;
}
interface rolesInterface {
  roleName: string;
  roleId: number;
}
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
    userName: [{ required: true, message: "Please enter the user name", trigger: "blur" }],
    email: [
      { required: true, message: "Please enter the email", trigger: "blur" },
      {
        type: "email",
        message: "Please enter the correct email",
        trigger: ["blur", "change"]
      }
    ]
  };

  private photoUrl = "";

  private dialogVisible = false;

  private disabled = false;

  private fileList: Array<fileListInterface> = [];

  // 过滤表单
  private formData = {
    loginName: "",
    userName: "",
    email: "",
    remark: "",
    password: "",
    rePwd: "",
    deptId: 103,
    roleIds: []
  };

  private roles: Array<rolesInterface> = [];

  mounted(): void {
    this.getAccount();
    let avatar: string = <string>this.$store.getters.getUserInfo.avatar;
    if (avatar) {
      this.fileList.push({
        name: "photo.jpg",
        url: avatar
      });
      this.photoUrl = avatar;
    }
  }

  public async getAccount() {
    let res = await api.getMyInfo();
    res.user.roles.forEach((i: any) => {
      this.roles.push({ roleId: i.roleId, roleName: i.roleName });
    });

    this.formData = res.user;
  }

  public async onSubmit() {
    (<any>this.$refs["formData"]).validate(async (valid: boolean) => {
      if (valid) {
        let res = await api.getUpdateMyInfo(this.formData);
        if (res) {
          this.$message({
            message: "update success",
            type: "success"
          });

          let userInfo = this.$store.getters.getUserInfo;
          userInfo.name = this.formData.userName;
          this.$store.commit("SET_USER_INFO", userInfo);
        }
      } else {
        return false;
      }
    });
  }

  private onSuccess(res: any): void {
    if (res.code == 0) {
      this.$message({
        message: "upload success",
        type: "success"
      });

      this.photoUrl = res.data.avatar;
      let userInfo = this.$store.getters.getUserInfo;
      userInfo.avatar = res.data.avatar;
      this.$store.commit("SET_USER_INFO", userInfo);
    }
  }

  handleRemove() {
    this.photoUrl = "";
    this.fileList = [];
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

.upload-image {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 100px;
  height: 100px;
  margin: 30px 0 0 380px;
  border: 1px solid #dcdfe6;
  border-radius: 50%;

  &:hover {
    border: 1px solid #3a84ff;

    .el-upload .el-icon-upload {
      color: #3a84ff;
    }
  }

  /deep/.el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: calc(100% - 1px);
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 1px);
    border-radius: 50%;
  }

  .el-icon-upload {
    font-size: 50px;
    color: #666;
  }

  /deep/.el-upload-list {
    display: none;

    .el-upload-list__item-thumbnail {
      display: block;
    }
  }

  .el-upload-list--picture-card {
    display: block;

    .el-upload-list__item-actions {
      margin: 1px 0 0 1px;
      margin: 1px 0 0 1px;
      border-radius: 50%;
    }
  }
}
</style>
