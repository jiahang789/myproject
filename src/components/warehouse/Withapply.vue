<template>
<!-- 工具领用申请 -->
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
        <el-table :data="tableData" style="width: 88%"  tooltip-effect="dark" @selection-change="handleSelectionChange" border>
             <el-table-column type="selection" v-model="multipleSelection" width="40"></el-table-column>
               <el-table-column label="序号" width="100" prop="tsId" align="center"> </el-table-column>
          <el-table-column sortable label="工装编号" width="190" prop="toolNum" align="center"> </el-table-column>
           <el-table-column sortable label="工装名称" width="180" prop="toolName" align="center"></el-table-column>
          <el-table-column sortable label="设备" width="180" prop="emNum" align="center"> </el-table-column>
          <el-table-column sortable  label="库存" width="180" prop="number" align="center"> </el-table-column>
           <el-table-column sortable label="领用数量" width="218" prop="useNumber" align="center">
                 <template slot-scope="scope">
                   <el-input autocomplete="off" placeholder="全部" v-model="scope.row.useNumber" @change="handleEdit(scope.$index, scope.row)" clearable></el-input>
               </template>
           </el-table-column>
  </el-table>
    <el-button type="success" size="mini" style="margin-left: 78%;margin-top:7px" @click="info">提交领用</el-button>
    </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      tableData: [],
      multipleSelection: [],
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
    // this.getMachine()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 提交按钮
    async info () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push(
            {
              tsId: item.tsId,
              toolNum: item.toolNum,
              toolName: item.toolName,
              emNum: item.emNum,
              number: item.number,
              useNumber: item.useNumber
            })
        })
        const res = await postData('/ts/insertq', multis)
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    handleEdit (val) {
      console.log(val)
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/tp/select', this.form)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
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
    width: 180px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}

</style>
