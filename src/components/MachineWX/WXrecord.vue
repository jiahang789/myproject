<template>
<!-- 维修记录 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="90px">
              <el-form-item label="报修设备" label-width="100px" prop="emName">
               <el-select  v-model="form.emName"  clearable placeholder="请选择报修设备" @change="getitem">
                    <el-option v-for="item in machine" :key="item.emId" :label="item.emName" :value="item.emId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="date" style="margin-top:7px">
                 <el-date-picker v-model="form.date"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间" value-format="yyyy-MM-dd" clearable @change="dateChange">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="维修人员" label-width="100px" prop="fixPeople">
               <el-select  v-model="form.fixPeople"  clearable placeholder="请选择维修人员" @change="getitem1">
                    <el-option v-for="item in perop" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="报修人员" label-width="100px" prop="reparePeople">
               <el-select  v-model="form.reparePeople"  clearable placeholder="请选择报修人员" @change="getitem2">
                    <el-option v-for="item in cheren" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
             <el-table-column label="序号" width="50" prop="mfId" align="center"> </el-table-column>
          <el-table-column sortable label="报修设备" width="100" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="报修问题" width="120" prop="describe" align="center"></el-table-column>
          <el-table-column sortable label="报修发起人" width="110" prop="reparePeople" align="center"> </el-table-column>
           <el-table-column sortable  label="报修时间" width="100" prop="repareTime" align="center"> </el-table-column>
            <el-table-column sortable  label="状态" width="100" prop="status" align="center"> </el-table-column>
            <!-- <el-table-column sortable  label="指派维修人员" width="120" prop="fixPeople" align="center"> </el-table-column> -->
            <el-table-column sortable  label="分配时间" width="110" prop="splitTime" align="center"> </el-table-column>
            <el-table-column sortable  label="维修人员" width="100" prop="fixPeople" align="center"> </el-table-column>
            <el-table-column sortable  label="维修完毕时间" width="120" prop="fixEnd" align="center"> </el-table-column>
            <el-table-column sortable  label="维修内容" width="105" prop="fixDescribe" align="center"> </el-table-column>
            <el-table-column sortable  label="任务是否关闭" width="120" prop="taskClosed" align="center"> </el-table-column>
            <el-table-column sortable  label="备注" width="100" prop="tips" align="center"> </el-table-column>
  </el-table>
    </el-card>
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      form: {
        emName: '',
        fixPeople: '',
        reparePeople: ''
      },
      perop: [],
      machine: [],
      cheren: [],
      tableData: [],
      queryWX: {
        mfId: '',
        emName: '',
        describe: '',
        reparePeople: '',
        repareTime: '',
        status: '',
        splitTime: '',
        fixPeople: '',
        fixEnd: '',
        fixDescribe: '',
        taskClosed: '',
        tips: ''
      }
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getWX()
  },
  watch: {},
  computed: {},
  methods: {
    // 获取框下拉框数据
    async getSelect () {
      const res = await getData('/fixRecord/selectMsg')
      if (res.code === 200) {
        this.machine = res.data.machine
        this.perop = res.data.fixPeople
        this.cheren = res.data.rePortPeople
      }
    },
    getitem (val) {
      this.machine.find(item => item.emId === val)
    },
    getitem1 (val) {
      this.perop.find(item => item.userId === val)
    },
    getitem2 (val) {
      this.cheren.find(item => item.userId === val)
    },
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/fixRecord/likeSelect', this.form)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取表格信息
    async getWX () {
      const res = await getData('/fixRecord/selectAll', this.queryWX)
      if (res.code === 200) {
        this.tableData = res.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tables{
    border: 1px solid #DCDFE6;
    border-collapse: collapse;
}
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
    width: 230px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
