<template>
<div class="boby">
    <div class="title">
        <h1>车间现场看板</h1>
    </div>
    <div class="button">
        <el-row >
            <template v-for="item in items">
            <el-button  :key="item.id" :type="item.type" @click="$router.push(item.value)">
                <transition>
                    <i :class="item.icon"></i>
                </transition><br>
                <span>{{ item.label }}</span>
            </el-button>
            </template>
               <el-button type="primary" @click="goProuder()">
                     <transition>
                        <i class="el-icon-setting"></i>
                     </transition><br>
                     <span>生产执行</span>
                </el-button>
                <el-button type="success" @click="goShift()">
                    <transition>
                        <i class="el-icon-s-operation"></i>
                     </transition><br>
                     <span>交  接 班</span>
                </el-button>
                <el-button type="warning" @click="goQ()">
                    <transition>
                        <i class="el-icon-cpu"></i>
                     </transition><br>
                     <span>质量管理</span>
                </el-button><br>
                <el-button type="success">
                    <transition>
                        <i class="el-icon-set-up"></i>
                     </transition><br>
                     <span>看板管理</span>
                </el-button>
                 <el-button type="primary" @click="goFuzhu()">
                     <transition>
                        <i class="el-icon-setting"></i>
                     </transition><br>
                     <span>辅助库房</span>
                </el-button>
                 <el-button type="danger" @click="goYC()">
                    <transition>
                        <i class="el-icon-s-operation"></i>
                     </transition><br>
                     <span>异常管理</span>
                </el-button><br>
                <el-button type="warning" @click="goQ()">
                    <transition>
                        <i class="el-icon-cpu"></i>
                     </transition><br>
                     <span>设备维修</span>
                </el-button>
        </el-row>
        <el-row >
            <template v-for="item in menu">
            <el-button  :key="item.id" :type="item.type" @click="$router.push(item.value)">
                <transition>
                    <i :class="item.icon"></i>
                </transition><br>
                <span>{{ item.label }}</span>
            </el-button>
            </template>
        </el-row>
    </div>
</div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  components: {},
  data () {
    return {
      items: [],
      menu: []
    }
  },
  created () {
    this.getMenus()
  },
  mounted () {
  },
  methods: {
    async getMenus () {
      const res = await getData('/menu/factory')
      if (res.code === 200) {
        this.items = res.data.first
        this.menu = res.data.second
      }
    },
    goProuder () {
      this.$router.push('/feedback')
    },
    goShift () {
      this.$router.push('/shift')
    },
    goQ () {
      this.$router.push('/factoryzj')
    },
    goFuzhu () {
      this.$router.push('/toolhouse')
    },
    goYC () {
      this.$router.push('/typewh')
    }
  }
}
</script>
<style lang="less" scoped>
.boby{
    position: relative;
    background-color: #124098;
    width: 100%;
    height: 785px;
}
//按钮的位置
.button{
   position: absolute;
   top: 200px;
   left: 35%;
   }
/deep/ .el-button {
    line-height: 3;
    border-radius: 6px;
    margin: 8px;
}
i{
    font-size: 40px;
}
/deep/ .el-button{
        padding: 15px 37px;
}
.title{
    color: white;
    position: absolute;
    top: 30px;
    left: 30px;
}
</style>
