<template>
  <div class="info">
    <div class="avatar">
      <img src="../assets/logo.jpg">
    </div>
    <el-form ref="loginForm" :model="form" :rules="rules" class='container'>
    <div class="userInfo">
        <el-form-item prop='username'>
      <el-input type="text" prefix-icon="myicon myicon-user" v-model="form.username"  placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop='password'>
      <el-input type="password" prefix-icon="myicon myicon-key" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="empty">重置</el-button>
    </el-form-item>
    </div>
</el-form>
  </div>
</template>

<script>
import {login} from '../api/api.js'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login: function () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          let params = {
            username: this.form.username,
            password: this.form.password
          }
          login(params).then(res => {
            if (res.meta.status === 200) {
              // 存在token的值
              localStorage.setItem('mytoken', res.data.token)
              // 跳转到主页面
              this.$router.push({name: 'home'})
            } else {
              // 登陆失败
              this.$notify.error({
                title: '错误',
                message: res.meta.msg
              })
            }
          })
        }
      })
    },
    empty: function () {
      this.$refs['loginForm'].resetFields()
    }
  }
}
</script>

<style scoped>
.info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: #2f4050;
  }
  .container {
    box-sizing: border-box;
    margin: 180px auto 0;
    width: 500px;
    height: 340px;
    background-color: #fff;
    position: relative;
  }
  .avatar {
    position: absolute;
    left: 50%;
    top: 110px;
    width: 120px;
    height: 120px;
    border: 10px solid #FFF;
    margin-left: -70px;
    border-radius: 50%;
    box-shadow: 0 1px 5px #CCC;
    background-color: pink;
    overflow: hidden;
    z-index: 9999;
  }
  .avatar img {
    width: 120px;
    height: 120px;
  }
  .userInfo {
    position: absolute;
    text-align: center;
    width: 400px;
    margin: 100px 50px;
  }
  .btn {
    width: 400px;
  }
</style>
