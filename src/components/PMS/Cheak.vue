<template>
<!-- 批次查询 -->
<div>
      <el-card class="box-card" shadow="always">
         <!-- <el-page-header @back="goBack" content=""></el-page-header> -->
           <!-- <div class="QR">
           </div> -->
         <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="批次号" prop="batchNumber">
               <el-input v-model="form.batchNumber" autocomplete="off" placeholder="全部" clearable></el-input>
            </el-form-item>
              <el-form-item label="零部件代号" prop="productCode">
               <el-select  v-model="form.productCode"  clearable placeholder="全部" @change="getitem">
                  <el-option v-for="item in productCode" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item>
      <el-date-picker v-model="form.date"
      type="daterange" value-format="yyyy-MM-dd"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期" style="margin-top: 5px" clearable>
    </el-date-picker>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="pcId" align="center"> </el-table-column>
          <el-table-column sortable label="批次类型" width="100" prop="batchType" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="120" prop="batchNumber" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="bomCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"> </el-table-column>
           <el-table-column sortable label="零部件名称" width="110" prop="componmentName" align="center"></el-table-column>
          <el-table-column sortable label="批次数量" width="100" prop="batchNum" align="center"></el-table-column>
          <el-table-column sortable label="批次生成时间" width="120" prop="bornTime" align="center"> </el-table-column>
           <el-table-column sortable label="实际开工时间" width="120" prop="beginTime" align="center"></el-table-column>
          <el-table-column sortable label="实际完工时间" width="120" prop="finishTime" align="center"> </el-table-column>
          <el-table-column sortable label="加工周期" width="100" prop="cycleTime" align="center"></el-table-column>
           <el-table-column sortable label="当前状态" width="100" align="center" prop="status"> </el-table-column>
            <el-table-column label="操作" width="130" align="center">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="counts(scope.row.pcId)">详情</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryCheck.pageNum"
      :page-size="queryCheck.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
        <!-- 点击打开详情对话框 -->
    <el-dialog title="请查看详情信息" :visible.sync="editDialog" width="67%">
  <el-table :data="tableData1" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column label="序号" width="57" prop="ptId" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="120" prop="batchNumber" align="center"> </el-table-column>
             <el-table-column sortable label="零部件代号" width="120" prop="componmentCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件名称" width="110" prop="componName" align="center"> </el-table-column>
           <el-table-column sortable label="顺序号" width="90" prop="processId" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="100" prop="processName" align="center"></el-table-column>
          <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"> </el-table-column>
           <el-table-column sortable label="计划状态" width="100" prop="status" align="center"></el-table-column>
          <el-table-column sortable label="班组" width="90" prop="teName" align="center"> </el-table-column>
          <el-table-column sortable label="批次数量" width="100" prop="batchCount" align="center"></el-table-column>
  </el-table>
</el-dialog>
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {},
  name: 'cheak',
  data () {
    return {
      form: {
        batchNumber: '',
        productCode: '',
        date: ''
      },
      editDialog: false,
      productCode: [],
      tableData: [],
      queryCheck: {
        pcId: '',
        batchType: '',
        batchNumber: '',
        bomCode: '',
        componmentCode: '',
        componmentName: '',
        batchNum: '',
        bornTime: '',
        beginTime: '',
        finishTime: '',
        cycleTime: '',
        status: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      tableData1: [],
      queryCheck1: {
        ptId: '',
        batchNumber: '',
        componmentCode: '',
        componName: '',
        processId: '',
        processName: '',
        processCode: '',
        status: '',
        teName: '',
        batchCount: ''
      },
      count: 0
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getCheck()
  },
  watch: {},
  computed: {},
  methods: {
    // 打开详情对话框
    async counts (id) {
      this.editDialog = true
      const res = await getData('/batch/batchSelectOne?pcId=' + id, this.queryCheck1)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData1 = res.data
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/batch/batchSelect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await getData('/batch/batchSelectMsg')
      if (res.code === 200) {
        this.productCode = res.data
      }
    },
    getitem (val) {
      this.productCode.find(item => item.componentId === val)
    },
    // 获取表格数据
    async getCheck () {
      const res = await getData('/batch/batchSelectAll', this.queryCheck)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 分页
    handleSizeChange (val) {
      this.queryCheck.pageSize = val
      this.getCheck()
    },
    handleCurrentChange (val) {
      this.queryCheck.pageNum = val
      this.getCheck()
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: 1330px;
    height: auto;
    background-color: #FFFFFF;
}
.btn{
    margin-left: 68%;
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
// // 标签
.person{
    border: black 1px solid;
    width: 350px;
    height: 300px;
}
</style>
