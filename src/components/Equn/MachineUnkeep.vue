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
            <el-form-item label="保养周期" label-width="100px" prop="emNum11">
              <el-select><option></option></el-select>
            </el-form-item>
             <el-button type="success"  size="mini" style="margin-top: 7px">提交保养</el-button>
            <!-- <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button> -->
          </el-form>
        <el-table :data="tableData" style="width: 99%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
             <el-table-column type="selection" width="40"></el-table-column>
               <el-table-column label="序号" width="50" prop="emId" align="center"> </el-table-column>
          <el-table-column sortable label="项目" width="180" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="项目内容" width="150" prop="emNum" align="center"></el-table-column>
          <el-table-column sortable label="部位" width="120" prop="teDescribe" align="center">
               <div class="demo-image__preview">
                <el-image
                    style="width: 40px; height: 40px"
                    :src="url"
                    :preview-src-list="srcList">
                </el-image>
                </div>
         </el-table-column>
          <el-table-column sortable label="方法" width="150" prop="emYears" align="center"> </el-table-column>
          <el-table-column sortable label="手段" width="120" prop="userName" align="center"> </el-table-column>
           <el-table-column sortable label="是否保养" width="200" prop="outputNight" align="center">
                <template slot-scope="">
                    <el-radio-group>
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
           <el-table-column sortable label="注意事项" width="180" prop="outputDay" align="center"></el-table-column>
           <!-- <el-button type="primary" icon="el-icon-edit" size="mini" style="margin-left: 80%" @click="editButton(scope.row)">提交点检</el-button> -->
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
    </el-card>
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {},
  name: 'machineunkeep',
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
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
      formLabelWidth: '170px',
      pageNum: 1, // 当前页码
      pageSize: 10 // 每页条数
    }
  },
  created () {
    this.getMachine()
    this.getSelect()
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
    width: 170px;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
}
/deep/.el-select .el-input__inner {
  width: 170px;

}

</style>
