<template>
  <div class="accountInfo-wrapper">
    <div class="accountInfo-header">修改账户信息</div>
    <div class="accountInfo-editor-buttons">
      <el-button class="accountInfo-editor-button" @click="pwdEditorDialogFormVisible = true">修改账户密码</el-button>
      <el-button class="accountInfo-editor-button" @click="payPwdEditorDialogFormVisible = true">修改交易密码</el-button>
      <el-button class="accountInfo-editor-button" @click="securityAnsEditorDialogFormVisible = true">修改安全问题</el-button>
    </div>
    <!--修改账户密码会话框-->
    <div class="accountInfo-dialog-pwdEditor">
      <el-dialog
        title="修改账户密码"
        :visible.sync="pwdEditorDialogFormVisible"
        @close="closePwdEditorDialog"
        width="500px">
        <el-form :model="pwdEditorForm" style="margin-right: 80px">
          <el-form-item label="输入旧密码:" :label-width="formLabelWidth">
            <el-input v-model="pwdEditorForm.oldPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="输入新密码:" :label-width="formLabelWidth">
            <el-input v-if="notWrongPwd()" v-model="pwdEditorForm.newPwd" autocomplete="off"></el-input>
            <el-input v-else v-model="pwdEditorForm.newPwd" autocomplete="off" class="notSamePwdInput"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:" :label-width="formLabelWidth">
            <el-input v-if="notWrongPwd()" v-model="pwdEditorForm.confirmNewPwd" autocomplete="off"></el-input>
            <el-input v-else v-model="pwdEditorForm.confirmNewPwd" autocomplete="off" class="notSamePwdInput"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="pwdEditorDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatePwd()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--修改交易密码会话框-->
    <div class="accountInfo-dialog-payPwdEditor">
      <el-dialog
        title="修改交易密码"
        :visible.sync="payPwdEditorDialogFormVisible"
        width="500px"
        @close="closePayPwdEditorDialog">
        <el-form :model="payPwdEditorForm" style="margin-right: 80px">
          <el-form-item label="旧交易密码:" :label-width="formLabelWidth">
            <el-input v-model="payPwdEditorForm.oldPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新交易密码:" :label-width="formLabelWidth">
            <el-input v-if="notWrongPwd()" v-model="payPwdEditorForm.newPwd" autocomplete="off"></el-input>
            <el-input v-else v-model="payPwdEditorForm.newPwd" autocomplete="off" class="notSamePwdInput"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:" :label-width="formLabelWidth">
            <el-input v-if="notWrongPwd()" v-model="payPwdEditorForm.confirmNewPwd" autocomplete="off"></el-input>
            <el-input v-else v-model="payPwdEditorForm.confirmNewPwd" autocomplete="off" class="notSamePwdInput"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="payPwdEditorDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatePayPwd()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--修改安全问题会话框-->
    <div class="accountInfo-dialog-securityAnsEditor">
      <el-dialog
        title="修改安全问题"
        :visible.sync="securityAnsEditorDialogFormVisible"
        width="600px"
        @close="closeSecAnsEditorDialog">
        <el-form :model="securityAnsEditorForm" style="margin-right: 80px; margin-left: 30px" label-width="130px">
          <el-form-item label="旧安全问题:">
            {{oldSecQuesNo}}
          </el-form-item>
          <el-form-item label="旧安全问题回答:">
            <el-input v-model="securityAnsEditorForm.oldAns" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择新安全问题:">
            <el-select
              v-model="securityAnsEditorForm.newQuestionNo"
              style="width: 320px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新安全问题回答:">
            <el-input v-model="securityAnsEditorForm.newAns" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="securityAnsEditorDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateSecAns()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pwdEditorDialogFormVisible: false,
      payPwdEditorDialogFormVisible: false,
      securityAnsEditorDialogFormVisible: false,
      oldSecQuesNo: '',
      pwdEditorForm: {
        oldPwd: '',
        newPwd: '',
        confirmNewPwd: ''
      },
      payPwdEditorForm: {
        oldPwd: '',
        newPwd: '',
        confirmNewPwd: ''
      },
      securityAnsEditorForm: {
        newQuestionNo: '',
        oldAns: '',
        newAns: ''
      },
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
      formLabelWidth: '130px',
      wrongPwd: false
    }
  },
  methods: {
    // 用localStorage存储的username请求安全问题序号
    getSecQuesNoByUsername () {
      let data = {
        username: JSON.parse(window.localStorage.getItem('uuid')).username
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/user/getSecurityQuestionIndex', this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.oldSecQuesNo = "安全问题" + res.data
          } else {
            return 0
          }
        })
    },
    // 请求修改账户登陆密码
    updatePwd () {
      if (this.pwdEditorForm.newPwd !== this.pwdEditorForm.confirmNewPwd) {
        this.wrongPwd = true
        this.$message.error('两次输入的密码不一致！请确保输入一致的密码。')
      } else {
        let data = {
          uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
          oldPwd: this.pwdEditorForm.oldPwd,
          newPwd: this.pwdEditorForm.newPwd
        }
        // 发送post请求修改账户密码，body为uuid+oldPwd+newPwd
        this.postServerRequest('http://127.0.0.1:28885/uiapi/user/updatePwd', this.$qs.stringify(data))
          .then(res => {
            this.clearForm()
            console.log(res)
            if (res.status === 200) {
              this.$message({
                message: '您已成功修改密码。',
                type: 'success'
              })
              this.pwdEditorDialogFormVisible = false
            } else {
              this.$message.error("旧密码不正确！请确认后再输入。")
            }
          })
      }
    },
    // 申请修改支付密码
    updatePayPwd () {
      if (this.payPwdEditorForm.newPwd !== this.payPwdEditorForm.confirmNewPwd) {
        this.wrongPwd = true
        this.$message.error('两次输入的密码不一致！请确保输入一致的密码。')
      } else {
        let data = {
          uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
          oldPayPwd: this.payPwdEditorForm.oldPwd,
          newPayPwd: this.payPwdEditorForm.newPwd
        }
        // 发送post请求修改交易密码，body为uuid+oldPwd+newPwd
        this.postServerRequest('http://127.0.0.1:28885/uiapi/user/updatePayPwd', this.$qs.stringify(data))
          .then(res => {
            this.clearForm()
            console.log(res)
            if (res.status === 200) {
              this.$message({
                message: '您已成功修改支付密码。',
                type: 'success'
              })
              this.payPwdEditorDialogFormVisible = false
            } else {
              this.$message.error("旧支付密码不正确！请确认后再输入。")
            }
          })
      }
    },
    // 申请修改安全问题信息
    updateSecAns () {
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
        oldAnswer: this.securityAnsEditorForm.oldAns,
        newQuestionIndex: this.securityAnsEditorForm.newQuestionNo,
        newAnswer: this.securityAnsEditorForm.newAns
      }
      // 发送post请求修改安全问题，data为uuid+oldAns+newNo+newAns
      this.postServerRequest('http://127.0.0.1:28885/uiapi/user/updateQuestion', this.$qs.stringify(data))
        .then(res => {
          this.clearForm()
          console.log(res)
          if (res.status === 200) {
            this.$message({
              message: '您已成功修改安全问题信息。',
              type: 'success'
            })
            this.securityAnsEditorDialogFormVisible = false
            this.getSecQuesNoByUsername()
          } else {
            this.$message.error("旧安全问题回答不正确！请确认后再输入。")
          }
        })
    },
    // 关闭表单时清空输入数据
    closePwdEditorDialog () {
      this.clearForm()
    },
    closePayPwdEditorDialog () {
      this.clearForm()
    },
    closeSecAnsEditorDialog () {
      this.clearForm()
    },
    // 检查两次输入密码是否一致，判断输入边框是否变红
    notWrongPwd () {
      if (this.wrongPwd) {
        return false
      } else if (!this.wrongPwd) {
        return true
      }
    },
    // 清空所有表单绑定的输入值
    clearForm () {
      this.pwdEditorForm = {
        oldPwd: '',
        newPwd: '',
        confirmNewPwd: ''
      }
      this.payPwdEditorForm = {
        oldPwd: '',
        newPwd: '',
        confirmNewPwd: ''
      }
      this.securityAnsEditorForm = {
        oldQuestionNo: '',
        newQuestionNo: '',
        oldAns: '',
        newAns: ''
      }
      this.wrongPwd = false
    }
  },
  created () {
    this.getSecQuesNoByUsername()
  }
}
</script>

<style scoped>
.accountInfo-wrapper {
  padding: 30px;
}

.accountInfo-header {
  font-size: 15px;
  color: #3479ff;
  font-weight: 700;
  border-left: 3px solid #3479ff;
  padding-left: 7px;
  text-align: left;
}

.accountInfo-editor-buttons {
  float: left;
  margin: 50px;
}

.accountInfo-editor-button {
  margin-right: 50px;
}

.notSamePwdInput {
  border: 1px solid #F56C6C;
  border-radius: 5px;
}
</style>
