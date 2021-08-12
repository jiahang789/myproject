<template>
<!-- 自定义界面 -->
<div>
      <div><el-page-header @back="goBack">
         </el-page-header></div>
      <el-card class="box-card" shadow="always">
          <div>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAll">批量删除</el-button>
                 <el-button type="primary"  size="mini" @click="add()">增加</el-button>
        </div>
            <el-table :data="tableData" style="width: 99%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
                 <el-table-column type="selection" width="40" v-model="multipleSelection"></el-table-column>
                    <el-table-column label="序号" width="55" prop="rId" align="center"> </el-table-column>
                    <el-table-column sortable label="产品代号" width="120" prop="productCode" align="center"></el-table-column>
                        <el-table-column sortable label="零部件代号" width="130" prop="compontCode" align="center"> </el-table-column>
                        <el-table-column sortable label="零部件名称" width="130" prop="compontName" align="center"> </el-table-column>
                    <el-table-column sortable label="顺序号" width="110" prop="processId" align="center"></el-table-column>
                    <el-table-column sortable label="工序名称" width="145" prop="processName" align="center"> </el-table-column>
                    <el-table-column sortable label="工序代号" width="130" prop="processCode" align="center"> </el-table-column>
                    <el-table-column sortable label="加工位置" width="135" prop="workStation" align="center"></el-table-column>
                    <el-table-column sortable label="班组" width="150" prop="teId" align="center"></el-table-column>
            </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination> -->
      <el-dialog title="请增加自定义信息" :visible.sync="Dialog" width="75%">
             <el-form :model="addFrom" ref="addRef" :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
                  <el-form-item label="id" prop="rId"  v-show="false">
                   <el-input autocomplete="off" v-model="addFrom.rId"></el-input>
                </el-form-item>
                 <el-form-item label="批次号" prop="batchNumber"  v-show="false">
                   <el-input autocomplete="off" v-model="addFrom.batchNumber"></el-input>
                </el-form-item>
                  <el-form-item label="产品代号" prop="productCode">
                   <el-input autocomplete="off" v-model="addFrom.productCode"></el-input>
                </el-form-item>
                  <el-form-item label="零部件代号" prop="compontCode">
                    <el-input autocomplete="off" v-model="addFrom.compontCode"></el-input>
                </el-form-item>
               <el-form-item label="零部件名称" prop="compontName">
                <el-input autocomplete="off" v-model="addFrom.compontName"></el-input>
                </el-form-item>
                  <el-form-item label="工序名称" prop="processName">
                 <el-select v-model="addFrom.processName"  clearable placeholder="请选择班组" @change="getitem">
                    <el-option v-for="item in processName" :key="item.rId" :label="item.processName" :value="item.rId"></el-option>
                </el-select>
                </el-form-item>
                  <el-form-item label="工序代号" prop="processCode">
                <el-input autocomplete="off" v-model="addFrom.processCode"></el-input>
                </el-form-item>
                <el-form-item label="顺序号" prop="processId">
                   <el-input autocomplete="off" v-model="addFrom.processId"></el-input>
                </el-form-item>
                   <el-form-item label="加工位置" prop="workStation">
                <el-input autocomplete="off" v-model="addFrom.workStation"></el-input>
                </el-form-item>
                  <el-form-item label="班组" prop="teId">
                 <el-select v-model="addFrom.teId"  clearable placeholder="请选择班组" @change="getitem1">
                    <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
                </el-select>
                </el-form-item>
             </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Dialog = false">取 消</el-button>
                <el-button type="primary" @click="addInfo()">确 定</el-button>
            </div>
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
      Dialog: false,
      tableData: [],
      //   querySustom: {
      //     rId: '',
      //     productCode: '',
      //     compontCode: '',
      //     compontName: '',
      //     processId: '',
      //     processName: '',
      //     processCode: '',
      //     workStation: '',
      //     teId: ''
      //   },
      processName: [],
      group: [],
      formLabelWidth: '120px',
      multipleSelection: [],
      addFrom: {
        rId: '',
        productCode: '',
        compontCode: '',
        compontName: '',
        processName: '',
        processCode: '',
        processId: '',
        workStation: '',
        batchNumber: '',
        teId: ''
      },
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getData()
  },
  watch: {},
  computed: {},
  methods: {
    goBack () {
      this.$router.push('/fxdefinition')
    },
    // 获取路由传参的值
    async getData () {
      this.tableData = this.$route.query.data
      this.addFrom.batchNumber = this.$route.query.batchNumber
      this.batchNumber = this.addFrom.batchNumber
    },
    // 点击增加按钮
    async add () {
      if (this.multipleSelection.length === 1) {
        this.Dialog = true
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({rId: item.rId})
        })
        const res = await postData('/rp/insert', multis)
        if (res.code === 200) {
          this.addFrom = res.data
        } else {
          this.$message.error(res.msg)
        }
      } else if (this.multipleSelection.length < 1) {
        this.$message({
          message: '只能勾选一项进行操作',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 增加提交按钮
    addInfo () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/rp/insertchilk?batchNumber=' + this.batchNumber, qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.Dialog = false
            this.$message.success(res.msg)
            this.$refs.addRef.resetFields()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 批量删除按钮
    async deleteAll () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({rId: item.rId, compontCode: item.compontCode})
        })
        const res = await postData('/rp/delete', multis)
        console.log(res)
        if (res.code === 200) {
        //   console.log(this.tableData)
          this.$message.success('批量删除成功！')
          this.tableData = res.data
        } else {
          this.$message.error('批量删除失败！')
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await getData('/rp/insertlist ')
      if (res.code === 200) {
        this.processName = res.data.routing
        this.group = res.data.team
      }
    },
    getitem (val) {
      this.processName.find((item) => {
        if (item.rId === this.addFrom.processName) {
          item.rId = item.processCode
          this.addFrom.processCode = item.rId
        }
      })
    },
    getitem1 (val) {
    //   this.title = this.sonn.find(item => item.bomNameId === bomNameId)
      // val即是传进来的id值，也即value值
      this.group.find(item => item.teId === val)
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

</style>
