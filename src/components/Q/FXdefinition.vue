<template>
<!-- 返工返修定义 -->
<div>
      <el-card class="box-card" shadow="always">
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column label="序号" width="50" prop="cnId" align="center"> </el-table-column>
           <el-table-column sortable label="批次号" width="120" prop="batchNumber" align="center"> </el-table-column>
             <el-table-column sortable label="组号" width="100" prop="groupNumber" align="center"> </el-table-column>
           <el-table-column sortable label="产品代号" width="100" prop="bomCode" align="center"></el-table-column>
            <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"> </el-table-column>
             <el-table-column sortable label="零部件名称" width="110" prop="componmentName" align="center"> </el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="rId" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="110" prop="processName" align="center"> </el-table-column>
           <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"> </el-table-column>
           <el-table-column sortable label="发起人" width="90" prop="people" align="center"></el-table-column>
          <el-table-column sortable label="发起时间" width="100" prop="time" align="center"></el-table-column>
           <el-table-column sortable label="不合格原因" width="120" prop="unqreason"  align="center"> </el-table-column>
            <el-table-column sortable label="审理单号" width="120" prop="codeNumber"  align="center"> </el-table-column>
             <el-table-column sortable label="处理人" width="90" prop="person" align="center"> </el-table-column>
               <el-table-column  sortable label="处理时间" width="120" prop="drdate" align="center"> </el-table-column>
                 <el-table-column sortable label="处理结果" width="120" prop="result" align="center"> </el-table-column>
            <el-table-column label="自定义" width="100" align="center">
            <template slot-scope="scope">
                  <el-button type="success" size="mini" @click="sustom(scope.$index,scope.row,scope.row.batchNumber)">自定义</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    </el-card>
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      tableData: [],
      queryFX: {
        cnId: '',
        bId: '',
        groupNumber: '',
        bomCode: '',
        componmentCode: '',
        componmentName: '',
        rId: '',
        processName: '',
        processCode: '',
        people: '',
        time: '',
        codeNumber: '',
        unqreason: '',
        person: '',
        drdate: '',
        result: ''
      },
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1
    }
  },
  created () {},
  mounted () {
    this.getDatas()
  },
  watch: {},
  computed: {},
  methods: {
    // 获取表格数据
    async getDatas () {
      const res = await getData('/rp/select', this.queryFX)
      if (res.code === 200) {
        this.tableData = res.data
        // this.count = res.count
      }
    },
    // 点击自定义
    async sustom (index, row, batchNumber) {
      const res = await getData('/rp/custum?batchNumber=' + row.batchNumber)
      if (res.code === 200) {
        this.$router.push(
          {
            path: '/sustom',
            query: {
              data: res.data,
              batchNumber: row.batchNumber
            }
          })
      } else {
        this.$message.success(res.msg)
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    agreeChange (val) {

    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    margin-left: -20px;
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
