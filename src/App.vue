<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script src="./static/layui/layui.js"></script>
<script>
export default {
  name: 'App',
    mounted () {
        layui.use('element', function(){
          var element = layui.element
        })
}
}
</script>
<style>
</style>
