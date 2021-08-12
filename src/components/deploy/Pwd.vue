<template>
<!-- 密码管理 -->
<div>
    <el-card class="box-card">
         <el-form :model="form" ref="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="form.userName" placeholder="全部"></el-input>
            </el-form-item>
             <el-form-item label="账号" prop="userNumber">
                <el-input v-model="form.userNumber" placeholder="全部"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style=" margin-top: 6px" @click="getTitle">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%; " border >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="70" prop="userId" align="center"></el-table-column>
          <el-table-column sortable label="姓名" width="150" prop="userName" align="center"> </el-table-column>
          <el-table-column sortable label="账号" width="200" prop="userNumber" align="center"> </el-table-column>
             <el-table-column sortable label="角色" width="150" prop="roleName" align="center"> </el-table-column>
          <el-table-column sortable label="性别" width="150" prop="userGender" align="center"> </el-table-column>
           <el-table-column sortable label="班组" width="150" prop="teName" align="center"> </el-table-column>
            <el-table-column label="操作" width="248" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="Resetpwd(scope.row.userId)">重置密码</el-button>
            </template>
            </el-table-column>
  </el-table>
    <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryPwd.pageNum"
      :page-size="queryPwd.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  name: 'pwd',
  data () {
    return {
      form: {
        userName: '',
        userNumber: ''
      },
      tableData: [],
      queryPwd: {
        userId: '',
        userName: '',
        userNumber: '',
        roleName: '',
        userGender: '',
        teName: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数:
      },
      count: 0,
      formLabelWidth: '100px'
    }
  },
  created () {
  },
  mounted () {
    this.getPwd()
  },
  watch: {},
  computed: {},
  methods: {
    // 密码重置
    async Resetpwd (userId) {
      this.$confirm('是否重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await postData('/PasswordManagement/updatePassw?userId=' + userId)
        if (res.code === 200) {
          this.$message.success('重置密码成功！')
        } else {
          this.$message.error('重置密码失败！')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/password/selectUserName', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取表格的数据信息
    async getPwd () {
      const res = await getData('/PasswordManagement/selectUserName', this.queryPwd)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 分页
    handleSizeChange (val) {
      this.querypz.pageSize = val
      this.getPwd()
    },
    handleCurrentChange (val) {
      this.querypz.pageNum = val
      this.getPwd()
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    width: 1200px;
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
    width: 209px;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
    }
     /deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
