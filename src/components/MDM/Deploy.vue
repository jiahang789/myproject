<template>
<!-- 生产资源配置 -->
<div>
     <el-card class="box-card" shadow="always">
       <el-form :model="form"  :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="产品代号" prop="bomCode">
               <el-input autocomplete="off" placeholder="全部" v-model="form.bomCode" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo()">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
             <el-table-column type="selection" width="40"></el-table-column>
               <el-table-column label="序号" width="60" prop="scId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="bomCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件代号" width="110" prop="compontCode" align="center"></el-table-column>
          <el-table-column sortable label="工序类型" width="100" prop="carftType" align="center"> </el-table-column>
           <el-table-column sortable label="顺序号" width="90" prop="processId" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="170" prop="processName" align="center"> </el-table-column>
           <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"></el-table-column>
          <el-table-column sortable label="类别" width="80" prop="type" align="center"> </el-table-column>
          <el-table-column sortable label="代号" width="80" prop="code" align="center"> </el-table-column>
           <el-table-column sortable label="名称" width="80" prop="name" align="center"></el-table-column>
           <el-table-column sortable label="装配基数" width="100" prop="radio" align="center"></el-table-column>
           <el-table-column sortable label="单位" width="80" prop="ends" align="center"> </el-table-column>
           <el-table-column sortable label="设备" width="80" prop="machineName" align="center"> </el-table-column>
          <el-table-column sortable label="型号/规格" width="110" prop="moudle" align="center"></el-table-column>
          <el-table-column sortable label="等级/精度" width="110" prop="levels" align="center"></el-table-column>
            <el-table-column sortable label="备注" width="100" prop="tips" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="update(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.scId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryPZ.pageNum"
      :page-size="queryPZ.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改生产资源配置信息" :visible.sync="editDialog" width="76%">
  <el-form ref="editRef" :inline="true" :model="editFrom" class="demo-form-inline" :label-width="formLabelWidth" :rules="editRules">
       <el-form-item label="零部件代号" prop="compontCode">
     <el-select  v-model="editFrom.compontCode"  clearable  @change="getitem">
          <el-option v-for="item in childrenCode" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="产品代号" prop="bomCode">
       <el-input  v-model="editFrom.bomCode"></el-input>
    </el-form-item>
      <el-form-item label="工艺类型" prop="carftType">
       <el-select  v-model="editFrom.carftType"  clearable  @change="getitem1">
          <el-option v-for="item in type" :key="item.carftId" :label="item.carftType" :value="item.carftId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="顺序号" prop="processId">
      <el-select  v-model="editFrom.processId"  clearable  @change="getitem2">
          <el-option v-for="item in code" :key="item.rId" :label="item.processId" :value="item.rId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="工序名称" prop="processName">
    <el-input  v-model="editFrom.processName"></el-input>
    </el-form-item>
     <el-form-item label="工序代号" prop="processCode">
       <el-input  v-model="editFrom.processCode"></el-input>
    </el-form-item>
     <el-form-item label="类别" prop="type">
      <el-select  v-model="editFrom.type"  clearable @change="getitem3">
          <el-option v-for="item in style" :key="item.tId" :label="item.type" :value="item.tId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="代号" prop="code">
     <el-select  v-model="editFrom.code"  clearable @change="getitem4">
          <el-option v-for="item in num" :key="item.spId" :label="item.code" :value="item.spId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="名称" prop="name">
      <el-select  v-model="editFrom.name"  clearable @change="getitem5">
          <el-option v-for="item in name" :key="item.nameId" :label="item.name" :value="item.nameId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="装配基数" prop="radio">
     <el-input  v-model="editFrom.radio"></el-input>
    </el-form-item>
    <el-form-item label="单位" prop="ends">
      <el-input  v-model="editFrom.ends"></el-input>
    </el-form-item>
     <el-form-item label="设备" prop="machineName">
       <el-select  v-model="editFrom.machineName"  clearable @change="getitem6">
          <el-option v-for="item in machine" :key="item.emId" :label="item.emName" :value="item.emId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="型号/规格" prop="moudle">
      <el-input  v-model="editFrom.moudle"></el-input>
    </el-form-item>
      <el-form-item label="等级/精度" prop="levels" >
      <el-input v-model="editFrom.levels"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="tips">
     <el-input v-model="editFrom.tips"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfo()">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加生产资源配置信息" :visible.sync="addDialog" width="76%">
  <el-form ref="addRef" :inline="true" :model="addFrom" class="demo-form-inline" :label-width="formLabelWidth" :rules="addRules">
       <el-form-item label="零部件代号" prop="compontCode">
     <el-select  v-model="addFrom.compontCode"  clearable placeholder="请选择零部件代号" @change="getitem">
          <el-option v-for="item in childrenCode" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="产品代号" prop="bomCode">
       <el-input  v-model="addFrom.bomCode"></el-input>
    </el-form-item>
      <el-form-item label="工艺类型" prop="carftType">
       <el-select  v-model="addFrom.carftType"  clearable placeholder="请选择工艺类型" @change="getitem1">
          <el-option v-for="item in type" :key="item.carftId" :label="item.carftType" :value="item.carftId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="顺序号" prop="processId">
      <el-select  v-model="addFrom.processId"  clearable placeholder="请选择顺序号" @change="getitem2">
          <el-option v-for="item in code" :key="item.rId" :label="item.processId" :value="item.rId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="工序名称" prop="processName">
    <el-input  v-model="addFrom.processName"></el-input>
    </el-form-item>
     <el-form-item label="工序代号" prop="processCode">
       <el-input  v-model="addFrom.processCode"></el-input>
    </el-form-item>
     <el-form-item label="类别" prop="type">
      <el-select  v-model="addFrom.type"  clearable placeholder="请选择类别" @change="getitem3">
          <el-option v-for="item in style" :key="item.tId" :label="item.type" :value="item.tId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="代号" prop="code">
     <el-select  v-model="addFrom.code"  clearable placeholder="请选择代号" @change="getitem4">
          <el-option v-for="item in num" :key="item.spId" :label="item.code" :value="item.spId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="名称" prop="name">
      <el-select  v-model="addFrom.name"  clearable placeholder="请选择名称" @change="getitem5">
          <el-option v-for="item in name" :key="item.nameId" :label="item.name" :value="item.nameId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="装配基数" prop="radio">
     <el-input  v-model="addFrom.radio"></el-input>
    </el-form-item>
    <el-form-item label="单位" prop="ends">
      <el-input  v-model="addFrom.ends"></el-input>
    </el-form-item>
     <el-form-item label="设备" prop="machineName">
       <el-select  v-model="addFrom.machineName"  clearable placeholder="请选择设备" @change="getitem6">
          <el-option v-for="item in machine" :key="item.emId" :label="item.emName" :value="item.emId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="型号/规格" prop="moudle">
      <el-input  v-model="addFrom.moudle"></el-input>
    </el-form-item>
      <el-form-item label="等级/精度" prop="levels" >
      <el-input v-model="addFrom.levels"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="tips">
     <el-input v-model="addFrom.tips"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfo">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'deploy',
  data () {
    return {
      form: {
        bomCode: ''
      },
      style: [],
      code: [],
      type: [],
      num: [],
      name: [],
      machine: [],
      childrenCode: [],
      tableData: [],
      queryPZ: {
        scId: '',
        bomCode: '',
        compontCode: '',
        carftType: '',
        processId: '',
        processName: '',
        processCode: '',
        type: '',
        code: '',
        name: '',
        radio: '',
        ends: '',
        machineName: '',
        moudle: '',
        levels: '',
        tips: '',
        pageNum: 1, // 当前页码
        pageSize: 10
      },
      addFrom: {
        compontCode: '',
        bomCode: '',
        carftType: '',
        processId: '',
        processName: '',
        processCode: '',
        type: '',
        code: '',
        name: '',
        radio: '',
        ends: '',
        machineName: '',
        moudle: '',
        levels: '',
        tips: ''
      },
      editFrom: {
        compontCode: '',
        bomCode: '',
        carftType: '',
        processId: '',
        processName: '',
        processCode: '',
        type: '',
        code: '',
        name: '',
        radio: '',
        ends: '',
        machineName: '',
        moudle: '',
        levels: '',
        tips: ''
      },
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      addRules: {
        bomCode: [
          { required: true, message: '请输入产品代号，不能为空', trigger: 'blur' }
        ],
        processName: [
          { required: true, message: '请输入工序名称，不能为空', trigger: 'blur' }
        ],
        processCode: [
          { required: true, message: '请输入工序代号，不能为空', trigger: 'blur' }
        ],
        radio: [
          { required: true, message: '请输入装配基数，不能为空', trigger: 'blur' }
        ],
        ends: [
          { required: true, message: '请输入单位,不能为空', trigger: 'blur' }
        ],
        moudle: [
          { required: true, message: '请输入型号/规格，不能为空', trigger: 'blur' }
        ],
        levels: [
          { required: true, message: '请输入等级/精度,不能为空', trigger: 'blur' }
        ]
      },
      editRules: {
        bomCode: [
          { required: true, message: '请输入产品代号，不能为空', trigger: 'blur' }
        ],
        processName: [
          { required: true, message: '请输入工序名称，不能为空', trigger: 'blur' }
        ],
        processCode: [
          { required: true, message: '请输入工序代号，不能为空', trigger: 'blur' }
        ],
        radio: [
          { required: true, message: '请输入装配基数，不能为空', trigger: 'blur' }
        ],
        ends: [
          { required: true, message: '请输入单位,不能为空', trigger: 'blur' }
        ],
        moudle: [
          { required: true, message: '请输入型号/规格，不能为空', trigger: 'blur' }
        ],
        levels: [
          { required: true, message: '请输入等级/精度,不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getPZ()
  },
  watch: {},
  computed: {},
  methods: {
    // 获取表格数据
    async getPZ () {
      const res = await getData('/sourceConfig/selectAll', this.queryPZ)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/sourceConfig/selectLike', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 点击修改出现的对话框
    update (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getPZ(data.scId)
    },
    // 修改提交
    editInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/sourceConfig/update', qs.stringify(this.editFrom))
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getPZ()
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
    async getSelect () {
      const res = await getData('/sourceConfig/insertMsg')
      if (res.code === 200) {
        this.childrenCode = res.data.Components
        this.type = res.data.carftType
        this.code = res.data.Routings
        this.style = res.data.type
        this.num = res.data.SourceProperties
        this.name = res.data.name
        this.machine = res.data.Equipments
      }
    },

    getitem (val) {
      this.childrenCode.find((item) => {
        if (item.componentId === this.addFrom.compontCode) {
          item.componentId = item.bomCode
          this.addFrom.bomCode = item.componentId
        }
      })
    },
    getitem1 (val) {
      this.type.find((item) => {
        return item.carftId === val
      })
    },
    getitem2 (val) {
      this.code.find((item) => {
        if (item.rId === this.addFrom.processId) {
          item.rId = item.processName
          this.addFrom.processName = item.rId
          item.rId = item.processCode
          this.addFrom.processCode = item.rId
        }
      })
    },
    getitem3 (val) {
      this.style.find((item) => {
        return item.spId === val
      })
    },
    getitem4 (val) {
      this.num.find((item) => {
        return item.spId === val
      })
    },
    getitem5 (val) {
      this.name.find((item) => {
        return item.nameId === val
      })
    },
    getitem6 (val) {
      this.machine.find((item) => {
        return item.emId === val
      })
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
          const res = await postData('/sourceConfig/doInsert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getPZ()
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
      this.queryPZ.pageSize = val
      this.getPZ()
    },
    handleCurrentChange (val) {
      this.queryPZ.pageNum = val
      this.getPZ()
    },
    // 删除按钮
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/sourceConfig/delete?scId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getPZ()
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
