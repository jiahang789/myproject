<template>
<div class="boby">
    <el-container>
  <el-aside >
       <div class="sidebar">
         <!-- <el-menu
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
       <el-menu-item index="/toolhouse">
           <i class="el-icon-menu"></i>
        <span slot="title">工具入库</span>
      </el-menu-item>
       <el-menu-item index="/toolcheck">
           <i class="el-icon-menu"></i>
        <span slot="title">工具库存查询</span>
      </el-menu-item>
       <el-menu-item index="/withapply">
           <i class="el-icon-menu"></i>
        <span slot="title">工具领用申请</span>
      </el-menu-item>
       <el-menu-item index="/outkutool">
           <i class="el-icon-menu"></i>
        <span slot="title">工具出库</span>
      </el-menu-item>
      <el-menu-item index="/toolquery">
           <i class="el-icon-menu"></i>
        <span slot="title">工具出入库记录</span>
      </el-menu-item>
       <el-menu-item index="/toolchange">
           <i class="el-icon-menu"></i>
        <span slot="title">工具更换</span>
      </el-menu-item>
      <el-menu-item index="/toolbfsq">
           <i class="el-icon-menu"></i>
        <span slot="title">工具报废申请</span>
      </el-menu-item>
      <el-menu-item index="/toolscrap">
           <i class="el-icon-menu"></i>
        <span slot="title">工具报废确认</span>
      </el-menu-item>
       <el-menu-item index="/sparepart">
           <i class="el-icon-menu"></i>
        <span slot="title">备品备件入库</span>
      </el-menu-item>
      <el-menu-item index="/sparecheck">
           <i class="el-icon-menu"></i>
        <span slot="title">备品备件库存查询</span>
      </el-menu-item>
      <el-menu-item index="/spareapply">
           <i class="el-icon-menu"></i>
        <span slot="title">备品备件申请</span>
      </el-menu-item>
       <el-menu-item index="/spareoutku">
           <i class="el-icon-menu"></i>
        <span slot="title">备品备件出库</span>
      </el-menu-item>
       <el-menu-item index="/sparequery">
           <i class="el-icon-menu"></i>
        <span slot="title">备品备件出入库记录</span>
      </el-menu-item>
       <el-menu-item index="/sparechange">
           <i class="el-icon-menu"></i>
        <span slot="title">备品备件更换</span>
      </el-menu-item>
    </el-menu> -->
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
      const res = await getData('/menu/fuzhukufang')
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
        width: 280px;
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
