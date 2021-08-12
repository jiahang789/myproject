<template>
<!-- 分厂专检里的--专检 -->
<div>
      <el-card class="box-card" shadow="always">
         <el-form :model="zjFrom" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="批次号" prop="batchNumber">
               <el-input autocomplete="off" v-model="zjFrom.batchNumber"></el-input>
            </el-form-item>
             <el-form-item label="产品代号" prop="productCode">
                <el-input autocomplete="off" v-model="zjFrom.productCode"></el-input>
            </el-form-item>
             <el-form-item label="零部件代号" prop="componmentCode">
                <el-input autocomplete="off" v-model="zjFrom.componmentCode"></el-input>
            </el-form-item>
             <el-form-item label="零部件名称" prop="componmentName">
                <el-input autocomplete="off" v-model="zjFrom.componmentName"></el-input>
            </el-form-item>
             <el-form-item label="顺序号" prop="processId">
               <el-input autocomplete="off" v-model="zjFrom.processId"></el-input>
            </el-form-item>
             <el-form-item label="工序名称" prop="processName">
               <el-input autocomplete="off" v-model="zjFrom.processName"></el-input>
            </el-form-item>
             <el-form-item label="工序代号" prop="processCode">
               <el-input autocomplete="off" v-model="zjFrom.processCode"></el-input>
            </el-form-item>
        </el-form>
         <el-table :data="data" border style="width: 100%" >
        <el-table-column prop="pdId" label="序号" :width="50" align="center" v-if="data[0].istrue"></el-table-column>
           <template v-for="(item,index) in testCols">
                <el-table-column :prop="item.filed" :label="item.lable" :key="index"  align="center" :width="250">
                    <template slot-scope="scope">
                        <!-- {{scope.column}} -->
                        <el-input size="small" v-if="item.qualitative===0" v-model="scope.row[item.filed]"  placeholder="请输入内容"  @change="handleEdit(scope.$index, scope.row)"></el-input>
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
     <el-button type="warning"  size="mini"  @click="dialogTableVisible = true">不合格发起</el-button>
      <el-button type="success"  size="mini" @click="gozj()">专检通过</el-button>
      </div>
    </el-card>
    <el-dialog title="不合格发起" :visible.sync="dialogTableVisible"  width="50%">
      <el-form ref="addRef" :model="addFrom" :inline="true" class="demo-form-inline"  label-width="120px" style="margin-left: 200px" >
           <el-form-item label="id" prop="pdId" v-show="false">
             <el-input v-model="addFrom.pdId"></el-input>
            </el-form-item>
            <el-form-item label="不合格审理单号" prop="codeNumber">
             <el-input v-model="addFrom.codeNumber"></el-input>
            </el-form-item><br>
             <el-form-item label="不合格原因" prop="reason">
             <el-input type="textarea" v-model="addFrom.reason"></el-input>
            </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="sumbit()">提 交</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import Q from '../Q/FactoryZJ'
import { postData } from '../../api/index'
export default {
  components: {
    Q
  },
  data () {
    return {
      zjFrom: {
        batchNumber: '',
        productCode: '',
        componmentCode: '',
        componmentName: '',
        processId: '',
        processName: '',
        processCode: ''
      },
      // 表项（头）
      testCols: [
        {lable: ''}
      ],
      // 表数据
      data: [
        {filed: ''}
      ],
      istrue: true,
      addFrom: {
        pdId: '',
        codeNumber: '',
        reason: ''
      },
      editDialog: false,
      dialogTableVisible: false,
      formLabelWidth: '120px',
      //   tableData: [{
      //     num: 1,
      //     appear: '',
      //     length: '',
      //     arc: '',
      //     dia: '',
      //     mass: '1.1;1.2;1.3;1.4;1.5',
      //     name: '大大',
      //     names: '小小',
      //     machineCode: 'DA0001',
      //     time: '2021/03/24 11:00'
      //   }],
      //   tableData1: [{
      //     num: 1,
      //     batchNumer: '136TGX0000101',
      //     product: '钢芯',
      //     productNum: '136TGX',
      //     processNum: 10,
      //     processName: '下料冲型',
      //     processCode: 'XTX3',
      //     quant: 532345,
      //     state: '执行中'
      //   }],
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1,
      insert: []
    }
  },
  created () {},
  mounted () {
    this.getData()
  },
  watch: {},
  computed: {},
  methods: {
    // 专检通过
    async gozj () {
      this.addFrom.pdId = this.testCols[0].pdId
      const res = await postData('/factoryCheck/access?pdId=' + this.addFrom.pdId)
      if (res.code === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 不合格提交按钮
    sumbit () {
      this.addFrom.pdId = this.testCols[0].pdId
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/factoryCheck/notPass', qs.stringify(this.addFrom))
          if (res.code === 200) {
            this.dialogTableVisible = false
            this.$message.success('提交成功')
            this.$refs.addRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    },
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
    handleEdit (val) {
      console.log(val)
    },
    // 动态提交按钮
    async Info (row) {
      row.pdId = this.testCols[0].pdId
      delete row.filed
      this.insert[0] = row
      const res = await postData('/factoryCheck/insert', this.insert)
      if (res.code === 200) {
        this.$message.success('提交成功！')
      } else {
        this.$message.error('提交失败！')
      }
    },
    // 获取路由传参的值
    async getData () {
      var _this = this
      this.zjFrom = JSON.parse(this.$route.query.data)
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
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    margin-left: -20px;
    width: 100%;
    height: auto;

}
.btn{
    margin-left: 75%;
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
    width: 209px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
}
    .bt{
        margin-left: 50%;
        cursor:pointer;
    }
</style>
