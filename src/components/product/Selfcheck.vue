<template>
<div>
     <div class="back">
     <el-page-header @back="goBack"></el-page-header></div>
      <el-card class="box-card" shadow="always">
         <el-form :model="checkFrom" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="批次号" prop="batchNumber">
               <el-input autocomplete="off" v-model="checkFrom.batchNumber"></el-input>
            </el-form-item>
             <el-form-item label="产品代号" prop="tips">
                <el-input autocomplete="off"  v-model="checkFrom.tips"></el-input>
            </el-form-item>
               <el-form-item label="零部件代号" prop="componmentCode">
              <el-input autocomplete="off"  v-model="checkFrom.componmentCode"></el-input>
            </el-form-item>
               <el-form-item label="零部件名称" prop="componName">
              <el-input autocomplete="off"  v-model="checkFrom.componName"></el-input>
            </el-form-item>
             <el-form-item label="顺序号" prop="processId">
               <el-input autocomplete="off"  v-model="checkFrom.processId"></el-input>
            </el-form-item>
             <el-form-item label="工序代号" prop="processCode">
               <el-input autocomplete="off"  v-model="checkFrom.processCode"></el-input>
            </el-form-item>
             <el-form-item label="工序名称" prop="processName">
               <el-input autocomplete="off"  v-model="checkFrom.processName"></el-input>
            </el-form-item>
        </el-form>
   <el-table :data="data" border style="width: 100%" >
        <el-table-column prop="pdId" label="序号" :width="50" align="center" v-if="data[0].istrue"></el-table-column>
         <el-table-column prop="person" label="自检人员" align="center" :width="200">
            <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.person" placeholder="请输入自检人员"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                    </template>
        </el-table-column>
         <el-table-column prop="time" label="自检时间" align="center" :width="220">
            <template slot-scope="scope">
                        <!-- <el-input size="small" v-model="scope.row.time" placeholder="请输入自检时间"  @change="handleEdit(scope.$index, scope.row)"></el-input> -->
            <el-date-picker type="date"  clearable v-model="scope.row.time" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </template>
        </el-table-column>
           <template v-for="(item,index) in testCols">
                <el-table-column :prop="item.filed" :label="item.lable" :key="index"  align="center" :width="200">
                    <template slot-scope="scope">
                        <!-- {{scope.column}} -->
                        <el-input size="small" v-if="item.qualitative===0"  v-model="scope.row[item.filed]"  placeholder="请输入内容"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                        <el-radio-group  v-if="item.qualitative===1" v-model="scope.row[item.filed]">
                              <el-radio  label="合格"></el-radio>
                              <el-radio label="不合格"></el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </template>
    <el-table-column  label="操作" align="center">
         <template slot-scope="scope">
             <el-button type="success" size="mini" @click="Info(scope.row)">提 交</el-button>
        </template>
    </el-table-column>
</el-table>
<div class="bt">
    <i class="el-icon-circle-plus-outline" @click="addmembers"></i>
    <i class="el-icon-delete" @click="deleteItem(row, index)"></i>
</div>
   <div class="btn">
     <el-button type="warning"  size="mini" @click="dialogTableVisible = true">不合格发起</el-button>
      <!-- <el-button type="success"  size="mini" >自检通过</el-button> -->
      <!-- <el-button type="success"  size="mini">保存</el-button> -->
       <!-- <el-button type="primary"  size="mini" @click="addButton">增加</el-button> -->
      </div>
    </el-card>
    <el-dialog title="不合格发起" :visible.sync="dialogTableVisible"  width="73%">
           <!-- <div class="QR"></div> -->
            <!-- <el-form  :inline="true" class="demo-form-inline"  label-width="100px" style="margin-left: 200px; margin-top: -60px">
            <el-form-item label="产品代号" label-width="100px">
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item> -->
            <!-- <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px">搜索</el-button> -->
        <!-- </el-form> -->
        <el-table :data="tableData1" style="width: 100%"  tooltip-effect="dark" border>
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column label="序号" width="50" prop="num" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="120" prop="batchNumer" align="center"> </el-table-column>
           <el-table-column sortable label="批次数量" width="100" prop="productNum" align="center"></el-table-column>
             <el-table-column sortable label="产品代号" width="100" prop="product" align="center"> </el-table-column>
              <el-table-column sortable label="零部件代号" width="110" prop="product" align="center"> </el-table-column>
           <el-table-column sortable label="零部件名称" width="110" prop="productNum" align="center"></el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="processNum" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="100" prop="processName" align="center"> </el-table-column>
           <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"></el-table-column>
          <el-table-column sortable label="数量" width="86" prop="quant" align="center"> </el-table-column>
          <el-table-column sortable label="工作状态" width="100" prop="state" align="center"></el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination> -->
      <el-form :inline="true" class="demo-form-inline"  label-width="120px" style="margin-left: 200px" >
            <el-form-item label="不合格审理单号" label-width="120px">
             <el-input></el-input>
            </el-form-item><br>
             <el-form-item label="不合格现象" label-width="120px">
             <el-input type="textarea"></el-input>
            </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogTableVisible = false">提 交</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      rowNum: 1,
      // 表项（头）
      testCols: [
        {lable: ''}
      ],
      pdId: 1,
      // 表数据
      data: [
        {filed: ''}
      ],
      istrue: true,
      addFrom: {
        stAppearance: '',
        stLenth: '',
        stDiameter: '',
        stRadian: '',
        stQuateset: '',
        stFirst: '',
        userId: '',
        emId: '',
        stTime: ''
      },
      checkFrom: {
        batchNumber: '',
        tips: '',
        componmentCode: '',
        componName: '',
        processId: '',
        processCode: '',
        processName: ''
      },
      Dialog: false,
      dialogTableVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      //   formPoint: {
      //     stId: '',
      //     stAppearance: 1,
      //     stLenth: '',
      //     stRadian: '',
      //     stDiameter: '',
      //     stQuateset: '',
      //     stFirst: '',
      //     userId: '',
      //     emId: '',
      //     stTime: ''
      //   },
      tableData1: [{
        num: 1,
        batchNumer: '136TGX0000101',
        product: '钢芯',
        productNum: '136TGX',
        processNum: 10,
        processName: '下料冲型',
        processCode: 'XTX3',
        quant: 532345,
        state: '执行中'
      }],
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1,
      insert: []
    }
  },
  created () {},
  mounted () {
    this.getData()
    this.getselfcheck()
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit (val) {
      console.log(val)
    },
    goBack () {
      this.$router.push('/feedback')
    },
    // 提交按钮
    async Info (row) {
      row.pdId = this.testCols[0].pdId
      delete row.filed
      this.insert[0] = row
      //   var str = []
      //   Object.keys(row).forEach(item => {
      //     if (item !== 'filed') {
      //       str.push(row[item])
      //     }
      //   })
      //   var a = str.toString()
      //   const res = await postData('/sw/update?pdId=' + pdId + '&' + 'emNum=' + emNum + '&' + 'person=' + person + '&' + 'time=' + time + '&' + 'startResult=' + startResult)
      const res = await postData('/st/update', this.insert)
      if (res.code === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    // changeRadio (val) {
    //   let dd = val
    //   alert('当前选中的值为' + val)
    // },
    // 保存按钮
    editInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/st/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success(res.msg)
            this.getWork()
            this.$refs.editRef.resetFields()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 打开增加按钮对话框
    // addmembers () {
    //   var member = this.data
    //   console.log(member)
    //   var length = member.length
    //   this.data.push(
    //     {
    //       id: parseInt(length),
    //       lable: ''
    //     })
    // 删除一行
    deleteItem (row, index) {
      this.data.splice(index, 1)
    },
    // 打开增加一行
    addmembers () {
      var member = this.data
      console.log(member)
      //   var length = member.length
      this.data.push(
        {
        //   id: parseInt(length),
          filed: ''
        })
    },
    // 增加提交按钮
    // addInfo () {
    //   var qs = require('querystring')
    //   this.$refs.addRef.validate(async (valid) => {
    //     if (!valid) return
    //     if (valid) {
    //       const res = await postData('/st/insert', qs.stringify(this.addFrom))
    //       console.log(res)
    //       if (res.code === 200) {
    //         this.addDialog = false
    //         this.$message.success('提交成功')
    //         this.getWork()
    //         this.$refs.addRef.resetFields()
    //       } else {
    //         this.$message.error('提交失败')
    //       }
    //     }
    //   })
    // },
    // 获取路由传参的值
    getData () {
      var _this = this
      this.checkFrom = JSON.parse(this.$route.query.data)
      this.testCols = JSON.parse(this.$route.query.res)
      var dataList = JSON.parse(this.$route.query.res1) //   var dataList = this.testDatas
      dataList.forEach(function (item, index) {
        if (item.lable !== '序号') {
          for (let row of _this.testCols) {
            _this.$set([item], '' + row.filed + '', '')
            _this.pdId = row.pdId
          }
        }
      })
      this.data = dataList
    },
    // 获取表格信息
    async getselfcheck () {
      const res = await postData('/st/selectall', this.formPoint)
      if (res.code === 200) {
        // this.queryDate.stAppearance = this.queryDate.stAppearance === '合格' ? 1 : 0
        this.tableData = res.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    margin-left: -20px;
    width: auto;
    height: auto;
}
.btn{
    margin-left: 84%;
    margin-top: 20px;
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
    width: 180px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
 .bt{
        margin-left: 50%;
        cursor:pointer;
    }
</style>
