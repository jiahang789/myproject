<template>
<div>
     <el-card class="box-card" shadow="always">
        <el-form :model="form"  :inline="true" class="demo-form-inline"  label-width="100px">
            <el-form-item label="姓名:" label-width="100px" prop="userName">
               <el-input autocomplete="off" v-model="form.userName" clearable></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top: 7px" @click="getTitle">搜索</el-button>
             <el-button type="success" icon="el-icon-plus" size="mini" @click="addButton">增加</el-button>
            <!-- <el-form-item label="编号" label-width="100px" prop="userNumber">
            <el-input autocomplete="off" v-model="from.userNumber"></el-input>
            </el-form-item> -->
            <!-- <el-button type="primary" icon="el-icon-search" size="mini" @click="getuserNumber()">搜索</el-button> -->
        </el-form>
        <el-table :data="tableData" style="width: 91%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column label="序号" width="80" prop="userId" align="center"> </el-table-column>
          <el-table-column sortable label="人员编号" width="100" prop="userNumber" align="center"> </el-table-column>
           <el-table-column sortable label="性别" width="100" prop="userGender" align="center"></el-table-column>
          <el-table-column sortable label="姓名" width="100" prop="userName" align="center"> </el-table-column>
          <el-table-column  sortable label="职责" width="100" prop="dutyName" align="center"> </el-table-column>
           <el-table-column sortable label="角色" width="100" prop="roleName" align="center"></el-table-column>
          <el-table-column sortable label="所属班组" width="110" prop="teName" align="center"> </el-table-column>
          <el-table-column sortable label="资质证明" width="180" prop="prove" align="center">
            <template slot-scope="scope">
                 <div class="demo-image__preview">
                    <el-image :src="scope.row.prove" style="width: 30px;height: 30px" :preview-src-list="[scope.row.prove]" />
                  </div>
            </template>
          </el-table-column>
            <el-table-column label="操作" width="230" align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDuty(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.userId)">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
   <el-pagination background
     @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryUser.pageNum"
      :page-size="queryUser.pageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </el-card>
    <!-- 点击打开修改对话框 -->
    <el-dialog title="请修改人员信息" :visible.sync="editDialog" width="50%">
 <el-form ref="editRef" :model="editFrom" :inline="true" class="demo-form-inline" :label-width="formLabelWidth" :rules="editRules">
     <el-form-item label="人员编号" prop="userNumber">
      <el-input autocomplete="off" v-model="editFrom.userNumber"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="userGender">
            <el-radio v-model="editFrom.userGender" label="男">男</el-radio>
            <el-radio v-model="editFrom.userGender" label="女">女</el-radio>
    </el-form-item>
    <el-form-item label="姓名" prop="userName">
     <el-input autocomplete="off" v-model="editFrom.userName"></el-input>
    </el-form-item>
     <el-form-item label="职责" prop="dutyId">
       <el-select v-model="editFrom.dutyId"  clearable  @change="getitem1">
          <el-option v-for="item in duty" :key="item.dutyId" :label="item.dutyName" :value="item.dutyId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="角色" prop="roleId">
       <el-select v-model="editFrom.roleId"  clearable  @change="getitem2">
          <el-option v-for="item in role" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属班组" prop="teId">
       <el-select v-model="editFrom.teId"  clearable  @change="getitem3">
          <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="资质证明" ref="uploadElement" prop="prove">
        <el-input v-model="editFrom.prove" v-if="false"></el-input>
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
                <img v-if="editFrom.prove" :src="editFrom.prove" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
             <el-dialog :visible.sync="Visible">
                        <img width="100%" :src="Path" alt="">
             </el-dialog>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editInfoUser">确 定</el-button>
  </div>
</el-dialog>
 <!-- 点击打开增加对话框 -->
    <el-dialog title="请增加班组信息" :visible.sync="addDialog" width="50%" >
  <el-form ref="addRef" :model="addFrom" :inline="true" class="demo-form-inline"
  content="multipart/form-data" :label-width="formLabelWidth" :rules="addRules">
     <el-form-item label="人员编号" prop="userNumber">
      <el-input autocomplete="off" v-model="addFrom.userNumber"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="userGender">
        <el-radio v-model="addFrom.userGender" label="1">男</el-radio>
        <el-radio v-model="addFrom.userGender" label="2">女</el-radio>
    </el-form-item>
    <el-form-item label="姓名" prop="userName">
     <el-input autocomplete="off" v-model="addFrom.userName"></el-input>
    </el-form-item>
     <el-form-item label="职责" prop="dutyId">
       <el-select v-model="addFrom.dutyId"  clearable placeholder="请选择子件类型" @change="getitem1">
          <el-option v-for="item in duty" :key="item.dutyId" :label="item.dutyName" :value="item.dutyId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="角色" prop="roleId">
      <el-select v-model="addFrom.roleId"  clearable placeholder="请选择子件类型" @change="getitem2">
          <el-option v-for="item in role" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属班组" prop="teId">
      <el-select v-model="addFrom.teId"  clearable placeholder="请选择子件类型" @change="getitem3">
          <el-option v-for="item in group" :key="item.teId" :label="item.teDescribe" :value="item.teId"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="资质证明" ref="uploadElement" prop="prove">
        <el-input v-model="addFrom.prove" v-if="false"></el-input>
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
                <img v-if="addFrom.prove" :src="addFrom.prove" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
             <el-dialog :visible.sync="Visible">
                        <img width="100%" :src="Path" alt="">
             </el-dialog>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click.native="addInfoUser()">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { getData, postData, delData } from '../../api/index'
export default {
  components: {},
  name: 'person',
  data () {
    return {
      fileList2: [], // 存放需要显示的图片的名字和路径
      prove: [],
      limitCode: 1,
      hideCode: false,
      form: {
        userName: '',
        pageNum: 1, // 当前页码
        pageSize: 7 // 每页条数
      },
      role: [],
      duty: [],
      group: [],
      tableData: [],
      queryUser: {
        userId: '',
        userNumber: '',
        userGender: '',
        userName: '',
        dutyName: '',
        roleName: '',
        teName: '',
        pageNum: 1, // 当前页码
        pageSize: 8 // 每页条数
      },
      count: 0,
      editDialog: false,
      addDialog: false,
      formLabelWidth: '120px',
      // 增加
      addFrom: {
        userNumber: '',
        userGender: '',
        userName: '',
        dutyId: '',
        roleId: '',
        teId: '',
        prove: undefined
      },
      editFrom: {
        userNumber: '',
        userGender: '',
        userName: '',
        dutyId: '',
        roleId: '',
        teId: '',
        prove: ''
      },
      imageUrl: '',
      Path: '',
      Visible: false,
      addRules: {
        userNumber: [
          { required: true, message: '请输入人员编号，其不能重复', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入姓名，其不能重复', trigger: 'blur' }
        ]
        // prove: [
        //   {required: true, message: '请上传图片', trigger: 'blur'}
        // ]

      },
      editRules: {
        userNumber: [
          { required: true, message: '请输入人员编号，其不能重复', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入姓名，其不能重复', trigger: 'blur' }
        ],
        prove: [
          {required: true, message: '请上传图片', trigger: 'blur'}
        ]

      }
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {
    this.getUser()
  },
  watch: {
  },
  computed: {
  },
  methods: {
    // 图片提交
    async upload () {
      const formData = new FormData()
      formData.append('file', this.uploadFile)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const res = await postData('/user/insert', formData, config)
      console.log(res)
    },
    // 处理图片预览效果
    Preview (file) {
      this.Path = file.url
      this.Visible = true
    },
    Remove (file, fileList) {
      if (fileList.length === 0) {
        this.addFrom.prove = [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
      this.hideCode = fileList.length >= this.limitCode
    },
    // 获取表格数据
    async getUser () {
      const res = await getData('/user/select', this.queryUser)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error(res.msg)
      }
    },
    handleChange (file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        this.uploadImgToBase64(file.raw).then((data) => {
          this.addFrom.prove = data.result
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
          this.editFrom.prove = data.result
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
    // 搜索按钮
    async getTitle () {
      const res = await getData('/user/selectUserName', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 打开增加对话框
    addButton () {
      this.addDialog = true
    },
    addInfoUser () {
    //   const formData = new FormData()
    //   formData.append('file', this.uploadFile)
      var qs = require('querystring')
      //   let config = {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
        //   this.$refs.upload.submit()
          const res = await postData('/user/insert', qs.stringify(this.addFrom))
          console.log(res)
          if (res.code === 200) {
            this.addDialog = false
            this.$message.success('提交成功')
            this.getUser()
            this.$refs.addRef.resetFields()
          } else if (res.code === 250) {
            this.$message.warning(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 打开修改按钮
    editDuty (data) {
      this.editDialog = true
      this.editFrom = data
      this.getUser(data.userId)
    },
    // 修改提交按钮
    editInfoUser () {
      var qs = require('querystring')
      if (this.editFrom.userGender === '男') { this.editFrom.userGender = 1 } else { this.editFrom.userGender = 0 }
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        if (valid) {
          const res = await postData('/user/update', qs.stringify(this.editFrom))
          console.log(res)
          if (res.code === 200) {
            this.editDialog = false
            this.$message.success('提交成功')
            this.getUser()
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
      const res = await postData('/user/selectList')
      if (res.code === 200) {
        this.duty = res.data.dutyId
        this.role = res.data.roleId
        this.group = res.data.teId
      }
    },
    // 获取下拉框的值
    getitem1 (val) {
      // val即是传进来的id值，也即value值
      var obj = {}
      obj = this.duty.find((item) => {
        return item.dutyId === val
      })
      console.log(obj.dutyName)
      console.log('id的值为：' + val)
    },
    getitem2 (val) {
      // val即是传进来的id值，也即value值
      var obj = {}
      obj = this.role.find((item) => {
        return item.roleId === val
      })
      console.log(obj.roleName)
      console.log('id的值为：' + val)
    },
    getitem3 (val) {
      // val即是传进来的id值，也即value值
      var obj = {}
      obj = this.group.find((item) => {
        return item.teId === val
      })
      console.log(obj.teDescribe)
      console.log('id的值为：' + val)
    },
    // 删除按钮
    del (userId) {
      this.$confirm('此操作将永久删除人员信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData('/user/delete?userId=' + userId)
        if (res.code === 200) {
          this.$message.success('删除成功！')
          this.getUser()
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
      this.queryUser.pageSize = val
      this.getUser()
    },
    handleCurrentChange (val) {
      this.queryUser.pageNum = val
      this.getUser()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
// input[type="file"] {
//         display: none;
//     }
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
.table-td-thumb {
    display: block;
    margin: auto;
    width: 50px;
    height: 50px;
}
.button{
    position: absolute;
    top: 27px;
    left: 1050px;
}
.select{
    width: 300px;
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
