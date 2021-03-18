<template>
  <div class="ui-header fx-center">
    <div :class="['h-left fxc-between', { 'menu-open': !getCollapse }]">
      <router-link
        v-if="!getCollapseCall"
        :to="{ path: '/' }"
        class="fx-center"
      >
        <img src="../assets/img/s-logo.png" alt="" />
        <span>DSP</span>
      </router-link>
      <i class="font_family icon-Default3" @click="changeCollapse"></i>
    </div>
    <div class="h-right flex fxc-between">
      <!-- <div class="search fx-center">
        <i class="font_family icon-Search"></i>
        <input type="text" placeholder="Search" />
      </div> -->
      <div v-clickOutSide="controlLogout" class="flex fx-center right-con">
        <!-- <a class="icon person" href="javascript:;"></a>
        <a class="icon msg" href="javascript:;"></a>
        <a class="icon question" href="javascript:;"></a> -->
        <div class="login-con fx-center">
          <img class="photo" :src="apiUrl + getUserInfo.avatar" />
          <a href="javascript:;" class="name">
            {{ getUserInfo.name }}
          </a>
          <i class="i-select"></i>
          <div :class="['select', { on: isShowLogout }]">
            <a
              href="javascript:;"
              class="select-item fxj-start"
              @click="toGo('/setting')"
            >
              <i class="font_family icon-Safety"></i>
              Security and Login
            </a>
            <a
              href="javascript:;"
              class="select-item fxj-start"
              @click="toGo('/setting/info')"
            >
              <i class="font_family icon-Namecard "></i>Your Information</a
            >
            <a
              href="javascript:;"
              class="select-item fxj-start logout"
              @click="logout"
            >
              <i class="font_family icon-Logout"></i> Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { clickOutSide } from "../utils/directive";
@Component({
  directives: {
    clickOutSide,
  },
})
export default class uiHeader extends Vue {
  getCollapseCall = this.$store.getters.getCollapse;
  isShowLogout = false;

  mounted() {}

  changeCollapse(): void {
    let status = this.$store.getters.getCollapse;
    this.$store.commit("SET_COLLAPSE", !status);
  }

  controlLogout(value: boolean) {
    this.isShowLogout = value ? value : false;
  }

  toGo(path: string = ""): void {
    this.$router.push({ path });
  }

  async logout() {
    let res = await api.logout();
    this.$store.commit("SET_TOKEN", "");
    this.$store.commit("SET_USER_INFO", {});
    this.$router.push("/login");
  }

  @Getter getCollapse: boolean;

  @Getter getUserInfo: object;

  @Watch("getCollapse")
  onGetCollapse(val: boolean, oldVal: boolean) {
    this.getCollapseCall = val;

    // 触发window页面大小调整事件

    setTimeout(() => {
      if (document.createEvent) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("resize", true, true);
        window.dispatchEvent(event);
      } else if (document.createEventObject) {
        window.fireEvent("onresize");
      }
    }, 10);
  }
}
</script>
<style lang="less" scope>
.ui-header {
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  height: 64px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.03);
  background: #fff;
  z-index: 12;

  .h-left {
    width: 64px;
    padding-left: 20px;
    padding-right: 10px;
    transition-delay: 300ms;
    transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
      0.3s padding-right ease-in-out;

    &.menu-open {
      width: 230px;
    }

    img {
      width: 24px;
      height: 24px;
    }

    span {
      margin: 0 19px 0 8px;
      font-size: 18px;
      color: #3a84ff;
    }

    i {
      width: 16px;
      height: 10px;
      font-size: 10px;
      cursor: pointer;
      color: #3a84ff;
    }
  }

  .h-right {
    padding-right: 40px;

    .right-con {
      justify-content: flex-end;
    }

    .search {
      width: 200px;
      i {
        cursor: pointer;
        display: inline-block;
        width: 17px;
        height: 17px;
        font-size: 20px;
      }

      input {
        margin-left: 20px;
        height: 30px;
      }
    }

    .person {
      display: inline-block;
      margin-right: 45px;
      width: 22px;
      height: 16px;
      background-image: url("../assets/img/user.png");
    }
    .msg {
      display: inline-block;
      margin-right: 45px;
      width: 20px;
      height: 21px;
      background-image: url("../assets/img/msg.png");
    }
    .question {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-right: 45px;
      background-image: url("../assets/img/question.png");
    }

    .login-con {
      cursor: pointer;
      position: relative;

      .photo {
        margin-right: 10px;
        width: 34px;
        height: auto;
        border-radius: 50%;
      }

      a {
        color: #000;
        min-width: 100px;
      }

      .select {
        padding-left: 15px;
        position: absolute;
        right: 0;
        width: 180px;
        top: 40px;
        display: none;
        background: #fff;

        &.on {
          display: block;
        }
      }

      .select-item {
        font-size: 14px;
        height: 60px;
        line-height: 60px;
        color: #000;
        text-align: center;

        img {
          margin-right: 9px;
        }

        &.logout {
          color: #ff647c;

          .font_family {
            color: #ff647c;
          }
        }
      }
    }

    .i-select {
      margin-left: 5px;
      margin-top: 5px;
      border: 5px solid;
      border-color: #000 transparent transparent;

      &.on {
        border: 5px solid;
        border-color: transparent transparent #000;
      }
    }

    .font_family {
      margin-right: 10px;
      font-size: 18px;
    }

    .font_family.icon-Safety {
      font-size: 20px;
    }
  }
}
</style>
