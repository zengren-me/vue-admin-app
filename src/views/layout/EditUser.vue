<template>
    <div class="edit-user">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback label="请输入邮箱" prop="email">
        <a-input v-model="ruleForm.email" type="email" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="请输入密码" prop="pass">
        <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="请输入新密码" prop="checkPass">
        <a-input v-model="ruleForm.newPassword" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="请输入验证码" prop="code">
        <a-input v-model.number="ruleForm.code" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="请输入新用户名" prop="username">
        <a-input v-model.number="ruleForm.username" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
            提交
        </a-button>
        <a-button type="primary" @click="sendCode" class="code">
            发送验证码
        </a-button>
        <a-button type="primary" class="code">
            <router-link to="/index">返回</router-link>
        </a-button>
        </a-form-model-item>
    </a-form-model>
    </div>
</template>

<script>
import userApi from '@/api/user';

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
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
		if (value === '') {
			return callback(new Error('请输入验证码!'));
		}
		return callback();
	};
    const validateUser = (rule, value, callback) => {
		if (value === '') {
			return callback(new Error('请输入用户名!'));
		}
		return callback();
	};
    return {
      ruleForm: {
        email: '',
        password: '',
        newPassword: '',
        code: '',
        username: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        newPassword: [{ validator: validatePass2, trigger: 'change' }],
        code: [{ validator: validateCode, trigger: 'change' }],
        username: [{ validator: validateUser, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi.editUser(this.ruleForm).then((res) => {
            if (res.status === 'success') {
                this.$message.success(res.msg);
                this.$router.push('/index');
            } else {
                this.$message.error(res.msg);
            }
          }).catch((error) => {
                this.$message.error(error);
          });
          return true;
        }
          return false;
      });
    },
    sendCode() {
        userApi.getCode({
            email: this.ruleForm.email,
        }).then((res) => {
           this.$message.success(res.msg);
        }).catch((error) => {
           this.$message.error(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.edit-user{
    max-width: 800px;
    margin: 100px auto;
    border: 1px solid #eee;
    padding: 30px 20px 0 80px;

    .code{
        margin-left: 10px;
    }
}
</style>
