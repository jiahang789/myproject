<template>
<!-- 权限管理 -->
<div>
    <el-card class="box-card">
         <el-form :model="form" ref="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="角色" label-width="100px" prop="roleName">
                <el-input v-model="form.roleName" clearable placeholder="全部"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style=" margin-top: 6px" @click="getTitle">搜索</el-button>
             <el-button type="success"  icon="el-icon-plus" size="mini" @click="add()">增加</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%; " border >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="70" prop="roleId" align="center"></el-table-column>
          <el-table-column sortable label="角色" width="300" prop="roleName" align="center"> </el-table-column>
          <el-table-column sortable label="权限" width="448" prop="power" align="center"> </el-table-column>
            <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)">编辑</el-button>
            </template>
            </el-table-column>
  </el-table>
    <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querypz.pageNum"
      :page-size="querypz.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请编辑权限管理信息" :visible.sync="editDialog" width="30%">
  <el-form ref="editRef" :model="editFrom" class="from" :label-width="formLabelWidth" :rules="editRules">
    <el-form-item label="角色" prop="roleName">
     <el-input v-model="editFrom.roleName"></el-input>
    </el-form-item>
    <el-form-item label="可看栏目" prop="power">
      <el-select  v-model="editFrom.power"  clearable placeholder="请选择可看栏目" @change="getitem">
          <el-option v-for="item in powers" :key="item.pId" :label="item.power" :value="item.pId"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo()">确 定</el-button>
  </div>
</el-dialog>
  <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加权限管理信息" :visible.sync="addDialog" width="30%">
  <el-form ref="addRef" :model="addFrom" class="from" :label-width="formLabelWidth" :rules="addRules">
    <el-form-item label="角色" prop="roleName">
     <el-input v-model="addFrom.roleName"></el-input>
    </el-form-item>
    <el-form-item label="可看栏目" prop="power">
      <el-select  v-model="addFrom.power"  clearable placeholder="请选择可看栏目" @change="getitem">
          <el-option v-for="item in powers" :key="item.pId" :label="item.power" :value="item.pId"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfo()">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'authority',
  data () {
    return {
      powers: [],
      form: {
        roleName: ''
      },
      tableData: [],
      querypz: {
        roleId: '',
        roleName: '',
        power: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数:
      },
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '100px',
      editFrom: {
        roleName: '',
        power: ''
      },
      editRules: {
        roleName: [
          { required: true, message: '请输入角色名称，其不能重复', trigger: 'blur' }
        ],
        power: [
          { required: true, message: '请输入可看栏目，其不能重复', trigger: 'blur' }
        ]
      },
      addFrom: {
        roleName: '',
        power: ''
      },
      addRules: {
        roleName: [
          { required: true, message: '请输入角色名称，其不能重复', trigger: 'blur' }
        ],
        power: [
          { required: true, message: '请输入可看栏目，其不能重复', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getpz()
  },
  watch: {},
  computed: {},
  methods: {
    add () {
      this.addDialog = true
    },
    // 增加提交按钮
    addInfo () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/potence/insert', qs.stringify(this.addFrom))
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getpz()
            this.$refs.addRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/potence/doselect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取表格的数据信息
    async getpz () {
      const res = await getData('/potence/select', this.querypz)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await postData('/potence/insertMsg')
      console.log(res)
      if (res.code === 200) {
        this.powers = res.data
      }
    },
    // 获取下拉框的值
    getitem (val) {
      // val即是传进来的id值，也即value值
      this.powers.find((item) => {
        return item.pId === val
      })
    },
    // 打开修改对话框
    edit (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getpz(data.roleId)
    },
    // 修改提交按钮
    updateInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/potence/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.tableData = res.data
            this.$refs.editRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      this.querypz.pageSize = val
      this.getpz()
    },
    handleCurrentChange (val) {
      this.querypz.pageNum = val
      this.getpz()
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
        } else {
          this.$message.warning('要想删除科室，请先删除班组！')
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
  width: 209px;

}
</style>
