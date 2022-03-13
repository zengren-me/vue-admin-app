<template>
  <div class="login">
  <a-form-model ref="loginForm" class="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
     <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email" type="mail" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input v-model="loginForm.password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="login('loginForm')">
        登录
      </a-button>
      <a-button style="margin-left: 10px" @click="registerForm('loginForm')">
        注册
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
       return callback(new Error('请输入邮箱!'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式错误!'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
       return callback(new Error('请输入密码!'));
      }
      return callback();
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],

      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const resp = api.login(this.loginForm).then((res) => {
             if (res.status === 'success') {
               this.$store.dispatch('userLogin', res.data);
               this.$message.success(res.msg);
               this.$router.push('/index');
             } else {
               this.$message.error(res.msg);
             }
          }).catch((error) => {
            this.$message.error(error);
          });
          return resp;
        }
        return false;
      });
    },
    registerForm() {
     this.$router.push('/register');
    },
  },
};
</script>

<style scoped lang="less">
.login{
    .loginForm{
        max-width: 500px;
        margin: 100px auto;
        border: 1px solid #eee;
        padding: 30px 20px 0 80px;
    }
}
</style>
