<template>
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="设备名称" label-width="100px" prop="emName">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emName" clearable></el-input>
            </el-form-item>
             <el-form-item label="设备编号" label-width="100px" prop="emNum">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNum" clearable></el-input>
            </el-form-item>
             <el-form-item label="类型" label-width="100px" prop="emNum1">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emNum1" clearable></el-input>
            </el-form-item>
             <el-button type="success"  size="mini" style="margin-top: 7px">提交点检</el-button>
            <!-- <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button> -->
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
             <el-table-column type="selection" width="40"></el-table-column>
               <el-table-column label="序号" width="50" prop="emId" align="center"> </el-table-column>
          <el-table-column sortable label="项目" width="90" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="项目内容" width="100" prop="emNum" align="center"></el-table-column>
          <el-table-column sortable label="部位" width="100" prop="teDescribe" align="center">
               <div class="demo-image__preview">
                <el-image
                    style="width: 40px; height: 40px"
                    :src="url"
                    :preview-src-list="srcList">
                </el-image>
                </div>
         </el-table-column>
          <el-table-column sortable  label="点检时期" width="100" prop="emType" align="center"> </el-table-column>
           <el-table-column sortable label="规格型号" width="100" prop="emModei" align="center"></el-table-column>
          <el-table-column sortable label="方法" width="90" prop="emYears" align="center"> </el-table-column>
          <el-table-column sortable label="手段" width="90" prop="userName" align="center"> </el-table-column>
          <el-table-column sortable label="频次/周期" width="100" prop="emState" align="center"></el-table-column>
           <el-table-column sortable label="标准" width="90" prop="dailyOutput" align="center"></el-table-column>
           <el-table-column sortable label="是否合格" width="180" prop="outputNight" align="center">
                <template slot-scope="">
                    <el-radio-group>
                        <el-radio label="合格"></el-radio>
                        <el-radio label="不合格"></el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
           <el-table-column sortable label="不合格内容描述" width="130" prop="outputDay" align="center"></el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
     <!-- <el-button type="success" icon="el-icon-edit" size="mini" style="margin-left: 80%" @click="editButton(scope.row)">提交点检</el-button> -->
    </el-card>
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {},
  name: 'machinecheck',
  data () {
    return {
      tableData: [],
      queryEqun: {
        emId: '',
        emPhoto: '',
        emName: '',
        emNum: '',
        teDescribe: '',
        emType: '',
        emModei: '',
        emYears: '',
        userName: '',
        emState: '',
        emFactor: '',
        emQrcode: '',
        dailyOutput: '',
        emRemarks: '',
        outputNight: '',
        outputDay: '',
        outputSecond: '',
        emCrossprocess: ''
        // emProcessnumber: ''
      },
      form: {
        emName: '',
        emNum: ''
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      formLabelWidth: '170px',
      pageNum: 1, // 当前页码
      pageSize: 10 // 每页条数
    }
  },
  created () {
    this.getMachine()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getTitle () {
      const res = await getData('/em/select', this.form)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取表格信息
    async getMachine () {
      const res = await getData('/em/selectall', this.queryEqun)
      if (res.code === 200) {
        this.tableData = res.data
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
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
    width: 209px;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
}
/deep/.el-select .el-input__inner {
  width: 207px;

}

</style>
