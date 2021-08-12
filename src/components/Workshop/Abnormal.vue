<template>
<!-- 异常管理 -->
<div class="boby">
    <el-container>
  <el-aside >
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
         <el-menu-item index="/mains">
           <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       <el-menu-item index="/typewh">
           <i class="el-icon-menu"></i>
        <span slot="title">异常设定</span>
      </el-menu-item>
        <el-menu-item index="/sponsor">
           <i class="el-icon-menu"></i>
        <span slot="title">异常发起</span>
      </el-menu-item>
      <el-menu-item index="/dispose">
           <i class="el-icon-menu"></i>
        <span slot="title">异常处理</span>
      </el-menu-item>
        <!--<el-menu-item index="/border">
           <i class="el-icon-menu"></i>
        <span slot="title">异常看板</span>
      </el-menu-item>-->
       <el-menu-item index="/record">
           <i class="el-icon-menu"></i>
        <span slot="title">异常查询</span>
      </el-menu-item>
    </el-menu>
   <el-menu
                class="sidebar-el-menu"
                :default-active="$route.path"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#bfcbd9"
                :unique-opened="true"
                router>
                <el-menu-item index="/mains">
                   <i class="el-icon-menu"></i>
                   <span slot="title">首页</span>
                </el-menu-item>
          <template v-for="item in items">
                        <template v-for="subItem in item.children">
                            <el-menu-item
                                    :index="subItem.value"
                                    :key="subItem.id"
                            > <i :class="item.icon"></i>{{ subItem.label }}</el-menu-item>
                        </template>
            </template>
        </el-menu>
    </div>
    </el-aside>
  <el-main><router-view></router-view></el-main>
</el-container>
</div>
</template>
<script>
import { getData } from '../../api/index'
export default {
  data () {
    return {
      collapse: false,
      items: []
    }
  },
  computed: {
  },
  created () {
    this.getMenus()
  },
  methods: {
    async getMenus () {
      const res = await getData('/menu/yichangguanli')
      if (res.code === 200) {
        this.items = res.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 270px;
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
.boby{
       background-color: #f0f0f0;
       height: 785px;
}
</style>
