/* eslint-disable indent */
<template>
<!-- 报工 -->
<div>
     <div class="back">
     <el-page-header @back="goBack"></el-page-header></div>
      <el-card class="box-card" shadow="always">
        <el-form :model="workFrom" :inline="true" class="demo-form-inline"  label-width="100px">
            <!-- <el-form-item label="序号" prop="ptId" style="diaplay:none">
               <el-input autocomplete="off" v-model="workFrom.ptId"></el-input>
            </el-form-item> -->
            <el-form-item label="批次号" prop="batchNumber">
               <el-input autocomplete="off" v-model="workFrom.batchNumber"></el-input>
            </el-form-item>
             <el-form-item label="产品代号" prop="tips">
                <el-input autocomplete="off"  v-model="workFrom.tips"></el-input>
            </el-form-item>
               <el-form-item label="零部件代号" prop="componmentCode">
              <el-input autocomplete="off"  v-model="workFrom.componmentCode"></el-input>
            </el-form-item>
               <el-form-item label="零部件名称" prop="componName">
              <el-input autocomplete="off"  v-model="workFrom.componName"></el-input>
            </el-form-item>
             <el-form-item label="顺序号" prop="processId">
               <el-input autocomplete="off"  v-model="workFrom.processId"></el-input>
            </el-form-item>
             <el-form-item label="工序代号" prop="processCode">
               <el-input autocomplete="off"  v-model="workFrom.processCode"></el-input>
            </el-form-item>
             <el-form-item label="工序名称" prop="processName">
               <el-input autocomplete="off"  v-model="workFrom.processName"></el-input>
            </el-form-item>
        </el-form>
      <!-- <el-table :data="tableData" style="width: 87%" border>
            <el-table-column label="序号" width="50" prop="rwId" align="center"> </el-table-column>
          <el-table-column sortable label="报工项" width="250" prop="znum" align="center"> </el-table-column>
          <el-table-column sortable label="是否定性" width="200" prop="quali" align="center"> </el-table-column>
             <el-table-column sortable label="检验类型" width="200" prop="tx" align="center"> </el-table-column>
           <el-table-column sortable label="检验结果" width="305" prop="bdf" align="center"></el-table-column>
  </el-table> -->
    <el-table :data="data" border style="width: 100%" >
        <el-table-column prop="pdId" label="序号" :width="50" align="center" v-if="data[0].istrue"></el-table-column>
         <el-table-column prop="person" label="报工人员" align="center" :width="220">
            <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.person" placeholder="请输入报工人员"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                    </template>
        </el-table-column>
         <el-table-column prop="time" label="报工时间" align="center" :width="200">
            <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.time" placeholder="请输入报工时间"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                    </template>
        </el-table-column>
           <template v-for="(item,index) in testCols">
                <el-table-column :prop="item.filed" :label="item.lable" :key="index"  align="center" :width="200">
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
             <el-button type="success" size="mini" @click="Info(scope.row)">报 工</el-button>
        </template>
    </el-table-column>
</el-table>
   <div class="btn">
        <!-- <el-button type="info"  size="mini" >获取数据</el-button> -->
      <!-- <el-button type="success"  size="mini" >报工</el-button> -->
      <el-button type="primary"  size="mini" @click="processEnd()">工序结束</el-button>
      </div>
    </el-card>
</div>
</template>

<script>
import { postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
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
      workFrom: {
        ptId: '',
        batchNumber: '',
        tips: '',
        componmentCode: '',
        componName: '',
        processId: '',
        processCode: '',
        processName: ''
      },
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
    goBack () {
      this.$router.push('/feedback')
    },
    // 工序结束按钮
    async processEnd () {
      var id = this.workFrom.ptId
      const res = await postData('/ss/beend?ptId=' + id)
      if (res.code === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    handleEdit (val) {
      console.log(val)
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
      const res = await postData('/ss/update', this.insert)
      if (res.code === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取路由传参的值
    getData () {
      var _this = this
      this.workFrom = JSON.parse(this.$route.query.data)
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
/deep/.el-table td, .el-table th {
    padding: 3px 0;
}
/deep/.el-table th {
    padding: 5px 0;
    background-color: #EBEEF5;
}
.btn{
    margin-left: 80%;
    margin-top: 20px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 50px;
    height: 50px;
}
.select{
    width: 300px;
}
/deep/ .el-input__inner {
    height: 30px;
    width: 180px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
