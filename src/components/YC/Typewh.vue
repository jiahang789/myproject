<template>
<!-- 异常类型维护 -->
<div>
     <el-card class="box-card" shadow="always">
       <el-scrollbar style="height: 550px;" :native="true" wrapStyle="" wrapClass="" viewClass="" viewStyle="" :noresize="false" tag="section">
        <el-form :model="form" ref="addRef" :inline="true" label-width="120px" >
             <el-form-item label="异常类别"  prop="debugType">
               <el-input autocomplete="off" placeholder="" v-model="form.debugType" clearable></el-input>
            </el-form-item>
            <el-form-item label="责任部门"  prop="dmId">
              <!--<el-select  v-model="form.dmId"   clearable placeholder="请选择责任部门" @change="getitem">-->
                <el-select  v-model="form.tips"   clearable placeholder="请选择责任部门">
                 <el-option v-for="item in depart" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
             <!--<el-form-item label="描述"  prop="tips">
               <el-input autocomplete="off" placeholder="" v-model="form.tips" clearable></el-input>
            </el-form-item>-->
            <el-button type="success" size="mini" style=" margin-top:7px"  @click="Info">添加</el-button>
          </el-form>
    <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column label="序号" width="50" type="index" align="center"> </el-table-column>
          <el-table-column sortable label="异常类型" width="130" prop="exceptionType" align="center"> </el-table-column>
          <el-table-column sortable label="处理部门" width="130" prop="processingDepartment" align="center"></el-table-column>
          <el-table-column sortable label="创建时间" width="170" prop="creationTime" align="center"> </el-table-column>
          <el-table-column sortable  label="创建人" width="110" prop="creationBy" align="center"> </el-table-column>
          <el-table-column  label="操作" width="120">
          <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.pageNum"
      :page-size="form.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-scrollbar>
    </el-card>
</div>
</template>

<script>
import { postData } from '../../api/index'
import Abnormal from '../Workshop/Abnormal'
export default {
  components: {
    Abnormal
  },
  data () {
    return {
      tableData: [],
      depart: [{
        value: '库房',
        label: '库房'
      }, {
        value: '车间',
        label: '车间'
      }],
      form: {
        debugType: '',
        dmId: '',
        tips: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数:
      },
      count: 0,
      value: ''
    }
  },
  created () {
    this.getRecode()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 提交
    Info () {
      var name = window.sessionStorage.getItem('token')
      this.form.dmId = name
      if (this.form.dmId.length === 0) {
        return
      }
      if (this.form.debugType.length === 0) {
        return
      }
      if (this.form.tips.length === 0) {
        return
      }
      // var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          await postData('/exception/settingadd', this.form)
          this.getRecode()
          this.form.debugType = ''
          this.form.tips = ''
        }
      })
    },
    // 获取表格信息
    async getRecode () {
      const res = await postData('/exception/setting', this.form)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data.data
        this.count = res.data.count
        // this.count = res.count
      }
    },
    async deleteRow (a, b) {
      await postData('/exception/settingdelete', b[a])
      this.getRecode()
    },
    // 分页
    handleSizeChange (val) {
      // 每页条数
      // this.form.pageSize = val
      // this.getRecode()
    },
    handleCurrentChange (val) {
      // 当前第几页
      this.form.pageNum = val
      this.getRecode()
    },
    getitem (val) {
      this.depart.find(item => item.dmId === val)
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
/deep/ .el-input__inner {
    height: 30px;
    width: 209px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
/deep/.el-scrollbar__wrap {
   overflow-x: hidden;
}
</style>
