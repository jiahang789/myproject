<template>
<!-- 设备计划生成-->
<div>
     <el-card class="box-card" shadow="always">
           <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="班组" prop="teId">
              <el-select  v-model="form.teDescribe"  clearable placeholder="全部" @change="getitem">
                 <el-option v-for="item in group" :key="item.teDescribe" :label="item.teDescribe" :value="item.teId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号" prop="emNum">
               <el-select  v-model="form.emNum"  clearable placeholder="全部" @change="getitem1">
                 <el-option v-for="item in machineNum" :key="item.emId" :label="item.emNum" :value="item.emId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期" prop="time">
             <el-date-picker v-model="form.time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border v-if="show">
          <el-table-column type="selection" v-model="multipleSelection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="emId" align="center"> </el-table-column>
          <el-table-column sortable label="设备编号" width="100" prop="emNum" align="center"> </el-table-column>
           <el-table-column sortable label="班组" width="100" prop="teId" align="center"> </el-table-column>
          <el-table-column sortable label="夜班基础产量(万粒)" width="150" prop="outputNight" align="center"> </el-table-column>
          <el-table-column sortable label="白班基础产量(万粒)" width="150" prop="outputDay" align="center"> </el-table-column>
          <el-table-column sortable label="二班基础产量(万粒)" width="150" prop="outputSecond" align="center"> </el-table-column>
           <el-table-column label="今日夜班计划产量" width="150" prop="esPenightt" align="center">
                <template  slot-scope="scope">
                     <el-input  v-model="scope.row.esPenightt" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template>
           </el-table-column>
          <el-table-column  label="今日白班计划产量" width="150" prop="esPeday" align="center">
              <template  slot-scope="scope">
                     <el-input v-model="scope.row.esPeday" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template> </el-table-column>
            <el-table-column  label="今日二班计划产量" width="150" prop="esPesencond" align="center">
               <template  slot-scope="scope">
                     <el-input v-model="scope.row.esPesencond" @change="handleEdit(scope.$index, scope.row)"></el-input>
                 </template> </el-table-column>
           <el-table-column  label="加工工序" width="98" prop="rId" align="center">
               <template  slot-scope="scope">
                <el-select  v-model="scope.row.rId"  clearable placeholder="全部" @change="getitems">
                 <el-option v-for="item in gx" :key="item.rId" :label="item.processName" :value="item.rId"></el-option>
              </el-select>
               </template>
           </el-table-column>
  </el-table>
   <el-table :data="tableData1" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border v-if="show1">
          <el-table-column type="selection" v-model="multipleSelection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="esId" align="center"> </el-table-column>
          <el-table-column sortable label="设备编号" width="100" prop="emNum" align="center"> </el-table-column>
           <el-table-column sortable label="班组" width="100" prop="teDescribe" align="center"> </el-table-column>
          <el-table-column sortable label="夜班基础产量(万粒)" width="150" prop="esBanight" align="center"> </el-table-column>
          <el-table-column sortable label="白班基础产量(万粒)" width="150" prop="esBaday" align="center"> </el-table-column>
          <el-table-column sortable label="二班基础产量(万粒)" width="150" prop="esBasencond" align="center"> </el-table-column>
           <el-table-column label="今日夜班计划产量(万粒)" width="150" prop="esPenightt" align="center"></el-table-column>
          <el-table-column  label="今日白班计划产量(万粒)" width="150" prop="esPeday" align="center"> </el-table-column>
            <el-table-column  label="今日二班计划产量(万粒)" width="150" prop="esPesencond" align="center"></el-table-column>
           <el-table-column  label="加工工序" width="90" prop="rId" align="center"></el-table-column>
           <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editButton(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.esId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
     <el-button type="success"  size="mini" style="margin-left:92%" @click="goTO()">生 成</el-button>
    </el-card>
      <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改设备计划信息" :visible.sync="editDialog" width="30%">
  <el-form :model="editFrom" ref="editRef" :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
      <el-form-item label="序号" prop="esId" style="display: none">
     <el-input autocomplete="off" v-model="editFrom.esId"></el-input>
    </el-form-item>
      <el-form-item label="今日夜班计划产量(万粒)" prop="esPenightt">
     <el-input autocomplete="off" v-model="editFrom.esPenightt"></el-input>
    </el-form-item>
       <el-form-item label="今日白班计划产量(万粒)" prop="esPeday">
     <el-input autocomplete="off" v-model="editFrom.esPeday"></el-input>
    </el-form-item>
    <el-form-item label="今日二班计划产量(万粒)" prop="esPesencond">
     <el-input autocomplete="off" v-model="editFrom.esPesencond"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'equnplan',
  data () {
    return {
      show: true,
      show1: false,
      group: [],
      gx: [],
      machineNum: [],
      tableData: [],
      tableData1: [],
      queryEqunplan: {
        emId: '',
        emNum: '',
        teId: '',
        outputNight: '',
        outputDay: '',
        outputSecond: '',
        esPenightt: '',
        esPeday: '',
        esPesencond: '',
        rId: ''
      },
      form: {
        teDescribe: '',
        emNum: '',
        time: ''
      },
      editFrom: {
        esId: '',
        esPenightt: '',
        esPeday: '',
        esPesencond: ''
      },
      multipleSelection: [],
      editDialog: false,
      formLabelWidth: '200px'
    }
  },
  created () {
    this.getEqunplan()
    this.getSelect()
    this.getSelects()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    handleEdit (val) {
      console.log(val)
    },
    // 搜索按钮
    async getTitle () {
      const res = await getData('/es/select', this.form)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.show = false
        this.show1 = true
        this.tableData1 = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取表格下拉框数据
    async getSelect () {
      const res = await getData('/es/insertchilk')
      if (res.code === 200) {
        this.gx = res.data
      }
    },
    getitems (val) {
      this.gx.find(item => item.rId === val)
    },
    // 获取搜索下拉框数据
    async getSelects () {
      const res = await getData('/es/selectchilk')
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
    // 获取表格信息
    async getEqunplan () {
      const res = await postData('/es/selectall', this.queryEqunplan)
      if (res.code === 200) {
        this.tableData = res.data
        this.tableData1 = res.data
      }
    },
    // 打开修改对话框
    editButton (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
    },
    // 修改提交按钮
    updateInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/es/update', qs.stringify(this.editFrom))
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success(res.msg)
            this.tableData1 = res.data
            this.$refs.editRef.resetFields()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 生成按钮
    async goTO () {
      if (this.multipleSelection.length > 0) {
        var multis = []
        this.multipleSelection.forEach(function (item, index) {
          multis.push(
            {
              emId: item.emId,
              emNum: item.emNum,
              teId: item.teId,
              outputNight: item.outputNight,
              outputDay: item.outputDay,
              outputSecond: item.outputSecond,
              esPenightt: item.esPenightt,
              esPeday: item.esPeday,
              esPesencond: item.esPesencond,
              rId: item.rId
            })
        })
        const res = await postData('/es/insert', multis)
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      } else {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      }
    },
    // 删除按钮
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/es/delete?esId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.tableData1 = res.data
        } else {
          this.$message.error('删除失败！')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
    width: 160px;
}
/deep/ .el-dialog__body {
    background-color: #F2F6FC;
    }
     /deep/.el-select .el-input__inner {
  width: 180px;

}

</style>
