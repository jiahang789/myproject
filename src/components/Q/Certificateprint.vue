<template>
<!-- 合格证打印 -->
<div>
      <el-card class="box-card" shadow="always">
            <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" >
             <el-form-item label="组号" prop="groupNumber">
                <el-input autocomplete="off" v-model="form.groupNumber"></el-input>
            </el-form-item>
             <el-form-item label="产品代号" prop="bomParent">
                <el-input autocomplete="off" v-model="form.bomParent"></el-input>
            </el-form-item>
             <el-form-item label="时间" prop="time">
                 <el-date-picker v-model="form.time"
                        type="daterange" value-format="yyyy-MM-dd"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间">
                 </el-date-picker>
            </el-form-item>
            <el-button type="success" icon="el-icon-search" size="mini" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column type="selection" width="40"  v-model="multipleSelection"></el-table-column>
          <el-table-column label="序号" width="50" prop="cyId" align="center"> </el-table-column>
           <el-table-column sortable label="批次号" width="140" prop="batchNumber" align="center"> </el-table-column>
            <el-table-column sortable label="产品代号" width="140" prop="bomParent" align="center"> </el-table-column>
           <el-table-column sortable label="数量" width="100" prop="count" align="center"></el-table-column>
          <el-table-column sortable label="提检人员" width="140" prop="checkPeople" align="center"></el-table-column>
          <el-table-column sortable label="检验人员" width="140" prop="people" align="center"></el-table-column>
           <el-table-column sortable label="组号" width="130" prop="groupNumber"  align="center"> </el-table-column>
           <el-table-column sortable label="合格证发放日期" width="200" prop="time" align="center"></el-table-column>
          <el-table-column sortable label="设备类型" width="120" prop="machineType" align="center"></el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination> -->
     <el-button type="success" size="mini" style="float:right"  v-print="'#print_label'" @click="print()">合格证打印</el-button>
        <div style="display: none">
<div id="print_label" >
   <div class="person">
           <div class="son">
                    <input type="text" style="border:none; border-radius:0;border-bottom:black 1px solid; width: 80px">
                    <span>弹头合格证</span>
                    <span style="margin-left: 50px">立式</span>
            </div>
           <table border="1" style="border-collapse: collapse;  width: 450px; height: 300px; margin: 30px">
               <tr>
                   <td width=40px>
                       <div align=center>填发日期</div>
                   </td>
                   <td colspan="5">
                       <div>
                           <span style="letter-spacing:50px; float:right">年月日</span>
                       </div>
                   </td>
               </tr>
               <tr>
                   <td width=40px rowspan="2">
                        <div align=center>批号</div>
                   </td>
                   <td rowspan="2" >
                       <div id="code"></div>
                       <canvas id="canvas"></canvas>
                   </td>
                   <td width=20px>
                       <div align=center>数量</div>
                   </td>
                   <td colspan="3">
                       <div>
                           <span style="float: right">万粒</span>
                       </div>
                   </td>
               </tr>
                <tr>
                   <td>
                       <div align=center>检验结果</div>
                   </td>
                    <td colspan="3">
                       <div></div>
                   </td>
               </tr>
               <tr>
                   <td>
                      <div align=center>车间主任</div>
                   </td>
                    <td width=70px>
                       <div></div>
                   </td>
                   <td>
                      <div align=center>检验工长</div>
                   </td>
                    <td  width=130px>
                       <div></div>
                   </td>
                   <td width=20px>
                      <div align=center>检验组</div>
                   </td>
                    <td  width=130px>
                       <div></div>
                   </td>
               </tr>
           </table>
    </div>
  </div>
  </div>
    </el-card>
</div>
</template>

<script>
import { getData } from '../../api/index'
import QRCode from 'qrcode'
export default {
  components: {
    QRCode
  },
  data () {
    return {
      form: {
        groupNumber: '',
        bomParent: '',
        time: ''
      },
      multipleSelection: [],
      tableData: [],
      queryPring: {
        cyId: '',
        batchNumber: '',
        bomParent: '',
        count: '',
        checkPeople: '',
        people: '',
        groupNumber: '',
        time: '',
        machineType: ''
      },
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1
    }
  },
  created () {},
  mounted () {
    this.useqrcode()
    this.getPrint()
  },
  watch: {},
  computed: {},
  methods: {
    // 合格证打印按钮
    async print () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({cyId: item.cyId})
        })
        const res = await getData('/TCjdgCertificationY/selectAll')
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
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/TCjdgCertificationY/selectTiaojian', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        // this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取表格的数据信息
    async getPrint () {
      const res = await getData('/TCjdgCertificationY/selectCertificationY', this.queryPring)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    agreeChange (val) {

    },
    useqrcode () {
      var canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, 'http://www.baidu.com', function (error) {
        if (error) console.error(error)
        console.log('success!')
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
    position: relative;
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
    width: 230px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
.son{
    font-size: 21px;
    margin-left: 120px;
}
// 二维码
canvas{
    width: 100px;
    height: 100px;
}

</style>
