<template>
<!-- 出库 -->
<div>
      <el-card class="box-card" shadow="always">
         <el-form  :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="组号" prop="groupNumber">
              <el-input autocomplete="off" placeholder="全部" clearable v-model="form.groupNumber"></el-input>
            </el-form-item>
             <el-form-item label="批次号" prop="batchNumber">
              <el-input autocomplete="off" placeholder="全部" clearable v-model="form.batchNumber"></el-input>
            </el-form-item>
             <el-form-item label="产品代号" prop="productCode">
              <el-input autocomplete="off" placeholder="全部" clearable v-model="form.productCode"></el-input>
            </el-form-item>
             <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle">搜索</el-button>
             <el-form-item label="转移部门">
              <el-input autocomplete="off" placeholder="全部"></el-input>
            </el-form-item>
             <el-form-item label="发出部门">
              <el-input autocomplete="off" placeholder="全部"></el-input>
            </el-form-item>
        </el-form>
         <el-table :data="tableData" style="width: 90%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="60" prop="cId" align="center"> </el-table-column>
            <el-table-column sortable label="组号" width="137" prop="groupNumber" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="150" prop="batchNumber" align="center"> </el-table-column>
             <el-table-column sortable label="产品代号" width="140" prop="productCode" align="center"> </el-table-column>
           <el-table-column sortable label="批次数" width="140" prop="batchCount" align="center"></el-table-column>
          <el-table-column sortable label="已完工数" width="140" prop="finishCount" align="center"></el-table-column>
          <el-table-column sortable label="剩余合格品数" width="140" prop="lastCount" align="center"> </el-table-column>
           <el-table-column sortable label="出库总数量" width="140" prop="outCount" align="center"></el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryoutku.pageNum"
      :page-size="queryoutku.pageSize"
      layout="total, prev, pager, next"
      :total="count">
   </el-pagination>
      <div  style="margin-left: 70%;margin-top: 10px">
         <el-button type="success"  size="mini">出 库</el-button>
          <el-button type="success"  size="mini"  v-print="'#print_label'">打 印</el-button>
         <el-button type="success" size="mini" @click="outkuandPrint()">出库并打印</el-button>
     </div>
<div style="display: none">
<div id="print_label" >
   <div class="person">
           <table border="1" style="border-collapse: collapse;  width: 800px; height: 480px; margin: 30px;">
               <caption>产品转移单</caption>
               <tr>
                   <td colspan="9">
                       <div class="year">年 月 日</div>
                   </td>
               </tr>
               <tr>
                   <td width=100px>
                       <div align="center" style=" font-weight: 600;">转移部门</div>
                   </td>
                    <td colspan="3">
                       <div></div>
                   </td>
                    <td width=100px>
                       <div align="center" style=" font-weight: 600;">发出部门批</div>
                   </td>
                    <td colspan="2">
                       <div></div>
                   </td>
                   <td width=100px rowspan="2">
                       <div align="center" style=" font-weight: 600;">备注</div>
                   </td>
               </tr>
                <tr>
                   <td width=100px>
                       <div align="center" style=" font-weight: 600;">批 号</div>
                   </td>
                    <td width=120px>
                       <div align="center" style=" font-weight: 600;">名 称</div>
                   </td>
                   <td width=40px>
                       <div align="center" style=" font-weight: 600;">计量单位</div>
                   </td>
                    <td width=100px>
                       <div align="center" style=" font-weight: 600;">请发数</div>
                   </td>
                   <td width=120px>
                       <div align="center" style=" font-weight: 600;">实发数</div>
                   </td>
                    <td width=120px>
                       <div align="center" style=" font-weight: 600;">实发数</div>
                   </td>
                    <td width=100px>
                       <div align="center" style=" font-weight: 600;">盈(+) 亏(-)</div>
                   </td>
               </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                 <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
           <tr>
               <td>
                 <div align="center" style=" font-weight: 600;">转人主管</div>
               </td>
               <td>
                   <div></div>
               </td>
               <td width = 60px>
                    <div align="center" style=" font-weight: 600;">经手人</div>
               </td>
                <td>
                   <div></div>
               </td>
               <td>
                    <div align="center" style=" font-weight: 600;">发出主管</div>
               </td>
                <td>
                   <div></div>
               </td>
               <td>
                    <div align="center" style=" font-weight: 600;">经手人</div>
               </td>
                <td>
                   <div></div>
               </td>
           </tr>
           </table>
    </div>
  </div>
  </div>
      </el-card>

        <!-- 点击打开出库对话框 -->
    <!-- <el-dialog title="请出库" :visible.sync="editDialog" width="76%">
           <el-form  :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="组号" label-width="100px">
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="批次号" label-width="100px">
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="产品" label-width="100px">
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
             <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px">搜索</el-button>
             <el-form-item label="转移部门" label-width="100px">
              <el-input placeholder="xx车间"></el-input>
            </el-form-item>
             <el-form-item label="发出部门" label-width="100px">
             <el-input placeholder="25车间"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="tableData1" style="width: 97%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="60" prop="num" align="center"> </el-table-column>
            <el-table-column label="出库单号" width="120" prop="outkuNum" align="center"> </el-table-column>
            <el-table-column label="组号" width="120" prop="groupnum" align="center"> </el-table-column>
          <el-table-column label="批次号" width="140" prop="batchNumer" align="center"> </el-table-column>
             <el-table-column label="产品号" width="105" prop="productNum" align="center"> </el-table-column>
               <el-table-column label="产品名" width="107" prop="product" align="center"> </el-table-column>
           <el-table-column label="批次数" width="100" prop="batchNum" align="center"></el-table-column>
          <el-table-column label="已完工数" width="100" prop="ywgnum" align="center"></el-table-column>
          <el-table-column label="剩余合格品数" width="100" prop="number" align="center"> </el-table-column>
           <el-table-column label="出库总数量" width="100" prop="znum" align="center"></el-table-column>
  </el-table>
   <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
     <el-button type="success"  size="mini" style="margin-left: 85%" v-print="'#print_label'">转移单打印</el-button>
</el-dialog> -->
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {},
  name: 'outku',
  data () {
    return {
      form: {
        groupNumber: '',
        batchNumber: '',
        productCode: ''
      },
      editDialog: false,
      tableData: [],
      queryoutku: {
        cId: '',
        groupNumber: '',
        batchNumber: '',
        productCode: '',
        batchCount: '',
        finishCount: '',
        lastCount: '',
        outCount: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      count: 0
    }
  },
  created () {},
  mounted () {
    this.getoutku()
  },
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getTitle () {
      const res = await getData('/repertoryOut/doselect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 获取表格信息
    async getoutku () {
      const res = await getData('/repertoryOut/selectAll', this.queryoutku)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 分页
    handleSizeChange (val) {
      this.queryoutku.pageSize = val
      this.getoutku()
    },
    handleCurrentChange (val) {
      this.queryoutku.pageNum = val
      this.getoutku()
    },
    // tocheck () {
    //   this.$router.push('/tocheck')
    // },
    outkuandPrint () {
      this.$router.push('/zprint')
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: 1250px;
    height: auto;
    background-color: #FFFFFF;
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

caption{
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 10px;
}
.year{
    float: right;
     letter-spacing: 25px;
}
</style>
