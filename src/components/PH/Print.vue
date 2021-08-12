<template>
<!-- 提检单打印 -->
<div>
     <el-card class="box-card" shadow="always">
          <el-button type="success" size="mini"   v-print="'#print_label'">打印</el-button>
       <div id="print_label" >
   <div class="person">
           <table border="1" style="border-collapse: collapse;  width: 500px; height: 400px; margin: 30px">
               <tr>
                   <td colspan="9">
                        <h2 align="center" style=" font-weight: 900;">提检单</h2>
                   </td>
               </tr>
               <tr>
                   <td width=90px>
                       <div align="center" style=" font-weight: 900;">产品代号:</div>
                   </td>
                    <td colspan="8">
                       <div>136T</div>
                   </td>
               </tr>
                <tr>
                   <td width=40px>
                       <div align="center" style=" font-weight: 900;">产品:</div>
                   </td>
                    <td  colspan="8">
                       <div>钢芯</div>
                   </td>
               </tr>
                <tr>
                   <td width=40px>
                       <div align="center" style=" font-weight: 900;">组号:</div>
                   </td>
                    <td  colspan="8">
                       <div>136T</div>
                   </td>
               </tr>
                <tr>
                   <td width=40px>
                       <div align="center" style=" font-weight: 900;">序号:</div>
                   </td>
                    <td>
                       <div>批次</div>
                   </td>
                    <td>
                       <div>数量/个</div>
                   </td>
                   <td>
                       <div>批次</div>
                   </td>
                    <td>
                       <div>数量/个</div>
                   </td>
                   <td>
                       <div>批次</div>
                   </td>
                    <td>
                       <div>数量/个</div>
                   </td>
                   <td>
                       <div>批次</div>
                   </td>
                    <td>
                       <div>数量/个</div>
                   </td>
               </tr>
            <tr>
                <td align="center" style=" font-weight: 900;">1</td>
                <td>A1</td>
                <td>19999</td>
                 <td>A7</td>
                <td>19999</td>
                 <td>A13</td>
                <td>19999</td>
                 <td>A19</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">2</td>
                <td>A2</td>
                <td>19999</td>
                 <td>A8</td>
                <td>19999</td>
                 <td>A14</td>
                <td>19999</td>
                 <td>A20</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">3</td>
                <td>A3</td>
                <td>19999</td>
                 <td>A9</td>
                <td>19999</td>
                 <td>A15</td>
                <td>19999</td>
                 <td>A21</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">4</td>
                <td>A4</td>
                <td>19999</td>
                 <td>A10</td>
                <td>19999</td>
                 <td>A16</td>
                <td>19999</td>
                 <td>A22</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">5</td>
                <td>A5</td>
                <td>19999</td>
                 <td>A11</td>
                <td>19999</td>
                 <td>A17</td>
                <td>19999</td>
                 <td>A23</td>
                <td>19999</td>

            </tr>
             <tr>
                <td align="center" style=" font-weight: 900;">6</td>
                <td>A6</td>
                <td>19999</td>
                 <td>A12</td>
                <td>19999</td>
                 <td>A18</td>
                <td>19999</td>
                 <td>A24</td>
                <td>19999</td>

            </tr>
            <tr>
                <td>
                    <div align="center" style=" font-weight: 900;">提检时间:</div>
                </td>
                <td  colspan="8">
                    <div>2021/05/24 10:53</div>
                </td>
            </tr>
             <tr>
                <td>
                    <div align="center" style=" font-weight: 900;">提检人:</div>
                </td>
                <td  colspan="8">
                    <div>张三</div>
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
  name: 'print',
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
    width: 1250px;
    height: 600px;
    background-color: #FFFFFF;
}
</style>
