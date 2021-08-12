<template>
<!-- 异常记录 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="queryRecode" :inline="true" class="demo-form-inline"  label-width="100px">
          <el-form-item label="异常类型" label-width="100px" prop="debugType">
               <el-input autocomplete="off" placeholder="全部" v-model="queryRecode.debugType" clearable></el-input>
            </el-form-item>
              <el-form-item label="处理部门" label-width="100px" prop="emName">
               <el-input autocomplete="off" placeholder="全部" v-model="queryRecode.emName" clearable></el-input>
            </el-form-item>
             <el-form-item label="异常时间" label-width="100px" prop="value1">
            <el-date-picker v-model="value1"  type="daterange" value-format="yyyy-MM-dd" range-separator="至"
            start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
              </el-form-item>
             <el-form-item label="异常状态" label-width="100px" prop="status">
                <el-select v-model="queryRecode.status" clearable placeholder="请选择">
                    <el-option label="未处理" value="未处理"> </el-option>
                    <el-option label="已关闭" value="已关闭"> </el-option>
                  </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getRecode()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
               <el-table-column label="序号" width="50" type="index" align="center"> </el-table-column>
          <el-table-column sortable label="设备" width="130" prop="equipMent" align="center"> </el-table-column>
           <el-table-column sortable label="异常类型" width="130" prop="exceptionType" align="center"></el-table-column>
          <el-table-column sortable label="异常描述" width="130" prop="exceptionDecs" align="center"> </el-table-column>
           <el-table-column sortable  label="发起时间" width="110" prop="initTime" align="center"> </el-table-column>
          <el-table-column sortable  label="处理意见" width="110" prop="opinion" align="center"> </el-table-column>
           <el-table-column sortable label="处理人" width="130" prop="opinitonPerson" align="center"></el-table-column>
            <el-table-column sortable  label="处理部门" width="110" prop="section" align="center"> </el-table-column>
             <el-table-column sortable  label="处理时间" width="110" prop="dealTime" align="center"> </el-table-column>
            <el-table-column sortable  label="异常状态" width="100" prop="state" align="center"> </el-table-column>
  </el-table>
    <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryRecode.pageNum"
      :page-size="queryRecode.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
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
      queryRecode: {
        id: '',
        emName: '', // 部门
        debugType: '', // 类型
        teDescribe: '',
        userStartName: '',
        startDate: '',
        troubelTips: '',
        userWithName: '',
        status: '',
        withDate: '',
        withSuggestion: '',
        pageNum: 1, // 当前页码
        pageSize: 10, // 每页条数: '
        value1: '', // 开始日期
        value2: '' // 结束日期
      },
      count: 0,
      form: {
        emName: '',
        debugType: '',
        teDescribe: ''
      },
      Dialog: false,
      formLabelWidth: '170px',
      value1: '' // 日期
    }
  },
  created () {
    this.getRecode()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {

    // 获取表格信息
    async getRecode () {
      if (this.value1 != null) {
        if (this.value1.length === 0) {
        } else {
          this.queryRecode.value1 = this.value1[0]
          this.queryRecode.value2 = this.value1[1]
        }
      }
      if (this.value1 == null) {
        this.queryRecode.value1 = ''
        this.queryRecode.value2 = ''
      }
      console.log(this.queryRecode)
      const res = await postData('/exception/select', this.queryRecode)
      this.tableData = res.data.data
      this.count = res.data.count
    },
    // 分页
    handleSizeChange (val) {
      this.queryRecode.pageSize = val
      this.getRecode()
    },
    handleCurrentChange (val) {
      this.queryRecode.pageNum = val
      this.getRecode()
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
    width: 231px;
}
     /deep/.el-select .el-input__inner {
  width: 189px;

}

</style>
