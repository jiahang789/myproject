<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <!-- 同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了 过渡模式
in-out：新元素先进行过渡，完成之后当前元素过渡离开。
out-in：当前元素先进行过渡，完成之后新元素过渡进入。 -->
                <transition name="move" mode="out-in">
                    <!-- // 将缓存 name 为 tagsList 的组件 -->
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import vTags from './Tags.vue'
import bus from '../common/bus'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg
    })
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => { // 取
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>
<style lang="less" scoped>
.content-box {
    position: absolute;
    left: 250px;
    top: 70px;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
}

.content {
    width: auto;
    height: 100%;
    padding: 10px;
    //  overflow-x: scroll;
    box-sizing: border-box;
}

.content-collapse {
    left: 65px;
}
.move-enter-active,
.move-leave-active {
    transition: opacity .5s;
}

.move-enter,
.move-leave {
    opacity: 0;
}
</style>
