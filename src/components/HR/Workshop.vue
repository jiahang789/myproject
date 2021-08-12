<template>
<!-- 车间 -->
<div>
    <el-card class="box-card">
         <el-button type="success" icon="el-icon-plus" size="mini" @click="addWork()" class="button">增加</el-button>
        <el-table :data="workshopData" style="width: 80%; margin: 50px" border>
            <el-table-column label="序号" width="80" prop="wsId" align="center"></el-table-column>
          <el-table-column sortable label="所属公司" width="250" prop="cpName" align="center"></el-table-column>
          <el-table-column sortable label="车间名称" width="200" prop="wsName" align="center"> </el-table-column>
            <el-table-column  label="操作" width="397" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editWork(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.wsId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改车间信息" :visible.sync="editDialog" width="420px">
  <el-form class="from" :label-width="formLabelWidth" ref="editWorkRef" :model="editFrom" :rules="editRules">
    <el-form-item label="车间名称" prop="wsName">
     <el-input autocomplete="off" v-model="editFrom.wsName"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加车间信息" :visible.sync="addDialog" width="420px">
  <el-form class="from" ref="addworkRef" :model="workFrom" :rules="addRules" :label-width="formLabelWidth">
    <el-form-item label="车间名称" prop="wsName">
     <el-input autocomplete="off" v-model="workFrom.wsName"></el-input>
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
  created () {
    this.getWorkshop()
  },
  components: {},
  name: 'workshop',
  data () {
    return {
      workshopData: [], // 保存车间表格数据信息
      queryworkshop: { // 给后端传的参数
        wsId: '',
        cpName: '',
        wsName: ''
      },
      editDialog: false,
      addDialog: false,
      formLabelWidth: '90px',
      workFrom: {
        wsName: ''
      },
      editFrom: {
        wsName: ''
      },
      addRules: {
        wsName: [
          { required: true, message: '请输入车间名称，其不能重复', trigger: 'blur' }
        ]
      },
      editRules: {
        wsName: [
          { required: true, message: '请输入车间名称，其不能重复', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  computed: {},
  methods: {
    // 打开修改对话框
    editWork (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getWorkshop(data.wsId)
    },
    // 修改提交按钮
    updateInfo () {
      var qs = require('querystring')
      this.$refs.editWorkRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/ws/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getWorkshop()
            this.$refs.editWorkRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 点击增加按钮，打开对话框
    addWork () {
      this.addDialog = true
    },
    // 增加提交按钮
    addSumbit () {
      var qs = require('querystring')
      this.$refs.addworkRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/ws/insert', qs.stringify(this.workFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success(res.msg)
            this.workshopData = res.data
            this.$refs.addworkRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 获取车间表格的数据信息
    async getWorkshop () {
      const res = await getData('/ws/selectall', this.queryworkshop)
      console.log(res)
      if (res.code === 200) {
        this.workshopData = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 删除按钮
    del (wsId) {
      this.$confirm('此操作将永久删除车间信息及车间下的所有内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/ws/delete?wsId=' + wsId)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.workshopData = res.data
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
    // position: absolute;
    // top: 25px;
    // left: 900px;
    margin-left: 75%;
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
    width: 80%;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
}
</style>
