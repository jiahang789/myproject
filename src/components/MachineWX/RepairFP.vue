<template>
<!-- 报修分配 -->
<div>
     <el-card class="box-card" shadow="always">
          <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="90px">
              <el-form-item label="报修设备" label-width="100px" prop="emNumber">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNumber" clearable></el-input>
            </el-form-item>
              <el-form-item label="状态" label-width="100px" prop="status">
               <el-input autocomplete="off" placeholder="全部" v-model="form.status" clearable></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                 <el-date-picker v-model="form.startTime" type="date" value-format="yyyy-MM-dd" clearable @change="dateChange"></el-date-picker>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" @selection-change="handleSelectionChange" border>
            <el-table-column type="selection" v-model="multipleSelection" width="40"></el-table-column>
               <el-table-column label="序号" width="80" prop="mrId" align="center"> </el-table-column>
          <el-table-column sortable label="报修设备" width="130" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="报修问题描述" width="180" prop="describe" align="center"></el-table-column>
          <el-table-column sortable label="报修发起人" width="150" prop="reparePeople" align="center"> </el-table-column>
           <el-table-column sortable  label="报修时间" width="175" prop="repareTime" align="center"> </el-table-column>
          <el-table-column sortable  label="状态" width="110" prop="status" align="center"> </el-table-column>
            <el-table-column sortable  label="分派时间" width="150" prop="splitTime" align="center"> </el-table-column>
            <el-table-column sortable  label="指派维修人员" width="220" prop="fixPeople" align="center">
                <template slot-scope="scope">
                <el-select  v-model="scope.row.fixPeople"  clearable placeholder="请选择指派维修人员" @change="getitem">
                    <el-option v-for="item in prpre" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
                </template>
           </el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryRepairFP.pageNum"
      :page-size="queryRepairFP.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
  <el-button type="success" size="mini" style="margin-left:92%" @click="info">提 交</el-button>
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
        status: '',
        emNumber: '',
        startTime: ''
      },
      prpre: [],
      multipleSelection: [],
      tableData: [],
      count: 0,
      queryRepairFP: {
        mrId: '',
        emName: '',
        describe: '',
        reparePeople: '',
        repareTime: '',
        status: '',
        splitTime: '',
        fixPeople: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      }
    }
  },
  created () {
    this.getRepairFP()
    this.getSelect()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 提交按钮
    async info () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({mrId: item.mrId, fixPeople: item.fixPeople})
        })
        const res = await postData('/repareSplit/doinsert', multis)
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 分页
    handleSizeChange (val) {
      this.queryRepairFP.pageSize = val
      this.getRepairFP()
    },
    handleCurrentChange (val) {
      this.queryRepairFP.pageNum = val
      this.getRepairFP()
    },
    // 获取框下拉框数据
    async getSelect () {
      const res = await getData('/repareSplit/selectMsg')
      if (res.code === 200) {
        this.prpre = res.data
      }
    },
    getitem (val) {
      this.prpre.find(item => item.userId === val)
    },
    // 获取表格数据
    async getRepairFP () {
      const res = await getData('/repareSplit/selectAll', this.queryRepairFP)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/repareSplit/doselect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
      } else {
        this.$message.error('获取列表失败！')
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
  width: 180px;

}
</style>
