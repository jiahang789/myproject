<template>
<!-- 工艺路线 -->
<div>
     <el-card class="box-card" shadow="always">
         <!-- <el-cascader  :props="{ checkStrictly: true }" clearable></el-cascader> -->
          <el-form :model="form"  :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="产品代号" label-width="100px" prop="productCode">
               <el-input autocomplete="off" placeholder="全部" v-model="form.productCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="零部件代号" label-width="100px" prop="compontCode">
               <el-input autocomplete="off" placeholder="全部" v-model="form.compontCode" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getGo">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
          </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
            <!-- <el-table-column type="selection" width="40"></el-table-column> -->
           <el-table-column label="序号" width="50" prop="rId" align="center"> </el-table-column>
          <el-table-column sortable label="产品代号" width="100" prop="productCode" align="center"> </el-table-column>
          <el-table-column sortable label="零部件代号" width="110" prop="compontCode" align="center"> </el-table-column>
           <el-table-column sortable label="零部件名称" width="110" prop="compontName" align="center"></el-table-column>
          <el-table-column sortable label="工艺类型" width="100" prop="carftType" align="center"> </el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="processId" align="center"> </el-table-column>
           <el-table-column sortable label="工序名称" width="150" prop="processName" align="center"></el-table-column>
          <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"> </el-table-column>
          <el-table-column sortable label="是否转运" width="100" prop="isTransfer" align="center">
               <template slot-scope="scope">
                 <el-switch v-model="scope.row.isTransfer" :active-value= "1" :inactive-value= "0"
                   active-color= "#00A854" inactive-color="#BDBDBD" @change="changeStatus(scope.row)">
                  </el-switch>
               </template>
          </el-table-column>
          <el-table-column sortable label="工位位置" width="100" prop="workStation" align="center"></el-table-column>
            <el-table-column sortable label="班组" width="100" prop="teName" align="center"> </el-table-column>
          <el-table-column sortable label="是否为装配工序" width="130" prop="isFitting" align="center">
               <template slot-scope="scope">
                 <el-switch v-model="scope.row.isFitting" :active-value= "1" :inactive-value= "0"  active-color= "#00A854" inactive-color="#BDBDBD" @change="changeStatus1(scope.row)"></el-switch>
               </template>
          </el-table-column>
           <el-table-column sortable label="是否分厂专检" width="120" prop="checkByFactory" align="center">
                <template slot-scope="scope">
                 <el-switch v-model="scope.row.checkByFactory" :active-value= "1" :inactive-value= "0"  active-color= "#00A854" inactive-color="#BDBDBD"
                    @change="changeStatus2(scope.row)"></el-switch>
               </template>
           </el-table-column>
          <el-table-column sortable label="是否有车间专检" width="130" prop="icheckByPlant" align="center">
               <template slot-scope="scope">
                 <el-switch v-model="scope.row.icheckByPlant" :active-value= "1" :inactive-value= "0"  active-color= "#00A854" inactive-color="#BDBDBD"
                    @change="changeStatus3(scope.row)"></el-switch>
               </template>
          </el-table-column>
           <el-table-column sortable label="是否有自检" width="110" prop="checkBySelf" align="center">
                <template slot-scope="scope">
                 <el-switch v-model="scope.row.checkBySelf" :active-value= "1" :inactive-value= "0"  active-color= "#00A854" inactive-color="#BDBDBD"
                    @change="changeStatus4(scope.row)"></el-switch>
               </template>
           </el-table-column>
            <el-table-column sortable label="是否有抽检" width="110" prop="chenkBySpot" align="center">
                 <template slot-scope="scope">
                 <el-switch v-model="scope.row.chenkBySpot" :active-value= "1" :inactive-value= "0"  active-color= "#00A854" inactive-color="#BDBDBD"
                    @change="changeStatus5(scope.row)"></el-switch>
               </template> </el-table-column>
            <el-table-column sortable label="是否为检验工序" width="130" prop="needCheck" align="center">
                 <template slot-scope="scope">
                 <el-switch v-model="scope.row.needCheck" :active-value= "1" :inactive-value= "0"  active-color= "#00A854" inactive-color="#BDBDBD"
                    @change="changeStatus6(scope.row)"></el-switch>
               </template>
            </el-table-column>
          <el-table-column sortable label="基本合格率" width="110" prop="basePass" align="center"> </el-table-column>
           <el-table-column sortable label="加工工时(元/万粒)" width="150" prop="processTime" align="center"></el-table-column>
          <el-table-column sortable label="转运工时(元/次)" width="130" prop="transferTime" align="center"> </el-table-column>
            <el-table-column sortable label="生产周期预警(h)" width="140" prop="productCycleWarn" align="center"></el-table-column>
            <el-table-column label="工艺卡片" width="160" prop="carftCard" align="center">
                   <template slot-scope="scope">
                 <div class="demo-image__preview">
                    <el-image :src="scope.row.carftCard" style="width: 30px;height: 30px" :preview-src-list="[scope.row.carftCard]" />
                  </div>
            </template>
            </el-table-column>
            <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="update(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.rId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryPath.pageNum"
      :page-size="queryPath.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改工艺路线信息" :visible.sync="editDialog" width="85%">
   <el-form ref="editRef" :model="editFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth" :rules="editRules">
    <el-form-item label="零部件代号" prop="compontCode">
       <el-select  v-model="editFrom.compontCode"  clearable placeholder="请选择零部件代号" @change="getitem">
          <el-option v-for="item in childrenCode" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="产品代号" prop="productCode">
        <el-input autocomplete="off" v-model="editFrom.productCode"></el-input>
    </el-form-item>
    <el-form-item label="零部件名称" prop="compontName">
       <el-input autocomplete="off" v-model="editFrom.compontName"></el-input>
    </el-form-item>
     <el-form-item label="工序名称" prop="processName">
         <el-select  v-model="editFrom.processName"  clearable placeholder="请选择工序名称" @change="getitem3">
          <el-option v-for="item in processName" :key="item.prId" :label="item.name" :value="item.prId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="工序代号" prop="processCode">
      <el-input autocomplete="off" v-model="editFrom.processCode"></el-input>
    </el-form-item>
     <el-form-item label="顺序号" prop="processId">
       <el-input autocomplete="off" v-model="editFrom.processId"></el-input>
    </el-form-item>
       <el-form-item label="工艺类型" prop="carftType">
     <el-select  v-model="editFrom.carftType"  clearable placeholder="请选择工艺类型" @change="getitem1">
          <el-option v-for="item in processStyle" :key="item.carftId" :label="item.carftType" :value="item.carftId"></el-option>
      </el-select>
    </el-form-item>
        <el-form-item label="工位位置" prop="workStation">
        <el-input autocomplete="off" v-model="editFrom.workStation"></el-input>
    </el-form-item>
    <el-form-item label="班组" prop="teName">
     <el-select  v-model="editFrom.teName"  clearable placeholder="请选择班组" @change="getitem2">
          <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
      </el-select>
    </el-form-item>
       <el-form-item label="基本合格率" prop="basePass">
       <el-input autocomplete="off" v-model="editFrom.basePass"></el-input>
    </el-form-item>
       <el-form-item label="加工工时(元/万粒)" prop="processTime">
       <el-input autocomplete="off" v-model="editFrom.processTime"></el-input>
    </el-form-item>
       <el-form-item label="转运工时(元/次)" prop="transferTime">
     <el-input autocomplete="off" v-model="editFrom.transferTime"></el-input>
    </el-form-item>
      <el-form-item label="生产周期预警(h)" prop="productCycleWarn">
      <el-input autocomplete="off" v-model="editFrom.productCycleWarn"></el-input>
    </el-form-item><br>
    <el-form-item label="工艺卡片" prop="carftCard">
       <el-input v-model="editFrom.carftCard" v-if="false"></el-input>
            <el-upload
                    list-type="picture-card"
                     :class="{hide:hideCode}"
                    :show-file-list="false"
                    action="/api/user/insert"
                    :file-list="fileList2"
                    ::limit="1"  name="files"
                    :before-upload="beforeUpload"
                    :on-preview="Preview"
                    :on-remove="Remove"
                    :on-change="handleChange1"
                    :http-request="upload"
                    :auto-upload="false">
                <img v-if="editFrom.carftCard" :src="editFrom.carftCard" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
             <el-dialog :visible.sync="Visible">
                        <img width="100%" :src="Path" alt="">
             </el-dialog>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfo">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
<el-dialog title="请增加工艺路线信息" :visible.sync="addDialog" width="85%">
  <el-form ref="addRef" :model="addFrom" :inline="true" class="demo-form-inline" content="multipart/form-data" :label-width="formLabelWidth" :rules="addRules">
    <el-form-item label="零部件代号" prop="compontCode">
       <el-select  v-model="addFrom.compontCode"  clearable placeholder="请选择零部件类型" @change="getitem">
          <el-option v-for="item in childrenCode" :key="item.componentId" :label="item.componentCode" :value="item.componentId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="产品代号" prop="productCode">
        <el-input autocomplete="off" v-model="addFrom.productCode"></el-input>
    </el-form-item>
    <el-form-item label="零部件名称" prop="compontName">
       <el-input autocomplete="off" v-model="addFrom.compontName"></el-input>
    </el-form-item>
     <el-form-item label="工序名称" prop="processName">
       <el-select  v-model="addFrom.processName"  clearable placeholder="请选择工序名称" @change="getitem3">
          <el-option v-for="item in processName" :key="item.prId" :label="item.name" :value="item.prId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="工序代号" prop="code">
      <el-input autocomplete="off" v-model="addFrom.code"></el-input>
    </el-form-item>
     <el-form-item label="顺序号" prop="processId">
       <el-input autocomplete="off" v-model="addFrom.processId"></el-input>
    </el-form-item>
       <el-form-item label="工艺类型" prop="carftType">
       <el-select  v-model="addFrom.carftType"  clearable placeholder="请选择工艺类型" @change="getitem1">
          <el-option v-for="item in processStyle" :key="item.carftId" :label="item.carftType" :value="item.carftId"></el-option>
      </el-select>
    </el-form-item>
        <el-form-item label="工位位置" prop="workStation">
        <el-input autocomplete="off" v-model="addFrom.workStation"></el-input>
    </el-form-item>
    <el-form-item label="班组" prop="teId">
    <el-select  v-model="addFrom.teId"  clearable placeholder="请选择班组" @change="getitem2">
          <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
      </el-select>
    </el-form-item>
       <el-form-item label="基本合格率" prop="basePass">
       <el-input autocomplete="off" v-model="addFrom.basePass"></el-input>
    </el-form-item>
       <el-form-item label="加工工时(元/万粒)" prop="processTime">
       <el-input autocomplete="off" v-model="addFrom.processTime"></el-input>
    </el-form-item>
       <el-form-item label="转运工时(元/次)" prop="transferTime">
     <el-input autocomplete="off" v-model="addFrom.transferTime"></el-input>
    </el-form-item>
      <el-form-item label="生产周期预警(h)" prop="productCycleWarn">
      <el-input autocomplete="off" v-model="addFrom.productCycleWarn"></el-input>
    </el-form-item><br>
    <el-form-item label="工艺卡片" prop="carftCard">
      <el-input v-model="addFrom.carftCard" v-if="false"></el-input>
            <el-upload
                    list-type="picture-card"
                     :class="{hide:hideCode}"
                    :show-file-list="false"
                    action="/api/user/insert"
                    :file-list="fileList2"
                    ::limit="1"  name="files"
                    :before-upload="beforeUpload"
                    :on-preview="Preview"
                    :on-remove="Remove"
                    :on-change="handleChange"
                    :http-request="upload"
                    :auto-upload="false">
                <img v-if="addFrom.carftCard" :src="addFrom.carftCard" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
             <el-dialog :visible.sync="Visible">
                        <img width="100%" :src="Path" alt="">
             </el-dialog>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="addInfo()">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'path',
  data () {
    return {
      form: {
        productCode: '',
        compontCode: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      processName: [],
      group: [],
      processStyle: [],
      childrenCode: [],
      tableData: [],
      queryPath: {
        rId: '',
        productCode: '',
        compontCode: '',
        compontName: '',
        carftType: '',
        processId: '',
        processName: '',
        processCode: '',
        isTransfer: '',
        workStation: '',
        teId: '',
        isFitting: '',
        checkByFactory: '',
        icheckByPlant: '',
        checkBySelf: '',
        chenkBySpot: '',
        needCheck: '',
        basePass: '',
        processTime: '',
        transferTime: '',
        productCycleWarn: '',
        carftCard: '',
        pageNum: 1, // 当前页码
        pageSize: 8 // 每页条数
      },
      addFrom: {
        compontCode: '',
        productCode: '',
        compontName: '',
        processName: '',
        code: '',
        processId: '',
        carftType: '',
        workStation: '',
        teName: '',
        basePass: '',
        processTime: '',
        transferTime: '',
        productCycleWarn: '',
        carftCard: ''
      },
      editFrom: {
        compontCode: '',
        productCode: '',
        compontName: '',
        processName: '',
        processCode: '',
        processId: '',
        carftType: '',
        workStation: '',
        teName: '',
        basePass: '',
        processTime: '',
        transferTime: '',
        productCycleWarn: '',
        carftCard: ''
      },
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '170px',
      fileList2: [], // 存放需要显示的图片的名字和路径
      carftCard: [],
      limitCode: 1,
      hideCode: false,
      imageUrl: '',
      Visible: false,
      Path: '',
      dialogVisible: false,
      addRules: {
        productCode: [
          { required: true, message: '只能输入产品代号，不能为空', trigger: 'blur' }
        ],
        compontName: [
          { required: true, message: '只能输入零部件名称，不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '只能输入工序代号，不能为空', trigger: 'blur' }
        ],
        processId: [
          { required: true, message: '只能输入顺序号，不能为空', trigger: 'blur' }
        ],
        workStation: [
          { required: true, message: '只能输入工位位置，不能为空', trigger: 'blur' }
        ],
        basePass: [
          { required: true, message: '只能输入百分数，最大为100%', trigger: 'blur' }
        ],
        processTime: [
          { required: true, message: '只能输入数字，保留三位小数', trigger: 'blur' }
        ],
        transferTime: [
          { required: true, message: '只能输入数字，保留三位小数', trigger: 'blur' }
        ],
        productCycleWarn: [
          { required: true, message: '只能输入数字，保留二位小数', trigger: 'blur' }
        ]
      },
      editRules: {
        productCode: [
          { required: true, message: '只能输入产品代号，不能为空', trigger: 'blur' }
        ],
        compontName: [
          { required: true, message: '只能输入零部件名称，不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '只能输入工序代号，不能为空', trigger: 'blur' }
        ],
        processId: [
          { required: true, message: '只能输入顺序号，不能为空', trigger: 'blur' }
        ],
        workStation: [
          { required: true, message: '只能输入工位位置，不能为空', trigger: 'blur' }
        ],
        basePass: [
          { required: true, message: '只能输入百分数，最大为100%', trigger: 'blur' }
        ],
        processTime: [
          { required: true, message: '只能输入数字，保留三位小数', trigger: 'blur' }
        ],
        transferTime: [
          { required: true, message: '只能输入数字，保留三位小数', trigger: 'blur' }
        ],
        productCycleWarn: [
          { required: true, message: '只能输入数字，保留二位小数', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getPath()
  },
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getGo () {
      const res = await getData('/routing/doSelect', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 获取表格数据
    async getPath () {
      const res = await getData('/routing/selectAll', this.queryPath)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    // 图片提交
    async upload () {
      const formData = new FormData()
      formData.append('file', this.uploadFile)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const res = await postData('/routing/doInsert', formData, config)
      console.log(res)
    },
    // 处理图片预览效果
    Preview (file) {
      this.Path = file.url
      this.Visible = true
    },
    Remove (file, fileList) {
      if (fileList.length === 0) {
        this.addFrom.carftCard = [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
      this.hideCode = fileList.length >= this.limitCode
    },
    handleChange (file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        this.uploadImgToBase64(file.raw).then((data) => {
          this.addFrom.carftCard = data.result
        })
      } else {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
    },
    handleChange1 (file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        this.uploadImgToBase64(file.raw).then((data) => {
          this.editFrom.carftCard = data.result
        })
      } else {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
    },
    uploadImgToBase64 (file) {
      // 核心方法，将图片转成base64字符串形式
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          // 图片转base64完成后返回reader对象
          resolve(reader)
        }
        reader.onerror = reject
      })
    },
    beforeUpload (file) {
      return true
    },
    // handleSuccess (response, file, fileList) {
    //   this.$success('上传成功')
    // },
    // handleError () {
    //   this.$error('上传失败,请重新上传图片!')
    // },
    // handleBeforeUpload (file) {
    //   const isImage = file.type.includes('image')
    //   if (!isImage) {
    //     this.$message.error('上传文件类型必须是图片!')
    //   }
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isLt2M) {
    //     this.$message.error('上传图片大小不能超过 2MB!')
    //   }
    //   return isImage && isLt2M
    // },
    // handleProgress (event, file, fileList) {
    //   this.loading = true //  上传时执行loading事件
    // },
    // 点击修改出现的对话框
    update (data) {
      this.editDialog = true
      this.editFrom = JSON.parse(JSON.stringify(data))
      this.getPath(data.rId)
    },
    // 修改提交
    editInfo () {
      var qs = require('querystring')
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/routing/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getPath()
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
      const res = await getData('/routing/insertMsg')
      if (res.code === 200) {
        this.childrenCode = res.data.bomCode
        this.processStyle = res.data.carftType
        this.group = res.data.team
        this.processName = res.data.Professions
      }
    },
    getitem (val) {
      this.childrenCode.find((item) => {
        if (item.componentId === this.addFrom.compontCode) {
          item.componentId = item.bomCode
          this.addFrom.productCode = item.componentId
          item.componentId = item.componentNam
          this.addFrom.compontName = item.componentId
        }
      })
    },
    getitem3 (val) {
    //   this.title = this.sonn.find(item => item.bomNameId === bomNameId)
      // val即是传进来的id值，也即value值
      this.processName.find((item) => {
        if (item.prId === this.addFrom.processName) {
          item.prId = item.code
          this.addFrom.code = item.prId
        }
      })
    },
    getitem1 (val) {
      this.processStyle.find(item => item.carftId === val)
    },
    getitem2 (val) {
      this.group.find(item => item.teId === val)
    },
    // 打开增加按钮对话框
    addButton () {
      this.addDialog = true
    },
    // 增加提交按钮
    addInfo () {
      var qs = require('querystring')
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/routing/doInsert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getPath()
            this.$refs.addRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
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
        const res = await delData('/routing/delete?rId=' + id)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getPath()
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
    // 分页
    handleSizeChange (val) {
      this.queryPath.pageSize = val
      this.getPath()
    },
    handleCurrentChange (val) {
      this.queryPath.pageNum = val
      this.getPath()
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
    changeStatus (pathInfo) {
      let flag = '关闭'
      if (pathInfo.isTransfer) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '此转运过程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/routing/isTransfer?rId=' + pathInfo.rId + '/' + pathInfo.isTransfer)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        //   this.tableData = res.data
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        pathInfo.isTransfer = !pathInfo.isTransfer
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    changeStatus1 (pathInfo) {
      let flag = '关闭'
      if (pathInfo.isFitting) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '装配工序过程吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/routing/isFitting?rId=' + pathInfo.rId + '/' + pathInfo.isFitting)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        //   this.tableData = res.data
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        pathInfo.isFitting = !pathInfo.isFitting
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    changeStatus2 (pathInfo) {
      let flag = '关闭'
      if (pathInfo.checkByFactory) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '分厂专检过程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/routing/checkByFactory?rId=' + pathInfo.rId + '/' + pathInfo.checkByFactory)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        //   this.tableData = res.data
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        pathInfo.checkByFactory = !pathInfo.checkByFactory
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    changeStatus3 (pathInfo) {
      let flag = '关闭'
      if (pathInfo.icheckByPlant) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '车间专检过程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/routing/icheckByPlant?rId=' + pathInfo.rId + '/' + pathInfo.icheckByPlant)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        //   this.tableData = res.data
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        pathInfo.icheckByPlant = !pathInfo.icheckByPlant
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    changeStatus4 (pathInfo) {
      let flag = '关闭'
      if (pathInfo.checkBySelf) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '自检过程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/routing/checkBySelf?rId=' + pathInfo.rId + '/' + pathInfo.checkBySelf)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        //   this.tableData = res.data
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        pathInfo.checkBySelf = !pathInfo.checkBySelf
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    changeStatus5 (pathInfo) {
      let flag = '关闭'
      if (pathInfo.chenkBySpot) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '抽检过程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/routing/chenkBySpot?rId=' + pathInfo.rId + '/' + pathInfo.chenkBySpot)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        //   this.tableData = res.data
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        pathInfo.chenkBySpot = !pathInfo.chenkBySpot
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    changeStatus6 (pathInfo) {
      let flag = '关闭'
      if (pathInfo.needCheck) {
        flag = '打开'
      }
      this.$confirm('您是否要' + flag + '检验工序过程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // async和await分别表示异步和等待，语义更加明确
      }).then(async () => {
        const res = await postData('/routing/needCheck?rId=' + pathInfo.rId + '/' + pathInfo.needCheck)
        if (res.code === 200) {
          this.$message.success('操作成功！')
        //   this.tableData = res.data
        } else {
          this.$message.error('操作失败！')
        }
        // this.value = !this.value
      }).catch(() => {
        pathInfo.needCheck = !pathInfo.needCheck
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
input[type="file"] {
        display: none;
    }
  .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    // .avatar-uploader-icon {
    //     font-size: 28px;
    //     color: #8c939d;
    //     width: 178px;
    //     height: 178px;
    //     line-height: 178px;
    //     text-align: center;
    // }
    .avatar {
        width: 145px;
        height: 145px;
        display: block;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
    }
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
