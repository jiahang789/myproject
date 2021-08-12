<template>
<!-- 开工 -->
<div>
     <div class="back">
     <el-page-header @back="goBack"></el-page-header></div>
      <el-card class="box-card" shadow="always">
         <el-form :model="startWork"  :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="批次号" prop="batchNumber">
               <el-input autocomplete="off" v-model="startWork.batchNumber"></el-input>
            </el-form-item>
              <el-form-item label="产品代号" prop="tips">
              <el-input autocomplete="off"  v-model="startWork.tips"></el-input>
            </el-form-item>
             <el-form-item label="零部件代号" prop="componmentCode">
                <el-input autocomplete="off"  v-model="startWork.componmentCode"></el-input>
            </el-form-item>
             <el-form-item label="顺序号" prop="processId">
               <el-input autocomplete="off"  v-model="startWork.processId"></el-input>
            </el-form-item>
             <el-form-item label="工序名称" prop="processName">
               <el-input autocomplete="off"  v-model="startWork.processName"></el-input>
            </el-form-item>
             <el-form-item label="工序代号" prop="processCode">
               <el-input autocomplete="off"  v-model="startWork.processCode"></el-input>
            </el-form-item>
             <el-form-item label="批次数量" prop="batchCount">
               <el-input autocomplete="off"  v-model="startWork.batchCount"></el-input>
            </el-form-item>
        </el-form>
       <!-- <el-table-column prop="pdId" label="序号" :width="50" align="center"></el-table-column>
        <el-table-column prop="emNum" label="加工设备" align="center" :width="220">
            <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.emNum" placeholder="请输入加工设备"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                    </template>
        </el-table-column>
        <el-table-column prop="person" label="操作人员"  align="center" :width="220">
            <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.person" placeholder="请输入操作人员"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                    </template>
        </el-table-column>
        <el-table-column prop="time" label="开工时间" align="center" :width="220">
            <template slot-scope="scope">
                         <el-date-picker v-model="scope.row.time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                    </template>
        </el-table-column> -->
        <el-table :data="data" border style="width: 100%" >
        <el-table-column prop="pdId" label="序号" :width="50" align="center" v-if="data[0].istrue"></el-table-column>
         <el-table-column prop="emNum" label="加工设备" align="center" :width="200">
            <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.emNum" placeholder="请输入加工设备"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                    </template>
        </el-table-column>
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
    <el-table-column  label="操作" align="center">
         <template slot-scope="scope">
             <el-button type="success" size="mini" @click="Info(scope.row)">开 工</el-button>
        </template>
    </el-table-column>
</el-table>
    </el-card>
</div>
</template>

<script>
import { postData } from '../../api/index'
export default {
  components: {

  },
  data () {
    return {
      // 表项（头）
      testCols: [
        {lable: ''}
      ],
      // 表数据
      data: [
        {filed: ''}
      ],
      startWork: {
        batchNumber: '',
        tips: '',
        componmentCode: '',
        processId: '',
        processName: '',
        processCode: '',
        batchCount: ''
      },
      istrue: true,
      insert: []

    }
  },
  created () {
    // this.search()
  },
  mounted () {
    this.getData()
    // 删除一项
    // this.add()
    // this.getForm()
  },
  watch: {
  },
  computed: {},
  methods: {
    goBack () {
      this.$router.push('/feedback')
    },
    // 提交按钮
    async Info (row) {
      row.pdId = this.testCols[0].pdId
      delete row.filed
      this.insert[0] = row
      const res = await postData('/sw/update', this.insert)
      if (res.code === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    handleEdit (val) {
      console.log(val)
    },
    // 获取路由传参的值
    async getData () {
      var _this = this
      this.startWork = JSON.parse(this.$route.query.data)
      this.testCols = JSON.parse(this.$route.query.res)
      var dataList = JSON.parse(this.$route.query.res1) //   var dataList = this.testDatas
      dataList.forEach(function (item, index) {
        // if (index !== 0) {
        if (item.lable !== '序号') {
          for (let row of _this.testCols) {
            _this.$set([item], '' + row.filed + '', '')
            _this.pdId = row.pdId
          }
        }
        //   _this.data[0]  item
        // } else {
        //   _this.pdId = item.pdId
        // }
      })
    }
  }
}
</script>
<style lang="less" scoped>
// .mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
//         .mailTable{ font-size: 10px; color: #71787E; width:100%; height:100%;}
//         .mailTable tr td{ border:1px solid #E6EAEE; width: 15%; height: 76px; box-sizing: border-box; padding: 0 10px; }
        // .mailTable tr td.column { background-color: #EFF3F6; color: #000000; }
.box-card{
    margin-left: -20px;
    // position: relative;
    // top: 50px;
    width:auto;
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
    margin-left: 68%;
    margin-top: 20px;
}
/deep/ .el-input__inner {
    height: 30px;
    width: 180px;
}
/deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
