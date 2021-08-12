<template>
<!-- 工具报废申请 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="工装编号" label-width="100px" prop="emName">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emName" clearable></el-input>
            </el-form-item>
             <el-form-item label="工装名称" label-width="100px" prop="emNum">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNum" clearable></el-input>
            </el-form-item>
             <el-form-item label="设备编号" label-width="100px" prop="emNum1">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNum1" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 85%" @selection-change="handleSelectionChange"  tooltip-effect="dark" border>
             <el-table-column type="selection" width="40"></el-table-column>
               <el-table-column label="序号" width="100" prop="emId" align="center"> </el-table-column>
          <el-table-column sortable label="工装编号" width="190" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="工装名称" width="180" prop="emNum" align="center"></el-table-column>
          <el-table-column sortable label="设备" width="180" prop="teDescribe" align="center"> </el-table-column>
          <el-table-column sortable  label="报废数量" width="180" prop="emType" align="center"> </el-table-column>
           <el-table-column sortable label="报废原因" width="180" prop="emModei" align="center"></el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
     <el-button type="success" size="mini" style="margin-left: 79%; margin-top:7px" >报废申请</el-button>
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
      queryEqun: {
        emId: '',
        emPhoto: '',
        emName: '',
        emNum: '',
        teDescribe: '',
        emType: '',
        emModei: '',
        emYears: '',
        userName: '',
        emState: '',
        emFactor: '',
        emQrcode: '',
        dailyOutput: '',
        emRemarks: '',
        outputNight: '',
        outputDay: '',
        outputSecond: '',
        emCrossprocess: ''
        // emProcessnumber: ''
      },
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
