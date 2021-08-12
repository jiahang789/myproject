<template>
<!-- 标签预警 -->
<div>
     <el-card class="box-card" shadow="always">
         <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" style="margin-left: -30px">
            <el-form-item label="产品代号" prop="productCode">
               <el-select  v-model="form.productCode"  clearable placeholder="全部" @change="getitem">
                  <el-option v-for="item in childrenCode" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="批次类型" prop="batchstyle">
               <el-select  v-model="form.batchstyle"  clearable placeholder="全部" @change="getitem1">
                 <el-option v-for="item in batch" :key="item.tId" :label="item.type" :value="item.tId"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 80%"  tooltip-effect="dark" border>
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column label="序号" width="100" prop="wId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="125" prop="productCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件代号" width="160" prop="componmentCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件名称" width="160" prop="componmentName" align="center"> </el-table-column>
           <el-table-column sortable label="类型" width="120" prop="batchType" align="center"> </el-table-column>
          <el-table-column sortable label="剩余可用批数" width="160" prop="count" align="center"> </el-table-column>
          <el-table-column sortable label="预警数量" width="140" prop="warnNumber" align="center"></el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querywarn.pageNum"
      :page-size="querywarn.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
        </el-card>
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {
  },
  name: 'tagwarn',
  data () {
    return {
      form: {
        productCode: '',
        batchstyle: ''
      },
      childrenCode: [],
      batch: [],
      tableData: [],
      querywarn: {
        wId: '',
        productCode: '',
        componmentCode: '',
        componmentName: '',
        batchType: '',
        count: '',
        warnNumber: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      count: 0
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getwarn()
  },
  watch: {},
  computed: {},
  methods: {
    // 获取表格数据
    async getwarn () {
      const res = await getData('/batch/markWarnAll', this.querywarn)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 分页
    handleSizeChange (val) {
      this.querywarn.pageSize = val
      this.getwarn()
    },
    handleCurrentChange (val) {
      this.querywarn.pageNum = val
      this.getwarn()
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/batch/markWarnSelect', this.form)
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
      const res = await getData('/batch/markWarnMsg')
      if (res.code === 200) {
        this.childrenCode = res.data.componentCode
        this.batch = res.data.batchType
      }
    },
    getitem (val) {
      this.childrenCode.find(item => item.componentId === val)
    },
    getitem1 (val) {
      this.batch.find(item => item.tId === val)
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
.block{
    margin-left: 25%;
    margin-top: -20px;
}
.btn{
    margin-left: 30%;
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
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
    }
     /deep/.el-select .el-input__inner {
  width: 207px;

}
// 二维码
.QR{
    background-color: black;
    width: 100px;
    height: 100px;
    // margin-left: 30%;
}
// // 标签
.person{
    border: black 1px solid;
    width: 350px;
    height: 300px;
}
</style>
