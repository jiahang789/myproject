<template>
<!-- 入库 -->
<div>
      <el-card class="box-card" shadow="always">
         <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="零部件代号" prop="productCode">
                 <el-input autocomplete="off" placeholder="全部" v-model="form.productCode" clearable></el-input>
            </el-form-item>
             <el-form-item label="批次号" prop="batchNum">
                <el-input autocomplete="off" placeholder="全部" v-model="form.batchNum" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" ref="table" style="width: 80%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"  v-model="multipleSelection"></el-table-column>
          <el-table-column label="序号" width="60" prop="siId" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="120" prop="batchNum" align="center"> </el-table-column>
             <el-table-column sortable label="零部件名称" width="140" prop="componentName" align="center"> </el-table-column>
           <el-table-column sortable label="零部件代号" width="140" prop="componentCode" align="center"></el-table-column>
          <el-table-column sortable label="批次数量" width="100" prop="batchCount" align="center"></el-table-column>
          <el-table-column sortable label="入库数量" width="240" prop="countIn" align="center">
               <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.countIn" placeholder="100" @change="handleEdit(scope.$index, scope.row)"></el-input>
                </template> </el-table-column>
           <el-table-column sortable label="设备" width="126" prop="emNumber" align="center"></el-table-column>
  </el-table>
  <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryHouse.pageNum"
      :page-size="queryHouse.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
     <el-button type="success"  size="mini" style="margin-left: 75%" @click="Inhouse()">入库</el-button>
    </el-card>
        <!-- 点击打开入库对话框 -->
    <!-- <el-dialog title="请入库" :visible.sync="editDialog" width="60%">
           <el-form  :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="产品代号" label-width="100px">
              <el-select  clearable placeholder="请选择">
                <el-option>
                </el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="设备类型" label-width="100px">
              <el-select clearable placeholder="请选择">
                <el-option>
                </el-option>
            </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px">搜索</el-button>
        </el-form>
  <el-table :data="tableData1" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="80" prop="num" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="150" prop="batchNumer" align="center"> </el-table-column>
          <el-table-column sortable label="产品" width="110" prop="product" align="center"> </el-table-column>
           <el-table-column sortable label="产品代号" width="120" prop="productNum" align="center"></el-table-column>
          <el-table-column sortable label="数量" width="100" prop="quant" align="center"></el-table-column>
          <el-table-column sortable label="入库时间" width="180" prop="time" align="center"> </el-table-column>
           <el-table-column sortable label="设备" width="100" prop="machine" align="center"></el-table-column>
  </el-table>
   <span slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click=tocheck()>提 检</el-button>
  </span>
</el-dialog> -->
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  name: 'inhouse',
  data () {
    return {
      form: {
        productCode: '',
        batchNum: ''
      },
      editDialog: false,
      tableData: [],
      queryHouse: {
        siId: '',
        batchNum: '',
        componentName: '',
        componentCode: '',
        batchCount: '',
        countIn: '',
        emNumber: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      multipleSelection: [],
      tableData1: [{
        num: 1,
        batchNumer: '136T00100001',
        product: '钢芯',
        productNum: '136TGX',
        quant: '111',
        time: '212102120',
        machine: '立式'
      }],
      count: 0
    }
  },
  created () {},
  mounted () {
    this.getInhouse()
  },
  watch: {},
  computed: {},
  methods: {
    // 入库按钮
    async Inhouse () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push({siId: item.siId, countIn: item.countIn})
        })
        const res = await postData('/storageIn/putIn', multis)
        if (res.code === 200) {
          this.$message.success('入库成功！')
        } else {
          this.$message.error('入库失败！')
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 未入库前搜索按钮
    async getGo () {
      const res = await getData('/storageIn/doSelect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取表格的数据信息
    async getInhouse () {
      const res = await getData('/storageIn/selectAll', this.queryHouse)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      }
    },
    // 分页
    handleSizeChange (val) {
      this.queryHouse.pageSize = val
      this.getInhouse()
    },
    handleCurrentChange (val) {
      this.queryHouse.pageNum = val
      this.getInhouse()
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    tocheck () {
      this.$router.push('/tocheck')
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
.btn{
    margin-left: 68%;
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
// // 标签
.person{
    border: black 1px solid;
    width: 350px;
    height: 300px;
}
</style>
