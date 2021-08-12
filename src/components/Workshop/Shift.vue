<template>
<div class="boby">
    <div class="back">
    <el-page-header @back="goBack" content="交接班"></el-page-header></div>
       <el-card class="box-card" shadow="always">
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="id" align="center"> </el-table-column>
          <el-table-column sortable label="班次" width="80" prop="classes" align="center">
          </el-table-column>
          <el-table-column label="修改班次" width="100" prop="" align="center">
               <template slot-scope="scope">
                        <!-- <el-radio-group v-model="scope.row.classes" @change="agreeChange(scope.row.classes)">
                            <el-radio :classesId="1">白班</el-radio>
                            <el-radio :classesId="2">中班</el-radio>
                            <el-radio :classesId="3">夜班</el-radio>
                        </el-radio-group> -->
                         <el-button type="success" icon="el-icon-edit" size="mini" @click="update(scope.row)">编辑</el-button>
               </template>
          </el-table-column>
             <el-table-column sortable label="设备编号" width="100" prop="emId" align="center"> </el-table-column>
           <el-table-column sortable label="设备" width="80" prop="emName" align="center"></el-table-column>
          <el-table-column sortable label="快速上班" width="100" align="woke" prop="gowork">
               <template slot-scope="scope">
                  <el-button type="success" size="mini" @click="goWork(scope.row.id)">快速上班</el-button>
               </template>
          </el-table-column>
          <el-table-column sortable label="上班时间" width="140" prop="wokeTime" align="center"> </el-table-column>
           <el-table-column sortable label="上班人员" width="100" prop="userName" align="center"></el-table-column>
             <el-table-column sortable label="快速下班" width="100" prop="free" align="center">
                  <template slot-scope="scope">
                <el-button type="success" size="mini" @click="goDown(scope.row.id)">快速下班</el-button>
            </template>
             </el-table-column>
          <el-table-column sortable label="详情" width="80" prop="decrip" align="center">
               <template>
                <el-button type="success" size="mini">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column sortable label="设备点检" width="100" prop="checking" align="center">
               <template slot-scope="scope">
                <el-button type="success" size="mini" @click="goCheck(scope.row.id)">点检</el-button>
            </template>
          </el-table-column>
           <el-table-column sortable label="点检时间" width="140" prop="checkTime" align="center"></el-table-column>
          <el-table-column sortable label="设备保养" width="100" prop="maintain" align="center">
               <template slot-scope="scope">
                <el-button type="success" size="mini" @click="Baoyang(scope.row.id)">保养</el-button>
            </template>
          </el-table-column>
           <el-table-column sortable label="保养时间" width="140" prop="maintainTime" align="center"> </el-table-column>
             <el-table-column sortable label="工装更换" width="100" prop="toolingreplace" align="center">
                  <template >
                <el-button type="success" size="mini" @click="Dialog = true">更换</el-button>
            </template> </el-table-column>
           <!-- <el-table-column sortable label="任务绑定" width="100" prop="rwbd" align="center">
               <el-input></el-input>
           </el-table-column>
            <el-table-column sortable label="任务解绑" width="100" prop="jb" align="center">
                 <template>
                <el-button type="success" size="mini">任务解绑</el-button>
            </template> </el-table-column> -->
           <el-table-column sortable label="设备报修" width="100" prop="repairs" align="center">
                <template>
                <el-button type="success" size="mini"  @click="Dialogs = true">报修</el-button>
            </template>
           </el-table-column>
  </el-table>
   <!-- <el-pagination background
     @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryShift.pageNum"
      :page-size="queryShift.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
    </el-card>
    <!-- 修改班次对话框 -->
      <el-dialog title="请修改班次信息" :visible.sync="editDialog" width="30%">
        <el-form :model="editFrom" ref="editRef" :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
            <el-form-item label="班次:" prop="classes" :label-width="formLabelWidth">
               <el-radio-group v-model="editFrom.classes" @change="agreeChange()">
                            <el-radio :label="1">白班</el-radio>
                            <el-radio :label="2">中班</el-radio>
                            <el-radio :label="3">夜班</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="id:" prop="id" :label-width="formLabelWidth" v-if="false">
             <input type="text" v-model="editFrom.id" >
            </el-form-item>
        </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfo()">确 定</el-button>
  </div>
</el-dialog>
<!-- 工装更换对话框 -->
 <el-dialog title="请更换工装" :visible.sync="Dialog" width="55%">
      <el-form   :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="设备编号">
               <el-input autocomplete="off" placeholder="全部"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo()">搜索</el-button>
          </el-form>
           <el-table :data="tableDatas" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="53" prop="num" align="center"> </el-table-column>
          <el-table-column sortable label="工装编号" width="100" prop="batchNumer" align="center"> </el-table-column>
             <el-table-column sortable label="工装名称" width="100" prop="product" align="center"> </el-table-column>
           <el-table-column sortable label="设备" width="90" prop="productNum" align="center"></el-table-column>
            <el-table-column sortable label="上次更换时间" width="120" prop="productNum" align="center"></el-table-column>
          <el-table-column sortable label="上次更换原因" width="150" prop="proscessNum" align="center"></el-table-column>
            <el-table-column sortable label="更换原因" width="150" prop="processCode" align="center"></el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Dialog = false">取 消</el-button>
    <el-button type="primary">更 换</el-button>
  </div>
</el-dialog>
<!-- 报修按钮对话框 -->
 <el-dialog title="请报修" :visible.sync="Dialogs" width="40%">
           <el-table :data="tableData1" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="60" prop="num" align="center"> </el-table-column>
          <el-table-column sortable label="设备编号" width="130" prop="batchNumer" align="center"> </el-table-column>
          <el-table-column sortable label="班组" width="150" prop="product" align="center"> </el-table-column>
          <el-table-column sortable label="设备名称" width="193" prop="productNum" align="center"></el-table-column>
  </el-table>
  <el-form :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
      <el-form-item label="报修描述:">
       <el-input ></el-input>
    </el-form-item>
    <el-form-item label="是否提交机电员:">
        <template>
             <el-radio v-model="a" :label="1">是</el-radio>
             <el-radio v-model="a" :label="2">否</el-radio>
        </template>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Dialogs = false">取 消</el-button>
    <el-button type="primary">更 换</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
import { getData, postData } from '../../api/index'
export default {
  data () {
    return {
      collapse: false,
      items: [],
      tableData: [],
      queryShift: {
        id: '',
        classes: '',
        emId: '',
        emName: '',
        woke: '',
        wokeTime: '',
        userName: '',
        free: '',
        decrip: '',
        checking: '',
        checkTime: '',
        maintain: '',
        maintainTime: '',
        toolingreplace: '',
        repairs: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      a: '1',
      editFrom: {
        id: '',
        classes: ''
      },
      tableDatas: [],
      tableData1: [],
      count: 0,
      editDialog: false,
      Dialog: false,
      Dialogs: false,
      formLabelWidth: '120px'
    }
  },
  computed: {
  },
  created () {
    this.getShift()
  },
  methods: {
    goBack () {
      this.$router.push('/mains')
    },
    // 获取表格信息
    async getShift () {
      const res = await getData('/shiftturnover/selectAll', this.queryShift)
      if (res.code === 200) {
        this.tableData = res.data
      }
    },
    agreeChange (val) {
      console.log()
    },
    // 点击班次修改出现的对话框
    update (val) {
      this.editDialog = true
      this.editFrom.id = val.id
      this.editFrom.classes = val.classes
      //   this.editFrom = JSON.parse(JSON.stringify(data))
    //   this.getShift(id)
    },
    // 修改提交
    editInfo () {
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/shiftturnover/updateShift?id=' + this.editFrom.id + '&' + 'classes=' + this.editFrom.classes)
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getShift()
            this.$refs.editRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    },
    // 快速上班按钮
    async goWork (id) {
      const res = await postData('/shiftturnover/kuaisushangban?id=' + id)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('上班打卡成功')
        this.getShift()
      } else {
        this.$message.error('上班打卡失败')
      }
    },
    // 快速下班按钮
    async goDown (id) {
      const res = await postData('/shiftturnover/kuaisushangban?id=' + id)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('下班打卡成功')
        this.getShift()
      } else {
        this.$message.error('下班打卡失败')
      }
    },
    // 点检按钮
    async goCheck (id) {
      const res = await postData('/shiftturnover/dianjian?id=' + id)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('点检成功')
        this.getShift()
      } else {
        this.$message.error('点检失败')
      }
    },
    // 保养按钮
    async Baoyang (id) {
      const res = await postData('/shiftturnover/baoyangshijian?id=' + id)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('保养成功')
        this.getShift()
      } else {
        this.$message.error('保养失败')
      }
    }
    // 分页
    // handleSizeChange (val) {
    //   this.queryShift.pageSize = val
    //   this.getShift()
    // },
    // handleCurrentChange (val) {
    //   this.queryShift.pageNum = val
    //   this.getShift()
    // }
  }
}
</script>

<style lang="less" scoped>
.boby{
       background-color: #f0f0f0;
       position: relative;
       height: auto;
}
.box-card{
    width: 96%;
    position: absolute;
    left: 30px;
    top: 50px;
}
/deep/.el-table td, .el-table th {
    padding: 3px 0;
}
/deep/.el-table th {
    padding: 5px 0;
    background-color: #EBEEF5;
}
.back{
    position: absolute;
    left: 30px;
    top: 20px;
}
/deep/ .el-input__inner {
    height: 30px;
    width: 209px;
}
</style>
