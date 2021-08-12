<template>
<!-- 备品备件更换 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
             <el-form-item label="设备编号" label-width="100px" prop="emNum1">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNum1" clearable></el-input>
            </el-form-item>
            <el-button type="warning" size="mini" @click="Dialog = true">绑定</el-button>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
             <el-table-column type="selection" width="40"></el-table-column>
               <el-table-column label="序号" width="60" prop="emId" align="center"> </el-table-column>
          <el-table-column sortable label="工装编号" width="160" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="备品备件名称" width="165" prop="emNum" align="center"></el-table-column>
          <el-table-column sortable label="设备" width="160" prop="teDescribe" align="center"> </el-table-column>
          <el-table-column sortable  label="类别" width="150" prop="emType" align="center"> </el-table-column>
           <el-table-column sortable label="上次更换时间" width="150" prop="emModei" align="center"></el-table-column>
           <el-table-column sortable label="上次更换原因" width="150" prop="emModei" align="center"></el-table-column>
            <el-table-column sortable label="更换原因" width="200" prop="emModei" align="center">
                <template>
                    <el-input></el-input>
                </template>
            </el-table-column>
  </el-table>
     <el-button type="success" size="mini" style="margin-left: 96%;margin-top:7px" >更 换</el-button>
     <!-- 打开绑定对话框 -->
<el-dialog title="请绑定对应信息" :visible.sync="Dialog" width="60%">
     <el-form :inline="true" class="demo-form-inline"  label-width="100px">
             <el-form-item label="设备编号" label-width="100px">
               <el-input autocomplete="off" placeholder="全部" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
              <el-button type="success"  icon="el-icon-plus" size="mini">增加</el-button>
          </el-form>
       <el-table :data="tableData" style="width: 90%"  tooltip-effect="dark" border>
             <el-table-column type="selection" width="40"></el-table-column>
               <el-table-column label="序号" width="60" prop="emId" align="center"> </el-table-column>
          <el-table-column sortable label="类别" width="160" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="设备名称" width="165" prop="emNum" align="center"></el-table-column>
            <el-table-column sortable label="备品备件名称" width="200" prop="emModei" align="center">
                <template>
                    <el-input></el-input>
                </template>
            </el-table-column>
            <el-table-column sortable label="操作" width="200" prop="emModei" align="center">
               <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
  <el-button @click="Dialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfo()">确 定</el-button>
  </div>
</el-dialog>
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
    width: 180px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}

</style>
