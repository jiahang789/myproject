<template>
<!-- 计划查看-->
<div>
     <el-card class="box-card" shadow="always">
     <el-form :model="checkSelect" :inline="true"  label-width="100px" class="electFrom">
            <el-form-item label="请先选择" prop="bomTypeId">
              <el-select  v-model="checkSelect.bomTypeId"  clearable placeholder="部件计划" @change="getitem">
                 <el-option v-for="item in check" :key="item.bomTypeId" :label="item.childernType" :value="item.bomTypeId"></el-option>
              </el-select>
            </el-form-item>  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="goSelect()">搜索</el-button>
     </el-form>
     <!-- 部件计划 -->
     <el-card class="box-card1" shadow="always" v-if="show">
           <el-form :model="bujian" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="产品代号" prop="productCode">
                <el-select  v-model="bujian.productCode"  clearable placeholder="全部" @change="getitem1">
                 <el-option v-for="item in productNum" :key="item.bomId" :label="item.bomName" :value="item.bomId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="零部件代号" prop="componmentCode">
              <el-select  v-model="bujian.componmentCode"  clearable placeholder="全部" @change="getitem2">
                 <el-option v-for="item in childrenNum" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划月份" prop="planMonth">
               <el-select  v-model="bujian.planMonth"  clearable placeholder="全部" @change="getitem3">
                 <el-option v-for="item in mouth" :key="item.planId" :label="item.planMonth" :value="item.planId"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="goSelect1()">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column  label="序号" width="50" prop="planId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"> </el-table-column>
            <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"> </el-table-column>
          <el-table-column sortable label="计划月份" width="100" prop="planMonth" align="center"> </el-table-column>
          <!-- <el-table-column sortable label="计划批次" width="100" prop="planBatch" align="center"> </el-table-column> -->
           <el-table-column sortable label="计划类型" width="100" prop="planType" align="center"> </el-table-column>
          <el-table-column sortable label="计划数量(万粒)" width="130" prop="planCount" align="center"> </el-table-column>
            <el-table-column sortable label="计划总数量(万粒)" width="140" prop="count" align="center"> </el-table-column>
           <el-table-column sortable label="承制部门" width="100" prop="workShop" align="center"></el-table-column>
          <el-table-column sortable label="计划开始时间" width="120" prop="startMonth" align="center"> </el-table-column>
          <el-table-column sortable label="计划结束时间" width="120" prop="endMonth" align="center"> </el-table-column>
           <el-table-column sortable label="库存数量" width="100" prop="kucun" align="center"> </el-table-column>
            <el-table-column sortable label="完工率" width="90" prop="finish" align="center"> </el-table-column>
           <el-table-column sortable label="交付率" width="90" prop="out" align="center"></el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryBujian.pageNum"
      :page-size="queryBujian.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
     <!-- 零件计划 -->
     <el-card class="box-card1" shadow="always" v-if="show1">
           <el-form :model="lingjian"  :inline="true" class="demo-form-inline"  label-width="100px">
           <el-form-item label="产品代号" prop="productCode">
                <el-select  v-model="lingjian.productCode"  clearable placeholder="全部" @change="getitem1">
                 <el-option v-for="item in productNum" :key="item.bomId" :label="item.bomName" :value="item.bomId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="零部件代号" prop="componmentCode">
              <el-select  v-model="lingjian.componmentCode"  clearable placeholder="全部" @change="getitem2">
                 <el-option v-for="item in childrenNum" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划月份" prop="planMonth">
               <el-select  v-model="lingjian.planMonth"  clearable placeholder="全部" @change="getitem3">
                 <el-option v-for="item in mouth" :key="item.planId" :label="item.planMonth" :value="item.planId"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="goSelect2">搜索</el-button>
        </el-form>
        <el-table :data="tableData1" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="componmentId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"> </el-table-column>
            <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件名称" width="110" prop="componmentName" align="center"> </el-table-column>
             <el-table-column sortable label="批次号" width="90" prop="batch" align="center"> </el-table-column>
            <el-table-column sortable label="计划月份" width="100" prop="planMonth" align="center"> </el-table-column>
           <el-table-column sortable label="计划状态" width="100" prop="planStatus" align="center"> </el-table-column>
             <el-table-column sortable label="计划类型" width="100" prop="planType" align="center"> </el-table-column>
          <el-table-column sortable label="计划数量(万粒)" width="130" prop="planCount" align="center"> </el-table-column>
           <el-table-column sortable label="承制部门" width="100" prop="parentDept" align="center"></el-table-column>
          <el-table-column sortable label="计划开始时间" width="120" prop="beginTime" align="center"> </el-table-column>
          <el-table-column sortable label="计划结束时间" width="120" prop="endTime" align="center"> </el-table-column>
            <el-table-column sortable label="完工率" width="90" prop="finish" align="center"> </el-table-column>
  </el-table>
   <el-pagination background
    @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1"
      :current-page="queryLingjian.pageNum"
      :page-size="queryLingjian.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
      <!-- 工序计划 -->
     <el-card class="box-card1" shadow="always" v-if="show2"  >
         <el-form :model="gongxu"  :inline="true" class="demo-form-inline"  label-width="100px">
           <el-form-item label="产品代号" prop="productCode">
                <el-select  v-model="gongxu.productCode"  clearable placeholder="全部" @change="getitem1">
                 <el-option v-for="item in productNum" :key="item.bomId" :label="item.bomName" :value="item.bomId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="零部件代号" prop="componmentCode">
              <el-select  v-model="gongxu.componmentCode"  clearable placeholder="全部" @change="getitem2">
                 <el-option v-for="item in childrenNum" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="顺序号" prop="processId">
              <el-select  v-model="gongxu.processId"  clearable placeholder="全部" @change="getitem4">
                 <el-option v-for="item in shuxu" :key="item.rId" :label="item.processId" :value="item.rId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划月份" prop="planMonth">
               <el-select  v-model="gongxu.planMonth"  clearable placeholder="全部" @change="getitem3">
                 <el-option v-for="item in mouth" :key="item.planId" :label="item.planMonth" :value="item.planId"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="goSelect3">搜索</el-button>
        </el-form>
        <el-table :data="tableData2" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="rId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"> </el-table-column>
            <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件名称" width="110" prop="componmentName" align="center"> </el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="processId" align="center"> </el-table-column>
          <el-table-column sortable label="工序名称" width="100" prop="processName" align="center"> </el-table-column>
           <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"> </el-table-column>

           <el-table-column sortable label="工序状态" width="100" prop="planType" align="center"> </el-table-column>
            <el-table-column sortable label="计划月份" width="130" prop="planCount" align="center"> </el-table-column>
           <el-table-column sortable label="计划批次" width="100" prop="workCenter" align="center"></el-table-column>
          <el-table-column sortable label="计划数量(万粒)" width="130" prop="planCount" align="center"> </el-table-column>
           <el-table-column sortable label="班组" width="100" prop="workCenter" align="center"></el-table-column>

          <el-table-column sortable label="工序计划开始时间" width="150" prop="startTime" align="center"> </el-table-column>
          <el-table-column sortable label="工序计划结束时间" width="150" prop="endTime" align="center"> </el-table-column>
            <el-table-column sortable label="完工率" width="90" prop="finish" align="center"> </el-table-column>
  </el-table>
   <el-pagination background
     @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="queryGongxu.pageNum"
      :page-size="queryGongxu.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
     </el-card>
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {},
  name: 'planlook',
  data () {
    return {
      checkSelect: {
        bomTypeId: ''
      },
      bujian: {
        productCode: '',
        componmentCode: '',
        planMonth: ''
      },
      lingjian: {
        productCode: '',
        componmentCode: '',
        planMonth: ''
      },
      gongxu: {
        productCode: '',
        componmentCode: '',
        planMonth: '',
        processId: ''
      },
      check: [],
      productNum: [],
      childrenNum: [],
      mouth: [],
      shuxu: [],
      show: true,
      show1: false,
      show2: false,
      tableData: [],
      queryBujian: {
        planId: '',
        productCode: '',
        componmentCode: '',
        planMonth: '',
        planBatch: '',
        planType: '',
        planCount: '',
        count: '',
        workShop: '',
        startMonth: '',
        endMonth: '',
        kucun: '',
        finish: '',
        out: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      },
      count: 0,
      tableData1: [],
      queryLingjian: {
        componmentId: '',
        productCode: '',
        componmentCode: '',
        componmentName: '',
        batch: '',
        planMonth: '',
        planStatus: '',
        planType: '',
        planCount: '',
        parentDept: '',
        beginTime: '',
        endTime: '',
        finish: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      },
      tableData2: [],
      queryGongxu: {
        rId: '',
        productCode: '',
        componmentCode: '',
        componmentName: '',
        processId: '',
        processName: '',
        processCode: '',
        planCount: '',
        startTime: '',
        endTime: '',
        finish: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      },
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      imageUrl: '',
      dialogImageUrl: ''
    }
  },
  created () {
    this.getSelect()
    this.getSelect1()
  },
  mounted () {
    this.getBujian()
    this.getlingjian()
    this.getGongxu()
  },
  watch: {},
  computed: {},
  methods: {
    // 查看部件搜索
    async goSelect () {
      const res = await getData('/planSelect/select', this.checkSelect)
      if (res.code === 200) {
        if (this.checkSelect.bomTypeId === 1) {
          this.show = true
          this.show1 = false
          this.show2 = false
          this.getBujian()
          this.$message.success('获取列表成功！')
        } else if (this.checkSelect.bomTypeId === 2) {
          this.show = false
          this.show1 = true
          this.show2 = false
          this.getlingjian()
          this.$message.success('获取列表成功！')
        } else if (this.checkSelect.bomTypeId === 3) {
          this.show = false
          this.show1 = false
          this.show2 = true
          this.getGongxu()
          this.$message.success('获取列表成功！')
        }
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取部件表格信息
    async getBujian () {
      const res = await getData('/planSelect/selectByBujian', this.queryBujian)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 分页
    handleSizeChange (val) {
      this.queryBujian.pageSize = val
      this.getBujian()
    },
    handleCurrentChange (val) {
      this.queryBujian.pageNum = val
      this.getBujian()
    },
    // 获取零件表格信息
    async getlingjian () {
      const res = await getData('/planSelect/selectByLingjian', this.queryLingjian)
      if (res.code === 200) {
        this.tableData1 = res.data
        this.count = res.count
      }
    },
    // 分页
    handleSizeChange1 (val) {
      this.queryLingjian.pageSize = val
      this.getlingjian()
    },
    handleCurrentChange1 (val) {
      this.queryLingjian.pageNum = val
      this.getlingjian()
    },
    // 获取工序表格信息
    async getGongxu () {
      const res = await getData('/planSelect/selectByGongXu', this.queryGongxu)
      if (res.code === 200) {
        this.tableData2 = res.data
        this.count = res.count
      }
    },
    // 分页
    handleSizeChange2 (val) {
      this.queryGongxu.pageSize = val
      this.getGongxu()
    },
    handleCurrentChange2 (val) {
      this.queryGongxu.pageNum = val
      this.getGongxu()
    },
    // 获取查看部件下拉框数据
    async getSelect () {
      const res = await getData('/planSelect/condintion')
      if (res.code === 200) {
        this.check = res.data
      }
    },
    getitem (val) {
      this.check.find(item => item.bomTypeId === val)
    },
    // 获取卡片里下拉框数据
    async getSelect1 () {
      const res = await getData('/planSelect/seleceMsg')
      if (res.code === 200) {
        this.productNum = res.data.component
        this.childrenNum = res.data.product
        this.mouth = res.data.month
        this.shuxu = res.data.processId
      }
    },
    getitem1 (val) {
      this.productNum.find(item => item.bomId === val)
    },
    getitem2 (val) {
      this.childrenNum.find(item => item.componentId === val)
    },
    getitem3 (val) {
      this.mouth.find(item => item.planId === val)
    },
    getitem4 (val) {
      this.shuxu.find(item => item.rId === val)
    },
    // 部件卡片里的搜索
    async goSelect1 () {
      const res = await getData('/planSelect/selectByBujian', this.bujian)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 零件卡片里的搜索
    async goSelect2 () {
      const res = await getData('/planSelect/selectByLingjian', this.lingjian)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData1 = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 工序卡片里的搜索
    async goSelect3 () {
      const res = await getData('/planSelect/selectByGongXu', this.gongxu)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData2 = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 删除按钮
    del () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // const res = await delData('/machine/delOne?id=' + id)
        // if (res.status === 200) {
        //   this.$message.success('删除成功！')
        //   this.getEqun()
        // } else {
        //   this.$message.error('删除失败！')
        // }
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
// .electFrom{
//   position: absolute;
//   left: 300px;
//   top: 120px;
// }
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 100px;
    width: auto;
    height: auto;
    background-color: #FFFFFF;
}
.box-card1{
    // margin-left: 270px;
    // position: relative;
    // top: 100px;
    width: 1300px;
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
