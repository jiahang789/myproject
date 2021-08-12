<template>
<div>
     <el-card class="box-card" shadow="always">
         <!-- <el-cascader ref="myCascader"  filterable clearable v-model="value" :options="options" expand-trigger="hover" :props="cascaderProps" placeholder="请选择" change-on-select @change="handleChange" ></el-cascader> -->
          <el-form :model="form"  :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="父件代号" label-width="100px" prop="value">
               <el-input autocomplete="off" v-model="form.value" placeholder="全部" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo()">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
          </el-form>
        <el-table :data="bomData" style="width: 85%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border :default-sort = "{prop: 'date', order: 'descending'}">
            <!-- <el-table-column type="selection" width="40"></el-table-column> -->
            <el-table-column label="序号" width="80" prop="bomId" align="center"> </el-table-column>
          <el-table-column  sortable label="父件代号" width="100" prop="bomParent" align="center"> </el-table-column>
          <el-table-column  sortable label="子件类型" width="126" prop="childernType" align="center"> </el-table-column>
           <el-table-column  sortable label="子件代号" width="100" prop="childernCode" align="center"></el-table-column>
          <el-table-column  sortable label="子件名称" width="100" prop="childernName" align="center"> </el-table-column>
          <el-table-column  sortable label="准配基数" width="100" prop="ratio" align="center"> </el-table-column>
           <el-table-column  sortable label="子件单位" width="100" prop="ends" align="center"></el-table-column>
          <el-table-column  sortable label="定额数量" width="100" prop="quotaData" align="center"> </el-table-column>
          <!-- <el-table-column  sortable label="设备" width="150" prop="emId" align="center"></el-table-column> -->
            <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateBom(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.bomId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="fromBom.pageNum"
      :page-size="fromBom.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改产品BOM数据信息" :visible.sync="editDialog" width="50%"  >
  <el-form ref="editInfoRef" :model="editFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth" :rules="editRules">
    <el-form-item label="父件代号"  prop="bomParent">
       <el-select  v-model="editFrom.bomParent"  clearable placeholder="请选择父件代号" @change="getitem1">
          <el-option v-for="item in personNum" :key="item.componentId" :label="item.bomCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="子件代号"  prop="childernCode">
        <el-select  v-model="editFrom.childernCode"  clearable placeholder="请选择子件代号" @change="getitem2">
          <el-option v-for="item in sonNum" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="子件类型"  prop="childernType">
       <el-input  v-model="editFrom.childernType" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="子件名称"  prop="childernName">
        <el-input  v-model="editFrom.childernName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="准配基数"  prop="ratio">
      <el-input  v-model="editFrom.ratio" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="子件单位"  prop="ends">
     <el-input autocomplete="off"  v-model="editFrom.ends"></el-input>
    </el-form-item>
     <el-form-item label="定额数量" prop="quotaData">
          <el-input autocomplete="off"  v-model="editFrom.quotaData"></el-input>
     </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfoBom">提 交</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
<el-dialog title="请增加产品BOM信息" :visible.sync="addDialog" width="50%" >
  <el-form ref="addInfoRef" :model="addFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth" :rules="addRules">
    <el-form-item label="父件代号"  prop="bomParent">
       <el-select  v-model="addFrom.bomParent"  clearable placeholder="请选择父件代号" @change="getitem1()">
          <el-option v-for="item in personNum" :key="item.componentId" :label="item.bomCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="子件代号"  prop="childernCode">
        <el-select  v-model="addFrom.childernCode"  clearable placeholder="请选择子件代号" @change="getitem2()">
          <el-option v-for="item in sonNum" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="子件类型"  prop="childernType">
       <el-input  v-model="addFrom.childernType" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="子件名称"  prop="chlidernName">
        <el-input  v-model="addFrom.chlidernName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="准配基数"  prop="ratio">
      <el-input  v-model="addFrom.ratio" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="子件单位"  prop="ends">
     <el-input autocomplete="off"  v-model="addFrom.ends"></el-input>
    </el-form-item>
     <el-form-item label="定额数量"  prop="quotaData">
          <el-input autocomplete="off"  v-model="addFrom.quotaData"></el-input>
     </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfoBom">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'product_bom',
  data () {
    return {
      sonNum: [],
      personNum: [],
      bomData: [],
      //   value: [],
      //   options: [],
      fromBom: {
        bomId: '',
        bomParent: '',
        childernType: '',
        childernCode: '',
        childernName: '',
        ratio: '',
        ends: '',
        quotaData: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      },
      form: {
        value: '',
        pageNum: 1, // 当前页码
        pageSize: 10// 每页条数
      },
      count: 0, // 总条数
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      dialogVisible: false,
      // 增加对话框数据
      addFrom: {
        bomParent: '',
        childernCode: '',
        childernType: '',
        chlidernName: '',
        ratio: '',
        ends: '',
        quotaData: ''
      },
      // 修改对话框显示数据
      editFrom: {
        bomParent: '',
        childernCode: '',
        childernType: '',
        childernName: '',
        ratio: '',
        ends: '',
        quotaData: ''
      },
      addRules: {
        childernType: [
          { required: true, message: '请输入子件类型，其不能重复', trigger: 'blur' }
        ],
        chlidernName: [
          { required: true, message: '请输入子件名称，其不能重复', trigger: 'blur' }
        ],
        ratio: [
          { required: true, message: '请输入准配基数，其不能重复', trigger: 'blur' }
        ],
        ends: [
          { required: true, message: '请输入子件单位，其不能重复', trigger: 'blur' }
        ],
        quotaData: [
          { required: true, message: '请输入定额数量，其不能重复', trigger: 'blur' }
        ]
      },
      editRules: {
        childernType: [
          { required: true, message: '请输入子件类型，其不能重复', trigger: 'blur' }
        ],
        chlidernName: [
          { required: true, message: '请输入子件名称，其不能重复', trigger: 'blur' }
        ],
        ratio: [
          { required: true, message: '请输入准配基数，其不能重复', trigger: 'blur' }
        ],
        ends: [
          { required: true, message: '请输入子件单位，其不能重复', trigger: 'blur' }
        ],
        quotaData: [
          { required: true, message: '请输入定额数量，其不能重复', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getBom()
    this.getSelect()
    // this.getParentCateList()
    // this.getRepairItem()
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getGo () {
      const res = await getData('/bom/doselect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.bomData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 点击修改出现的对话框
    updateBom (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getBom(data.bomId)
    },
    // 修改提交
    editInfoBom () {
      var qs = require('querystring')
      this.$refs.editInfoRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/bom/doupdate', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getBom()
            this.$refs.editInfoRef.resetFields()
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
      const res = await getData('/bom/insertMsg')
      if (res.code === 200) {
        this.personNum = res.data.bomCode
        this.sonNum = res.data.componentCode
      }
    },
    // 子件代号
    getitem2 (val) {
      this.sonNum.find((item) => {
        if (item.componentId === this.addFrom.childernCode) {
          this.componentId = item.componentType
          this.addFrom.childernType = this.componentId
        }
      })
    },
    // 父件代号
    getitem1 (val) {
      this.personNum.find(item => item.componentId === val)
    //   this.personNum.find((item) => {
    //     if (item.componentId === this.addFrom.bomParent) {
    //       this.componentId = item.componentType
    //       this.addFrom.childernType = this.componentId
    //     }
    //   })
    },
    // 打开增加按钮对话框
    addButton () {
      this.addDialog = true
    },
    // 增加提交按钮
    addInfoBom () {
      var qs = require('querystring')
      this.$refs.addInfoRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/bom/doinsert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getBom()
            this.$refs.addInfoRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      this.fromBom.pageSize = val
      this.getBom()
    },
    handleCurrentChange (val) {
      this.fromBom.pageNum = val
      this.getBom()
    },
    // 获取表格数据
    async getBom () {
      const res = await getData('/bom/selectAll', this.fromBom)
      if (res.code === 200) {
        this.bomData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 删除按钮
    del (bomId) {
      this.$confirm('此操作将永久删除该产品bom数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/bom/delete?bomId=' + bomId)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getBom()
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
    //   this.xiangshu = val.length
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: 1250px;
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
