<template>
  <div class="itemCenter">
    <el-tabs type="border-card" stretch="true">
      <el-tab-pane class="tabPage" label="登陆">
        <log></log>
      </el-tab-pane>

      <el-tab-pane class="tabPage" label="注册">
        <register></register>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import register from './register'
import log from './log'
export default {
  data () {
    return {
    }
  },
  methods: {

  },
  components: {
    'register': register,
    'log': log
  }
}
</script>

<style>
.itemCenter {
  margin: 0 auto;
  text-align: center;
  width: 600px;
  padding-top: 30px;
}

.tabPage {
  margin: 0 auto;
  text-align: center;
  width: 300px;
}

</style>
