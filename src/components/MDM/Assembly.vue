
<template>
<!-- 工艺装配 -->
<div>
     <el-card class="box-card" shadow="always">
       <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="产品代号" prop="productCode">
               <el-input autocomplete="off" placeholder="全部" v-model="form.productCode" clearable></el-input>
            </el-form-item>
             <el-form-item label="零部件代号" prop="componentCode" >
               <el-input autocomplete="off" placeholder="全部" v-model="form.componentCode" clearable></el-input>
            </el-form-item>
             <el-form-item label="工艺类型" prop="carftType">
               <el-input autocomplete="off" placeholder="全部" v-model="form.carftType" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo()">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
             <el-table-column type="selection" width="40"></el-table-column>
               <el-table-column label="序号" width="50" prop="eId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"> </el-table-column>
            <el-table-column sortable label="零部件代号" width="110" prop="componentCode" align="center"></el-table-column>
          <el-table-column sortable label="零部件名称" width="110" prop="componentName" align="center"> </el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="processId" align="center"> </el-table-column>
           <el-table-column sortable label="工序名称" width="150" prop="processName" align="center"></el-table-column>
           <el-table-column sortable label="工序代号" width="110" prop="processCode" align="center"></el-table-column>
          <el-table-column sortable label="工艺类型" width="110" prop="carftType" align="center"></el-table-column>
          <el-table-column sortable label="工艺路线" width="110" prop="rId" align="center"> </el-table-column>
          <el-table-column sortable label="装配顺序" width="110" prop="sequenceId" align="center"> </el-table-column>
           <el-table-column sortable label="绑定内容" width="120" prop="cotent" align="center"> </el-table-column>
           <el-table-column sortable label="备注" width="120" prop="tips" align="center"></el-table-column>
            <el-table-column label="操作" width="268" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="update(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.eId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
     @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryAss.pageNum"
      :page-size="queryAss.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改工艺装配信息" :visible.sync="editDialog" width="75%">
 <el-form :model="editFrom" ref="editRef" :inline="true" class="demo-form-inline"  :label-width="formLabelWidth" :rules="editRules">
      <el-form-item label="零部件代号" prop="componentCode">
      <el-select  v-model="editFrom.componentCode"  clearable placeholder="请选择零部件代号" @change="getitems">
         <el-option v-for="item in code" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="零部件名称" prop="componentName">
       <el-input  v-model="editFrom.componentName"></el-input>
    </el-form-item>
     <el-form-item label="产品代号" prop="productCode">
        <el-input  v-model="editFrom.productCode"></el-input>
    </el-form-item>
     <el-form-item label="顺序号" prop="processId">
       <el-select  v-model="editFrom.processId"  clearable placeholder="请选择顺序号" @change="getitem11">
          <el-option v-for="item in num" :key="item.rId" :label="item.processId" :value="item.rId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="工序名称" prop="processName">
    <el-input  v-model="editFrom.processName"></el-input>
    </el-form-item>
     <el-form-item label="工序代号" prop="processCode">
      <el-input  v-model="editFrom.processCode"></el-input>
    </el-form-item>
     <el-form-item label="工艺类型" prop="carftType">
      <el-select  v-model="editFrom.carftType"  clearable placeholder="请选择工艺类型" @change="getitem2">
          <el-option v-for="item in style" :key="item.carftId" :label="item.carftType" :value="item.carftId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="装配顺序" prop="sequenceId" >
    <el-input autocomplete="off"  v-model="editFrom.sequenceId"></el-input>
    </el-form-item>
     <el-form-item label="绑定内容" prop="cotent">
    <el-input autocomplete="off"  v-model="editFrom.cotent"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="tips">
       <el-input autocomplete="off"  v-model="editFrom.tips"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfo()">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加工艺装配信息" :visible.sync="addDialog" width="75%">
  <el-form :model="addFrom" ref="addRef" :inline="true" class="demo-form-inline"  :label-width="formLabelWidth" :rules="addRules">
       <el-form-item label="零部件代号" prop="componentCode">
      <el-select  v-model="addFrom.componentCode"  clearable placeholder="请选择零部件代号" @change="getitem">
          <el-option v-for="item in code" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="零部件名称" prop="componentName">
       <el-input  v-model="addFrom.componentName"></el-input>
    </el-form-item>
     <el-form-item label="产品代号" prop="productCode">
        <el-input  v-model="addFrom.productCode"></el-input>
    </el-form-item>
     <el-form-item label="顺序号" prop="processId">
       <el-select  v-model="addFrom.processId"  clearable placeholder="请选择顺序号" @change="getitem1">
          <el-option v-for="item in num" :key="item.rId" :label="item.processId" :value="item.rId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="工序名称" prop="processName">
    <el-input  v-model="addFrom.processName"></el-input>
    </el-form-item>
     <el-form-item label="工序代号" prop="processCode">
      <el-input  v-model="addFrom.processCode"></el-input>
    </el-form-item>
     <el-form-item label="工艺类型" prop="carftType">
      <el-select  v-model="addFrom.carftType"  clearable placeholder="请选择工艺类型" @change="getitem2">
          <el-option v-for="item in style" :key="item.carftId" :label="item.carftType" :value="item.carftId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="装配顺序" prop="sequenceId" >
    <el-input autocomplete="off"  v-model="addFrom.sequenceId"></el-input>
    </el-form-item>
     <el-form-item label="绑定内容" prop="cotent">
    <el-input autocomplete="off"  v-model="addFrom.cotent"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="tips">
       <el-input autocomplete="off"  v-model="addFrom.tips"></el-input>
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
  name: 'assembly',
  data () {
    return {
      tableData: [],
      code: [],
      num: [],
      style: [],
      queryAss: {
        eId: '',
        productCode: '',
        componentCode: '',
        componentName: '',
        processId: '',
        processName: '',
        processCode: '',
        carftType: '',
        rId: '',
        sequenceId: '',
        cotent: '',
        tips: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      addFrom: {
        componentCode: '',
        componentName: '',
        productCode: '',
        processId: '',
        processName: '',
        processCode: '',
        carftType: 1,
        sequenceId: '',
        cotent: '',
        tips: ''
      },
      editFrom: {
        componentCode: '',
        componentName: '',
        productCode: '',
        processId: '',
        processName: '',
        processCode: '',
        carftType: '',
        sequenceId: '',
        cotent: '',
        tips: ''
      },
      form: {
        productCode: '',
        carftType: '',
        componentCode: ''
      },
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      addRules: {
        componentName: [
          { required: true, message: '只能输入零部件名称，不能为空', trigger: 'blur' }
        ],
        productCode: [
          { required: true, message: '只能输入产品代号，不能为空', trigger: 'blur' }
        ],
        processName: [
          { required: true, message: '只能输入工序名称，不能为空', trigger: 'blur' }
        ],
        processCode: [
          { required: true, message: '只能输入工序代号，不能为空', trigger: 'blur' }
        ],
        sequenceId: [
          { required: true, message: '只能输入装配顺序，不能为空', trigger: 'blur' }
        ],
        cotent: [
          { required: true, message: '只能输入绑定内容,不能为空', trigger: 'blur' }
        ]
      },
      editRules: {
        componentName: [
          { required: true, message: '只能输入零部件名称，不能为空', trigger: 'blur' }
        ],
        productCode: [
          { required: true, message: '只能输入产品代号，不能为空', trigger: 'blur' }
        ],
        processName: [
          { required: true, message: '只能输入工序名称，不能为空', trigger: 'blur' }
        ],
        processCode: [
          { required: true, message: '只能输入工序代号，不能为空', trigger: 'blur' }
        ],
        sequenceId: [
          { required: true, message: '只能输入装配顺序，不能为空', trigger: 'blur' }
        ],
        cotent: [
          { required: true, message: '只能输入绑定内容,不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getSelect()
    this.getSelects()
  },
  mounted () {
    this.getAss()
  },
  watch: {},
  computed: {},
  methods: {
    // 获取表格数据
    async getAss () {
      const res = await getData('/exam/fittingSelect', this.queryAss)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/exam/fittingSelectLike', this.form)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 点击修改出现的对话框
    update (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getAss(data.eId)
    },
    // 修改提交
    editInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/exam/fittingUpdate', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getAss()
            this.$refs.editRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 获取下拉框数据
    async getSelects () {
      const res = await getData('/exam/fittingSelectLists')
      if (res.code === 200) {
        this.code = res.data.componentCode
        this.style = res.data.carftType
      }
    },
    getitems (val) {
      this.code.find((item) => {
        if (item.componentId === this.editFrom.componentCode) {
          item.componentId = item.componentNam
          this.editFrom.componentName = item.componentId
          item.componentId = item.bomCode
          this.editFrom.productCode = item.componentId
        }
        this.getProcess1()
      })
    },
    async  getProcess1 () {
      const res = await getData('/exam/fittingProcessIds?componentCode=' + this.editFrom.componentCode)
      if (res.code === 200) {
        this.num = res.data.processId
      }
    },
    getitem11 () {
      this.num.find((item) => {
        if (item.rId === this.editFrom.processId) {
          item.rId = item.processName
          this.editFrom.processName = item.rId
          item.rId = item.processCode
          this.editFrom.processCode = item.rId
        }
      })
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await getData('/exam/fittingSelectList')
      if (res.code === 200) {
        this.code = res.data.componentCode
        this.style = res.data.carftType
      }
    },
    getitem (val) {
      this.code.find((item) => {
        if (item.componentId === this.addFrom.componentCode) {
          item.componentId = item.componentId
          this.addFrom.componentName = item.componentId
          item.componentId = item.bomCode
          this.addFrom.productCode = item.componentId
        }
        this.getProcess()
      })
    },
    async  getProcess () {
      const res = await getData('/exam/fittingProcessId?componentCode=' + this.addFrom.componentCode)
      if (res.code === 200) {
        this.num = res.data.processId
      }
    },
    getitem1 () {
      this.num.find((item) => {
        if (item.rId === this.addFrom.processId) {
          item.rId = item.processName
          this.addFrom.processName = item.rId
          item.rId = item.processCode
          this.addFrom.processCode = item.rId
        }
      })
    },
    getitem2 (val) {
      this.style.find(item => item.carftId === val)
    },
    // 打开增加按钮对话框
    addButton () {
      this.addDialog = true
    },
    // 增加提交按钮
    addInfo () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/exam/fittingInsert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getAss()
            this.$refs.addRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      this.queryAss.pageSize = val
      this.getAss()
    },
    handleCurrentChange (val) {
      this.queryAss.pageNum = val
      this.getAss()
    },
    // 删除按钮
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/exam/fittingDelete?eId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getAss()
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    //   this.xiangshu = val.length
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: 1330px;
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
