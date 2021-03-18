<template>
  <div class="chart-main con-main">
    <div class="info-con fx-center">
      <div class="left flex">
        <div class="info-title fxc-between">
          <span>ACTIVITY DASHBOARD </span>
          <span class="time">
            DATA TIME： <span class="txt">{{ totalData.time }} </span></span
          >
        </div>
        <div class="des-item fx">
          <div class="fxc-center flex">
            <div class="val">{{ totalData.activationDay }}</div>
            <div class="name">New Device(Daily)</div>
            <div
              class="qu"
              :class="totalData.activationDayIncrease > 0 ? 'up' : 'down'"
            >
              {{ totalData.activationDayIncrease }}
            </div>
          </div>
          <div class="fxc-center flex">
            <div class="val">{{ totalData.activationWeek }}</div>
            <div class="name">Week New Device</div>
            <div
              class="qu"
              :class="totalData.activationWeekIncrease > 0 ? 'up' : 'down'"
            >
              {{ totalData.activationWeekIncrease }}
            </div>
          </div>
          <div class="fxc-center flex">
            <div class="val">{{ totalData.activationMonth }}</div>
            <div class="name">New Device(Month)</div>
            <div
              class="qu"
              :class="totalData.activationMonthIncrease > 0 ? 'up' : 'down'"
            >
              {{ totalData.activationMonthIncrease }}
            </div>
          </div>
          <div class="fxc-center flex">
            <div class="val">{{ totalData.deviceNumber }}</div>
            <div class="name">Total Device</div>
            <div
              class="qu"
              :class="totalData.deviceNumberIncrease > 0 ? 'up' : 'down'"
            >
              {{ totalData.deviceNumberIncrease }}
            </div>
          </div>
        </div>
        <div class="des-item fx">
          <div class="fxc-center flex">
            <div class="val">{{ totalData.activeDay }}</div>
            <div class="name">Activity Device(Daily)</div>
            <div
              class="qu"
              :class="totalData.activeDayIncrease > 0 ? 'up' : 'down'"
            >
              {{ totalData.activeDayIncrease }}
            </div>
          </div>
          <div class="fxc-center flex">
            <div class="val">{{ totalData.activeWeek }}</div>
            <div class="name">Activity Device(Week)</div>
            <div
              class="qu"
              :class="totalData.activeWeekIncrease > 0 ? 'up' : 'down'"
            >
              {{ totalData.activeWeekIncrease }}
            </div>
          </div>
          <div class="fxc-center flex">
            <div class="val">{{ totalData.activeMonth }}</div>
            <div class="name">Activity Device(Month)</div>
            <div
              class="qu"
              :class="totalData.activeMonthIncrease > 0 ? 'up' : 'down'"
            >
              {{ totalData.activeMonthIncrease }}
            </div>
          </div>
          <div class="fxc-center flex">
            <div class="val">{{ totalData.activationWeek }}</div>
            <div class="name">Total Sessions</div>
            <div
              class="qu up"
              :class="totalData.activationWeek > 0 ? 'up' : 'down'"
            >
              {{ totalData.activationWeek }}
            </div>
          </div>
        </div>
        <div class="des-item"></div>
      </div>
      <div class="right">
        <div class="info-title fxc-between">
          <span>CUSTOMER</span>
          <a href="javascript:;">Show All</a>
        </div>
        <ul class="customer-list">
          <li
            v-for="(item, index) in customerData"
            :key="'customer_' + index"
            class="fxc-between"
          >
            <div class="name">{{ item.customer }}</div>
            <div class="val" :class="parseFloat(item.ar) > 0 ? 'up' : 'down'">
              {{ item.quantity }} ({{ (item.ar * 100).toFixed(2) }}%)
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="echart-con">
      <div class="echart-title">AVG TIME/DEVICE</div>
      <ve-line
        ref="dashboard"
        :data="chartDataList.dashboard.data"
        :settings="chartDataList.dashboard.settings.own"
        :loading="chartDataList.dashboard.loading"
      >
        <div
          v-if="
            !chartDataList.dashboard.loading &&
              !chartDataList.dashboard.data.rows.length
          "
          class="data-empty"
        >
          no data
        </div>
      </ve-line>
    </div>
    <el-dialog
      class="repassowrd-dialog"
      :visible.sync="firstLogin"
      width="660px"
      center
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form ref="form" :model="form" label-width="120">
        <el-form-item label="Current：">
          <el-input v-model="form.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="New：">
          <el-input v-model="form.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Re-type new：">
          <el-input v-model="form.reNewPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rePasswordSubmit">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import chartMixins from "../../mixins/chart";
@Component
export default class eventIndex extends Mixins(chartMixins) {
  // 图表参数 ----- 命名规则： 模块名_表类型_序号
  public filterData = {
    dashboard: {
      dataType: "active",
      beginDate: new this.$dspDate(
        new Date().valueOf() - 3600 * 1000 * 24 * 30
      ).format("YY|MM|DD", "-"),
      endDate: new this.$dspDate(
        new Date().valueOf() - 3600 * 1000 * 24 * 2
      ).format("YY|MM|DD", "-"),
    },
  };

  // 图表数据集 ----- 命名规则： 模块名_表类型_序号
  public chartDataList = {
    dashboard: {
      api: "getAreaTotalChart",
      data: { rows: [], columns: [] },
      settings: { own: { area: true }, inherit: "lineSetting" },
      loading: true,
    },
  };

  totalData = {};

  customerData = {};

  form = {
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  };

  private firstLogin = false;

  mounted(): void {
    this.firstLogin = this.$store.getters.getUserInfo.firstLogin;
    this.init();
  }

  async init(): Promise<any> {
    this.getChart();
    // 平台用户信息
    this.totalData = await api.getTotalCharts({
      month: "2019-12",
      topNumber: "10",
    });

    // 客户信息
    let rs = await api.getCustomerData({
      month: "2019-12",
      topNumber: 8,
    });
    this.customerData = rs.list;
  }

  async rePasswordSubmit(): Promise<any> {
    if (this.form.newPassword !== this.form.reNewPassword) {
      this.$message({
        message: "password and Re-entered password do not match",
        type: "error",
      });
      return;
    }
    let res = await api.resetPwd(this.form);
    if (res) {
      this.$message({
        message: "reset password successfully",
        type: "success",
      });
      this.$store.commit(
        "SET_USER_INFO",
        Object.assign(this.$store.getters.getUserInfo, { firstLogin: false })
      );

      this.firstLogin = false;
    }
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/dashboard.less";
</style>
