<template>
<!-- 不合格单据打印 -->
<div>
      <el-card class="box-card" shadow="always">
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="num" align="center"> </el-table-column>
            <el-table-column label="产品" width="60" prop="product" align="center"> </el-table-column>
           <el-table-column label="批次号" width="110" prop="batchNum" align="center"> </el-table-column>
           <el-table-column label="产品代号" width="70" prop="productNum" align="center"></el-table-column>
          <el-table-column label="工序号" width="60" prop="proscessNum" align="center"></el-table-column>
          <el-table-column label="工序名称" width="100" prop="processName" align="center"> </el-table-column>
           <el-table-column label="工序代号" width="70" prop="processNumer" align="center"> </el-table-column>
           <el-table-column label="操作人员" width="70" prop="czname" align="center"></el-table-column>
          <el-table-column label="不合格类别" width="125" prop="unstyle" align="center"></el-table-column>
           <el-table-column label="不合格现象" width="120" prop="unxx"  align="center"> </el-table-column>
             <el-table-column label="不合格处理结果" width="280" prop="result" align="center">
                  <el-radio v-model="radio" label="1">合格</el-radio>
                  <el-radio v-model="radio" label="2">返工返修</el-radio>
                  <el-radio v-model="radio" label="3">报废</el-radio>
             </el-table-column>
  </el-table>
   <div class="btn">
      <el-button type="primary"  size="mini" style="float: right">提交</el-button>
      </div>
   <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    </el-card>
</div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      radio: '1',
      tableData: [{
        num: 1,
        batchNum: '136T00100001',
        product: '钢芯',
        productNum: '136TGX',
        proscessNum: '10',
        processName: '下料冲型',
        processNumer: 'TX',
        czname: '假按',
        unstyle: '20210302',
        unxx: '',
        result: ''
      }],
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    agreeChange (val) {

    },
    goCJ () {
      this.$router.push('/cj')
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    margin-left: -20px;
    // position: relative;
    // top: 50px;
    width: 100%;
    height: auto;

}
.btn{
    margin-left: 68%;
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
    width: 209px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
// 二维码
canvas{
    width: 100px;
    height: 100px;
}
</style>
