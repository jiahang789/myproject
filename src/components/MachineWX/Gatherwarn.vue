<template>
<!-- 设备采集预警 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="90px">
              <el-form-item label="设备" label-width="100px" prop="emName">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emName" clearable></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="date" style="margin-top:7px">
                 <el-date-picker v-model="form.date"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间" value-format="yyyy-MM-dd" clearable @change="dateChange">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="预警内容" label-width="100px" prop="emName">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emName" clearable></el-input>
            </el-form-item>
             <el-form-item label="状态" label-width="100px" prop="emName">
               <el-input autocomplete="off" placeholder="全部" v-model="form.emName" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
               <el-table-column label="序号" width="50" prop="emId" align="center"> </el-table-column>
          <el-table-column sortable label="预警内容" width="130" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="最后一次报警时间" width="150" prop="emNum" align="center"></el-table-column>
          <el-table-column sortable label="设备编号" width="130" prop="teDescribe" align="center"> </el-table-column>
           <el-table-column sortable  label="设备名称" width="130" prop="emType" align="center"> </el-table-column>
          <el-table-column sortable  label="状态" width="100" prop="emType" align="center"> </el-table-column>
            <el-table-column sortable  label="处理人" width="100" prop="emType" align="center"> </el-table-column>
            <el-table-column sortable  label="处理时间" width="100" prop="emType" align="center"> </el-table-column>
             <el-table-column sortable  label="处理方法" width="118" prop="emType" align="center"> </el-table-column>
              <el-table-column sortable  label="是否关闭" width="130" prop="emType" align="center">
                  <template>
                      <el-radio-group>
                          <el-radio label="是"></el-radio>
                           <el-radio label="否"></el-radio>
                      </el-radio-group>
                  </template>
             </el-table-column>
             <el-table-column   label="操作" width="100" prop="emType" align="center">
                 <el-button type="success" size="mini" @click="Dialog = true">处理</el-button>
             </el-table-column>
  </el-table>
    <!-- 打开处理对话框 -->
  <el-dialog title="请填写处理信息" :visible.sync="Dialog" width="40%">
 <table class="tables" border="1" style="width: 450px; height: 130px; margin: 30px">
            <tr>
                <td  style=" background-color: #8EAADB;"><div align="center">是否关闭</div></td>
                 <td align="center">
                    <el-radio-group>
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </td>
            </tr>
            <tr>
                 <td  style=" background-color: #8EAADB;"><div align="center">处理过程描述</div></td>
                 <td align="center">质量异常：光洁度不够。</td>
            </tr>
        </table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Dialog = false">取 消</el-button>
    <el-button type="primary">确 定</el-button>
  </div>
</el-dialog>
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
        emNum: ''
      },
      Dialog: false,
      tableData: [{emId: 1}]
    }
  },
  created () {
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 日期选择器传值
    dateChange (val) {
      this.startTime = val
      console.log(this.startTime)
    },
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
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) { // 第一行
        return {
          rowspan: 1, // 把2行合并为一列
          colspan: 4
        }
      } else {
        return {
          rowspan: 0,
          colspan: 0
        }
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
