<template>
  <div class="no-padding">
    <el-container class="home-container">
      <el-header class="home-header">
        <el-menu
          router
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#409EFF"
          text-color="#D7D7D7"
          active-text-color="#FFFFFF">
          <el-menu-item index="1" disabled>SE基金</el-menu-item>
          <el-menu-item index="/homePage">首页</el-menu-item>
          <el-menu-item index="/myAccount">我的账户</el-menu-item>
          <el-menu-item index="/fundList">基金净值</el-menu-item>
          <el-menu-item index="/knowFundKnowledge">了解基金</el-menu-item>
          <el-menu-item
            :key="activeIndex"
            index="/login"
            style="float: right; margin-right: 100px"
            v-if="!verifyLogin()">
            登陆
          </el-menu-item>
          <el-menu-item
            index="/logout"
            style="float: right; margin-right: 100px"
            @click="logOut()"
            v-else>
            退出登录
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="no-padding">
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      isNotLogin: {display: 'block'},
      isLogin: {display: 'none'}
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
    verifyLogin () {
      return window.localStorage.getItem('uuid')
    },
    logOut () {
      this.$store.commit('$_removeStorage')
      this.$router.push('/login')
    }
  },
  computed: {
    activeIndex () {
      return this.$route.meta.activeMenu
    }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  padding: 0;
  margin: 0;
  height: 100%;
}

.home-container {
  min-width: 1190px;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  padding: 0;
}

.home-header {
  padding: 0;
}

.no-padding {
  padding: 0;
}

/*.el-submenu__icon-arrow {*/
/*  color: #D7D7D7 !important;*/
/*}*/
</style>
