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
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle()">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
             <el-table-column type="selection" width="40"></el-table-column>
               <el-table-column label="序号" width="50" prop="emId" align="center"> </el-table-column>
                <el-table-column label="设备图片" width="120" prop="emPhoto" align="center">
              <!-- <template scope="scope"><img v-for="item in scope.row.pictures" :src="item" width="40" height="40" class="head_pic"/></template> -->
              <!-- <template >
                  <img src="../../assets/img/fore.jpg" width="60px" height="60px"/>
            </template> -->
            <!-- <template slot-scope="scope">
             <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
            </template> -->
            <div class="demo-image__preview">
                <el-image
                    style="width: 40px; height: 40px"
                    :src="url"
                    :preview-src-list="srcList">
                </el-image>
                </div>
          </el-table-column>
          <el-table-column sortable label="资产名称" width="100" prop="emName" align="center"> </el-table-column>
           <el-table-column sortable label="资产编号" width="100" prop="emNum" align="center"></el-table-column>
          <el-table-column sortable label="所属班组" width="100" prop="teDescribe" align="center"> </el-table-column>
          <el-table-column sortable  label="设备类型" width="100" prop="emType" align="center"> </el-table-column>
           <el-table-column sortable label="规格型号" width="100" prop="emModei" align="center"></el-table-column>
          <el-table-column sortable label="购置年份" width="100" prop="emYears" align="center"> </el-table-column>
          <el-table-column sortable label="责任人" width="90" prop="userName" align="center"> </el-table-column>
          <el-table-column sortable label="状态" width="90" prop="emState" align="center">
              <template slot-scope="item">
                 <el-switch v-model="item.row.emState"  on-color="#00A854" on-value="1" off-color="#F04134"  off-value="0"
                    @change="changeStatus(item.row)"></el-switch>
               </template> </el-table-column>
           <el-table-column sortable label="生产厂家" width="100" prop="emFactor" align="center"></el-table-column>
          <el-table-column sortable label="是否有二维码" width="120" prop="emQrcode" align="center">
              <template slot-scope="item">
                 <el-switch v-model="item.row.emQrcode"  on-color="#00A854" on-value="1" off-color="#F04134"  off-value="0"
                    @change="changeStatus1(item.row)"></el-switch>
               </template> </el-table-column>
           <el-table-column sortable label="设备日产量(万粒)" width="140" prop="dailyOutput" align="center"></el-table-column>
           <el-table-column sortable label="夜班产量(万粒)" width="130" prop="outputNight" align="center"> </el-table-column>
           <el-table-column sortable label="白班产量(万粒)" width="130" prop="outputDay" align="center"></el-table-column>
          <el-table-column sortable label="二班产量(万粒)" width="130" prop="outputSecond" align="center"> </el-table-column>
           <el-table-column sortable label="是否跨工序" width="110" prop="emCrossprocess" align="center">
               <template slot-scope="item">
                 <el-switch v-model="item.row.emCrossprocess"  on-color="#00A854" on-value="1" off-color="#F04134"  off-value="0"
                    @change="changeStatus2(item.row)"></el-switch>
               </template>
           </el-table-column>
            <!-- <el-table-column sortable label="工序数量" width="100" prop="emProcessnumber" align="center"></el-table-column> -->
            <el-table-column sortable label="备注" width="90" prop="emRemarks" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
            <template  slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editButton(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.emId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <!-- <el-pagination background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改设备信息" :visible.sync="editDialog" width="85%">
 <el-form :model="editFrom" ref="editRef" :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
       <el-form-item label="资产名称" prop="emName">
         <el-input autocomplete="off" v-model="editFrom.emName"></el-input>
    </el-form-item>
     <el-form-item label="资产编号" prop="emNum">
         <el-input autocomplete="off" v-model="editFrom.emNum"></el-input>
    </el-form-item>
     <el-form-item label="生产厂家" prop="emFactor">
      <el-input autocomplete="off" v-model="editFrom.emFactor"></el-input>
    </el-form-item>
     <el-form-item label="所属班组" prop="teDescribes">
     <el-select  v-model="editFrom.teDescribes"  clearable placeholder="请选择班组" @change="getitem">
          <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
      </el-select>
    </el-form-item>
     <!-- <el-form-item label="工序数量" prop="emProcessnumber">
     <el-input autocomplete="off" v-model="addFrom.emProcessnumber"></el-input>
    </el-form-item> -->
     <el-form-item label="购置年份" prop="emYears1">
       <el-date-picker v-model="editFrom.emYears1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  @change="dateChange"></el-date-picker>
     </el-form-item>
     <el-form-item label="责任人" prop="userNames">
     <el-select  v-model="editFrom.userNames"  clearable placeholder="请选择班组" @change="getitem1">
          <el-option v-for="item in user" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="设备类型" prop="emTypes">
      <el-select  v-model="editFrom.emTypes"  clearable placeholder="请选择班组" @change="getitem2">
          <el-option v-for="item in machineStyle" :key="item.emTypeId" :label="item.emType" :value="item.emTypeId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="夜班产量(万粒)" prop="outputNight">
     <el-input autocomplete="off" v-model="editFrom.outputNight"></el-input>
    </el-form-item>
      <el-form-item label="规格型号" prop="emModeis">
      <el-select  v-model="editFrom.emModeis"  clearable placeholder="请选择班组" @change="getitem3">
          <el-option v-for="item in model" :key="item.emId" :label="item.emModei" :value="item.emId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="白班产量(万粒)" prop="outputDay">
     <el-input autocomplete="off"  v-model="editFrom.outputDay"></el-input>
    </el-form-item>
     <el-form-item label="二班产量(万粒)" prop="outputSecond">
     <el-input autocomplete="off"  v-model="editFrom.outputSecond"></el-input>
    </el-form-item>
     <el-form-item label="设备日产量(万粒)" prop="dailyOutput">
     <el-input autocomplete="off"  v-model="editFrom.dailyOutput"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="emRemarks">
     <el-input autocomplete="off"  v-model="editFrom.emRemarks"></el-input>
    </el-form-item>
     <br>
     <el-form-item label="设备图片" prop="emPhoto">
     <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加设备信息" :visible.sync="addDialog" width="85%">
  <el-form :model="addFrom" ref="addRef" :inline="true" class="demo-form-inline" :label-width="formLabelWidth">
     <el-form-item label="资产名称" prop="emName">
         <el-input autocomplete="off" v-model="addFrom.emName"></el-input>
    </el-form-item>
     <el-form-item label="资产编号" prop="emNum">
         <el-input autocomplete="off" v-model="addFrom.emNum"></el-input>
    </el-form-item>
     <el-form-item label="生产厂家" prop="emFactor">
      <el-input autocomplete="off" v-model="addFrom.emFactor"></el-input>
    </el-form-item>
     <el-form-item label="所属班组" prop="teDescribe">
     <el-select  v-model="addFrom.teDescribe"  clearable placeholder="请选择所属班组" @change="getitem">
          <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
      </el-select>
    </el-form-item>
     <!-- <el-form-item label="工序数量" prop="emProcessnumber">
     <el-input autocomplete="off" v-model="addFrom.emProcessnumber"></el-input>
    </el-form-item> -->
     <el-form-item label="购置年份" prop="emYears">
       <el-date-picker v-model="addFrom.emYears" type="date" placeholder="选择购置年份" value-format="yyyy-MM-dd"  @change="dateChange"></el-date-picker>
     </el-form-item>
     <el-form-item label="责任人" prop="userName">
     <el-select  v-model="addFrom.userName"  clearable placeholder="请选择责任人" @change="getitem1">
          <el-option v-for="item in user" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="设备类型" prop="emType">
      <el-select  v-model="addFrom.emType"  clearable placeholder="请选择设备类型" @change="getitem2">
          <el-option v-for="item in machineStyle" :key="item.emTypeId" :label="item.emType" :value="item.emTypeId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="夜班产量(万粒)" prop="outputNight">
     <el-input autocomplete="off" v-model="addFrom.outputNight"></el-input>
    </el-form-item>
      <el-form-item label="规格型号" prop="emModei">
      <!-- <el-select  v-model="addFrom.emModei"  clearable placeholder="请选择规格型号" @change="getitem3">
          <el-option v-for="item in model" :key="item.emId" :label="item.emModei" :value="item.emId"></el-option>
      </el-select> -->
         <el-input autocomplete="off" v-model="addFrom.emModei"></el-input>
    </el-form-item>
     <el-form-item label="白班产量(万粒)" prop="outputDay">
     <el-input autocomplete="off"  v-model="addFrom.outputDay"></el-input>
    </el-form-item>
     <el-form-item label="二班产量(万粒)" prop="outputSecond">
     <el-input autocomplete="off"  v-model="addFrom.outputSecond"></el-input>
    </el-form-item>
     <el-form-item label="设备日产量(万粒)" prop="dailyOutput">
     <el-input autocomplete="off"  v-model="addFrom.dailyOutput"></el-input>
    </el-form-item>
     <el-form-item label="备注" prop="emRemarks">
     <el-input autocomplete="off"  v-model="addFrom.emRemarks"></el-input>
    </el-form-item>
     <br>
     <el-form-item label="设备图片" prop="emPhoto">
     <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addSumbit">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'machine',
  data () {
    return {
      group: [],
      user: [],
      machineStyle: [],
      model: [],
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
      addFrom: {
        emName: '',
        emNum: '',
        teDescribe: '',
        emFactor: '',
        // emProcessnumber: '',
        emYears: '',
        userName: '',
        emModei: '',
        emType: '',
        outputNight: '',
        outputDay: '',
        outputSecond: '',
        dailyOutput: '',
        emRemarks: '',
        emPhoto: ''
      },
      editFrom: {
        emName: '',
        emNum: '',
        teDescribes: '',
        emFactor: '',
        // emProcessnumber: '',
        emYears1: '',
        userNames: '',
        emModeis: '',
        emTypes: '',
        outputNight: '',
        outputDay: '',
        outputSecond: '',
        dailyOutput: '',
        emRemarks: '',
        emPhoto: ''
      },
      form: {
        emName: '',
        emNum: ''
      },
      editDialog: false,
      addDialog: false,
      formLabelWidth: '170px',
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
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
    // 状态按钮
    changeStatus (Info) {
      let flag = '关闭'
      if (Info.emState) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '此状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/ep/switch2?emId=' + Info.emId + '/' + Info.emState)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        Info.emState = !Info.emState
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 是否有二维码
    changeStatus1 (Info) {
      let flag = '关闭'
      if (Info.emQrcode) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '二维码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/ep/switch1?emId=' + Info.emId + '/' + Info.emQrcode)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        Info.emQrcode = !Info.emQrcode
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 是否跨工序
    changeStatus2 (Info) {
      let flag = '关闭'
      if (Info.emCrossprocess) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '跨工序?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/ep/switch3?emId=' + Info.emId + '/' + Info.emCrossprocess)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        Info.emCrossprocess = !Info.emCrossprocess
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
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
        this.$message.success(res.msg)
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取条件下拉框的值
    // async getSelects () {
    //   const res = await postData('/api/team/selectchilk')
    //   if (res.code === 200) {
    //     this.bz = res.data
    //   }
    // },
    // 获取下拉框的值
    getlist (val) {
      // val即是传进来的id值，也即value值
      this.title = this.bz.find(item => item.teId === val)
    },
    // 获取增加框下拉框数据
    async getSelect () {
      const res = await getData('/em/insertchilk')
      if (res.code === 200) {
        this.group = res.data.Team
        this.user = res.data.User
        this.machineStyle = res.data.EmType
        this.model = res.data.Equipment
      }
    },
    // 获取下拉框的值
    getitem (val) {
      this.group.find(item => item.teId === val)
    },
    getitem1 (val) {
      this.user.find(item => item.userId === val)
    },
    getitem2 (val) {
      this.machineStyle.find(item => item.emTypeId === val)
    },
    getitem3 (val) {
      this.model.find(item => item.emId === val)
    },
    // 获取表格信息
    async getMachine () {
      const res = await getData('/em/selectall', this.queryEqun)
      if (res.code === 200) {
        this.tableData = res.data
      }
    },
    // 打开修改对话框
    editButton (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getMachine(data.emId)
    },
    // 修改提交按钮
    updateInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/em/update', qs.stringify(this.editFrom))
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getMachine()
            this.$refs.editRef.resetFields()
          } else {
            this.$message.error('提交失败')
          }
        }
      })
    },
    // 点击增加按钮，打开对话框
    addButton () {
      this.addDialog = true
    },
    // 增加提交按钮
    addSumbit () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/em/insert', qs.stringify(this.addFrom))
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('添加成功')
            this.getMachine()
            this.$refs.addRef.resetFields()
          } else {
            this.$message.error('添加失败')
          }
        }
      })
    },
    // 删除按钮
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/em/delete?emId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getMachine()
        } else if (res.code === 250) {
          this.$message.warning('设备已有班次安排,无法删除！')
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
