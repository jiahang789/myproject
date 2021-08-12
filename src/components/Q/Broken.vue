<template>
<!-- 飞行破裂 -->
<div>
      <el-card class="box-card" shadow="always">
            <el-form :model="form" :inline="true" class="demo-form-inline"  label-width="100px" >
            <el-form-item label="组号" prop="groupNumber">
                <el-input autocomplete="off" clearable v-model="form.groupNumber"></el-input>
            </el-form-item>
             <el-form-item label="产品代号" prop="bomId">
                <el-input autocomplete="off" v-model="form.bomId" clearable></el-input>
            </el-form-item>
             <el-form-item label="时间" prop="time">
                 <el-date-picker type="date"  clearable v-model="form.time" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="getGo">搜索</el-button>
        </el-form>
        <el-table :data="tableData" style="width: 100%"  tooltip-effect="dark" border>
          <el-table-column label="序号" width="50" prop="num" align="center"> </el-table-column>
           <el-table-column sortable label="第一组" width="165" prop="groupnumberFirst" align="center">
               <template slot-scope="scope">
                <el-select  v-model="scope.row.groupnumberFirst" clearable placeholder="请选择" @change="getitem1">
                    <el-option v-for="item in groupone" :key="item.emTypeId" :label="item.emType" :value="item.emTypeId"></el-option>
                </el-select>
               </template>
           </el-table-column>
            <el-table-column sortable label="第二组" width="165" prop="groupnumberSed" align="center">
               <template slot-scope="scope">
                <el-select  v-model="scope.row.groupnumberSed" clearable placeholder="请选择" @change="getitem2">
                    <el-option v-for="item in grouptwo" :key="item.emTypeId" :label="item.emType" :value="item.emTypeId"></el-option>
                </el-select>
               </template>
                 </el-table-column>
           <el-table-column sortable label="第三组" width="165" prop="groupnumberTrd" align="center">
             <template slot-scope="scope">
                <el-select  v-model="scope.row.groupnumberTrd" clearable placeholder="请选择" @change="getitem3">
                    <el-option v-for="item in groupthith" :key="item.emTypeId" :label="item.emType" :value="item.emTypeId"></el-option>
                </el-select>
               </template>
           </el-table-column>
           <el-table-column sortable label="数量" width="200" prop="ffNumber" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ffNumber"></el-input>
                </template>
                </el-table-column>
            <el-table-column sortable label="是否合格" width="180" prop="ffQualified " align="center">
                <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.ffQualified">
                        <el-radio  label="合格"></el-radio>
                        <el-radio label="不合格"></el-radio>
                    </el-radio-group>
                </template></el-table-column>
            <el-table-column sortable label="样本名称" width="200" prop="ffSample" align="center">
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.ffSample"></el-input>
                </template> </el-table-column>
          <el-table-column sortable label="备注" width="200" prop="ffRemarks" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ffRemarks"></el-input>
                </template>
          </el-table-column>
            <el-table-column sortable label="最后编辑时间" width="200" prop="time" align="center">
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.time"></el-input>
                </template> </el-table-column>
          <el-table-column sortable label="最后编辑人" width="200" prop="person" align="center">
               <template slot-scope="scope">
                    <el-input v-model="scope.row.person"></el-input>
                </template>
          </el-table-column>
  </el-table>
       <el-button type="success" size="mini" style="float:right" @click="infoData()">提交</el-button>
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
        groupNumber: '',
        time: '',
        bomId: ''
      },
      groupone: [],
      grouptwo: [],
      groupthith: [],
      tableData: [
        {num: 1}
      ],
      editDialog: false,
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 1
    }
  },
  created () {
    this.getSelect()
  },
  mounted () {

  },
  watch: {},
  computed: {},
  methods: {
    // 搜索按钮
    async getGo () {
      const res = await getData('/ff/select', this.form)
      if (res.code === 200) {
        this.$message.success('获取列表成功！')
        this.tableData = res.data
        // this.count = res.count
      } else {
        this.$message.error('获取列表失败！')
      }
    },
    // 点击提交
    async infoData () {
      var multis = []
      this.tableData.forEach(function (item, index) {
        multis.push({
          groupnumberFirst: item.groupnumberFirst,
          groupnumberSed: item.groupnumberSed,
          groupnumberTrd: item.groupnumberTrd,
          ffNumber: item.ffNumber,
          ffQualified: item.ffQualified,
          ffSample: item.ffSample,
          ffRemarks: item.ffRemarks,
          time: item.time,
          person: item.person
        })
      })
      const res = await postData('/ff/insert', multis)
      if (res.code === 200) {
        this.$message.success('提交成功！')
      } else {
        this.$message.error('提交失败！')
      }
    },
    // 获取第一组下拉框数据
    async getSelect () {
      const res = await getData('/ff/group')
      if (res.code === 200) {
        this.groupone = res.data
      }
    },
    getitem1 (val) {
      this.groupone.map((s, index) => {
        if (s.emTypeId === val) {
          this.emTypeId = this.groupone[index].emTypeId
          console.log(this.emTypeId)
          this.getSelect1()
        }
      })
    },
    // 获取第二组下拉框数据
    async getSelect1 () {
      const res = await getData('/ff/groups?emTypeId=' + this.emTypeId)
      if (res.code === 200) {
        this.grouptwo = res.data
      }
    },
    getitem2 (val) {
      this.grouptwo.map((s, index) => {
        if (s.emTypeId === val) {
          this.emTypeId = this.groupone[index].emTypeId
          this.emTypeId1 = this.grouptwo[index].emTypeId
          console.log(this.emTypeId, this.emTypeId1)
          this.getSelect3()
        }
      })
    },
    // 获取第三组下拉框数据
    async getSelect3 () {
      const res = await getData('/ff/groupt?emTypeId=' + this.emTypeId + ',' + this.emTypeId1)
      if (res.code === 200) {
        this.groupthith = res.data
      }
    },
    getitem3 (val) {
      this.groupthith.find(item => item.emTypeId === val)
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
    margin-left: -25px;
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
    width: 180px;
}
     /deep/.el-select .el-input__inner {
  width: 150px;

}
</style>
