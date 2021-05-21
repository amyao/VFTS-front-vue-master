<template>
  <div class="myAccount-wrapper">
    <el-container class="accountMenu-container">
      <!--个人主页左侧边栏-->
      <el-aside width="auto" class="account-aside">
        <el-menu
          router
          default-active="/myAccount/accountHome"
          class="account-menu">
          <el-menu-item index="/myAccount/accountHome" class="account-item">
            <i class="el-icon-house"></i>
            <span slot="title">我的主页</span>
          </el-menu-item>
          <el-menu-item index="/myAccount/selfListedFund" class="account-item">
            <i class="el-icon-document-add"></i>
            <span slot="title">自选基金</span>
          </el-menu-item>
          <el-menu-item index="/myAccount/holdingFund" class="account-item">
            <i class="el-icon-document"></i>
            <span slot="title">持有基金</span>
          </el-menu-item>
          <el-menu-item index="/myAccount/accountInfo" class="account-item">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">账户信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--个人主页右主页内容，路由导航-->
      <el-main>
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  provide () {
    return {
      reload2: this.reload2
    }
  },
  data () {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    reload2 () {
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
  created () {
    this.$router.push({path: '/myAccount/accountHome'})
  }
}
</script>

<style>
.accountMenu-container {
  padding-left: 10px;
}

.account-aside {
  padding-top: 20px;
}

.account-menu {
  min-height: 600px;
  left: 0;
}

.account-item {
  padding-right: 30px;
}
</style>
