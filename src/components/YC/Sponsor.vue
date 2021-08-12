<template>
<!-- 异常发起 -->
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="部门" label-width="70px" prop="teId">
               <!-- <el-select  v-model="form.teId"  clearable placeholder="请选择部门">
                    <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
                </el-select>-->
                <el-input autocomplete="off" placeholder="全部" v-model="form.teId" clearable></el-input>
            </el-form-item>
             <el-form-item label="异常类型" label-width="70px" prop="emId">
                <!--<el-select  v-model="form.emId"  clearable placeholder="请选择异常类型" >
                    <el-option v-for="item in machine" :key="item.exceptionType" :label="item.exceptionType" :value="item.exceptionType"></el-option>
                </el-select>-->
                <el-input autocomplete="off" placeholder="全部" v-model="form.emId" clearable></el-input>
            </el-form-item>
            <el-form-item label="发起时间" label-width="70px" prop="value1">
              <el-date-picker
                  v-model="value1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-button type="success" size="mini" style=" margin-top:7px" @click="info">搜索</el-button>
            <el-button type="success" size="mini" style=" margin-left:0%;margin-top:0px" @click="faqi">发起异常</el-button>
          </el-form>
          <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column label="序号" width="50" type="index" align="center"> </el-table-column>
          <el-table-column sortable label="设备" width="130" prop="equipMent" align="center"> </el-table-column>
          <el-table-column sortable label="异常类型" width="130" prop="exceptionType" align="center"></el-table-column>
          <el-table-column sortable label="异常描述" width="120" prop="exceptionDecs" align="center"> </el-table-column>
          <el-table-column sortable  label="发起时间" width="170" prop="initTime" align="center"> </el-table-column>
          <el-table-column sortable  label="处理部门" width="170" prop="section" align="center"> </el-table-column>
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
    <!--对话框-->
    <el-dialog title="异常发起" :visible.sync="dialogFormVisible">
      <el-form :model="form12" :inline="true">
        <el-form-item label="异常类型" label-width="70px">
                <el-select  v-model="form12.name"  clearable placeholder="请选择异常类型" >
                    <el-option v-for="item in machine" :key="item.exceptionType" :label="item.exceptionType" :value="item.exceptionType"></el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="选择设备" label-width="70px">
         <el-select  v-model="form12.region"  clearable placeholder="请选择设备" >
                    <el-option v-for="item in shebei" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
    </el-form-item>
    <el-input type="textarea"  :rows="2" placeholder="请输入异常说明" v-model="form12.textarea"> </el-input>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisiblesub">确 定</el-button>
  </div>
</el-dialog>
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
        teId: '',
        emId: '',
        value1: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数:
      },
      count: 0,
      add: {
        dtId: '',
        troubelTips: ''
      },
      group: [
        {
          teId: '库房',
          teDescribe: '库房'
        }, {
          teId: '车间',
          teDescribe: '车间'
        }
      ],

      value1: '',
      machine: [],
      style: [],
      tableData: [],
      dialogFormVisible: false, // 对话框
      form12: {
        name: '', // 异常类型
        region: '', // 设备
        textarea: '', // 描述说明
        InitPerson: '', // 发起人
        InitTime: '', // 发起时间
        section: '' // 处理部门
      },
      formLabelWidth: '120px',
      shebei: [
        {
          id: '设备1',
          name: '设备1'
        },
        {
          id: '设备2',
          name: '设备2'
        }
      ],
      textarea: ''
    }
  },
  created () {
    this.getSelect()
    this.info()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
  // 异常发起
    faqi () {
      this.dialogFormVisible = true
    },
    // 提交发起的异常
    async dialogFormVisiblesub () {
      if (this.form12.name.length === 0) {
        return
      }
      if (this.form12.region.length === 0) {
        return
      }

      const name = window.sessionStorage.getItem('token')
      this.form12.InitPerson = name
      this.form12.section = '库房'
      await postData('/exception/insertInit', this.form12)
      this.dialogFormVisible = false
      this.form12.name = ''
      this.form12.region = ''
      this.form12.textare = ''
      this.info()
    },

    // 查询表格数据

    async info () {
      if (this.value1 == null) {
        this.value1 = ''
      }
      this.form.value1 = this.value1

      const res = await postData('/exception/InitSelsct', this.form)
      this.tableData = res.data.data
      this.count = res.data.count
      console.log(res)
    },
    // 分页
    handleSizeChange (val) {
      // 每页条数
      // this.form.pageSize = val
      // this.info()
    },
    handleCurrentChange (val) {
      // 当前第几页
      this.form.pageNum = val
      this.info()
    },
    // 删除
    async deleteRow (a, b) {
      await postData('/exception/settingAlldelete', b[a])
      this.info()
    },
    // 获取异常类型下拉框数据
    async getSelect () {
      const res = await getData('/exception/teSelectList')
      this.machine = res.data
    },
    getitem1 (val) {
      this.machine.find(item => item.emId === val)
    },
    getitem2 (val) {
      this.style.find(item => item.dtId === val)
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
    width: 209px;
}
     /deep/.el-select .el-input__inner {
  width: 207px;

}
</style>
