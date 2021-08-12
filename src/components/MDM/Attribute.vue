<template>
<!-- 生产资源属性 -->
<div>
     <el-card class="box-card" shadow="always">
       <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="产品代号" prop="bomCode">
            <el-input placeholder="全部" v-model="form.bomCode" clearable></el-input>
            </el-form-item>
              <el-form-item label="班组" prop="teamName">
            <el-input placeholder="全部" v-model="form.teamName" clearable></el-input>
            </el-form-item>
              <el-form-item label="代号" prop="code">
            <el-input placeholder="全部" v-model="form.code" clearable></el-input>
            </el-form-item>
              <el-form-item label="类别" prop="type">
            <el-input placeholder="全部" v-model="form.type" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top:7px"  @click="getGo">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" style="margin-top:7px" @click="addButton">增加</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="spId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="bomCode" align="center"> </el-table-column>
           <el-table-column sortable label="班组" width="100" prop="teamName" align="center"></el-table-column>
          <el-table-column sortable label="代号" width="80" prop="code" align="center"> </el-table-column>
          <el-table-column sortable label="状态" width="80" prop="status" align="center"> </el-table-column>
           <el-table-column sortable label="属域" width="90" prop="belpng" align="center"></el-table-column>
          <el-table-column sortable label="类别" width="100" prop="type" align="center"> </el-table-column>
          <el-table-column sortable label="名称" width="130" prop="name" align="center"> </el-table-column>
           <el-table-column sortable label="型号/规格" width="100" prop="model" align="center"></el-table-column>
              <el-table-column sortable label="等级/精度" width="100" prop="levels" align="center"></el-table-column>
           <el-table-column sortable label="资产编号" width="100" prop="assetNumber" align="center"></el-table-column>
           <el-table-column sortable label="存放地点" width="100" prop="storgePlace" align="center"> </el-table-column>
          <el-table-column sortable label="定检周期" width="100" prop="cycleTime" align="center"> </el-table-column>
            <el-table-column sortable label="有效定检周期" width="120" prop="usedCycleTime" align="center"></el-table-column>
             <el-table-column sortable label="单位" width="80" prop="ends" align="center"> </el-table-column>
            <el-table-column sortable label="备注" width="100" prop="tips" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateData(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.spId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querySX.pageNum"
      :page-size="querySX.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改生产资源属性信息" :visible.sync="editDialog" width="52%">
  <el-form ref="editRef" :model="editFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth" :rules="editRules">
       <el-form-item label="产品代号" prop="bomCode">
       <el-select  v-model="editFrom.bomCode"  clearable  @change="getitem">
          <el-option v-for="item in childrenCode" :key="item.componentId" :label="item.bomCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="班组" prop="teamName">
       <el-select  v-model="editFrom.teamName"  clearable  @change="getitem1">
          <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="类别" prop="type">
      <el-select  v-model="editFrom.type"  clearable  @change="getitem2">
          <el-option v-for="item in style" :key="item.tId" :label="item.type" :value="item.tId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="代号" prop="code">
      <el-input v-model="editFrom.code"></el-input>
    </el-form-item>
     <el-form-item label="状态" prop="status">
      <el-input v-model="editFrom.status"></el-input>
    </el-form-item>
     <el-form-item label="属域" prop="belpng">
     <el-input v-model="editFrom.belpng"></el-input>
    </el-form-item>
     <el-form-item label="名称" prop="name">
     <el-input v-model="editFrom.name"></el-input>
    </el-form-item>
     <el-form-item label="型号/规格" prop="model">
     <el-input v-model="editFrom.model"></el-input>
    </el-form-item>
     <el-form-item label="等级/精度" prop="levels">
      <el-input v-model="editFrom.levels"></el-input>
    </el-form-item>
     <el-form-item label="资产编号" prop="assetNumber" >
      <el-input v-model="editFrom.assetNumber"></el-input>
    </el-form-item>
    <el-form-item label="存放地点" prop="storgePlace">
     <el-input v-model="editFrom.storgePlace"></el-input>
    </el-form-item>
     <el-form-item label="定检周期" prop="cycleTime">
      <el-input v-model="editFrom.cycleTime"></el-input>
    </el-form-item>
    <el-form-item label="有效定检周期" prop="usedCycleTime">
     <el-date-picker value-format="yyyy-MM-dd" v-model="editFrom.usedCycleTime" type="date" placeholder="选择日期" @change="dateChange"></el-date-picker>
    </el-form-item>
     <el-form-item label="单位" prop="ends">
     <el-input v-model="editFrom.ends" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="tips">
     <el-input v-model="editFrom.tips" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfoData()">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加生产资源属性信息" :visible.sync="addDialog" width="75%">
  <el-form ref="addRef" :model="addFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth" :rules="addRules">
       <el-form-item label="产品代号" prop="bomCode">
       <el-select  v-model="addFrom.bomCode"  clearable placeholder="请选择产品代号" @change="getitem">
          <el-option v-for="item in childrenCode" :key="item.componentId" :label="item.bomCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="班组" prop="teamName">
       <el-select  v-model="addFrom.teamName"  clearable placeholder="请选择班组" @change="getitem1">
          <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="类别" prop="type">
      <el-select  v-model="addFrom.type"  clearable placeholder="请选择类别" @change="getitem2">
          <el-option v-for="item in style" :key="item.tId" :label="item.type" :value="item.tId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="代号" prop="code">
      <el-input v-model="addFrom.code"></el-input>
    </el-form-item>
     <el-form-item label="状态" prop="status">
      <el-input v-model="addFrom.status"></el-input>
    </el-form-item>
     <el-form-item label="属域" prop="belpng">
     <el-input v-model="addFrom.belpng"></el-input>
    </el-form-item>
     <el-form-item label="名称" prop="name">
     <el-input v-model="addFrom.name"></el-input>
    </el-form-item>
     <el-form-item label="型号/规格" prop="model">
     <el-input v-model="addFrom.model"></el-input>
    </el-form-item>
     <el-form-item label="等级/精度" prop="levels">
      <el-input v-model="addFrom.levels"></el-input>
    </el-form-item>
     <el-form-item label="资产编号" prop="assetNumber" >
      <el-input v-model="addFrom.assetNumber"></el-input>
    </el-form-item>
    <el-form-item label="存放地点" prop="storgePlace">
     <el-input v-model="addFrom.storgePlace"></el-input>
    </el-form-item>
     <el-form-item label="定检周期" prop="cycleTime">
      <el-input v-model="addFrom.cycleTime"></el-input>
    </el-form-item>
    <el-form-item label="有效定检周期" prop="usedCycleTime">
     <el-date-picker value-format="yyyy-MM-dd" v-model="addFrom.usedCycleTime" type="date" placeholder="选择日期" @change="dateChange"></el-date-picker>
    </el-form-item>
     <el-form-item label="单位" prop="ends">
     <el-input v-model="addFrom.ends" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="tips">
     <el-input v-model="addFrom.tips" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfoData">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'attribute',
  data () {
    return {
      form: {
        bomCode: '',
        teamName: '',
        code: '',
        type: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      },
      style: [],
      group: [],
      childrenCode: [],
      tableData: [],
      querySX: {
        spId: '',
        bomCode: '',
        teId: '',
        code: '',
        status: '',
        belpng: '',
        type: '',
        name: '',
        model: '',
        levels: '',
        assetNumber: '',
        storgePlace: '',
        cycleTime: '',
        usedCycleTime: '',
        ends: '',
        tips: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      },
      addFrom: {
        bomCode: '',
        teamName: '',
        type: '',
        code: '',
        status: '',
        belpng: '',
        name: '',
        model: '',
        levels: '',
        assetNumber: '',
        storgePlace: '',
        cycleTime: '',
        usedCycleTime: '',
        ends: '',
        tips: ''
      },
      usedCycleTime: '',
      editFrom: {
        bomCode: '',
        teamName: '',
        type: '',
        code: '',
        status: '',
        belpng: '',
        name: '',
        model: '',
        levels: '',
        assetNumber: '',
        storgePlace: '',
        cycleTime: '',
        usedCycleTime: '',
        ends: '',
        tips: ''
      },
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      count: 0,
      startTime: '',
      addRules: {
        code: [
          { required: true, message: '请输入代号，不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入状态，不能为空', trigger: 'blur' }
        ],
        belpng: [
          { required: true, message: '请输入属域，不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称，不能为空', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '请输入型号/规格，不能为空', trigger: 'blur' }
        ],
        levels: [
          { required: true, message: '请输入等级/精度,不能为空', trigger: 'blur' }
        ],
        assetNumber: [
          { required: true, message: '请输入资产编号，不能为空', trigger: 'blur' }
        ],
        storgePlace: [
          { required: true, message: '请输入存放地点，不能为空', trigger: 'blur' }
        ],
        cycleTime: [
          { required: true, message: '请输入定检周期,不能为空', trigger: 'blur' }
        ],
        usedCycleTime: [
          { required: true, message: '请输入有效定检周期，不能为空', trigger: 'blur' }
        ],
        ends: [
          { required: true, message: '请输入单位,不能为空', trigger: 'blur' }
        ]
      },
      editRules: {
        code: [
          { required: true, message: '请输入代号，不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入状态，不能为空', trigger: 'blur' }
        ],
        belpng: [
          { required: true, message: '请输入属域，不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称，不能为空', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '请输入型号/规格，不能为空', trigger: 'blur' }
        ],
        levels: [
          { required: true, message: '请输入等级/精度,不能为空', trigger: 'blur' }
        ],
        assetNumber: [
          { required: true, message: '请输入资产编号，不能为空', trigger: 'blur' }
        ],
        storgePlace: [
          { required: true, message: '请输入存放地点，不能为空', trigger: 'blur' }
        ],
        cycleTime: [
          { required: true, message: '请输入定检周期,不能为空', trigger: 'blur' }
        ],
        usedCycleTime: [
          { required: true, message: '请输入有效定检周期，不能为空', trigger: 'blur' }
        ],
        ends: [
          { required: true, message: '请输入单位,不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getShuxing()
  },
  watch: {},
  computed: {},
  methods: {
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/sourceProperty/likeSelect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 打开增加按钮对话框
    addButton () {
      this.addDialog = true
    },
    // 增加提交按钮
    addInfoData () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/sourceProperty/doInsert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.tableData = res.data
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
    async getShuxing () {
      const res = await getData('/sourceProperty/selectAll', this.querySX)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 点击修改出现的对话框
    updateData (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getShuxing(data.spId)
    },
    // 修改提交
    editInfoData () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/sourceProperty/doupdate', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.tableData = res.data
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
      const res = await getData('/sourceProperty/insertMsg')
      if (res.code === 200) {
        this.childrenCode = res.component
        this.group = res.team
        this.style = res.types
      }
    },
    // 获取下拉框的值
    getitem (val) {
      // val即是传进来的id值，也即value值
      this.childrenCode.find(item => item.componentId === val)
    },
    getitem1 (val) {
      // val即是传进来的id值，也即value值
      this.group.find(item => item.teId === val)
    },
    getitem2 (val) {
      // val即是传进来的id值，也即value值
      this.style.find(item => item.tId === val)
    },
    // 分页
    handleSizeChange (val) {
      this.querySX.pageSize = val
      this.getShuxing()
    },
    handleCurrentChange (val) {
      this.querySX.pageNum = val
      this.getShuxing()
    },
    // 删除按钮
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/sourceProperty/delete?spId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.tableData = res.data
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
