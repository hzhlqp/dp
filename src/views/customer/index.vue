<template>
  <div class="customer-main con-main">
    <div class="main-title">CUSTOMER LIST</div>
    <div class="filter-con fxj-end">
      <el-form :inline="true" :model="filterData">
        <el-form-item label="Customer">
          <el-select
            v-model="filterData.customerName"
            filterable
            no-match-text="No matching data"
            placeholder="Select Customer"
            clearable
            @change="getParam"
          >
            <el-option
              v-for="item in options.names"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Department">
          <el-input
            v-model="filterData.department"
            placeholder="Department"
          ></el-input>
        </el-form-item>
        <el-form-item label="ClientType">
          <el-select
            v-model="filterData.customerType"
            filterable
            no-match-text="No matching data"
            placeholder="Select ClientType"
            clearable
            @change="getParam"
          >
            <el-option
              v-for="item in options.types"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SoC">
          <el-select
            v-model="filterData.customerModel"
            filterable
            no-match-text="No matching data"
            placeholder="Select Model"
            clearable
            @change="getParam"
          >
            <el-option
              v-for="item in options.modes"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ProjectID">
          <el-input
            v-model="filterData.customerProjectId"
            placeholder="ProjectID"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getParam">Search</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-control fxc-between">
      <div class="des fx-center">
        <div v-if="totalData.VaildData" class="des-item">
          <span class="name">Valid Data：</span>
          <span class="txt">{{ totalData.VaildData }}</span>
        </div>
        <div v-if="totalData.lllegalData" class="des-item">
          <span class="name">Illegal Data：</span>
          <span class="txt red">{{ totalData.lllegalData }}</span>
        </div>
      </div>
      <div class="import fx-center">
        <a
          class="fx-center"
          :href="apiUrl + '/common/download?fileName=' + downLink"
          :download="downLink"
        >
          <i class="icon icon-import"></i>
          <span>Export Illegal Data</span>
        </a>
        <a
          class="fx-center"
          :href="apiUrl + '/common/download?fileName=' + departmentDownLink"
          :download="departmentDownLink"
        >
          <i class="icon icon-import"></i>
          <span>Export Department Data Of Illegal</span>
        </a>
        <a class="fx-center" href="javascript:;" @click="showImport">
          <i class="icon icon-export"></i>
          <span>Import</span>
        </a>
      </div>
    </div>
    <el-table
      v-loading="loading"
      empty-text="No Data"
      :data="tableData"
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column type="index" label="NO" width="80"> </el-table-column>
      <el-table-column
        width="150"
        sortable="custom"
        property="customerName"
        label="Customer"
      >
      </el-table-column>
      <el-table-column
        min-width="180"
        sortable="custom"
        property="department"
        label="Department"
      >
      </el-table-column>
      <el-table-column
        width="120"
        sortable="custom"
        property="customerModel"
        label="SoC"
      >
      </el-table-column>
      <el-table-column
        min-width="200"
        sortable="custom"
        property="customerType"
        label="ClientType"
      ></el-table-column>
      <el-table-column
        width="200"
        sortable="custom"
        property="modelType"
        label="ModelType"
      ></el-table-column>
      <el-table-column
        width="200"
        sortable="custom"
        property="deviceNumber"
        label="DeviceNumber"
      >
      </el-table-column>
      <el-table-column
        width="130"
        sortable="custom"
        property="customerProjectId"
        label="ProjectID"
      >
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="filterData.params.pageNum"
        @current-change="getTable"
      >
      </el-pagination>
    </div>

    <!-- 导入 --弹窗 -->
    <el-dialog
      title=""
      :visible.sync="importDialogVisible"
      width="660px"
      center
    >
      <div class="upload-con">
        <div class="logo">
          <i class="icon icon-file"></i>
        </div>
        <div class="title">Upload your attachments</div>
        <div v-if="!uploadParam.path" class="tip">
          Drag and drop your files here
        </div>
        <div v-if="uploadParam.path" class="export-des">
          <div class="export-item fxj-start">
            <div class="name">Illegal Data：</div>
            <div class="val red">{{ illegalData }}</div>
          </div>
          <div class="export-item fxj-start">
            <div class="name">Duplicate Data：</div>
            <div class="val red">{{ duplicateData }}</div>
          </div>
          <div class="export-item fxj-start">
            <div class="name">Valid data：</div>
            <div class="val">{{ validData }}</div>
          </div>
        </div>
        <div v-if="!uploadParam.path" class="drag-con fxv-center">
          <el-upload
            ref="upload"
            class="upload-demo"
            drag
            :action="apiUrl + '/system/customer/check'"
            multiple
            :with-credentials="true"
            :on-success="uploadSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              You can also upload files by <em>click upload</em>
            </div>
            <div slot="tip" class="el-upload__tip">
              The file format only supports. CSV, and the size does not exceed
              30M
            </div>
          </el-upload>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="importDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="importSubmit">Upload Files</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import tableMixins from "../../mixins/table";
import filterMixins from "../../mixins/filter";
@Component
export default class customerIndex extends Mixins(tableMixins, filterMixins) {
  // 后端接口名
  private tableApi = "getCustomerList";
  private paramApi = "getFilter";

  // 导入数据统计
  private validData: Number = 0;
  private illegalData: Number = 0;
  private duplicateData: Number = 0;

  // 文件路径
  private downLink: string = "";
  private departmentDownLink: string = "";

  // 上传携带参数
  private uploadParam = {
    updateSupport: false,
    path: ""
  };

  // 统计数据
  private totalData = {
    validData: "",
    illegalData: ""
  };

  // 过滤表单
  public filterData = {
    customerName: [],
    customerModel: [],
    customerType: [],
    customerProjectId: "",
    params: {
      pageNum: 1,
      pageSize: 10,
      orderByColumn: "",
      isAsc: ""
    }
  };

  // 导入弹窗
  private importDialogVisible: Boolean = false;

  // 导出弹窗
  private exportDialogVisible: Boolean = false;

  public init() {
    this.getParam();
    this.getTotalData();
    this.exportData();
    this.ExportDepartmentData();
  }

  // 获取总数
  public async getTotalData(currentPage: number = 1): Promise<any> {
    this.totalData = await api.totalData();
  }

  private showImport(): void {
    this.uploadParam = {
      updateSupport: false,
      path: ""
    };
    this.importDialogVisible = true;
  }

  private uploadSuccess(res: any): void {
    this.validData = res.data.vaildData
      ? res.data.vaildData.num
      : res.data.validData.num;
    this.illegalData = res.data.illegalData ? res.data.illegalData.num : "";
    this.duplicateData = res.data.duplicateData
      ? res.data.duplicateData.num
      : "";
    this.uploadParam = {
      path: res.data.path,
      updateSupport: true
    };
  }

  private async importSubmit(): Promise<any> {
    let res = await api.importData(this.uploadParam);
    this.$message({
      message: "import success",
      type: "success"
    });
    this.importDialogVisible = false;
  }

  // 导出数据
  private async exportData(): Promise<any> {
    this.downLink = await api.exportFile();
  }

  // 异常导出数据
  private async ExportDepartmentData(): Promise<any> {
    this.departmentDownLink = await api.exportDepartmentFile();
  }
}
</script>
<style lang="less" scope>
@import "../../assets/less/page/customer.less";
</style>
