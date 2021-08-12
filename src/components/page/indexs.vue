<template>
<div class="boby">
    <img src="../../assets/img/bg_1.jpg" alt="" width="100%" height="785px">
     <div class="header">
      <img src="../../assets/img/logo.png" alt="">
      <p>请选择您要登录的系统</p>
    </div>

    <img class="sci-wheel" src="../../assets/img/sci.gif" alt="">

    <div class="center">
      <div class="list fn_1 moveUpDownFla1"   @click="goLogin()">
        <img src="../../assets/img/fn_1.png" alt="" width="250px" height="220px" style="background-size: cover;">
        <p>办公室系统</p>
      </div>
      <div class="list fn_2 moveUpDownFla2" @click="goLogins()">
        <img src="../../assets/img/fn_2.png" alt="" width="250px" height="220px" style="background-size: cover;">
        <p>车间系统</p>
      </div>
    </div>

    <!--流星-->
<div class="liuxing liuxing1 liuxingFla"></div>
<div class="liuxing liuxing2 liuxingFla2"></div>
<div class="liuxing liuxing3 liuxingFla3"></div>
<div class="liuxing liuxing4 liuxingFla4"></div>
</div>
</template>
<script src="static/layui-v2.6.5/layui/layui.js"></script>
<script>
export default {
  components: {},
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  methods: {
      goLogin(){
          this.$router.push('/login')
      },
       goLogins(){
          this.$router.push('/logins')
      }
  }
}
</script>
<style lang="less" scoped>
 body{
        position: relative;
        background-size: cover;
      }
      .sci-wheel{
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
      }

      .header{
        position: absolute;
        width: 100%;
        height: 100px;
        top: 0px;
        left: 0;
        //line-height: 100px;
       // padding: 0 40px;
        background:rgba(0,0,0,0.3);
      }
      .header img{
        float: left;
        margin: 10px 10px;
        width: 100px;
      }
      .header p{
        float: left;
        font-size: 30px; color: white;
        letter-spacing: 3px;
        margin-top: 26px;
        margin-left: 10px;
      }
//       .header .home-btn {
//         float: left;
//         margin-top: 20px;
//         width: 74px;
//         height: 74px;
//         border: 1px solid #102262;
//         border-radius: 5px;
//         background: url(src\assets\img\icon.png) no-repeat center center;
//         background-size: 45% 45%;
//         cursor: pointer;
//       }
      .center{
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;
        margin: auto;
        width: 630px; height: 250px;
        /* bottom: 300px; */
      }
      .center .list{
        display: block;
        float: left;
        margin: 0 30px;
      }
      .center .list p{
        text-align: center;
        color: #00BAF1;
        font-size: 18px;
        margin-top: 20px;
      }
      /* .center .list img{
        width: 250px;
        margin: 0 30px;
      } */
      /*流星*/
.liuxing{
  width: 85px;
  height: 85px;
  position: absolute;
  background: url(../../assets/img/line.png) no-repeat;
  background-size: contain;
}
.liuxing1 {
  top: 200px;
  left: 200px;
}

.liuxing2 {
  top: 200px;
  left: 50%;
  margin-left: 200px;
}

.liuxing3 {
  top: 100px;
  right: 300px;
}

.liuxing4 {
  top: 150px;
  right: 300px;
}

.liuxingFla {
  animation: liuxing 5s ease-in infinite;
}

.liuxingFla2 {
  animation: liuxing2 4s ease-in infinite;
}

.liuxingFla3 {
  animation: liuxing3 3s linear infinite;
}

.liuxingFla4 {
  animation: liuxing4 2s linear infinite;
}

/* 流星动画 */
@keyframes liuxing {
 0% {
  transform: translate(200px, -200px)
 }
 90% {
transform: translate(-180px, 180px);
opacity: 1;
}
100% {
transform: translate(-200px, 200px);
opacity: 0;
}
}

@keyframes liuxing2 {
0% {
transform: translate(200px, -200px)
}
90% {
transform: translate(-480px, 480px);
opacity: 1;
}
100% {
transform: translate(-500px, 500px);
opacity: 0;
}
}

@keyframes liuxing3 {
0% {
transform: translate(200px, -200px)
}
90% {
transform: translate(-480px, 480px);
opacity: 1;
}
100% {
transform: translate(-500px, 500px);
opacity: 0;
}
}

@keyframes liuxing4 {
0% {
transform: translate(200px, -200px)
}
90% {
transform: translate(-180px, 180px);
opacity: 1;
}
100% {
transform: translate(-200px, 200px);
opacity: 0;
}
}

/*菜单*/
.moveUpDownFla1 {
animation: moveUpDown 5s ease infinite;
}

.moveUpDownFla2 {
animation: moveUpDown 4s linear infinite;
}
/* 菜单动画 */
@keyframes moveUpDown {
0% {
transform: translate(0px, -20px)
}
50% {
transform: translate(0px, 20px)
}
100% {
transform: translate(0px, -20px);
}
}
</style>
