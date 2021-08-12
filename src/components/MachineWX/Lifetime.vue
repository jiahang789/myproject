<template>
<!-- 备品备件寿命分析 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
             <el-form-item label="编码" label-width="100px" prop="emNum1">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNum1" clearable></el-input>
            </el-form-item>
             <el-form-item label="供应商" label-width="100px" prop="emNum1">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNum1" clearable></el-input>
            </el-form-item>
             <el-form-item label="时间" prop="date" style="margin-top:7px">
                 <el-date-picker v-model="form.date"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间" value-format="yyyy-MM-dd" clearable @change="dateChange">
                    </el-date-picker>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
             <!-- <el-table-column type="selection" width="40"></el-table-column> -->
               <el-table-column label="序号" width="50" prop="emId" align="center"> </el-table-column>
          <el-table-column sortable label="编码" width="120" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="名称" width="120" prop="emNum" align="center"></el-table-column>
          <el-table-column sortable label="供应商" width="128" prop="teDescribe" align="center"> </el-table-column>
          <el-table-column sortable  label="出库设备" width="120" prop="emType" align="center"> </el-table-column>
           <el-table-column sortable label="累计出库数量" width="120" prop="emModei" align="center"></el-table-column>
           <el-table-column sortable label="单位" width="100" prop="emModei" align="center"></el-table-column>
            <el-table-column sortable label="开始时间" width="120" prop="teDescribe" align="center"> </el-table-column>
          <el-table-column sortable  label="结束时间" width="120" prop="emType" align="center"> </el-table-column>
           <el-table-column sortable label="使用时间(天)" width="120" prop="emModei" align="center"></el-table-column>
           <el-table-column sortable label="平均寿命(天)" width="120" prop="emModei" align="center"></el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
     <!-- <el-button type="success" size="mini" style="margin-left: 80%;margin-top:7px" >更 换</el-button> -->
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
      form: {
        emName: '',
        emNum: ''
      },
      Dialog: false,
      formLabelWidth: '170px',
      pageNum: 1, // 当前页码
      pageSize: 10 // 每页条数
    }
  },
  created () {
    this.getMachine()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/em/select', this.form)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取表格信息
    async getMachine () {
      const res = await getData('/em/selectall', this.queryEqun)
      if (res.code === 200) {
        this.tableData = res.data
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
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
