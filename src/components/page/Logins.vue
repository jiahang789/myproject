
<template>
  <div class="box">
      <img src="../../assets/img/login.jpg" alt="" height="793px" width="1607px" style=" margin: -8px -7px -7px -8px;">
      <img src="../../assets/img/logos.png" alt="" height="80px" width="170px" class="logo">
      <div class="title">
          <h1 class="h11">枪弹生产车间管理系统</h1>
      </div>
     <div class="logins">
        <el-form ref="loginRef" :rules="loginFormRules" :model="loginData" label-width="-30px" class="login_from">
          <el-form-item prop="userName">
              <el-input v-model="loginData.userName" placeholder="请输入您的用户名称"  class="usernames"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input  v-model="loginData.password" placeholder="请输入您的密码"  class="paw" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" round width="80px" @click="goLogin()" >登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
   </div>
</template>

<script>
import { getData } from '../../api/index'
export default {
  data: function () {
    return {
      loginData: {
        userName: 'admin',
        password: '123456'
      },
      loginFormRules: {
        // 验证用户名是否合法
        userName: [
          { required: true, message: '请输入用户名称/请输入正确用户名称', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码/请输入正确密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符或字母，可包括符号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goLogin () {
    //   this.$router.push('/mains')
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        if (valid) {
          // 获取参数
          const param = {
            userName: this.loginData.userName,
            password: this.loginData.password
          }
        //   this.$message.success(res.msg)
            window.sessionStorage.setItem('token', this.loginData.userName)
            this.$router.push('/mains')
         // const res = await getData('/logins', param)
        //  if (res.code === 200) {
        //    this.$message.success(res.msg)
        //    window.sessionStorage.setItem('token', res.token)
        //    this.$router.push('/mains')
        //  } else {
        //    this.$message.error(res.msg)
        //  }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.box{
    margin: 0;
    position: relative;
}
.logo{
    position: absolute;
    left: 40px;
    top: 20px;
}
    .login_from{
      position: absolute;
      top: 260px;
      left: 61%;
      width:380px;
      height: 300px;
      margin: 30px;
      box-sizing: border-box;
    }
    .h11{
      position: absolute;
      top: 180px;
      left: 62%;
      color: #416CFF;
      font-size: 28px;
      font-weight: 900;
      letter-spacing:7px;
    }
    /deep/.el-input__inner{
      height: 40px;
      border: 0;
      border-bottom: 1px solid #DCDCDC;
    }
      /deep/ .usernames .el-input__inner{
      background: url(../../assets/img/yonghuming.png) no-repeat;
      background-position: 6px 9px ;
      text-indent: 20px;
      background-size: 20px 20px;
      padding-left: 30px;
    }
       /deep/ .paw .el-input__inner{
      background: url(../../assets/img/lock-2.png) no-repeat;
      background-position: 6px 9px ;
      text-indent: 20px;
      background-size: 20px 20px;
      padding-left: 30px;
    }
    /deep/.el-button {
     width: 385px;
     height: 39px;
     font-size: 20px;
     border-radius: 22px;
     padding: 0 57px;
     margin: 30px 0;
      background-color: #416CFF;
    }
    // /deep/ .el-input__prefix{
    //   left: 9px;
    // }
//     #v_container {
//         width:100px;
//         height: 42px;
//         display: inline-flex;
//         position: relative;
//         left: -30px;
//         top: 1.1rem;
//         margin-top: -2rem;
// }
// /deep/ .el-input-group__append, .el-input-group__prepend {
//     padding: 0px;
// }
// /deep/ .el-input-group{
//     border-spacing: 2px 4px;
// }
</style>
