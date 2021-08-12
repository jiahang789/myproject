<template>
<!-- 工具库存查询 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="工装编号" label-width="100px" prop="assetNumber">
               <el-input autocomplete="off" placeholder="全部" v-model="form.assetNumber" clearable></el-input>
            </el-form-item>
             <el-form-item label="工装名称" label-width="100px" prop="name">
               <el-input autocomplete="off" placeholder="全部" v-model="form.name" clearable></el-input>
            </el-form-item>
             <el-form-item label="设备编号" label-width="100px" prop="emNum">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNum" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 85%"  tooltip-effect="dark" border>
             <!-- <el-table-column type="selection" width="40"></el-table-column> -->
               <el-table-column label="序号" width="60" prop="tsId" align="center"> </el-table-column>
          <el-table-column sortable label="工装编号" width="180" prop="toolNum" align="center"> </el-table-column>
           <el-table-column sortable label="工装名称" width="180" prop="toolName" align="center"></el-table-column>
          <el-table-column sortable label="设备" width="180" prop="emNum" align="center"> </el-table-column>
          <el-table-column sortable  label="库存" width="150" prop="number" align="center"> </el-table-column>
           <el-table-column sortable label="入库时间" width="150" prop="time" align="center"></el-table-column>
           <el-table-column sortable label="最小入库" width="150" prop="minNumber" align="center"></el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
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
      //   querycheck: {
      //     tsId: '',
      //     toolNum: '',
      //     toolName: '',
      //     emNum: '',
      //     number: '',
      //     minNumber: '',
      //     time: ''
      //   },
      form: {
        emNum: '',
        assetNumber: '',
        name: ''
      },
      pageNum: 1, // 当前页码
      pageSize: 10 // 每页条数
    }
  },
  created () {
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getTitle () {
      const res = await getData('/ts/selectn', this.form)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    }
    // // 获取表格信息
    // async getMachine () {
    //   const res = await getData('/em/selectall', this.queryEqun)
    //   if (res.code === 200) {
    //     this.tableData = res.data
    //   }
    // },
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleSelectionChange (val) {
    //   this.multipleSelection = val
    // }
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
