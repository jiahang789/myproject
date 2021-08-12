<template>
<!-- 科室 -->
<div>
    <el-card class="box-card">
         <el-form :model="form" ref="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="科室名称" label-width="100px" prop="dmName">
             <el-select  v-model="form.dmName"  clearable placeholder="全部" @change="getlist">
                <el-option v-for="item in ks" :key="item.dmId" :label="item.dmName" :value="item.dmId"></el-option>
            </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style=" margin-top: 6px" @click="getTitle">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 70%; " border >
          <el-table-column label="序号" width="100" prop="dmId" align="center"></el-table-column>
          <el-table-column sortable label="车间名称" width="150" prop="wsName" align="center"> </el-table-column>
          <el-table-column sortable label="科室名称" width="180" prop="dmName" align="center"> </el-table-column>
            <el-table-column label="操作" width="380" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDepart(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.dmId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryDepart.pageNum"
      :page-size="queryDepart.pageSize"
      layout="total, prev, pager, next"
      :total="count">
   </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请编辑科室信息" :visible.sync="editDialog" width="450px">
  <el-form ref="editRef" :model="editFrom" class="from" :label-width="formLabelWidth" :rules="editRules">
    <el-form-item label="车间名称" prop="wsName">
     <el-select  v-model="editFrom.wsName"  clearable placeholder="请选择车间名称" @change="getitem">
          <el-option v-for="item in workshop" :key="item.wsId" :label="item.wsName" :value="item.wsId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="科室名称" prop="dmName">
     <el-input autocomplete="off" v-model="editFrom.dmName"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加科室信息" :visible.sync="addDialog" width="450px">
  <el-form ref="addRef" :model="addFrom" class="from" :label-width="formLabelWidth" :rules="addRules">
    <el-form-item label="车间名称" prop="wsName">
      <el-select  v-model="addFrom.wsName"  clearable placeholder="请选择车间名称" @change="getitem">
          <el-option v-for="item in workshop" :key="item.wsId" :label="item.wsName" :value="item.wsId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="科室名称" prop="dmName">
     <el-input autocomplete="off" v-model="addFrom.dmName"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addSumbit()">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'department',
  data () {
    return {
      title: {},
      form: {
        dmName: ''
      },
      ks: [],
      workshop: [],
      tableData: [],
      queryDepart: {
        dmId: '',
        wsName: '',
        dmName: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '100px',
      editFrom: {
        wsName: '',
        dmName: ''
      },
      addFrom: {
        wsName: '',
        dmName: ''
      },
      addRules: {
        dmName: [
          { required: true, message: '请输入科室名称，其不能重复', trigger: 'blur' }
        ]
      },
      editRules: {
        dmName: [
          { required: true, message: '请输入科室名称，其不能重复', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getDepart()
    this.getSelect()
    this.getSelects()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getTitle () {
      const res = await getData('/dm/select', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取条件下拉框的值
    async getSelects () {
      const res = await postData('/dm/selectchilk')
      if (res.code === 200) {
        this.ks = res.data
      }
    },
    // 获取下拉框的值
    getlist (val) {
      // val即是传进来的id值，也即value值
      this.title = this.ks.find(item => item.dmId === val)
    },
    // 获取车间表格的数据信息
    async getDepart () {
      const res = await getData('/dm/selectall', this.queryDepart)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await postData('/dm/insertchilk ')
      if (res.code === 200) {
        this.workshop = res.data
      }
    },
    // 获取下拉框的值
    getitem (val) {
      // val即是传进来的id值，也即value值
      var obj = {}
      obj = this.workshop.find((item) => {
        return item.wsId === val
      })
      console.log(obj.wsName)
      console.log('id的值为：' + val)
    },
    // 打开修改对话框
    editDepart (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getDepart(data.dmId)
    },
    // 修改提交按钮
    updateInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/dm/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getDepart()
            this.$refs.editRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 点击增加按钮，打开对话框
    addButton () {
      this.addDialog = true
    },
    // 增加提交按钮
    addSumbit () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/dm/insert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success(res.msg)
            this.getDepart()
            this.$refs.addRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 删除按钮
    del (id) {
      this.$confirm('此操作将永久删除科室信息及科室下的所有内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/dm/delete?dmId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getDepart()
        } else if (res.code === 250) {
          this.$message.warning(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页
    handleSizeChange (val) {
      this.queryDepart.pageSize = val
      this.getDepart()
    },
    handleCurrentChange (val) {
      this.queryDepart.pageNum = val
      this.getDepart()
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
//    margin-left: 270px;
//     position: relative;
//     top: 50px;
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
.from{
    margin: 20px;
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
