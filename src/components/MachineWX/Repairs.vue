<template>
<!-- 设备报修 -->
<div>
     <el-card class="box-card" shadow="always">
          <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="设备名称" prop="emNum">
                 <el-select  v-model="form.emNum"  clearable placeholder="请选择设备编号" @change="getitem">
                    <el-option v-for="item in machineNum" :key="item.emId" :label="item.emName" :value="item.emId"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle">搜索</el-button>
        </el-form>
        <el-table :data="tableData"  style="width: 72%"  tooltip-effect="dark" border>
            <el-table-column label="序号" width="100" prop="emId" align="center"></el-table-column>
            <el-table-column label="设备编号" width="210" prop="emNum" align="center"></el-table-column>
            <el-table-column label="班组" width="210" prop="teDescribe" align="center"></el-table-column>
            <el-table-column label="设备名称" width="220" prop="emName" align="center"></el-table-column>
             <el-table-column sortable  label="设备维修" width="150" align="center">
                  <template slot-scope="scope">
                      <el-button type="primary" size="mini" @click="chuli(scope.row)">处理</el-button>
                  </template>
         </el-table-column>
        </el-table>
         <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryRepair.pageNum"
      :page-size="queryRepair.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
            <!-- 点击处理对话框 -->
    <el-dialog title="请填写处理信息" :visible.sync="Dialog" width="50%">
         <el-form :model="chuliFrom" :inline="true" class="demo-form-inline"  label-width="100px" >
              <el-form-item label="序号" prop="emId" style="display:none">
                <el-input v-model="chuliFrom.emId"></el-input>
            </el-form-item>
            <el-form-item label="设备编号" prop="emNum">
                <el-input v-model="chuliFrom.emNum"></el-input>
            </el-form-item>
              <el-form-item label="设备名称" prop="emName">
                <el-input v-model="chuliFrom.emName"></el-input>
            </el-form-item>
        </el-form>
   <table class="tables" :data="tableData" :model="add" border="1" style="width: 600px; height: 120px; margin: 30px">
            <tr  style=" background-color: #8EAADB;">
                <td><div align="center">报修描述</div></td>
            </tr>
            <tr>
                <td align="center">
                        <el-input v-model="add.describe"></el-input>
                </td>
            </tr>
             <tr  style=" background-color: #8EAADB;">
                <td><div align="center">是否提交机电员</div></td>
            </tr>
            <tr>
                <td align="center">
                     <el-radio-group  v-model="add.needSubmit">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                     </el-radio-group>
                </td>
            </tr>
        </table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Dialog = false">取 消</el-button>
    <el-button type="primary" @click="Info()">确 定</el-button>
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
        emNum: ''
      },
      chuliFrom: {
        emNum: '',
        emName: '',
        emId: ''
      },
      add: {
        emId: '',
        describe: '',
        needSubmit: ''
      },
      machineNum: [],
      Dialog: false,
      machine: [],
      tableData: [],
      queryRepair: {
        emId: '',
        emNum: '',
        teDescribe: '',
        emName: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数:
      },
      count: 0
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getRepair()
  },
  watch: {},
  computed: {},
  methods: {
    // 分页
    handleSizeChange (val) {
      this.queryRepair.pageSize = val
      this.getRepair()
    },
    handleCurrentChange (val) {
      this.queryRepair.pageNum = val
      this.getRepair()
    },
    // 获取表格数据
    async getRepair () {
      const res = await getData('/machineReparies/selectAll', this.queryRepair)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    handleEdit (val) {
      console.log(val)
    },
    // 点击修改出现的对话框
    chuli (data) {
      this.Dialog = true
      this.chuliFrom = JSON.parse(JSON.stringify(data))
      this.add.emId = this.chuliFrom.emId
    },
    // 提交按钮
    async Info () {
      const res = await postData('/machineReparies/insert', this.add)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.Dialog = false
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取框下拉框数据
    async getSelect () {
      const res = await getData('/machineReparies/selectMsg')
      if (res.code === 200) {
        this.machineNum = res.data
      }
    },
    getitem (val) {
      this.machineNum.find(item => item.emId === val)
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/machineReparies/doselect', this.form)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.box-card1{
    width: 45%;
}
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
    width: 230px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
