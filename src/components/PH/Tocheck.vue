<template>
<!-- 提检 -->
<div>
      <el-card class="box-card" shadow="always">
            <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
              <el-form-item label="组号" prop="groupNumber">
                 <el-input autocomplete="off" placeholder="全部" v-model="form.groupNumber" clearable></el-input>
              </el-form-item>
             <el-form-item label="产品代号" prop="productCode">
                <el-input autocomplete="off" placeholder="全部" v-model="form.productCode" clearable></el-input>
            </el-form-item>
             <el-form-item label="时间" prop="date">
                 <el-date-picker v-model="form.date"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间" value-format="yyyy-MM-dd"  @change="dateChange" clearable>
                    </el-date-picker>
            </el-form-item>
            <el-button type="success" icon="el-icon-search" size="mini" @click="getGo()">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 88%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40" v-model="multipleSelection"></el-table-column>
          <el-table-column label="序号" width="50" prop="siId" align="center"> </el-table-column>
           <el-table-column sortable label="批次号" width="133" prop="batchNumber" align="center"> </el-table-column>
           <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"></el-table-column>
           <el-table-column sortable label="数量" width="110" prop="count" align="center"></el-table-column>
          <el-table-column sortable label="入库时间" width="150" prop="timeIn" align="center"></el-table-column>
           <el-table-column sortable label="状态" width="100" prop="status"  align="center"> </el-table-column>
           <el-table-column sortable label="提检时间" width="150" prop="checkTime" align="center"></el-table-column>
              <el-table-column sortable label="提检人员" width="110" prop="checkPeople" align="center"> </el-table-column>
          <el-table-column sortable label="组号" width="120" prop="groupNumber" align="center"></el-table-column>
        </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryCheck.pageNum"
      :page-size="queryCheck.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    <div  style="margin-left: 70%;margin-top: 10px">
         <el-button type="success"  size="mini" @click="tocheck()">提 检</el-button>
          <el-button type="success"  size="mini"  v-print="'#print_label'" @click="print()">打 印</el-button>
         <el-button type="success" size="mini" @click="checkandPrint()">提检并打印</el-button>
     </div>
        <div style="display: none">
<div id="print_label" >
   <div class="person">
           <table border="1" style="border-collapse: collapse;  width: 500px; height: 400px; margin: 30px">
               <tr>
                   <td colspan="9">
                        <h2 align="center" style=" font-weight: 900;">体检单</h2>
                   </td>
               </tr>
               <tr>
                   <td width=90px>
                       <div align="center" style=" font-weight: 900;">产品代号:</div>
                   </td>
                    <td colspan="8">
                       <div>136T</div>
                   </td>
               </tr>
                <tr>
                   <td width=40px>
                       <div align="center" style=" font-weight: 900;">产品:</div>
                   </td>
                    <td  colspan="8">
                       <div>钢芯</div>
                   </td>
               </tr>
                <tr>
                   <td width=40px>
                       <div align="center" style=" font-weight: 900;">组号:</div>
                   </td>
                    <td  colspan="8">
                       <div>136T</div>
                   </td>
               </tr>
                <tr>
                   <td width=40px>
                       <div align="center" style=" font-weight: 900;">序号:</div>
                   </td>
                    <td>
                       <div>批次</div>
                   </td>
                    <td>
                       <div>数量/个</div>
                   </td>
                   <td>
                       <div>批次</div>
                   </td>
                    <td>
                       <div>数量/个</div>
                   </td>
                   <td>
                       <div>批次</div>
                   </td>
                    <td>
                       <div>数量/个</div>
                   </td>
                   <td>
                       <div>批次</div>
                   </td>
                    <td>
                       <div>数量/个</div>
                   </td>
               </tr>
            <tr>
                <td align="center" style=" font-weight: 900;">1</td>
                <td>A1</td>
                <td>19999</td>
                 <td>A7</td>
                <td>19999</td>
                 <td>A13</td>
                <td>19999</td>
                 <td>A19</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">2</td>
                <td>A2</td>
                <td>19999</td>
                 <td>A8</td>
                <td>19999</td>
                 <td>A14</td>
                <td>19999</td>
                 <td>A20</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">3</td>
                <td>A3</td>
                <td>19999</td>
                 <td>A9</td>
                <td>19999</td>
                 <td>A15</td>
                <td>19999</td>
                 <td>A21</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">4</td>
                <td>A4</td>
                <td>19999</td>
                 <td>A10</td>
                <td>19999</td>
                 <td>A16</td>
                <td>19999</td>
                 <td>A22</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">5</td>
                <td>A5</td>
                <td>19999</td>
                 <td>A11</td>
                <td>19999</td>
                 <td>A17</td>
                <td>19999</td>
                 <td>A23</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">6</td>
                <td>A6</td>
                <td>19999</td>
                 <td>A12</td>
                <td>19999</td>
                 <td>A18</td>
                <td>19999</td>
                 <td>A24</td>
                <td>19999</td>

            </tr>
            <tr>
                <td>
                    <div align="center" style=" font-weight: 900;">提检时间:</div>
                </td>
                <td  colspan="8">
                    <div>2021/05/24 10:53</div>
                </td>
            </tr>
             <tr>
                <td>
                    <div align="center" style=" font-weight: 900;">提检人:</div>
                </td>
                <td  colspan="8">
                    <div>张三</div>
                </td>
            </tr>
           </table>
    </div>
  </div>
  </div>
    </el-card>
</div>
</template>

<script>
import { postData, getData } from '../../api/index'
export default {
  components: {
  },
  name: 'tocheck',
  data () {
    return {
      form: {
        groupNumber: '',
        productCode: '',
        date: ''
      },
      tableData: [],
      queryCheck: {
        siId: '',
        batchNumber: '',
        productCode: '',
        count: '',
        timeIn: '',
        status: '',
        checkTime: '',
        checkPeople: '',
        groupNumber: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      multipleSelection: [],
      count: 0
    }
  },
  created () {},
  mounted () {
    this.getCheck()
  },
  watch: {},
  computed: {},
  methods: {
    // 提交打印按钮
    async print () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({siId: item.siId})
        })
        const res = await postData('/check/print', multis)
        console.log(res)
        if (res.code === 200) {
          this.$message.success('打印成功！')
        } else {
          this.$message.error('打印失败！')
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/check/doSelect', this.form)
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
    // 获取表格数据
    async getCheck () {
      const res = await getData('/check/selectAll', this.queryCheck)
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
    },
    // 提检按钮
    tocheck () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({siId: item.siId})
        })
      }
      this.$confirm('是否确定提检?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await postData('/check/goCheck', multis)
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.tableData = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提检'
        })
      })
    },
    checkandPrint () {
      this.$router.push('/print')
    },
    agreeChange (val) {

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
    width: 230px;
}
/deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
