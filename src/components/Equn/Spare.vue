<template>
<!-- 备品备件 -->
<div>
    <el-card class="box-card">
        <el-table :data="workshopData" style="width: 100%;" border>
            <el-table-column label="序号" width="50" prop="wsId" align="center"></el-table-column>
          <el-table-column sortable label="编码" width="120" prop="cpName" align="center"></el-table-column>
          <el-table-column sortable label="名称" width="130" prop="wsName" align="center"> </el-table-column>
          <el-table-column sortable label="供应商" width="130" prop="cpName" align="center"></el-table-column>
          <el-table-column sortable label="最小批量" width="116" prop="wsName" align="center"> </el-table-column>
          <el-table-column sortable label="单位" width="110" prop="cpName" align="center"></el-table-column>
          <el-table-column sortable label="当前库存" width="100" prop="wsName" align="center"> </el-table-column>
          <el-table-column sortable label="预警库存" width="100" prop="cpName" align="center"></el-table-column>
          <el-table-column sortable label="备注" width="120" prop="wsName" align="center"> </el-table-column>
  </el-table>
    </el-card>
</div>
</template>
<script>
import { getData } from '../../api/index'
export default {
  created () {
    this.getWorkshop()
  },
  components: {},
  name: 'spare',
  data () {
    return {
      workshopData: [], // 保存车间表格数据信息
      queryworkshop: { // 给后端传的参数
        wsId: '',
        cpName: '',
        wsName: ''
      },
      editDialog: false,
      addDialog: false,
      formLabelWidth: '90px',
      workFrom: {
        wsName: ''
      },
      editFrom: {
        wsName: ''
      },
      addRules: {
        wsName: [
          { required: true, message: '请输入车间名称，其不能重复', trigger: 'blur' }
        ]
      },
      editRules: {
        wsName: [
          { required: true, message: '请输入车间名称，其不能重复', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  computed: {},
  methods: {
    // 获取车间表格的数据信息
    async getWorkshop () {
      const res = await getData('/ws/selectall', this.queryworkshop)
      console.log(res)
      if (res.code === 200) {
        this.workshopData = res.data
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: auto;
    height: auto;
    background-color: #FFFFFF;
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
    width: 80%;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
}
</style>
