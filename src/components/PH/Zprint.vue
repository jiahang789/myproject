<template>
<!-- 提检单打印 -->
<div>
     <el-card class="box-card" shadow="always">
          <el-button type="success" size="mini"   v-print="'#print_label'">打印</el-button>
     <div id="print_label" >
   <div class="person">
           <table border="1" style="border-collapse: collapse;  width: 800px; height: 480px; margin: 30px;">
               <caption>产品转移单</caption>
               <tr>
                   <td colspan="9">
                       <div class="year">年 月 日</div>
                   </td>
               </tr>
               <tr>
                   <td width=100px>
                       <div align="center" style=" font-weight: 600;">转移部门</div>
                   </td>
                    <td colspan="3">
                       <div></div>
                   </td>
                    <td width=100px>
                       <div align="center" style=" font-weight: 600;">发出部门批</div>
                   </td>
                    <td colspan="2">
                       <div></div>
                   </td>
                   <td width=100px rowspan="2">
                       <div align="center" style=" font-weight: 600;">备注</div>
                   </td>
               </tr>
                <tr>
                   <td width=100px>
                       <div align="center" style=" font-weight: 600;">批 号</div>
                   </td>
                    <td width=120px>
                       <div align="center" style=" font-weight: 600;">名 称</div>
                   </td>
                   <td width=40px>
                       <div align="center" style=" font-weight: 600;">计量单位</div>
                   </td>
                    <td width=100px>
                       <div align="center" style=" font-weight: 600;">请发数</div>
                   </td>
                   <td width=120px>
                       <div align="center" style=" font-weight: 600;">实发数</div>
                   </td>
                    <td width=120px>
                       <div align="center" style=" font-weight: 600;">实发数</div>
                   </td>
                    <td width=100px>
                       <div align="center" style=" font-weight: 600;">盈(+) 亏(-)</div>
                   </td>
               </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                 <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
                <td></td>
            </tr>
           <tr>
               <td>
                 <div align="center" style=" font-weight: 600;">转人主管</div>
               </td>
               <td>
                   <div></div>
               </td>
               <td width = 60px>
                    <div align="center" style=" font-weight: 600;">经手人</div>
               </td>
                <td>
                   <div></div>
               </td>
               <td>
                    <div align="center" style=" font-weight: 600;">发出主管</div>
               </td>
                <td>
                   <div></div>
               </td>
               <td>
                    <div align="center" style=" font-weight: 600;">经手人</div>
               </td>
                <td>
                   <div></div>
               </td>
           </tr>
           </table>
    </div>
  </div>
     </el-card>
</div>
</template>

<script>
export default {
  components: {},
  name: 'zprint',
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.box-card{
    // margin-left: 270px;
    // position: relative;
    // top: 50px;
    width: auto;
    height: auto;
    background-color: #FFFFFF;
}
caption{
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 10px;
}
.year{
    float: right;
     letter-spacing: 25px;
}
</style>
