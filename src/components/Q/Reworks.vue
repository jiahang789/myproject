<template>
<!-- 返工返修确认界面 -->
<div>
      <el-card class="box-card" shadow="always">
            <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="批次号" prop="batchNumber">
               <el-input autocomplete="off" v-model="form.batchNumber"></el-input>
            </el-form-item>
             <el-form-item label="产品代号" prop="productCode">
                <el-input autocomplete="off" v-model="form.productCode"></el-input>
            </el-form-item>
             <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
        </el-form>
          <el-form :model="reWork"  :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="批次号" prop="batchNumber">
               <el-input autocomplete="off" v-model="reWork.batchNumber"></el-input>
            </el-form-item>
              <el-form-item label="产品代号" prop="componentCode">
              <el-input autocomplete="off"  v-model="reWork.componentCode"></el-input>
            </el-form-item>
             <el-form-item label="产品名称" prop="componentName">
                <el-input autocomplete="off"  v-model="reWork.componentName"></el-input>
            </el-form-item>
             <el-form-item label="顺序号" prop="processId">
               <el-input autocomplete="off"  v-model="reWork.processId"></el-input>
            </el-form-item>
             <el-form-item label="工序名称" prop="processName">
               <el-input autocomplete="off"  v-model="reWork.processName"></el-input>
            </el-form-item>
             <el-form-item label="批次数量" prop="batchCount">
               <el-input autocomplete="off"  v-model="reWork.batchCount"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="data" border>
          <el-table-column label="序号" width="60" prop="pdId" align="center"> </el-table-column>
           <!-- <el-table-column sortable label="产品代号" width="100" prop="componentCode" align="center"></el-table-column>
            <el-table-column sortable label="产品名称" width="100" prop="componentName" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="120" prop="batchNumber" align="center"> </el-table-column>
          <el-table-column  sortable label="顺序号" width="90" prop="processId" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="120" prop="processName" align="center"> </el-table-column>
           <el-table-column sortable label="数量" width="90" prop="batchCount" align="center"></el-table-column> -->
            <!-- <el-table-column sortable label="报工名称" width="90" prop="reportParam" align="center"></el-table-column>
             <el-table-column sortable label="报工内容" width="90" prop="reportResult" align="center"></el-table-column> -->
          <!-- <el-table-column sortable label="合格数" width="90" prop="hg" align="center"></el-table-column>
           <el-table-column sortable label="退修数" width="90" prop="tx"  align="center"> </el-table-column>
             <el-table-column sortable label="本道废" width="90" prop="bdf" align="center"> </el-table-column>
           <el-table-column sortable label="上道废" width="90" prop="sdf" align="center"></el-table-column> -->
           <template v-for="(item,index) in testCols">
                <el-table-column :prop="item.filed" :label="item.lable" :key="index"  align="center" :width="200">
                    <template slot-scope="scope">
                        <!-- {{scope.column}} -->
                        <el-input  v-if="item.qualitative===0 || item.qualitative===4" v-model="scope.row[item.filed]"  placeholder="请输入内容"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                        <el-radio-group  v-if="item.qualitative===1" v-model="scope.row[item.filed]">
                              <el-radio  label="合格"></el-radio>
                              <el-radio label="不合格"></el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </template>
            <el-table-column label="班(组)长" width="200" align="center" prop="teamPerson">
            <template slot-scope="scope">
                <el-radio-group v-model="scope.row.teamPerson">
                    <el-radio  label="合格"></el-radio>
                    <el-radio  label="不合格"></el-radio>
                 </el-radio-group>
            </template>
            </el-table-column>
             <el-table-column label="检验员" width="200" align="center" prop="testPerson">
            <template slot-scope="scope">
                <el-radio-group v-model="scope.row.testPerson">
                    <el-radio  label="合格"></el-radio>
                    <el-radio  label="不合格"></el-radio>
                 </el-radio-group>
            </template>
            </el-table-column>
             <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
                <el-button type="success" size="mini" @click="Info(scope.row.pdId,scope.row.teamPerson,scope.row.testPerson)">提交</el-button>
            </template>
            </el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination> -->
    <el-button type="warning"  size="mini" @click="dialogTableVisible = true" style="margin-left: 90%;margin-top: 7px">不合格发起</el-button>
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
    </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      // 表项（头）
      testCols: [
        {lable: ''}
      ],
      // 表数据
      data: [
        // {filed: ''}
      ],
      reWork: {
        batchNumber: '',
        componentCode: '',
        componentName: '',
        processId: '',
        processName: '',
        batchCount: ''
      },
      form: {
        productCode: '',
        batchNumber: ''
      },
      dialogTableVisible: false,
      addFrom: {
        pdId: '',
        codeNumber: '',
        reason: ''
      },
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1
    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 不合格发起
    sumbit () {
      this.addFrom.pdId = this.testCols[0].pdId
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/rp/notpass', qs.stringify(this.addFrom))
          if (res.code === 200) {
            this.dialogTableVisible = false
            this.$message.success(res.msg)
            this.$refs.addRef.resetFields()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/rc/select', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.reWork = res.data.list[0]
        this.testCols = res.data.name
        this.data = res.data.result
        // this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 增加提交按钮
    async Info (pdId, teamPerson, testPerson) {
      const res = await postData('/rc/insert?pdId=' + pdId + '&' + 'teamPerson=' + teamPerson + '&' + 'testPerson=' + testPerson)
      if (res.code === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
.table{
    width:auto;
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
</style>
