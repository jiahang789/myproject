<template>
<!-- 异常处理 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="queryDispose" :inline="true" class="demo-form-inline"  label-width="100px">
              <el-form-item label="异常设备" label-width="70px" prop="emName">
               <el-input autocomplete="off" placeholder="全部" v-model="queryDispose.emName" clearable></el-input>
            </el-form-item>
            <el-form-item label="异常类型" label-width="70px" prop="debugType">
               <el-input autocomplete="off" placeholder="全部" v-model="queryDispose.debugType" clearable></el-input>
            </el-form-item>
            <el-form-item label="发起时间" label-width="70px" prop="value1">
              <el-date-picker
                  v-model="value1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getDispose()">搜索</el-button>
          </el-form>
          <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column label="序号" width="50" type="index" prop="index" align="center"> </el-table-column>
          <el-table-column sortable label="主键" width="150" prop="id" align="center" v-if="false"> </el-table-column>
          <el-table-column sortable label="设备" width="150" prop="equipMent" align="center"> </el-table-column>
          <el-table-column sortable label="异常类型" width="150" prop="exceptionType" align="center"></el-table-column>
          <el-table-column sortable  label="发起时间" width="120" prop="initTime" align="center"> </el-table-column>
          <el-table-column sortable label="异常描述" width="150" prop="exceptionDecs" align="center"></el-table-column>
          <el-table-column sortable  label="处理部门" width="110" prop="section" align="center"> </el-table-column>
          <el-table-column sortable  label="发起人" width="116" prop="initPerson" align="center"> </el-table-column>
          <el-table-column   label="操作" width="100" prop="emType" align="center">
                  <template slot-scope="scope">
                     <el-button type="primary" size="mini" @click="chuli(scope.row)">处理</el-button>
                </template>
                 </el-table-column>
  </el-table>
      <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryDispose.pageNum"
      :page-size="queryDispose.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
  <!-- 打开处理对话框 -->
  <!--对话框-->
    <el-dialog title="异常处理" :visible.sync="dialogFormVisible">
      <el-form :model="queryDispose" :inline="true">
    <el-input type="textarea"  :rows="2" placeholder="请输入处理意见" v-model="queryDispose.textarea"> </el-input>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="Info()">确 定</el-button>
  </div>
</el-dialog>
    </el-card>
</div>
</template>

<script>
import { postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      tableData: [],
      queryDispose: {
        name: '', // 当前登录人
        id: '', // 主键
        emName: '', // 设备
        debugType: '', // 类型
        teDescribe: '',
        startDate: '',
        userStartName: '',
        troubelTips: '',
        status: '',
        textarea: '', // 处理意见
        value1: '', // 发起时间
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数:
      },
      count: 0,
      dialogFormVisible: false,
      value1: ''
    }
  },
  created () {
    this.getDispose()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 分页
    handleSizeChange (val) {
      this.queryDispose.pageSize = val
      this.getDispose()
    },
    handleCurrentChange (val) {
      this.queryDispose.pageNum = val
      this.getDispose()
    },
    // 点击处理按钮
    chuli (data) {
      this.queryDispose.id = data.id
      this.dialogFormVisible = true
    },
    // 提交按钮
    async Info () {
      const name = window.sessionStorage.getItem('token')
      this.queryDispose.name = name
      await postData('/exception/settingCLadd', this.queryDispose)
      this.queryDispose.id = ''
      this.queryDispose.textarea = ''
      this.dialogFormVisible = false
      this.getDispose()
    },
    // 获取表格信息
    async getDispose () {
      if (this.value1 == null) {
        this.value1 = ''
      }
      this.queryDispose.value1 = this.value1
      const res = await postData('/exception/InitSelsctCL', this.queryDispose)
      this.tableData = res.data.data
      this.count = res.data.count
    }
  }
}
</script>
<style lang="less" scoped>
.tables{
    border: 1px solid #DCDFE6;
    border-collapse: collapse;
}
.box-card{
    margin-left: -20px;
    // margin-top: 80px;
    width: auto;
    height: auto;
}

/deep/.el-table td, .el-table th {
    padding: 3px 0;
}
/deep/.el-table th {
    padding: 5px 0;
    background-color: #EBEEF5;
}
/deep/ .el-input__inner {
    height: 30px;
    width: 210px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}

</style>
