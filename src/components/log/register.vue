<template>
  <!--注册账户主页面-->
  <div class="register-body">
    <el-input
      class="registerInputBox"
      placeholder="用户名"
      v-model="registerUserNameInput">
    </el-input>
    <el-input
      v-if="notWrongPwd()"
      class="registerInputBox"
      placeholder="登陆密码"
      show-password
      v-model="registerPwdInput">
    </el-input>
    <el-input
      v-else
      class="registerPwdInputBox"
      placeholder="登陆密码"
      show-password
      v-model="registerPwdInput">
    </el-input>
    <el-input
      v-if="notWrongPwd()"
      class="registerInputBox"
      placeholder="请确认登陆密码"
      show-password
      v-model="registerConfirmPwdInput">
    </el-input>
    <el-input
      v-else
      class="registerPwdInputBox"
      placeholder="请确认登陆密码"
      show-password
      v-model="registerConfirmPwdInput">
    </el-input>
    <el-input
      class="registerInputBox"
      placeholder="交易密码"
      v-model="registerPayPwdInput">
    </el-input>
    <el-select
      v-model="registerSecurityQuesNo"
      placeholder="请选择安全问题"
      class="registerInputBox">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input
      class="registerInputBox"
      placeholder="请回答安全问题"
      v-model="registerSecurityAnsInput">
    </el-input>
    <el-button
      type="primary"
      plain class="registerButton"
      @click="registerRe()">注册</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      registerUserNameInput: '',
      registerPwdInput: '',
      registerConfirmPwdInput: '',
      registerPayPwdInput: '',
      registerSecurityQuesNo: '',
      registerSecurityAnsInput: '',
      options: [{
        value: '1',
        label: '安全问题1'
      }, {
        value: '2',
        label: '安全问题2'
      }, {
        value: '3',
        label: '安全问题3'
      }, {
        value: '4',
        label: '安全问题4'
      }, {
        value: '5',
        label: '安全问题5'
      }],
      wrongPwd: false,
    }
  },
  inject: ['reload'],
  methods: {
    // 根据输入信息注册用户
    registerRe () {
      let data =  {
        // 统一字段
        username: this.registerUserNameInput,
        pwd: this.registerPwdInput,
        userPayPwd: this.registerPayPwdInput,
        questionIndex: parseInt(this.registerSecurityQuesNo),
        answer: this.registerSecurityAnsInput
      }
      if (this.registerPwdInput === this.registerConfirmPwdInput) {
        this.postServerRequest('http://127.0.0.1:28885/uiapi/user/register', this.$qs.stringify(data))
          .then((res) => {
            console.log(res)
            if (res.status === 200) {
              // 注册成功通知
              this.$message({
                message: '您已注册成功！请登录。',
                type: 'success'
              })
              this.reload()
              this.$router.push({path: '/login'}) // 跳转到登陆界面
            } else if (res.status === 204) {
              // 注册失败通知: 用户名已存在
              this.registerUserNameInput = ''
              this.$message.error('该用户名已存在！请输入一个新的用户名。')
            }
          })
      } else if (this.registerPwdInput !== this.registerConfirmPwdInput) {
        this.wrongPwd = true
        this.$message.error('两次输入的密码不一致！请确保输入一致的密码。')
      }
    },
    // 检查两次输入登陆密码是否一致
    notWrongPwd () {
      if (this.wrongPwd) {
        return false
      } else if (!this.wrongPwd) {
        return true
      }
    }
  }
}
</script>

<style scoped>
.registerInputBox {
  margin-top: 25px;
  text-align: center;
  width: 300px;
}

.registerPwdInputBox {
  margin-top: 25px;
  text-align: center;
  width: 300px;
  border: 1px solid #F56C6C;
  border-radius: 5px;
}

.registerButton {
  margin-top: 25px;
  margin-bottom: 20px;
  text-align: center;
  width: 300px;
}

</style>
