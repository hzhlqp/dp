<template>
  <div class="ui-menu">
    <el-menu
      :default-active="$route.meta.index + ''"
      class="el-menu-vertical-demo"
      :collapse="$store.getters.getCollapse"
    >
      <el-menu-item :index="1 + ''" @click="go('/dashboard')">
        <i class="font_family icon-ic_dash_active"></i>
        <span slot="title">Dashboard</span>
      </el-menu-item>

      <el-submenu :index="2 + ''">
        <template slot="title">
          <i class="font_family icon-Default"></i>
          <span slot="title">ADs</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="go('/ads')"
            >DP ADs-Resources</el-menu-item
          >
          <el-menu-item index="3-2" @click="go('/ads/customer')"
            >DP ADs-Customer</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="3 + ''" @click="go('/daily')">
        <i class="font_family icon-Default2"></i>
        <span slot="title">Daily Report</span>
      </el-menu-item>
      <el-submenu :index="4 + ''">
        <template slot="title">
          <i class="font_family icon-Default1"></i>
          <span slot="title">Device Data</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-4" @click="go('/device/mergeIndex')"
            >Merge Active Devices</el-menu-item
          >
          <el-menu-item index="4-1" @click="go('/device')"
            >Huan Active Devices</el-menu-item
          >
          <el-menu-item index="4-2" @click="go('/device/sIndex')"
            >SCBC Active Devices</el-menu-item
          >
          <el-menu-item index="4-3" @click="go('/device/dpIndex')"
            >DP Active Devices</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="5 + ''" @click="go('/customer')">
        <i class="font_family icon-Default5"></i>
        <span slot="title">Customer Data</span>
      </el-menu-item>
      <el-submenu :index="6 + ''">
        <template slot="title">
          <i class="font_family icon-Default7"></i>
          <span slot="title">OTA Report</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1" @click="go('/report')"
            >OTA Report</el-menu-item
          >
          <el-menu-item index="6-2" @click="go('/report/flow')"
            >OTA Flow</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu :index="7 + ''">
        <template slot="title">
          <i class="font_family icon-Default9"></i>
          <span slot="title">Order Data</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1" @click="go('/order')"
            >Order Dashboard</el-menu-item
          >
          <el-menu-item index="7-2" @click="go('/order/data')"
            >Order Data</el-menu-item
          >
          <el-menu-item index="7-3" @click="go('/order/region')"
            >Region Data</el-menu-item
          >
          <el-menu-item index="7-4" @click="go('/order/ic')"
            >SoC Data</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="8 + ''" @click="go('/quality')">
        <i class="font_family icon-Default8"></i>
        <span slot="title">Quality Control</span>
      </el-menu-item>

      <el-submenu :index="9 + ''">
        <template slot="title">
          <i class="font_family icon-Default10"></i>
          <span slot="title">Event</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="9-1" @click="go('/event')"
            >Event Summary</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="9-2" @click="go('/event/power')"
            >User Dashboard</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="9-3" @click="go('/event/youtube')"
            >TV Youtube</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="9-5" @click="go('/event/tvevent')"
            >TV Event</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="9-6" @click="go('/event/dtv')"
            >TV DTV</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>

      <el-submenu :index="10 + ''">
        <template slot="title">
          <i class="font_family icon-Default11"></i>
          <span slot="title">Search</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="10-1" @click="go('/search')"
            >Model Search</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>

      <el-submenu :index="11 + ''">
        <template slot="title">
          <i class="font_family icon-Default6"></i>
          <span slot="title">Setting</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="11-1" @click="go('/setting')"
            >Security and Login</el-menu-item
          >
          <el-menu-item index="11-2" @click="go('/setting/info')"
            >Your Information</el-menu-item
          >
          <el-menu-item index="11-3" @click="go('/setting/configure')"
            >System Configure</el-menu-item
          >
          <el-menu-item index="11-4" @click="go('/setting/account')"
            >System Account</el-menu-item
          >
          <el-menu-item index="11-5" @click="go('/setting/appconfig')"
            >APP Configure</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class uiMenu extends Vue {
  public go(path: string) {
    if (path === this.$route.path) return;
    this.$router.push(path);
  }

  public changeMenu(value: boolean) {
    this.$store.commit("SET_COLLAPSE_CALL", value);
  }
}
</script>
<style lang="less" scope>
.ui-menu {
  height: calc(100% - 64px);
  position: fixed;
  left: 0;
  top: 64px;
  z-index: 10;
  background: #fff;
  box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.03);

  .el-menu {
    width: 230px;
    border-right: none;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .el-menu-item,
    .el-submenu__title {
      height: 50px;
      line-height: 50px;
    }

    &::-webkit-scrollbar {
      width: 6px;
      background-color: #dadada;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius: 2em;
      display: block;
      cursor: pointer;
    }

    li > .el-tooltip {
      line-height: 56px;
    }

    &.el-menu--collapse {
      width: 64px;
    }
  }

  .icon + span {
    margin-left: 10px;
  }

  .font_family {
    margin-right: 10px;
    font-size: 20px;
  }

  .font_family.icon-Default10 {
    font-size: 22px;
  }

  .el-submenu .el-menu-item {
    height: 48px;
    line-height: 48px;
    padding: 0 45px;
    min-width: 200px;
  }
}
</style>
