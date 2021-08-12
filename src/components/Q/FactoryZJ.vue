<template>
<!-- 分厂专检 -->
<div>
      <el-card class="box-card" shadow="always">
            <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
             <el-form-item label="批次号" prop="batchNumber">
               <el-input autocomplete="off" placeholder="全部" clearable v-model="form.batchNumber"></el-input>
            </el-form-item>
              <el-form-item label="零部件代号" prop="componmentCode">
                <el-input autocomplete="off" placeholder="全部" clearable v-model="form.componmentCode"></el-input>
            </el-form-item>
             <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 96%"  tooltip-effect="dark"  border>
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column label="序号" width="50" prop="ptId" align="center"> </el-table-column>
           <el-table-column sortable label="批次号" width="130" prop="batchNumber" align="center"> </el-table-column>
           <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"></el-table-column>
             <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"> </el-table-column>
           <el-table-column sortable label="零部件名称" width="110" prop="componmentName" align="center"></el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="processId" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="130" prop="processName" align="center"> </el-table-column>
           <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"> </el-table-column>
           <el-table-column sortable label="数量" width="70" prop="count" align="center"></el-table-column>
           <el-table-column sortable label="班组" width="90" prop="teName"  align="center"> </el-table-column>
             <el-table-column sortable label="自检时间" width="100" prop="checkTime" align="center"> </el-table-column>
            <el-table-column label="操作" width="106" align="center">
            <template slot-scope="scope">
                  <el-button type="success" size="mini" @click="goZJ(scope.$index,scope.row,scope.row.ptId)">专检</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryFzj.pageNum"
      :page-size="queryFzj.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
</div>
</template>

<script>
import { getData } from '../../api/index'
import Q from '../Workshop/Q'
export default {
  components: {
    Q
  },
  data () {
    return {
      tableData: [],
      queryFzj: {
        ptId: '',
        batchNumber: '',
        productCode: '',
        componmentCode: '',
        componmentName: '',
        processId: '',
        processName: '',
        processCode: '',
        count: '',
        teName: '',
        checkTime: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      form: {
        batchNumber: '',
        componmentCode: ''
      },
      count: 0
    }
  },
  created () {},
  mounted () {
    this.getFzj()
  },
  watch: {},
  computed: {},
  methods: {
    // 分页
    handleSizeChange (val) {
      this.queryFzj.pageSize = val
      this.getFzj()
    },
    handleCurrentChange (val) {
      this.queryFzj.pageNum = val
      this.getFzj()
    },
    // 查询表格全部
    async getFzj () {
      const res = await getData('/factoryCheck/selectAll', this.queryFzj)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/factoryCheck/doSelect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        // this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async goZJ (index, row, ptId) {
      const res = await getData('/factoryCheck/check?ptId=' + row.ptId)
      const res1 = await getData('/factoryCheck/check?ptId=' + row.ptId)
      console.log(res, res1)
      if (res.code === 200) {
        this.$router.push(
          {
            path: '/zj',
            query: {
              data: JSON.stringify(row),
              res: JSON.stringify(res.data.list1),
              res1: JSON.stringify(res.data.array)
            }
          })
      } else {
        this.$message.error(res.msg)
      }
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
