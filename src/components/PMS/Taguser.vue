<template>
<!-- 标签补打 -->
<div>
     <el-card class="box-card" shadow="always">
         <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="零部件代号" prop="componmentCode">
               <el-select  v-model="form.componmentCode"  clearable placeholder="全部" @change="getitem">
                 <el-option v-for="item in childrenCode" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="批次类型" prop="batchType">
              <el-select  v-model="form.batchType"  clearable placeholder="全部" @change="getitem1">
                 <el-option v-for="item in batch" :key="item.tId" :label="item.type" :value="item.tId"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="时间" prop="date">
                 <el-date-picker v-model="form.date"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间" value-format="yyyy-MM-dd" clearable @change="dateChange">
                    </el-date-picker>
            </el-form-item><br>
              <el-form-item label="批次号打印范围" label-width="120px" prop="fanwei1">
               <el-input v-model="form.fanwei1"></el-input>
            </el-form-item>
              <el-form-item label="-" style="margin-left: -80px" prop="fanwei2">
               <el-input v-model="form.fanwei2"></el-input>
            </el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 6px" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 87%" @selection-change="handleSelectionChange" tooltip-effect="dark" border>
          <el-table-column type="selection" width="40" v-model="multipleSelection"></el-table-column>
          <el-table-column  sortable label="序号" width="70" prop="pcId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="120" prop="bomCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件代号" width="120" prop="componmentCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件名称" width="180" prop="componmentName" align="center"> </el-table-column>
           <el-table-column sortable label="批次类型" width="140" prop="batchType" align="center"></el-table-column>
           <el-table-column sortable label="批次号" width="180" prop="batchNumber" align="center"></el-table-column>
           <el-table-column sortable label="批次生成时间" width="200" prop="bornTime" align="center"></el-table-column>
  </el-table>
   <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryTag.pageNum"
      :page-size="queryTag.pageSize"
      layout="total, prev, pager, next"
      :total="count">
   </el-pagination>
      <el-button type="primary"  size="mini"  v-print="'#print_label'" style="margin-left:80%;margin-top:10px" @click="print">提交打印</el-button>
<div style="display: none">
<div id="print_label">
    <!-- <div class="person">
       <h3 align="center" style=" border-bottom:black 1px solid ;">136TGX加工过程卡</h3> -->
           <table border="1" style="border-collapse: collapse; width: 210px; height: 135px; margin: 30px">
               <tr style="height: 37.5px">
                   <th colspan="2" ><h3 align="center">136TGX批次标签</h3></th>
               </tr>
               <tr style="height: 57.5px">
                   <td align="center">钢芯批次</td>
                   <td rowspan="2" style="width: 105px">
                       <div id="code"></div>
                       <canvas id="canvas"></canvas>
                   </td>
               </tr>
                <tr>
                   <td>136T00100001</td>
               </tr>
               <tr style="height: 20px">
                   <td align="center">生成时间</td>
                   <td align="center">批次类型</td>
               </tr>
                 <tr style="height: 20px">
                   <td align="center">20210201</td>
                   <td align="center">正常批</td>
               </tr>
           </table>
    <!-- </div> -->
</div>
</div>
        </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
import QRCode from 'qrcode'
export default {
  components: {
    QRCode
  },
  name: 'taguser',
  data () {
    return {
      childrenCode: [],
      batch: [],
      form: {
        componmentCode: '',
        batchType: '',
        date: '',
        fanwei1: '',
        fanwei2: ''
      },
      count: 0,
      multipleSelection: [],
      show: false,
      tableData: [],
      queryTag: {
        pcId: '',
        bomCode: '',
        componmentCode: '',
        componmentName: '',
        batchType: '',
        batchNumber: '',
        bornTime: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      }
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.useqrcode()
    this.getTaguser()
  },
  watch: {},
  computed: {},
  methods: {
    handleSizeChange (val) {
      this.queryTag.pageSize = val
      this.getTaguser()
    },
    handleCurrentChange (val) {
      this.queryTag.pageNum = val
      this.getTaguser()
    },
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    // 提交打印按钮
    async print () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({pcId: item.pcId})
        })
        const res = await postData('/batch/markPrint', multis)
        console.log(res)
        if (res.code === 200) {
          this.$message.success('打印成功！')
        } else {
          this.$message.error('打印失败！')
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/batch/markSelect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取表格数据
    async getTaguser () {
      const res = await getData('/batch/markPrintAll', this.queryTag)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await getData('/batch/markPrintMsg')
      if (res.code === 200) {
        this.childrenCode = res.data.componentCode
        this.batch = res.data.batchType
      }
    },
    getitem (val) {
      this.childrenCode.find(item => item.componentId === val)
    },
    getitem1 (val) {
      this.batch.find(item => item.tId === val)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 二维码生成
    useqrcode () {
      var canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, '137T00100001', function (error) {
        if (error) console.error(error)
        console.log('success!')
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
.block{
    margin-left: 25%;
    margin-top: -20px;
}

/deep/ .el-input__inner {
    height: 30px;
    width: 230px;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
    }
     /deep/.el-select .el-input__inner {
  width: 207px;

}
// // 标签
.person{
    border: black 1px solid;
    width: 350px;
    height: 300px;
}
</style>
