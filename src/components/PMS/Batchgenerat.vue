
<template>
<!-- 批次生成 -->
<div>
     <el-card class="box-card" shadow="always">
         <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" style="margin-left: -30px">
            <el-form-item label="零部件代号" prop="productCode">
               <el-select  v-model="form.productCode"  clearable placeholder="全部" @change="getitem">
                  <el-option v-for="item in productCode" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="批次类型" prop="batchstyle">
               <el-select  v-model="form.batchstyle"  clearable placeholder="全部" @change="getitem1">
                 <el-option v-for="item in batch" :key="item.tId" :label="item.type" :value="item.tId"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 85%"  tooltip-effect="dark"   @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40" v-model="multipleSelection"></el-table-column>
          <el-table-column label="序号" width="50" prop="bId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件名称" width="110" prop="componmentName" align="center"> </el-table-column>
           <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"></el-table-column>
          <el-table-column sortable label="是否打印" width="100" prop="isPrint" align="center"> </el-table-column>
          <el-table-column sortable label="类型" width="100" prop="bomType" align="center"> </el-table-column>
           <el-table-column sortable label="生成批数" width="180" prop="printNum" align="center">
                <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.printNum" placeholder="请输入不大于200的数字"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                </template>
           </el-table-column>
          <el-table-column sortable label="剩余可用批数" width="120" prop="restNum" align="center"> </el-table-column>
          <el-table-column sortable label="预警数量" width="117" prop="warn" align="center"></el-table-column>
  </el-table>
   <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryBatch.pageNum"
      :page-size="queryBatch.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
               <div style="margin-left: 70%; margin-top: 10px">
                  <el-button type="success"  size="mini" @click="createBatch()"  v-loading.fullscreen.lock="fullscreenLoading">生成批次</el-button>
                   <!-- <el-button type="warning"  size="mini" v-print="'#print_label'" >打印预览</el-button> -->
                 <!-- <el-button type="primary"  size="mini" v-print="'#print_label'" @click="print()" >提交打印</el-button> -->
                  <el-button type="primary"  size="mini" v-print="'#print_label'"  @click="printJson()">提交打印</el-button>
               </div>
<div style="display: none">
    <div id="print_label">
    <div v-for=" (list, index) in cardData" :key="index">
           <table border="1" style="border-collapse: collapse; width: 210px; height: 135px;margin:40px">
               <tr style="height: 37.5px">
                   <th colspan="2" ><h3 align="center"><span>{{list.bomCode}}批次标签</span></h3></th>
               </tr>
               <tr style="height: 57.5px" >
                   <td align="center">{{list.componmentName}}批次</td>
                   <td rowspan="2" style="width: 105px">
                       <!-- <div id="code"></div>
                       <canvas id="canvas"></canvas> -->
                       <img :src="list.qrcode" style="margin-left:10px ">
                   </td>
               </tr>
                <tr>
                   <td>{{list.batchNumber}}</td>
               </tr>
               <tr style="height: 20px" >
                   <td align="center">生成时间</td>
                   <td align="center">批次类型</td>
               </tr>
                 <tr style="height: 20px">
                   <td align="center">{{list.bornTime}}</td>
                   <td align="center">{{list.batchType}}</td>
               </tr>
           </table>
           </div>
           </div>
             </div>
        </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
import QRCode from 'qrcode'
import printJS from 'print-js'
export default {
  components: {
    QRCode,
    printJS
    // Tag
  },
  name: 'batchgenerat',
  data () {
    return {
      renderComponent: true,
      form: {
        productCode: '',
        batchstyle: ''
      },
      productCode: [],
      batch: [],
      tableData: [],
      queryBatch: {
        bId: '',
        productCode: '',
        componmentName: '',
        componmentCode: '',
        isPrint: '',
        bomType: '',
        printNum: '',
        restNum: '',
        warn: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      count: 0,
      cardData: [{
        bomCode: '',
        componmentName: '',
        batchNumber: '',
        bornTime: '',
        batchType: '',
        qrcode: ''
      }],
      multipleSelection: [],
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      fullscreenLoading: false
    }
  },
  created () {
    this.getSelect()
    this.getBatch()
  },
  mounted () {
    // this.printJson()
  },
  watch: {
  },
  computed: {},
  methods: {
    handleSizeChange (val) {
      this.queryBatch.pageSize = val
      this.getBatch()
    },
    handleCurrentChange (val) {
      this.queryBatch.pageNum = val
      this.getBatch()
    },
    // 提交打印按钮
    async printJson () {
    //   this.$print(this.$refs.print, {'no-print': '#print_label'})
      //   this.$print(this.$refs.print) // 使用
      var _this = this
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({bId: item.bId, printNum: item.printNum})
        })
        const res = await postData('/batch/print', multis)
        if (res.code === 200) {
          _this.cardData = res.data
          const img = btoa(
            new Uint8Array(res).reduce(
              (data, byte) => data + String.fromCharCode(byte), '')
          )
          this.cardData.qrcode = 'data:image/png;base64,' + img
          this.$message.success(res.msg)
          //   this.renderComponent = false
          //   this.$nextTick(() => {
          //     this.renderComponent = truexa
          //   })
        //   this.fullscreenLoading = false
        //   this.$nextTick(() => {
        //     window.print()
        //   })
        }
        // else {
        //   this.$message.error(res.msg)
        // }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/batch/selectLike', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await getData('/batch/selectMsg')
      if (res.code === 200) {
        this.productCode = res.data.product
        this.batch = res.data.batch
      }
    },
    getitem (val) {
      this.productCode.find(item => item.componentId === val)
    },
    getitem1 (val) {
      this.batch.find(item => item.tId === val)
    },
    // 获取表格数据
    async getBatch () {
      const res = await getData('/batch/selectAll', this.queryBatch)
      if (res.code === 200) {
        this.dataAll = res.data
        this.dataAll.forEach(a => {
          if (a.isPrint === 1) {
            a.isPrint = '是'
          } else {
            a.isPrint = '否'
          }
        })
        this.tableData = this.dataAll
        this.count = res.count
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 点击生成批次
    async createBatch () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({bId: item.bId, printNum: item.printNum})
        })
        this.fullscreenLoading = true
        setTimeout(() => {
          this.fullscreenLoading = false
        }, 1000)
        const res = await postData('/batch/insert', multis)
        if (res.code === 200) {
          this.$message.success('批次生成成功！')
        } else {
          this.$message.error('批次生成失败！')
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    handleEdit (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: 1250px;
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
    width: 150px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
