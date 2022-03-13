<template>
	<div class="register">
		<a-form-model
			ref="registerForm"
			class="registerForm"
			:model="registerForm"
			:rules="rules"
			v-bind="layout"
		>
			<a-form-model-item has-feedback label="用户名" prop="username">
				<a-input
					v-model="registerForm.username"
					type="text"
					autocomplete="off"
				/>
			</a-form-model-item>
			<a-form-model-item has-feedback label="邮箱" prop="email">
				<a-input v-model="registerForm.email" type="mail" autocomplete="off" />
			</a-form-model-item>
			<a-form-model-item has-feedback label="密码" prop="password">
				<a-input
					v-model="registerForm.password"
					type="password"
					autocomplete="off"
				/>
			</a-form-model-item>
			<a-form-model-item has-feedback label="验证码" prop="code">
				<a-input v-model="registerForm.code" type="text" autocomplete="off" />
			</a-form-model-item>
			<a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
				<div class="code" @click="getCode(registerForm.email)">获取验证码</div>
				<a-button type="primary" @click="register('registerForm')">
					注册
				</a-button>
				<a-button style="margin-left: 10px" @click="gotoLogin('registerForm')">
					前往登录
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
		const validateUser = (rule, value, callback) => {
			if (value === '') {
				return callback(new Error('请输入用户名!'));
			}
			return callback();
		};
		const validateCode = (rule, value, callback) => {
			if (value === '') {
				return callback(new Error('请输入验证码!'));
			}
			return callback();
		};
		return {
			registerForm: {
				username: '',
				email: '',
				password: '',
				code: '',
			},
			rules: {
				username: [{ validator: validateUser, trigger: 'change' }],
				email: [{ validator: checkEmail, trigger: 'change' }],
				password: [{ validator: validatePass, trigger: 'change' }],
				code: [{ validator: validateCode, trigger: 'change' }],
			},
			layout: {
				labelCol: { span: 4 },
				wrapperCol: { span: 14 },
			},
		};
	},
	methods: {
		register(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					return api.register(this.registerForm).then((res) => {
                         if (res.data.status === 'success') {
                             this.$message.success(res.data.msg);
                         } else {
                           this.$message.error(res.data.msg);
                         }
                    }).catch((error) => {
                        this.$message.error(error);
                    });
				}
				return false;
			});
		},
		getCode(email) {
            return api.getCode({ email }).then((res) => {
				this.$message.success(res.msg);
			});
		},
		gotoLogin() {
			this.$router.push('/login');
		},
	},
};
</script>

<style scoped lang="less">
.register{
    .registerForm{
        max-width: 500px;
        margin: 100px auto;
        border: 1px solid #eee;
        padding: 30px 20px 0 80px;

        .code{
            width: 100px;
            height: 32px;
            line-height: 30px;
            text-align: center;
            border-radius: 4px;
            margin-top: -2px;
            margin-bottom: 10px;
            border: 1px solid #eee;
            cursor: pointer;
            font-size: 14px;
            user-select: none;
            border-color: #d9d9d9;
            box-shadow: 0 2px 0 rgba(0, 0, 0, .1);
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            font-weight: 400;

            &:hover{
                color: #50b38a;
                border-color: #50b38a;
            }
        }
    }
}
</style>
