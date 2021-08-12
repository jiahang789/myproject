<template>
<!-- 工具入库 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="工装编号" label-width="100px" prop="assetNumber">
               <el-input autocomplete="off" placeholder="全部" v-model="form.assetNumber" clearable></el-input>
            </el-form-item>
             <el-form-item label="工装名称" label-width="100px" prop="name">
               <el-input autocomplete="off" placeholder="全部" v-model="form.name" clearable></el-input>
            </el-form-item>
             <el-form-item label="设备编号" label-width="100px" prop="machine">
               <el-input autocomplete="off" placeholder="全部" v-model="form.machine" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 89%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
             <el-table-column type="selection" v-model="multipleSelection" width="40"></el-table-column>
               <el-table-column label="序号" width="100" prop="spId" align="center"> </el-table-column>
          <el-table-column sortable label="工装编号" width="185" prop="assetNumber" align="center"> </el-table-column>
           <el-table-column sortable label="工装名称" width="180" prop="name" align="center"></el-table-column>
          <el-table-column sortable label="设备" width="185" prop="machine" align="center"> </el-table-column>
          <el-table-column sortable  label="库存" width="180" prop="lowStock" align="center"> </el-table-column>
           <el-table-column sortable label="入库数量" width="228" prop="number" align="center">
               <template slot-scope="scope">
                   <el-input autocomplete="off" placeholder="全部" v-model="scope.row.number" @change="handleEdit(scope.$index, scope.row)" clearable></el-input>
               </template>
           </el-table-column>
  </el-table>
  <!-- <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryHouse.pageNum"
      :page-size="queryHouse.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
    <el-button type="success" size="mini" style="margin-left: 80%;margin-top:7px" @click="info">入 库</el-button>
    </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
import Toolhouse from '../Workshop/Warehouse'
export default {
  components: {
    Toolhouse
  },
  data () {
    return {
      tableData: [],
      form: {
        assetNumber: '',
        name: '',
        machine: ''
      },
      multipleSelection: [],
      queryToolhouse: {
        spId: '',
        assetNumber: '',
        pageNum: 1, // 当前页码
        pageSize: 10,
        machine: '',
        lowStock: '',
        number: ''
      },
      count: 0
    }
  },
  created () {
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 提交按钮
    async info () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push(
            {
              spId: item.spId,
              assetNumber: item.assetNumber,
              name: item.name,
              lowStock: item.lowStock,
              number: item.number
            })
        })
        const res = await postData('/ts/insert', multis)
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/sop/select', this.form)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    handleEdit (val) {
      console.log(val)
    },
    // // 获取表格信息
    // async gettoolhouse () {
    //   const res = await getData('/em/selectall', this.queryToolhouse)
    //   if (res.code === 200) {
    //     this.tableData = res.data
    //   }
    // },
    // 分页
    // handleSizeChange (val) {
    //   this.queryHouse.pageSize = val
    //   this.getInhouse()
    // },
    // handleCurrentChange (val) {
    //   this.queryHouse.pageNum = val
    //   this.getInhouse()
    // },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    margin-left: -20px;
    // margin-top: 80px;
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
