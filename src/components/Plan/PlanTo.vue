<template>
<!-- 计划导入-->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form"  :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="计划月份" label-width="100px" prop="planMonth">
            <el-input autocomplete="off" v-model="form.planMonth" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
        </el-form>
              <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="info">批量导入计划</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入</el-button>
         <el-link type="info">模板下载>></el-link>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
             <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="planId" align="center"> </el-table-column>
          <el-table-column sortable label="产品" width="80" prop="product" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"> </el-table-column>
           <el-table-column sortable label="计划员" width="90" prop="planPeople" align="center"></el-table-column>
          <el-table-column sortable label="计划月份" width="100" prop="planMonth" align="center"> </el-table-column>
           <el-table-column sortable label="计划类型" width="100" prop="planType" align="center"> </el-table-column>
          <el-table-column sortable label="计划数量(万粒)" width="140" prop="planCount" align="center"> </el-table-column>
           <el-table-column sortable label="承制部门" width="100" prop="parantDept" align="center"></el-table-column>
          <el-table-column sortable label="计划开始时间" width="120" prop="startTime" align="center"> </el-table-column>
          <el-table-column sortable label="计划结束时间" width="120" prop="endTime" align="center"> </el-table-column>
            <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="update(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.planId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryPlanTo.pageNum"
      :page-size="queryPlanTo.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改计划导入信息" :visible.sync="editDialog" width="52%">
   <el-form ref="editRef" :model="editFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
       <el-form-item label="产品代号" prop="productCodes">
      <el-select  v-model="editFrom.productCodes"  clearable placeholder="请选择产品代号" @change="getitem">
          <el-option v-for="item in productCode" :key="item.componentId" :label="item.bomCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="产品" prop="product">
         <el-input v-model="editFrom.product"></el-input>
    </el-form-item>
     <el-form-item label="计划类型" prop="planTypes">
     <el-select  v-model="editFrom.planTypes"  clearable placeholder="请选择计划类型" @change="getitem1">
          <el-option v-for="item in planStyle" :key="item.planTypeId" :label="item.planType" :value="item.planTypeId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="计划员" prop="planPeoples">
      <el-select  v-model="editFrom.planPeoples"  clearable placeholder="请选择计划员" @change="getitem2">
          <el-option v-for="item in name" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
      </el-select>
    </el-form-item>
       <el-form-item label="计划月份" prop="planMonth">
        <el-input autocomplete="off" v-model="editFrom.planMonth"></el-input>
    </el-form-item>
     <el-form-item label="计划数量(万粒)" prop="planCount">
       <el-input autocomplete="off" v-model="editFrom.planCount"></el-input>
    </el-form-item>
     <el-form-item label="承制部门" prop="parantDepts">
     <el-select  v-model="editFrom.parantDepts"  clearable placeholder="请选择承制部门" @change="getitem3">
          <el-option v-for="item in unit" :key="item.wsId" :label="item.wsName" :value="item.wsId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="计划开始时间" prop="startTime">
      <el-date-picker type="date" placeholder="选择日期" v-model="editFrom.startTime"  value-format="yyyy-MM-dd"  @change="dateChange"></el-date-picker>
    </el-form-item>
     <el-form-item label="计划结束时间" prop="endTime">
      <el-date-picker type="date" placeholder="选择日期" v-model="editFrom.endTime"  value-format="yyyy-MM-dd"  @change="dateChange"></el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfo">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加计划导入信息" :visible.sync="addDialog" width="50%">
  <el-form ref="addRef" :model="addFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
       <el-form-item label="产品代号" prop="productCode">
      <el-select  v-model="addFrom.productCode"  clearable placeholder="请选择产品代号" @change="getitem">
          <el-option v-for="item in productCode" :key="item.componentId" :label="item.bomCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="产品" prop="product">
         <el-input v-model="addFrom.product"></el-input>
    </el-form-item>
     <el-form-item label="计划类型" prop="planType">
     <el-select  v-model="addFrom.planType"  clearable placeholder="请选择计划类型" @change="getitem1">
          <el-option v-for="item in planStyle" :key="item.planTypeId" :label="item.planType" :value="item.planTypeId"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="计划员" prop="planPeople">
      <el-select  v-model="addFrom.planPeople"  clearable placeholder="请选择计划员" @change="getitem2">
          <el-option v-for="item in name" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
      </el-select>
    </el-form-item>
       <el-form-item label="计划月份" prop="planMonth">
        <el-date-picker type="month" placeholder="选择月份" v-model="addFrom.planMonth"  value-format="yyyyMM"  @change="dateChange" clearable></el-date-picker>
    </el-form-item>
     <el-form-item label="计划数量(万粒)" prop="planCount">
       <el-input autocomplete="off" v-model="addFrom.planCount"></el-input>
    </el-form-item>
     <el-form-item label="承制部门" prop="parantDept">
     <el-select  v-model="addFrom.parantDept"  clearable placeholder="请选择承制部门" @change="getitem3">
          <el-option v-for="item in unit" :key="item.wsId" :label="item.wsName" :value="item.wsId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="计划开始时间" prop="startTime">
      <el-date-picker type="date" placeholder="选择日期" v-model="addFrom.startTime"  value-format="yyyy-MM-dd"  @change="dateChange"></el-date-picker>
    </el-form-item>
     <el-form-item label="计划结束时间" prop="endTime">
      <el-date-picker type="date" placeholder="选择日期" v-model="addFrom.endTime"  value-format="yyyy-MM-dd"  @change="dateChange"></el-date-picker>
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
  name: 'planto',
  data () {
    return {
      productCode: [],
      planStyle: [],
      name: [],
      unit: [],
      tableData: [],
      queryPlanTo: {
        planId: '',
        product: '',
        productCode: '',
        planPeople: '',
        planMonth: '',
        planType: '',
        planCount: '',
        parantDept: '',
        startTime: '',
        endTime: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      },
      count: 0,
      addFrom: {
        productCode: '',
        product: '',
        planType: '',
        planPeople: '',
        planMonth: '',
        planCount: '',
        parantDept: '',
        startTime: '',
        endTime: ''
      },
      editFrom: {
        productCodes: '',
        product: '',
        planTypes: '',
        planPeoples: '',
        planMonth: '',
        planCount: '',
        parantDepts: '',
        startTime: '',
        endTime: ''
      },
      form: {
        planMonth: ''
      },
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      //   fileList: [
      //     {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
      //     {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      //   ],
      pageNum: 1, // 当前页码
      pageSize: 10 // 每页条数
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getPlanTO()
  },
  watch: {},
  computed: {},
  methods: {
    // 分页
    handleSizeChange (val) {
      this.queryPlanTo.pageSize = val
      this.getPlanTO()
    },
    handleCurrentChange (val) {
      this.queryPlanTo.pageNum = val
      this.getPlanTO()
    },
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    // 获取表格数据
    async getPlanTO () {
      const res = await getData('/planInPort/select', this.queryPlanTo)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/planInPort/selectLike', this.form)
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
      this.getPlanTO(data.planId)
    },
    // 修改提交
    editInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/planInPort/update', qs.stringify(this.editFrom))
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getPlanTO()
            this.$refs.editRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await getData('/planInPort/insertMsg')
      if (res.code === 200) {
        this.productCode = res.data.compont
        this.planStyle = res.data.planType
        this.name = res.data.user
        this.unit = res.data.tCjdgWorkshops
      }
    },
    getitem (val) {
      this.productCode.find((item) => {
        if (item.componentId === this.addFrom.productCode) {
          item.componentId = item.bomCode
          this.addFrom.product = item.componentId
        }
      })
    },
    getitem1 (val) {
      this.planStyle.find(item => item.planTypeId === val)
    },
    getitem2 (val) {
      this.name.find(item => item.userId === val)
    },
    getitem3 (val) {
      this.unit.find(item => item.wsId === val)
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
          const res = await postData('/planInPort/insert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getPlanTO()
            this.$refs.addRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    },
    // 删除按钮
    del (id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/planInPort/delete?planId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getPlanTO()
        } else {
          this.$message.error('删除失败！')
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
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: auto;
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
