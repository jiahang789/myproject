<template>
<!-- 检验 -->
<div>
      <el-card class="box-card" shadow="always">
            <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" >
             <el-form-item label="组号" prop="groupId">
                <el-input autocomplete="off" placeholder="全部" v-model="form.groupId" clearable></el-input>
            </el-form-item>
             <el-form-item label="提检时间" prop="checkTime">
                 <el-date-picker v-model="form.checkTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 6px" @click="getGo">搜索</el-button>
        </el-form>
          <el-form :model="chackFrom" :inline="true" class="demo-form-inline"  label-width="100px">
             <el-form-item label="提检时间" prop="checkTime">
               <el-input autocomplete="off" v-model="chackFrom.checkTime"></el-input>
            </el-form-item>
             <el-form-item label="组号" prop="groupNumber">
                <el-input autocomplete="off" v-model="chackFrom.groupNumber"></el-input>
            </el-form-item>
             <!-- <el-form-item label="设备" prop="">
                <el-input autocomplete="off" v-model="chackFrom"></el-input>
            </el-form-item> -->
              <el-form-item label="提检人" prop="checkPeople">
                <el-input autocomplete="off" v-model="chackFrom.checkPeople"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="tableData"  style="width: 100%"  tooltip-effect="dark"
         @selection-change="handleSelectionChange" border :span-method="objectSpanMethod">
          <el-table-column type="selection" width="40" v-model="multipleSelection"></el-table-column>
          <el-table-column label="序号" width="50" prop="cId" align="center"> </el-table-column>
           <el-table-column sortable label="批次号" width="120" prop="batchNumber" align="center"> </el-table-column>
            <el-table-column sortable label="批次数量" width="100" prop="count" align="center"> </el-table-column>
           <el-table-column  sortable  label="状态" width="90" prop="state" align="center"></el-table-column>
          <el-table-column  label="射击" width="200" prop="shootResult" align="center" >
                <el-table-column  width="200" align="center" prop="shoot">
                    <template slot="header" slot-scope="scope">
                        <el-input  size="mini"  placeholder="120粒/组" v-model="item.shoot" @change="handleEdit(scope.$index, scope.row)" ></el-input>
                    </template>
                     <template slot-scope="scope">
                      <el-radio-group v-model="scope.row.shootResult">
                        <el-radio  label="合格"></el-radio>
                        <el-radio label="不合格"></el-radio>
                      </el-radio-group>
                    </template>
                </el-table-column>
        </el-table-column>
          <el-table-column  label="尺寸" width="200" prop="sizeResult" align="center">
                    <el-table-column  width="200" align="center" prop="size">
                        <template slot="header" slot-scope="scope">
                           <el-input  size="mini"  placeholder="300粒/组" v-model="item.size" @change="handleEdit(scope.$index, scope.row)"></el-input>
                        </template>
                         <template  slot-scope="scope">
                          <el-radio-group v-model="scope.row.sizeResult">
                                <el-radio  label="合格"></el-radio>
                                <el-radio label="不合格"></el-radio>
                          </el-radio-group>
                         </template>
                    </el-table-column>
            </el-table-column>
           <el-table-column  label="外观" width="200" prop="appearResult" align="center">
               <el-table-column  width="200" align="center" prop="appear">
                    <template slot="header" slot-scope="scope">
                        <el-input  size="mini"  placeholder="2800粒/组" v-model="item.appear"  @change="handleEdit(scope.$index, scope.row)"></el-input>
                    </template>
                      <template  slot-scope="scope">
                     <el-radio-group v-model="scope.row.appearResult">
                        <el-radio  label="合格"></el-radio>
                        <el-radio label="不合格"></el-radio>
                      </el-radio-group>
                      </template>
                </el-table-column>
         </el-table-column>
           <el-table-column sortable label="合格证发放日期" width="200" prop="date" align="center">
               <template slot-scope="scope">
                    <el-input  size="mini"  placeholder="合格证发放日期" v-model="scope.row.date"  @change="handleEdit(scope.$index, scope.row)"/>
                </template>
           </el-table-column>
          <el-table-column  label="备注" width="200" prop="remarks" align="center">
               <template slot-scope="scope">
                   <el-input  size="mini"  placeholder="备注" v-model="scope.row.remarks"  @change="handleEdit(scope.$index, scope.row)"/>
              </template>
          </el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination> -->
     <el-button type="success" size="mini" style="float:right" @click="infoData()">提交</el-button>
    </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      show: false,
      form: {
        groupId: '',
        checkTime: ''
      },
      chackFrom: {
        checkTime: '',
        groupNumber: '',
        checkPeople: ''
      },
      multipleSelection: [],
      tableData: [],
      //   queryData: {
      //     shootResult: '',
      //     shoot: '',
      //     sizeResult: '',
      //     size: '',
      //     appearResult: '',
      //     appear: '',
      //     remarks: '',
      //     date: ''
      //   },
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1,
      item: {
        shoot: '',
        size: '',
        appear: ''
      }

    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    handleEdit (val) {
      console.log(val)
    },
    // 点击提交
    async infoData () {
      var head = this.item
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({
            cId: item.cId,
            shootResult: item.shootResult,
            sizeResult: item.sizeResult,
            appearResult: item.appearResult,
            date: item.date,
            remarks: item.remarks,
            shoot: head.shoot,
            size: head.size,
            appear: head.appear
          })
        })
        const res = await postData('/qt/insert', multis)
        if (res.code === 200) {
          this.$message.success('提交成功！')
        } else {
          this.$message.error('提交失败！')
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 合并列
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) { // 把行合并为列数
      if (columnIndex === 5) { // 第一列
        if (rowIndex % 15 === 0) { // 行数为0,2,4
          return {
            rowspan: 15, // 把2行合并为一列
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/qt/select', this.form)
      if (res.code === 200) {
        this.$message.success('获取数据成功！')
        this.chackFrom = res.data[0]
        this.tableData = res.data
        // this.count = res.count
      } else {
        this.$message.error('获取数据失败！')
      }
    },
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    agreeChange (val) {

    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    margin-left: -20px;
    // position: relative;
    // top: 50px;
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
/deep/ .el-input__inner {
    height: 30px;
    width: 180px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

     }
</style>
