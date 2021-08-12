<template>
<!-- 不合格审理 -->
<div>
      <el-card class="box-card" shadow="always">
         <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
             <el-form-item label="产品代号" prop="bomCode">
                <el-input autocomplete="off" placeholder="全部" clearable v-model="form.bomCode"></el-input>
            </el-form-item>
             <el-form-item label="零部件代号" prop="componmentCode">
               <el-input autocomplete="off" placeholder="全部" clearable v-model="form.componmentCode"></el-input>
            </el-form-item>
             <el-form-item label="审理单号" prop="codeNumber">
               <el-input autocomplete="off" placeholder="全部" clearable v-model="form.codeNumber"></el-input>
            </el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo()">搜索</el-button>
        </el-form>
         <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="cnId" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="120" prop="bId" align="center"> </el-table-column>
             <el-table-column sortable label="产品产品" width="100" prop="bomCode" align="center"> </el-table-column>
           <el-table-column sortable label="产品代号" width="100" prop="productNum" align="center"></el-table-column>
             <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"> </el-table-column>
           <el-table-column sortable label="零部件名称" width="110" prop="componmentName" align="center"></el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="rId" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="100" prop="processName" align="center"> </el-table-column>
           <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"></el-table-column>
          <el-table-column sortable label="批次数量" width="100" prop="count" align="center"> </el-table-column>
          <el-table-column sortable label="审理单号" width="100" prop="codeNumber" align="center"> </el-table-column>
           <el-table-column sortable label="发起人" width="90" prop="people" align="center"> </el-table-column>
          <el-table-column sortable label="状态" width="80" prop="status" align="center"></el-table-column>
           <el-table-column sortable label="发起时间" width="110" prop="time" align="center"> </el-table-column>
            <el-table-column sortable label="不合格现象" width="120" prop="reason" align="center"> </el-table-column>
            <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
                 <el-button type="primary"  size="mini" @click="count(scope.row.cnId)">详情</el-button>
                  <el-button type="success"  size="mini"  v-print="'#print_label'">打印</el-button>
            </template>
            </el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination> -->
      <el-dialog title="请查看不合格审理信息" :visible.sync="Dialog" width="91%">
            <el-table :data="tableData1" style="width: 100%"  tooltip-effect="dark"  border>
          <el-table-column label="序号" width="50" prop="cnId" align="center"> </el-table-column>
          <el-table-column sortable label="审理单号" width="130" prop="codeNumber" align="center"> </el-table-column>
             <el-table-column sortable label="发起人" width="90" prop="people" align="center"> </el-table-column>
             <el-table-column sortable label="发起时间" width="100" prop="time" align="center"> </el-table-column>
             <el-table-column sortable label="批次号" width="130" prop="bId" align="center"> </el-table-column>
           <el-table-column sortable label="产品代号" width="100" prop="productNum" align="center"></el-table-column>
             <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"> </el-table-column>
           <el-table-column sortable label="零部件名称" width="110" prop="componmentName" align="center"></el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="rId" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="100" prop="processName" align="center"> </el-table-column>
           <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"></el-table-column>
          <el-table-column sortable label="数量" width="100" prop="count" align="center"> </el-table-column>
            <el-table-column sortable label="不合格审理状态" width="130" prop="status" align="center"> </el-table-column>
            </el-table>
           <el-form :model="from" ref="fromRef" :inline="true" class="demo-form-inline"  label-width="120px" style="margin-left: 30%; margin-top:40px">
           <el-form-item label="不合格类别" prop="unqtype">
              <el-select v-model="from.unqtype"><option></option></el-select>
            </el-form-item><br>
            <el-form-item label="不合格现象" prop="unqreason">
            <el-select v-model="from.unqreason"><option></option></el-select>
            </el-form-item><br>
             <el-form-item label="不合格处理结果">
              <template slot-scope="">
                        <el-radio-group v-model="from.result">
                              <el-radio  label="合格"></el-radio>
                              <el-radio label="返工返修"></el-radio>
                               <el-radio label="报废"></el-radio>
                        </el-radio-group>
                    </template>
            </el-form-item>
        </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Dialog = false">取 消</el-button>
                <el-button type="primary" @click="sumbit()">确 定</el-button>
            </div>
      </el-dialog>
       <div style="display: none">
<div id="print_label" >
   <div class="person">
                <div class="son">
                    <span>不合格品审理单据</span>
                </div>
                <div>
                    <span style="margin-left: 70%;letter-spacing:50px">年月日</span>
                </div>
           <table border="1" style="border-collapse: collapse;  width: 700px; height: 400px; margin: 30px">
               <tr>
                   <td width=100px colspan="4">
                        <div align=center>产品名称</div>
                   </td>
                   <td width=100px colspan="4">
                       <div align=center>批次号</div>
                   </td>
                   <td width=100px colspan="4">
                       <div align=center>数量</div>
                   </td>
               </tr>
               <tr>
                   <td  width=100px colspan="4"></td>
                   <td  width=100px colspan="4"></td>
                   <td  width=100px colspan="4"></td>
               </tr>
                <tr>
                   <td width=50px>
                        <div align=center>工 序</div>
                   </td>
                   <td width=50px colspan="2"></td>
                   <td width=60px  >
                       <div align=center>操作人员</div>
                   </td>
                   <td width=60px  colspan="2"></td>
                   <td width=60px>
                       <div align=center>检验人</div>
                   </td>
                   <td width=60px colspan="2"></td>
               </tr>
               <tr>
                   <td  width=90px>
                       <div align=center>不合格原因</div>
                   </td>
                   <td colspan="10"></td>
               </tr>
                <tr>
                   <td  width=90px>
                       <div align=center>处理意见</div>
                   </td>
                   <td colspan="10"></td>
               </tr>
              <tr >
                  <td width=50px rowspan="4">
                      <div align=center>返工返修情况</div>
                  </td>
                  <td width=100px>
                      <div align=center>工 序</div>
                  </td>
                  <td width=100px>
                      <div align=center>合格数</div>
                  </td>
                  <td width=70px>
                      <div align=center>工 废</div>
                  </td>
                  <td width=70px>
                      <div align=center>料废</div>
                  </td>
                  <td width=70px>
                      <div align=center>上道废</div>
                  </td>
                  <td width=110px colspan="3" height=60px>
                      <div align=center>备注</div>
                  </td>
              </tr>
              <tr>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td colspan="3"></td>
              </tr>
                <tr colspan="">
                  <td>
                      <div align=center>日 期</div>
                  </td>
                  <td>
                      <div align=center>操作人</div>
                  </td>
                  <td colspan="2">
                      <div align=center>班(组)长</div>
                  </td>
                  <td width=100px colspan="2">
                      <div align=center>检验结论</div>
                  </td>
                  <td colspan="2">
                      <div align=center>检验员</div>
                  </td>
              </tr>
                <tr>
                 <td></td>
                 <td></td>
                 <td colspan="2"></td>
                 <td width=100px colspan="2"></td>
                 <td colspan="2"></td>
              </tr>
           </table>
    </div>
  </div>
       </div>
    </el-card>
</div>
</template>

<script>
import { getData, postData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      form: {
        bomCode: '',
        componmentCode: '',
        codeNumber: ''
      },
      from: {
        unqreason: '',
        unqtype: '',
        result: ''
      },
      formLabelWidth: '120px',
      tableData: [],
      tableData1: [],
      Dialog: false,
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1,
      table: []
    }
  },
  created () {},
  mounted () {
  },
  watch: {},
  computed: {},
  methods: {
    // 点击详情
    async count (id) {
      const res = await postData('/dr/reason?cnId=' + id)
      if (res.code === 200) {
        this.Dialog = true
        this.tableData1 = res.data
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/dr/select', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        // this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 不合格提交按钮
    sumbit () {
      var ObjectData = {}
      ObjectData.from = this.from
      ObjectData.tableData = this.tableData1
      this.$refs.fromRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/dr/insert', ObjectData)
          if (res.code === 200) {
            this.Dialog = false
            this.$message.success('提交成功')
            this.$refs.fromRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
.son{
    font-size: 21px;
    margin-left: 40%;
}
</style>
