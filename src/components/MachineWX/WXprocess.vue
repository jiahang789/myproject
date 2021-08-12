<template>
<!-- 维修处理 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="90px">
              <el-form-item label="报修设备" label-width="100px" prop="emName">
                <el-select  v-model="form.emName"  clearable placeholder="请选择报修设备" @change="getitem">
                    <el-option v-for="item in machine" :key="item.emId" :label="item.emName" :value="item.emId"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
               <el-table-column label="序号" width="80" prop="mrId" align="center"> </el-table-column>
          <el-table-column sortable label="报修设备" width="130" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="报修问题" width="157" prop="describe" align="center"></el-table-column>
          <el-table-column sortable label="报修发起人" width="150" prop="reparePeople" align="center"> </el-table-column>
           <el-table-column sortable  label="报修时间" width="150" prop="repareTime" align="center"> </el-table-column>
            <el-table-column sortable  label="指派维修人员" width="150" prop="fixPeople" align="center"> </el-table-column>
            <el-table-column sortable  label="分派时间" width="150" prop="splitTime" align="center"> </el-table-column>
          <el-table-column sortable  label="状态" width="120" prop="status" align="center"> </el-table-column>
           <el-table-column sortable  label="设备维修" width="150" prop="emType" align="center">
                <template slot-scope="scope">
                     <el-button type="primary" size="mini" @click="chuli(scope.row)">处理</el-button>
                </template>
         </el-table-column>
  </el-table>
         <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryWX.pageNum"
      :page-size="queryWX.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
   <!-- 点击处理对话框 -->
    <el-dialog title="请填写处理信息" :visible.sync="Dialog" width="50%">
   <table class="tables" :data="tableData" :model="add" border="1" style="width: 600px; height: 120px; margin: 30px">
           <tr>
                <td style=" background-color: #8EAADB;"><div align="center">是否关闭</div></td>
                 <td align="center">
                     <el-radio-group v-model="add.taskClosed">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                     </el-radio-group>
                </td>
                 <td style=" background-color: #8EAADB;"><div align="center">处理后是否正常</div></td>
                   <td align="center">
                     <el-radio-group v-model="add.isNormal">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                     </el-radio-group>
                </td>
            </tr>
             <tr style=" background-color: #8EAADB;">
                <td colspan="4"><div align="center">问题处理过程描述</div></td>
            </tr>
          <tr>
                <td align="center" colspan="4">
                        <el-input v-model="add.fixDescirbe"></el-input>
                </td>
            </tr>
        </table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Dialog = false">取 消</el-button>
    <el-button type="primary" @click="Info">确 定</el-button>
  </div>
</el-dialog>
    </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      form: {
        emName: ''
      },
      machine: [],
      add: {
        mrId: '',
        taskClosed: '',
        isNormal: '',
        fixDescirbe: ''
      },
      Dialog: false,
      tableData: [],
      count: 0,
      queryWX: {
        mrId: '',
        emName: '',
        describe: '',
        fixPeople: '',
        repareTime: '',
        reparePeople: '',
        splitTime: '',
        status: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数:
      }
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getWX()
  },
  watch: {},
  computed: {},
  methods: {
    // 获取框下拉框数据
    async getSelect () {
      const res = await getData('/machinefix/slectMsg')
      if (res.code === 200) {
        this.machine = res.data
      }
    },
    getitem (val) {
      this.machine.find(item => item.emId === val)
    },
    // 分页
    handleSizeChange (val) {
      this.queryWX.pageSize = val
      this.getWX()
    },
    handleCurrentChange (val) {
      this.queryWX.pageNum = val
      this.getWX()
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/machinefix/doselect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 点击处理按钮
    chuli (data) {
      this.Dialog = true
      this.queryWX = JSON.parse(JSON.stringify(data))
      this.add.mrId = this.queryWX.mrId
    },
    // 提交按钮
    async Info () {
      const res = await postData('/machinefix/doInsert', this.add)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.Dialog = false
      } else {
        this.$message.error(res.msg)
      }
    },
    // // 获取表格信息
    async getWX () {
      const res = await getData('/machinefix/selectAll', this.queryWX)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
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
    width: 209px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
