<template>
  <div class="loginPage-wrapper">
    <!--登陆页面主页面-->
    <div class="loginPage-body">
      <el-input
        class="loginInputBox"
        placeholder="用户名"
        prefix-icon="el-icon-user"
        v-model="loginUserNameInput">
      </el-input>
      <el-input
        class="loginInputBox"
        placeholder="密码"
        prefix-icon="el-icon-lock"
        v-model="loginPwdInput"
        show-password>
      </el-input>
      <div class="forgetPwd-box" @click="resetPwdDialog1Visible=true">
        <el-button class="forgetPwd" type="text" @click="dialogTableVisible = true">忘记密码？</el-button>
<!--        <p class="forgetPwd">忘记密码？</p>-->
      </div>
      <el-button
        type="primary"
        plain class="loginButton"
        @click="loginRe">登陆</el-button>
    </div>
    <!--忘记密码会话框，输入用户名-->
    <div class="loginPage-resetPwdDialog1">
      <el-dialog
        title="忘记密码"
        :visible.sync="resetPwdDialog1Visible"
        width="500px">
        <el-form :model="setPwdForm" style="margin-right: 50px">
          <el-form-item label="请输入您的用户名：" label-width="180px">
            <el-input v-model="setPwdForm.userName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetPwdDialog1Visible = false">取 消</el-button>
          <el-button type="primary" @click="submitUserName()">下一步</el-button>
        </div>
      </el-dialog>
    </div>
    <!--忘记密码会话框，输入安全问题和新密码-->
    <div class="loginPage-resetPwdDialog2">
      <el-dialog
        title="忘记密码"
        :visible.sync="resetPwdDialog2Visible"
        width="600px">
        <el-form :model="setPwdForm" style="margin-right: 50px">
          <el-form-item label="您的安全问题是：" label-width="180px">
            安全问题{{forgetPwdQuesNo}}
          </el-form-item>
          <el-form-item label="请输入您的回答：" label-width="180px">
            <el-input v-model="setPwdForm.secQuesAns" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入您的新密码：" label-width="180px">
            <el-input v-model="setPwdForm.newPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请确认您的新密码：" label-width="180px">
            <el-input v-model="setPwdForm.confirmNewPwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetPwdDialog2Visible = false">取 消</el-button>
          <el-button type="primary" @click="submitNewPwd()">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginUserNameInput: '',
      loginPwdInput: '',
      resetPwdDialog1Visible: false,
      resetPwdDialog2Visible: false,
      setPwdForm: {
        userName: '',
        secQuesAns: '',
        newPwd: '',
        confirmNewPwd: ''
      },
      forgetPwdQuesNo: ''
    }
  },
  inject: ['reload'],
  methods: {
    // 根据用户名和密码校验登陆
    loginRe () {
      let data = {
        username: this.loginUserNameInput, // 登录名
        pwd: this.loginPwdInput // 登录密码
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/user/login', this.$qs.stringify(data))
        .then(res => {
        console.log(res)
        if (res.status === 200) {
          let userInfo = res.data
          this.$store.commit('$_setToken', userInfo) // 储存登陆账户uuid和username到vuex
          this.$router.push({path: '/myAccount'}) // 跳转到首页
        } else {
          // 登陆失败通知，重置输入框
          this.$message.error('账户名和密码不匹配！请确认后重新输入！')
          this.loginUserNameInput = ''
          this.loginPwdInput = ''
        }
      })
    },
    // 用userName请求安全问题序号
    submitUserName () {
      let data = {
        username: this.setPwdForm.userName
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/user/getSecurityQuestionIndex', this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.forgetPwdQuesNo = res.data
            this.resetPwdDialog1Visible = false
            this.resetPwdDialog2Visible = true
          } else {
            this.clearForm()
            this.resetPwdDialog1Visible = false
            this.$message.error('用户名不存在！')
          }
        })
    },
    // 用userName和安全问题回答重置密码
    submitNewPwd () {
      let data = {
        username: this.setPwdForm.userName,
        answer: this.setPwdForm.secQuesAns,
        newPwd: this.setPwdForm.newPwd
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/user/resetPwd', this.$qs.stringify(data))
        .then(res => {
          this.clearForm()
          console.log(res)
          if (res.status === 200) {
            this.resetPwdDialog2Visible = false
            this.$message({
              message: '您已成功重置密码！请登录。',
              type: 'success'
            })
          } else {
            this.resetPwdDialog2Visible = false
            this.$message.error('安全问题回答失败！重置密码失败！')
          }
        })
    },
    // 清空表单输入数据
    clearForm () {
      this.setPwdForm.userName = ''
      this.setPwdForm.secQuesAns = ''
      this.setPwdForm.newPwd = ''
      this.setPwdForm.confirmNewPwd = ''
    }
  }
}
</script>

<style scoped>
.loginInputBox {
  margin-top: 40px;
  text-align: center;
  width: 300px;
}

.loginButton {
  margin-top: 30px;
  margin-bottom: 40px;
  text-align: center;
  width: 300px;
}

.forgetPwd-box {
  margin-right: 5px;
  padding: 0;
  float: right;
  display: block;
  border-bottom: 1px solid #ddd;
}

.forgetPwd {
  margin-left: 5px;
  margin-bottom: 0;
  padding: 0;
  font-size: 11px;
  color: grey;
}

</style>
