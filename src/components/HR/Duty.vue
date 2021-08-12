<template>
<!-- 职责 -->
<div>
    <el-card class="box-card">
          <el-form :model="form" ref="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="职责" label-width="100px" prop="dutyName">
            <el-select v-model="form.dutyName"  clearable placeholder="全部" @change="getlist">
                <el-option v-for="item in duty" :key="item.dutyId" :label="item.dutyName" :value="item.dutyId"></el-option>
            </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style=" margin-top: 6px" @click="getTitle">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton()" >增加</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 73%;" border>
          <el-table-column  label="序号" width="100" prop="dutyId" align="center"> </el-table-column>
          <el-table-column sortable label="职责" width="180" prop="dutyName" align="center"> </el-table-column>
           <el-table-column sortable label="备注" width="180" prop="notes" align="center"></el-table-column>
            <el-table-column label="操作" width="385" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDuty(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.dutyId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
      <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryDuty.pageNum"
      :page-size="queryDuty.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
       </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改职责信息" :visible.sync="editDialog" width="450px">
  <el-form class="from" ref="editRef" :model="editFrom" :label-width="formLabelWidth" :rules="editRules">
    <el-form-item label="职责" prop="dutyName">
     <el-input autocomplete="off" v-model="editFrom.dutyName"></el-input>
    </el-form-item>
      <el-form-item label="备注" prop="notes" >
     <el-input autocomplete="off" v-model="editFrom.notes"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfoDuty()">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加职责信息" :visible.sync="addDialog" width="450px">
  <el-form class="from" ref="addRefDuty" :model="addFrom" :label-width="formLabelWidth" :rules="addRules">
    <el-form-item label="职责" prop="dutyName" >
      <el-input autocomplete="off" v-model="addFrom.dutyName"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="notes">
     <el-input autocomplete="off" v-model="addFrom.notes"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfoDuty()">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'duty',
  data () {
    return {
      tableData: [],
      queryDuty: {
        dutyId: '',
        dutyName: '',
        notes: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      duty: [],
      addFrom: {
        dutyName: '',
        notes: ''
      },
      editFrom: {
        dutyName: '',
        notes: ''
      },
      form: {
        dutyName: ''
      },
      title: {},
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      addRules: {
        dutyName: [
          { required: true, message: '请输入职责，其不能重复', trigger: 'blur' }
        ]
      },
      editRules: {
        dutyName: [
          { required: true, message: '请输入职责，其不能重复', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getDuty()
    this.getSelect()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getTitle () {
      const res = await getData('/duty/selectRoleName', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取条件下拉框的值
    async getSelect () {
      const res = await getData('/duty/selectList')
      if (res.code === 200) {
        this.duty = res.data
      }
    },
    // 获取下拉框的值
    getlist (val) {
      // val即是传进来的id值，也即value值
      this.title = this.duty.find(item => item.dutyId === val)
    },
    // 打开增加对话框
    addButton () {
      this.addDialog = true
    },
    addInfoDuty () {
      var qs = require('querystring')
      this.$refs.addRefDuty.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/duty/insert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getDuty()
            this.$refs.addRefDuty.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 打开修改按钮
    editDuty (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getDuty(data.dutyId)
    },
    // 修改提交按钮
    editInfoDuty () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/duty/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getDuty()
            this.$refs.editRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 获取表格数据
    async getDuty () {
      const res = await postData('/duty/select', this.queryDuty)
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
      this.queryDuty.pageSize = val
      this.getDuty()
    },
    handleCurrentChange (val) {
      this.queryDuty.pageNum = val
      this.getDuty()
    },
    // 删除按钮
    del (dutyId) {
      this.$confirm('是否将永久删除职责下得所有信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/duty/delete?dutyId=' + dutyId)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getDuty()
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
    top: 25px;
    left: 420px;
}
/deep/ .el-input__inner {
    height: 30px;
    width: 209px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
/deep/.el-table td, .el-table th {
    padding: 3px 0;
}
/deep/.el-table th {
    padding: 5px 0;
    background-color: #EBEEF5;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
    }
</style>
