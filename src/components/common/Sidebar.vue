<template>
    <div class="sidebar">
         <el-menu
                class="sidebar-el-menu"
                :default-active="$route.path"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#bfcbd9"
                unique-opened
                router>
       <el-menu-item index="/index">
           <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>人力资源</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/workshop">车间</el-menu-item>
          <el-menu-item index="/department">科室</el-menu-item>
          <el-menu-item index="/group">班组</el-menu-item>
          <el-menu-item index="/classes">班次</el-menu-item>
          <el-menu-item index="/role">角色</el-menu-item>
          <el-menu-item index="/duty">职责</el-menu-item>
           <el-menu-item index="/person">人员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-printer"></i>
          <span>制造数据</span>
        </template>
        <el-menu-item-group>
           <el-menu-item index="/product_data">产品数据</el-menu-item>
          <el-menu-item index="/product_bom">产品BOM</el-menu-item>
          <el-menu-item index="/path">工艺路线</el-menu-item>
          <el-menu-item index="/worktype">工种</el-menu-item>
           <el-menu-item index="/attribute">生产资源属性</el-menu-item>
          <el-menu-item index="/delopy">生产资源配置</el-menu-item>
          <el-menu-item index="/check">工艺检验</el-menu-item>
          <el-menu-item index="/assembly">工艺装配</el-menu-item>
          <el-menu-item index="/work">工艺报工</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/machine">设备信息</el-menu-item>
          <el-menu-item index="/mcheck">设备点检</el-menu-item>
          <el-menu-item index="/munkeep">设备保养</el-menu-item>
          <el-menu-item index="/spare">备品备件</el-menu-item>
          <el-menu-item index="/mmeasure">设备量具</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>计划管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/planto">计划导入</el-menu-item>
          <el-menu-item index="/planlook">计划查询</el-menu-item>
          <el-menu-item index="/equnplan">设备计划生成</el-menu-item>
          <el-menu-item index="/equncheck">设备计划查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-s-help"></i>
          <span>生产管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/batchgenerat">批次生成</el-menu-item>
          <el-menu-item index="/taguser">标签补打</el-menu-item>
          <el-menu-item index="/tagwarn">标签预警</el-menu-item>
          <el-menu-item index="/cheak">批次查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>生产库房</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/inhouse">入库</el-menu-item>
          <el-menu-item index="/tocheck">提检</el-menu-item>
          <el-menu-item index="/print">提检单打印</el-menu-item>
          <el-menu-item index="/outku">出库</el-menu-item>
          <el-menu-item index="/zprint">转移单打印</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>配置管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/authority">权限配置</el-menu-item>
          <el-menu-item index="/pwd">密码管理</el-menu-item>
          <el-menu-item index="9-3">角色&人员</el-menu-item>
          <el-menu-item index="9-4">班组&设备</el-menu-item>
          <el-menu-item index="9-5">人员&设备</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="10">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>量具管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/measureCheck">量具管理定检</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
        <el-menu
                class="sidebar-el-menu"
                :default-active="$route.path"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                :unique-opened= true
                router>
                 <el-menu-item index="/index">
           <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
            <template v-for="item in items">
                    <el-submenu v-if="item.children"  :index="item.value" :key="item.id">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.label }}</span>
                        </template>
                        <el-menu-item-group>
                        <template v-for="subItem in item.children">
                            <el-menu-item
                                    :index="subItem.value"
                                    :key="subItem.id"
                            >{{ subItem.label }}</el-menu-item>
                        </template>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-else index="item.value" :key="item.id">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.label }}</span>
                    </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
import bus from '../common/bus'
import { getData } from '../../api/index'
export default {
  data () {
    return {
      collapse: false,
      items: []
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
    this.getMenus()
  },
  methods: {
    async getMenus () {
      const res = await getData('/menu')
      if (res.code === 200) {
        this.items = res.data
      }
    }
  }
}
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
    .sidebar > ul {
        height: 100%;
    }
.el-menu-item.is-active {
  background-color:#009688 !important;
}
.el-menu-item-group.is-active{
     background-color:#009688 !important;
}
</style>
