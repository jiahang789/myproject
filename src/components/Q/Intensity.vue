<template>
<!-- 组--密集度 -->
<div>
      <el-card class="box-card" shadow="always">
            <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" >
             <el-form-item label="组号" prop="groupNumber">
                <el-input autocomplete="off" v-model="form.groupNumber"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top:6px" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  border>
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
           <el-table-column sortable label="组号" width="120" prop="groupNumber" align="center"> </el-table-column>
            <el-table-column sortable label="枪号" width="200" prop="dtGunnumber" align="center">
                 <template  slot-scope="scope">
                     <el-input placeholder="请输入枪号" v-model="scope.row.dtGunnumber" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template>
            </el-table-column>
           <el-table-column sortable label="数量" width="200" prop="dtNumber" align="center">
                <template  slot-scope="scope">
                     <el-input placeholder="请输入数量" v-model="scope.row.dtNumber" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template>
           </el-table-column>
          <el-table-column sortable label="R50(MR·H+2)Cm" width="240" align="center">
                <el-table-column label="平均" width="200" prop="dtAverage" align="center">
                     <template  slot-scope="scope">
                     <el-input placeholder="请输入平均数" v-model="scope.row.dtAverage" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template>
                      </el-table-column>
                <el-table-column label="一靶" width="200" prop="dtFiftytarget" align="center">
                     <template  slot-scope="scope">
                     <el-input placeholder="请输入一靶数" v-model="scope.row.dtFiftytarget" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template> </el-table-column>
                <el-table-column label="二靶" width="200" prop="dtFiftysencondtarget" align="center">
                     <template  slot-scope="scope">
                     <el-input placeholder="请输入二靶数" v-model="scope.row.dtFiftysencondtarget" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template> </el-table-column>
                <el-table-column label="三靶" width="200" prop="dtFiftythirdtarget" align="center">
                     <template  slot-scope="scope">
                     <el-input placeholder="请输入三靶数" v-model="scope.row.dtFiftythirdtarget" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template>
                </el-table-column>
          </el-table-column>
          <el-table-column sortable label="R100(Cm)" width="180" align="center">
                <el-table-column  label="一靶" width="200" prop="dtHundredtarget" align="center">
                    <template  slot-scope="scope">
                     <el-input placeholder="请输入一靶数" v-model="scope.row.dtHundredtarget" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template> </el-table-column>
                <el-table-column label="二靶" width="200" prop="dtHundredsencondtarget" align="center">
                    <template  slot-scope="scope">
                     <el-input placeholder="请输入二靶数" v-model="scope.row.dtHundredsencondtarget" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template> </el-table-column>
                <el-table-column label="三靶" width="200" prop="dtHundredthirdtarget" align="center">
                    <template  slot-scope="scope">
                     <el-input placeholder="请输入三靶数" v-model="scope.row.dtHundredthirdtarget" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template>
                </el-table-column>
          </el-table-column>
           <el-table-column sortable label="试验样本名称" width="200" prop="dtSample" align="center">
               <template  slot-scope="scope">
                     <el-input placeholder="请输入试验样本名称" v-model="scope.row.dtSample" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template> </el-table-column>
          <el-table-column sortable label="备注" width="200" prop="dtRemarks" align="center">
              <template  slot-scope="scope">
                     <el-input placeholder="请输入备注" v-model="scope.row.dtRemarks" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template>
          </el-table-column>
           <el-table-column sortable label="最后编辑时间" width="200" prop="time" align="center">
               <template  slot-scope="scope">
                     <el-input placeholder="请输入最后编辑时间" v-model="scope.row.time" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template> </el-table-column>
          <el-table-column sortable label="最后编辑人" width="200" prop="person" align="center">
              <template  slot-scope="scope">
                     <el-input placeholder="请输入最后编辑人" v-model="scope.row.person" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template>
          </el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination> -->
    <div style="margin-left: 80%">
       <el-button type="primary" size="mini"  @click="edit()">编辑</el-button>
       <el-button type="success" size="mini" @click="infoData()">提交</el-button>
    </div>
    </el-card>
      <el-dialog title="请修改组--密集度信息" :visible.sync="Dialog" width="26%">
   <el-form :model="editFrom" ref="editRef" :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
     <el-form-item label="组号" prop="groupNumber" >
       <el-input autocomplete="off" v-model="editFrom.groupNumber"></el-input>
    </el-form-item>
       <!-- <el-form-item label="最后编辑时间">
       <el-input autocomplete="off"></el-input>
    </el-form-item>
       <el-form-item label="最后编辑人">
       <el-input autocomplete="off"></el-input>
    </el-form-item> -->
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Dialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfo()">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      Dialog: false,
      tableData: [],
      form: {
        groupNumber: ''
      },
      editFrom: {
        groupNumber: ''
      },
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1,
      formLabelWidth: '100px'
    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 打开修改按钮
    edit () {
      this.Dialog = true
    },
    // 修改提交按钮
    editInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/dt/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.Dialog = false
            this.$message.success('提交成功')
            this.tableData = res.data
            this.$refs.editRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    },
    handleEdit (val) {
      console.log(val)
    },
    // 点击提交
    async infoData () {
      var multis = []
      this.tableData.forEach(function (item, index) {
        multis.push({
          groupNumber: item.groupNumber,
          dtGunnumber: item.dtGunnumber,
          dtNumber: item.dtNumber,
          dtAverage: item.dtAverage,
          dtFiftytarget: item.dtFiftytarget,
          dtFiftysencondtarget: item.dtFiftysencondtarget,
          dtFiftythirdtarget: item.dtFiftythirdtarget,
          dtHundredtarget: item.dtHundredtarget,
          dtHundredsencondtarget: item.dtHundredsencondtarget,
          dtHundredthirdtarget: item.dtHundredthirdtarget,
          dtSample: item.dtSample,
          dtRemarks: item.dtRemarks,
          time: item.time,
          person: item.person
        })
      })
      const res = await postData('/dt/insert', multis)
      if (res.code === 200) {
        this.$message.success('提交成功！')
      } else {
        this.$message.error('提交失败！')
      }
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/dt/select', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        // this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
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
/deep/.el-table td, .el-table th {
    padding: 3px 0;
}
/deep/.el-table th {
    padding: 5px 0;
    background-color: #EBEEF5;
}
/deep/ .el-input__inner {
    height: 30px;
    width: 170px;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
    }
     /deep/.el-select .el-input__inner {
  width: 207px;

}

</style>
