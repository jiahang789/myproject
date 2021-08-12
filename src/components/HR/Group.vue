<template>
<!-- 班组 -->
<div>
     <el-card class="box-card">
           <el-form :model="form" ref="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="班组描述" label-width="100px" prop="teDescribe">
             <el-select v-model="form.teDescribe"  clearable placeholder="全部" @change="getlist">
                <el-option v-for="item in bz" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
            </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style=" margin-top: 6px" @click="getTitle">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 75%;" border  >
             <el-table-column label="序号" width="97" prop="teId" align="center"> </el-table-column>
          <el-table-column sortable label="所属科室" width="180" prop="dmName" align="center"></el-table-column>
          <el-table-column sortable label="班组描述" width="200" prop="teDescribe" align="center"> </el-table-column>
            <el-table-column label="操作" width="390" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editButton(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.teId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryGroup.pageNum"
      :page-size="queryGroup.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改班组信息" :visible.sync="editDialog" width="450px">
  <el-form ref="editRef" :model="editFrom" class="from"  :label-width="formLabelWidth" :rules="editRules">
       <el-form-item label="所属科室" prop="dmId">
      <el-select  v-model="editFrom.dmName"  clearable placeholder="请选择科室名称" @change="getitem">
          <el-option v-for="item in group" :key="item.dmId" :label="item.dmName" :value="item.dmId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="班组描述" prop="teDescribe">
     <el-input autocomplete="off" v-model="editFrom.teDescribe"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加班组信息" :visible.sync="addDialog" width="450px">
  <el-form ref="addRef" :model="addFrom" class="from" :label-width="formLabelWidth" :rules="addRules">
     <el-form-item label="所属科室" prop="dmName">
      <el-select  v-model="addFrom.dmName"  clearable placeholder="请选择科室名称" @change="getitem">
          <el-option v-for="item in group" :key="item.dmId" :label="item.dmName" :value="item.dmId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="班组描述" prop="teDescribe">
     <el-input autocomplete="off" v-model="addFrom.teDescribe"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addSumbit">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'group',
  data () {
    return {
      title: {},
      bz: [],
      group: [],
      tableData: [],
      queryGroup: {
        teId: '',
        teDescribe: '',
        dmId: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      count: 0,
      addFrom: {
        dmName: '',
        teDescribe: ''
      },
      editFrom: {
        dmName: '',
        teDescribe: ''
      },
      form: {
        teDescribe: ''
      },
      editDialog: false,
      addDialog: false,
      total: 1,
      formLabelWidth: '120px',
      addRules: {
        teDescribe: [
          { required: true, message: '请输入科室名称，其不能重复', trigger: 'blur' }
        ]
      },
      editRules: {
        teDescribe: [
          { required: true, message: '请输入科室名称，其不能重复', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getGroup()
    this.getSelect()
    this.getSelects()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getTitle () {
      const res = await getData('/team/select', this.form)
      console.log(res)
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
      const res = await postData('/team/selectchilk')
      if (res.code === 200) {
        this.bz = res.data
      }
    },
    // 获取下拉框的值
    getlist (val) {
      // val即是传进来的id值，也即value值
      this.title = this.bz.find(item => item.teId === val)
    },
    // 获取增加框下拉框数据
    async getSelect () {
      const res = await getData('/team/insertchilk')
      if (res.code === 200) {
        this.group = res.data
      }
    },
    // 获取下拉框的值
    getitem (val) {
      // val即是传进来的id值，也即value值
      var obj = {}
      obj = this.group.find((item) => {
        return item.dmId === val
      })
      console.log(obj.dmName)
      console.log('id的值为：' + val)
    },
    // 获取班组表格信息
    async getGroup () {
      const res = await getData('/team/selectall', this.queryGroup)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 打开修改对话框
    editButton (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getGroup(data.teId)
    },
    // 修改提交按钮
    updateInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/team/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getGroup()
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
          const res = await postData('/team/insert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('添加成功')
            this.getGroup()
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
      this.$confirm('此操作将永久删除该班组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/team/delete?teId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getGroup()
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
      this.queryGroup.pageSize = val
      this.getGroup()
    },
    handleCurrentChange (val) {
      this.queryGroup.pageNum = val
      this.getGroup()
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    //  margin-left: 270px;
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
// .button{
//     position: absolute;
//     top: 25px;
//     left: 420px;
// }
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
