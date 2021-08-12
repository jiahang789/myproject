<template>
<!-- 设备计划查询-->
<div>
     <el-card class="box-card" shadow="always">
          <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="班组" prop="teDescribe">
              <el-select  v-model="form.teDescribe"  clearable placeholder="全部" @change="getitem">
                 <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号" prop="emNum">
               <el-select  v-model="form.emNum"  clearable placeholder="全部" @change="getitem1">
                 <el-option v-for="item in machineNum" :key="item.emId" :label="item.emNum" :value="item.emId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期" prop="date">
             <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column label="序号" width="50" prop="esId" align="center"> </el-table-column>
          <el-table-column sortable label="设备编号" width="100" prop="emNum" align="center"> </el-table-column>
          <el-table-column sortable label="夜班基础产量(万粒)" width="150" prop="esBanight" align="center"> </el-table-column>
          <el-table-column  sortable label="白班基础产量(万粒)" width="150" prop="esBaday" align="center"> </el-table-column>
          <el-table-column sortable label="二班基础产量(万粒)" width="150" prop="esBasencond" align="center"> </el-table-column>
           <el-table-column sortable label="今日夜班计划产量/实际产量(万粒)" width="240" prop="esPenightt" align="center"> </el-table-column>
          <el-table-column sortable label="今日白班计划产量/实际产量(万粒)" width="240" prop="esPeday" align="center"> </el-table-column>
            <el-table-column sortable label="今日二班计划产量/实际产量(万粒)" width="240" prop="esPesencond" align="center"> </el-table-column>
           <el-table-column sortable label="加工工序" width="120" prop="rId" align="center"></el-table-column>
             <el-table-column sortable label="今日夜班完成率" width="130" prop="esNightcomplete" align="center"> </el-table-column>
          <el-table-column sortable label="今日白班完成率" width="130" prop="esDaycomplete" align="center"> </el-table-column>
            <el-table-column sortable label="今日二班完成率" width="130" prop="esSencondcomplete" align="center"> </el-table-column>
           <el-table-column sortable label="今日完成率" width="110" prop="esTodaycomplete" align="center"></el-table-column>
  </el-table>
    </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  name: 'equncheck',
  data () {
    return {
      form: {
        teDescribe: '',
        emNum: '',
        date: ''
      },
      group: [],
      machineNum: [],
      tableData: [],
      queryCheck: {
        esId: '',
        emNum: '',
        esBanight: '',
        esBaday: '',
        esBasencond: '',
        esPenightt: '',
        esPeday: '',
        esPesencond: '',
        rId: '',
        esNightcomplete: '',
        esDaycomplete: '',
        esSencondcomplete: '',
        esTodaycomplete: ''
      },
      formLabelWidth: '140px'

    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getCheck()
  },
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getTitle () {
      const res = await getData('/es/selectp', this.form)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取增加框下拉框数据
    async getSelect () {
      const res = await getData('/ep/selectchilk ')
      if (res.code === 200) {
        this.group = res.data.Team
        this.machineNum = res.data.Equipment
      }
    },
    getitem (val) {
      this.group.find(item => item.teId === val)
    },
    getitem1 (val) {
      this.machineNum.find(item => item.emId === val)
    },
    // 获取班组表格信息
    async getCheck () {
      const res = await postData('/es/selectall', this.queryCheck)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    width: 1330px;
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
