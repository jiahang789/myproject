<template>
<div>
     <el-card class="box-card" shadow="always">
          <!-- <el-cascader ref="myCascader"  filterable clearable v-model="value" :options="options" expand-trigger="hover" :props="cascaderProps" placeholder="请选择" change-on-select @change="handleChange" ></el-cascader> -->
           <el-form :model="form"  :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="产品代号" label-width="100px" prop="bomCode">
               <el-input autocomplete="off" placeholder="全部" v-model="form.bomCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="零部件代号" label-width="100px" prop="componentCode">
               <el-input autocomplete="off" placeholder="全部" v-model="form.componentCode" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column label="序号" width="50" prop="componentId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="bomCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件代号" width="110" prop="componentCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件名称" width="110" prop="componentNam" align="center"></el-table-column>
          <el-table-column sortable label="零部件类型" width="110" prop="componentType" align="center"> </el-table-column>
          <el-table-column sortable label="主承制部门" width="110" prop="wsName" align="center"> </el-table-column>
           <el-table-column sortable label="是否打印加工过程卡" width="180"  align="center">
                 <template slot-scope="scope">
                      <el-switch v-model="scope.row.printCard" :active-value= "1" :inactive-value= "0"  active-color= "#00A854" inactive-color="#BDBDBD"
                      @change="changeStatus(scope.row)"></el-switch>
                </template>
           </el-table-column>
          <el-table-column sortable label="内部价格(万元)" width="130" prop="insidePrice" align="center"> </el-table-column>
          <el-table-column sortable label="内转价格(万元)" width="130" prop="transPrice" align="center"></el-table-column>
          <el-table-column sortable label="加工过程卡预警数" width="150" prop="wanrNumber" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateData(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.componentId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryData.pageNum"
      :page-size="queryData.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改产品数据信息" :visible.sync="editDialog" width="50%">
 <el-form ref="editRef" :model="editFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth" :rules="editRules">
     <el-form-item label="产品代号" prop="bomCode">
           <el-input autocomplete="off" v-model="editFrom.bomCode"></el-input>
    </el-form-item>
    <el-form-item label="零部件代号" prop="componentCode">
           <el-input autocomplete="off" v-model="editFrom.componentCode"></el-input>
    </el-form-item>
    <el-form-item label="零部件名称" prop="componentNam">
        <el-input autocomplete="off" v-model="editFrom.componentNam"></el-input>
    </el-form-item>
     <el-form-item label="零部件类型" prop="componentType" >
          <el-select  v-model="editFrom.componentType"  clearable  @change="getitem2">
          <el-option v-for="item in childrenStyle" :key="item.bomTypeId" :label="item.childernType" :value="item.bomTypeId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主承制部门" prop="wsId">
          <el-select  v-model="editFrom.wsId"  clearable @change="getitem3">
          <el-option v-for="item in utin" :key="item.wsId" :label="item.wsName" :value="item.wsId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="内部价格(万元)" prop="insidePrice">
     <el-input autocomplete="off" v-model="editFrom.insidePrice"></el-input>
    </el-form-item>
     <el-form-item label="内转价格(万元)" prop="transPrice">
          <el-input autocomplete="off" v-model="editFrom.transPrice"></el-input>
     </el-form-item>
       <el-form-item label="加工过程卡预警数" prop="wanrNumber">
            <el-input autocomplete="off" v-model="editFrom.wanrNumber"></el-input>
       </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfoData">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加产品数据信息" :visible.sync="addDialog" width="52%">
  <el-form ref="addRef" :model="addFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth" :rules="addRules">
     <el-form-item label="产品代号" prop="bomCode">
           <el-input autocomplete="off" v-model="addFrom.bomCode"></el-input>
    </el-form-item>
    <el-form-item label="零部件代号" prop="componentCode">
           <el-input autocomplete="off" v-model="addFrom.componentCode"></el-input>
    </el-form-item>
    <el-form-item label="零部件名称" prop="bomName">
         <!-- <el-select  v-model="addFrom.bomName"  clearable placeholder="请选择零部件名称" @change="getitem1">
          <el-option v-for="item in childrenName" :key="item.bomNameId" :label="item.chlidernName" :value="item.bomNameId"></el-option>
      </el-select> -->
       <el-input autocomplete="off" v-model="addFrom.bomName"></el-input>
    </el-form-item>
     <el-form-item label="零部件类型" prop="bomType" >
          <el-select  v-model="addFrom.bomType"  clearable placeholder="请选择零部件类型" @change="getitem2">
          <el-option v-for="item in childrenStyle" :key="item.bomTypeId" :label="item.childernType" :value="item.bomTypeId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主承制部门" prop="workShop">
           <el-select  v-model="addFrom.workShop"  clearable placeholder="请选择主承制部门" @change="getitem3">
          <el-option v-for="item in utin" :key="item.wsId" :label="item.wsName" :value="item.wsId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="内部价格(万元)" prop="insidePrice">
     <el-input autocomplete="off" v-model="addFrom.insidePrice"></el-input>
    </el-form-item>
     <el-form-item label="内转价格(万元)" prop="transPrice">
          <el-input autocomplete="off" v-model="addFrom.transPrice"></el-input>
     </el-form-item>
       <el-form-item label="加工过程卡预警数" prop="wanrNumber">
            <el-input autocomplete="off" v-model="addFrom.wanrNumber"></el-input>
       </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfoData">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'product_data',
  data () {
    return {
      form: {
        bomCode: '',
        componentCode: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      childrenStyle: [],
      utin: [],
      tableData: [],
      queryData: {
        componentId: '',
        bomCode: '',
        componentCode: '',
        componentNam: '',
        componentType: '',
        wsId: '',
        printCard: '',
        insidePrice: '',
        transPrice: '',
        wanrNumber: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      //   value: [],
      //   options: [],
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '140px',
      addFrom: {
        bomCode: '',
        componentCode: '',
        bomName: '',
        bomType: '',
        workShop: '',
        insidePrice: '',
        transPrice: '',
        wanrNumber: ''
      },
      editFrom: {
        bomCode: '',
        componentCode: '',
        componentNam: '',
        componentType: '',
        wsId: '',
        insidePrice: '',
        transPrice: '',
        wanrNumber: ''
      },
      addRules: {
        bomCode: [
          { required: true, message: '请输入产品代号，其不能重复', trigger: 'blur' }
        ],
        componentCode: [
          { required: true, message: '请输入零部件代号，其不能重复', trigger: 'blur' }
        ],
        bomName: [
          { required: true, message: '请输入零部件名称，其不能重复', trigger: 'blur' }
        ],
        insidePrice: [
          { required: true, message: '请输入内部价格(万元)，其不能重复', trigger: 'blur' }
        ],
        transPrice: [
          { required: true, message: '请输入内转价格(万元)，其不能重复', trigger: 'blur' }
        ],
        wanrNumber: [
          { required: true, message: '请输入加工过程卡预警数，其不能重复', trigger: 'blur' }
        ]
      },
      editRules: {
        bomCode: [
          { required: true, message: '请输入产品代号，其不能重复', trigger: 'blur' }
        ],
        componentCode: [
          { required: true, message: '请输入零部件代号，其不能重复', trigger: 'blur' }
        ],
        bomName: [
          { required: true, message: '请输入零部件名称，其不能重复', trigger: 'blur' }
        ],
        insidePrice: [
          { required: true, message: '请输入内部价格(万元)，其不能重复', trigger: 'blur' }
        ],
        transPrice: [
          { required: true, message: '请输入内转价格(万元)，其不能重复', trigger: 'blur' }
        ],
        wanrNumber: [
          { required: true, message: '请输入加工过程卡预警数，其不能重复', trigger: 'blur' }
        ]
      }
    //   cascaderProps: {
    //     children: 'children',
    //     label: 'label',
    //     value: 'value',
    //     checkStrictly: true
    //   }
    }
  },
  created () {
    this.getData()
    this.getSelect()
    // this.getParentCateList()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getGo () {
      const res = await getData('/compent/doSelect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // handleChange (val) {
    //   let pathvalue = this.$refs.myCascader.getCheckedNodes()[0]
    //   let value = pathvalue.value
    //   console.log(value)
    // },
    // async getParentCateList () {
    //   const res = await getData('/bom/msgSelect', {params: { type: 2 }})
    //   console.log(res)
    //   if (res.code === 200) {
    //     this.options = res.data
    //   }
    // },
    // 打开增加按钮对话框
    addButton () {
      this.addDialog = true
    },
    // 增加提交按钮
    addInfoData () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/compent/doInsert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getData()
            this.$refs.addRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 获取表格数据
    async getData () {
      const res = await getData('/compent/selectAll', this.queryData)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 点击修改出现的对话框
    updateData (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getData(data.componentId)
    },
    // 修改提交
    editInfoData () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/compent/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getData()
            this.$refs.editRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 获取下拉框数据
    async getSelect () {
      const res = await getData('/compent/insertMsg')
      if (res.code === 200) {
        // this.childrenName = res.data.bomName
        this.childrenStyle = res.data.bomType
        this.utin = res.data.workShop
      }
    },
    getitem2 (val) {
      // val即是传进来的id值，也即value值
      var obj = {}
      obj = this.childrenStyle.find((item) => {
        return item.bomTypeId === val
      })
      console.log(obj.childernType)
      console.log('id的值为：' + val)
    },
    getitem3 (val) {
      // val即是传进来的id值，也即value值
      var obj = {}
      obj = this.utin.find((item) => {
        return item.wsId === val
      })
      console.log(obj.wsName)
      console.log('id的值为：' + val)
    },
    // 分页
    handleSizeChange (val) {
      this.queryData.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.queryData.pageNum = val
      this.getData()
    },
    // 删除按钮
    del (componentId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/compent/delete?componentId=' + componentId)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getData()
        } else if (res.code === 250) {
          this.$message.warning(res.msg)
        } else if (res.code === 250) {
          this.$message.warning(res.msg)
        } else {
          this.$message.error(res.msg)
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
    },
    // 状态按钮
    changeStatus (dataInfo) {
      let flag = '不打印'
      if (dataInfo.printCard) {
        flag = '打印'
      }
      this.$confirm('您是否要' + flag + '此加工过程卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/compent/print?componentId=' + dataInfo.componentId + '/' + dataInfo.printCard)
        console.log(res)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        //   this.tableData = res.data
          // this.equns = res.data
        } else {
          this.$message.error('操作失败！')
        }
      }).catch(() => {
        dataInfo.printCard = !dataInfo.printCard
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
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
