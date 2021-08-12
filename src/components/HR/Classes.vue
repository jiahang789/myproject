<template>
<!-- 班次 -->
<div>
     <el-card class="box-card">
           <el-form :model="form" ref="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="班次" label-width="100px" prop="shiftName">
             <el-select v-model="form.shiftName"  clearable placeholder="全部" @change="getlist">
                <el-option v-for="item in classes" :key="item.shiftId" :label="item.shiftName" :value="item.shiftId"></el-option>
            </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style=" margin-top: 6px" @click="getTitle">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 73% ;" border>
          <el-table-column label="序号" width="100" prop="shiftId" align="center"> </el-table-column>
          <el-table-column sortable label="班次描述" width="180" prop="shiftName" align="center"> </el-table-column>
           <el-table-column sortable label="备注" width="180" prop="notes" align="center"></el-table-column>
            <el-table-column label="操作" width="385" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editButton(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.shiftId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改班次信息" :visible.sync="editDialog" width="450px">
 <el-form ref="editRef" :model="editFrom" class="from" :label-width="formLabelWidth" :rules="editRules">
    <el-form-item label="班次描述"  prop="shiftName">
    <el-input autocomplete="off" v-model="editFrom.shiftName"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="notes">
     <el-input autocomplete="off" v-model="editFrom.notes"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo()">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加班次信息" :visible.sync="addDialog" width="450px">
  <el-form ref="addRef" :model="addFrom" class="from" :label-width="formLabelWidth" :rules="addRules">
    <el-form-item label="班次描述"  prop="shiftName">
    <el-input autocomplete="off" v-model="addFrom.shiftName"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="notes">
     <el-input autocomplete="off" v-model="addFrom.notes"></el-input>
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
  name: 'classes',
  data () {
    return {
      form: {
        shiftName: ''
      },
      classes: [],
      tableData: [],
      queryClass: {
        num: '',
        shiftName: '',
        notes: ''
      },
      addFrom: {
        shiftName: '',
        notes: ''
      },
      editFrom: {
        shiftName: '',
        notes: ''
      },
      title: {},
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      addRules: {
        shiftName: [
          { required: true, message: '请输入班次描述，其不能重复', trigger: 'blur' }
        ]
      },
      editRules: {
        shiftName: [
          { required: true, message: '请输入班次描述，其不能重复', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getSelect()
    this.getClass()
  },
  mounted () {
  },
  watch: {},
  computed: {},
  methods: {
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
          const res = await postData('/shift/insert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success(res.msg)
            this.getClass()
            this.$refs.addRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 获取班次表格的数据信息
    async getClass () {
      const res = await getData('/shift/selectShift', this.queryClass)
      if (res.code === 200) {
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/shift/selectShiftName', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取条件下拉框的值
    async getSelect () {
      const res = await getData('/shift/selectList')
      if (res.code === 200) {
        this.classes = res.data
      }
    },
    // 获取下拉框的值
    getlist (val) {
      // val即是传进来的id值，也即value值
      this.title = this.classes.find(item => item.shiftId === val)
    },
    // 打开修改对话框
    editButton (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getClass(data.shiftId)
    },
    // 修改提交按钮
    updateInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/shift/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getClass()
            this.$refs.editRef.resetFields()
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
      this.$confirm('此操作将永久删除班次信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/shift/delete?shiftId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getClass()
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
    //   margin-left: 270px;
    // position: relative;
    // top: 50px;
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
