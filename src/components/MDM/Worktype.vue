<template>
<!-- 工种 -->
<div>
    <el-card class="box-card">
          <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="工种" prop="name">
               <el-input placeholder="全部" v-model="form.name" clearable></el-input>
            </el-form-item>
             <el-form-item label="工种代号" prop="code">
                <el-input placeholder="全部" v-model="form.code" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style=" margin-top: 6px" @click="getGo()">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 73% ;" border>
          <el-table-column label="序号" width="100" prop="prId" align="center"> </el-table-column>
          <el-table-column sortable label="工种" width="180" prop="name" align="center"> </el-table-column>
           <el-table-column sortable label="工种代号" width="180" prop="code" align="center"></el-table-column>
            <el-table-column label="操作" width="385" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateWork(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.prId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
     @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryWork.pageNum"
      :page-size="queryWork.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改工种信息" :visible.sync="editDialog" width="430px">
  <el-form ref="editRef" :model="editFrom" class="from" :label-width="formLabelWidth" :rules="editRules">
    <el-form-item label="工种" prop="name">
     <el-input autocomplete="off" v-model="editFrom.name"></el-input>
    </el-form-item>
      <el-form-item label="工种代号" prop="code">
     <el-input autocomplete="off" v-model="editFrom.code"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfoBom">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
<el-dialog title="请增加工种信息" :visible.sync="addDialog" width="430px">
  <el-form ref="addRef" :model="addFrom" class="from" :label-width="formLabelWidth" :rules="addRules">
    <el-form-item label="工种" prop="name">
       <el-input autocomplete="off" v-model="addFrom.name"></el-input>
    </el-form-item>
     <el-form-item label="工种代号" prop="code">
        <el-input autocomplete="off" v-model="addFrom.code"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfoWork()">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'worktype',
  data () {
    return {
      form: {
        name: '',
        code: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      tableData: [],
      queryWork: {
        prId: '',
        name: '',
        code: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      addFrom: {
        name: '',
        code: ''
      },
      editFrom: {
        name: '',
        code: ''
      },
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '100px',
      addRules: {
        name: [
          { required: true, message: '请输入工种/请输入正确工种', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入工种代号/请输入正确工种代号', trigger: 'blur' }
        ]
      },
      editRules: {
        name: [
          { required: true, message: '请输入工种/请输入正确工种', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入工种代号/请输入正确工种代号', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getWorkType()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getGo () {
      const res = await getData('/profession/find', this.form)
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
      const res = await getData('/bom/insert')
      if (res.code === 200) {
        this.equn = res.data.equipments
      }
    },
    // 获取下拉框的值
    getitem3 (val) {
      // val即是传进来的id值，也即value值
      var obj = {}
      obj = this.equn.find((item) => {
        return item.emId === val
      })
      console.log(obj.emName)
      console.log('id的值为：' + val)
    },
    // 点击修改出现的对话框
    updateWork (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getWorkType(data.prId)
    },
    // 修改提交
    editInfoBom () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/profession/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getWorkType()
            this.$refs.editRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 打开增加按钮对话框
    addButton () {
      this.addDialog = true
    },
    // 增加提交按钮
    addInfoWork () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/profession/insert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getWorkType()
            this.$refs.addRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 获取表格数据
    async getWorkType () {
      const res = await getData('/profession/select', this.queryWork)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 分页
    handleSizeChange (val) {
      this.queryWork.pageSize = val
      this.getWorkType()
    },
    handleCurrentChange (val) {
      this.queryWork.pageNum = val
      this.getWorkType()
    },
    // 删除按钮
    del (id) {
      this.$confirm('此操作将永久删除工种信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/profession/delete?prId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getWorkType()
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
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: 1200px;
    height: auto;
    background-color: #FFFFFF;
}
.button{
    position: absolute;
    top: 27px;
    left: 430px;
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
</style>
