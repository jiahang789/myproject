<template>
<!-- 生产反馈 -->
<div>
       <!-- <div>
    <el-page-header @back="goBack" content=""></el-page-header></div> -->
      <el-card class="box-card" shadow="always">
              <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px">
                    <el-form-item label="批次号" prop="batchNumber">
                         <el-input autocomplete="off" v-model="form.batchNumber" clearable></el-input>
                    </el-form-item>
                      <el-button type="primary" icon="el-icon-search" size="mini" style="margin-top:7px" @click="getGo">搜索</el-button>
              </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark"  @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" prop="ptId" align="center"> </el-table-column>
          <el-table-column sortable label="批次号" width="120" prop="batchNumber" align="center"> </el-table-column>
             <el-table-column sortable label="产品代号" width="100" prop="tips" align="center"> </el-table-column>
           <el-table-column sortable label="零部件代号" width="110" prop="componmentCode" align="center"></el-table-column>
            <el-table-column sortable label="零部件名称" width="110" prop="componName" align="center"></el-table-column>
          <el-table-column sortable label="顺序号" width="90" prop="processId" align="center"></el-table-column>
            <el-table-column sortable label="工序代号" width="100" prop="processCode" align="center"></el-table-column>
          <el-table-column sortable label="工序名称" width="110" prop="processName" align="center"> </el-table-column>
          <el-table-column sortable label="状态" width="100" prop="status" align="center"></el-table-column>
          <el-table-column sortable label="工序类型" width="100" prop="processType" align="center"> </el-table-column>
           <el-table-column sortable label="批次数量" width="100" align="center" prop="batchCount"> </el-table-column>
           <el-table-column sortable label="班组" width="100" prop="teName" align="center"></el-table-column> -->
          <el-table-column  sortable label="工艺卡片" width="120" prop="cardId" align="center">
                  <div class="demo-image__preview">
                <el-image
                    style="width: 30px; height: 30px"
                    :src="url"
                    :preview-src-list="srcList">
                </el-image>
                </div>
            </el-table-column>
            <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
                  <el-button type="success" size="mini" @click="startwork(scope.$index,scope.row,scope.row.ptId)">开工</el-button>
                <el-button type="success" size="mini" @click="selfcheck(scope.$index,scope.row,scope.row.ptId)">自检</el-button>
                <el-button type="success"  size="mini" @click="works(scope.$index,scope.row,scope.row.ptId)">报工</el-button>
            </template>
            </el-table-column>
  </el-table>
   <!-- <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryFeedback.pageNum"
      :page-size="queryFeedback.pageSize"
      layout="total, prev, pager, next"
      :total="count">
   </el-pagination> -->
    </el-card></div>
</template>

<script>
import { getData, postData } from '../../api/index'
import Productpage from '../Workshop/Productpage'
export default {
  components: {
    Productpage
  },
  data () {
    return {
      form: {
        batchNumber: ''
      },
      tableData: [],
      queryFeedback: {
        ptId: '',
        batchNumber: '',
        tips: '',
        componmentCode: '',
        componName: '',
        processId: '',
        processCode: '',
        processName: '',
        status: '',
        processType: '',
        batchCount: '',
        teName: '',
        cardId: ''
        // pageNum: 1, // 当前页码
        // pageSize: 10 // 每页条数
      },
      //   count: 0,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ]
    }
  },
  created () {},
  mounted () {
    this.getFeedback()
  },
  watch: {},
  computed: {},
  methods: {
    goBack () {
      this.$router.push('/mains')
    },
    // 搜索按钮
    async getGo () {
      const res = await getData('/rw/select', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        // this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    agreeChange (val) {

    },
    async selfcheck (index, row, ptId) {
      const res = await getData('/st/select?ptId=' + row.ptId)
      const res1 = await getData('/st/select?ptId=' + row.ptId)
      console.log(res, res1)
      if (res.code === 200) {
        this.$router.push(
          {
            path: '/selfcheck',
            query: {
              data: JSON.stringify(row),
              res: JSON.stringify(res.data.name),
              res1: JSON.stringify(res.data.result)
            }
          })
      } else {
        this.$message.error(res.msg)
      }
    },
    async startwork (index, row, ptId) {
      const res = await getData('/sw/select?ptId=' + row.ptId)
      const res1 = await getData('/sw/select?ptId=' + row.ptId)
      console.log(res, res1)
      if (res.code === 200) {
        this.$router.push(
          {
            path: '/startws',
            query: {
              data: JSON.stringify(row),
              res: JSON.stringify(res.data.name),
              res1: JSON.stringify(res.data.result)
            }
          })
      } else {
        this.$message.error(res.msg)
      }
    },
    async works (index, row, ptId) {
      const res = await getData('/ss/select?ptId=' + row.ptId)
      const res1 = await getData('/ss/select?ptId=' + row.ptId)
      console.log(res, res1)
      if (res.code === 200) {
        this.$router.push(
          {
            path: '/works',
            query: {
              data: JSON.stringify(row),
              res: JSON.stringify(res.data.name),
              res1: JSON.stringify(res.data.result)
            }
          })
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取表格信息
    async getFeedback () {
      const res = await postData('/rw/selectall', this.queryFeedback)
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data
        // this.count = res.count
      }
    },
    handleSizeChange (val) {
      this.queryFeedback.pageSize = val
      this.getFeedback()
    },
    handleCurrentChange (val) {
      this.queryFeedback.pageNum = val
      this.getFeedback()
    }
  }
}
</script>
<style lang="less" scoped>
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
