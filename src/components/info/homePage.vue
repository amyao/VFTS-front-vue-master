<template>
  <div>
    <div class="fundList-header">近一年涨幅最快热门基金</div>
    <div class="homePage-wrapper">
      <template>
        <el-carousel :interval="3000" type="card" height="400px">
          <el-carousel-item v-for="(fundInfo, index) in hotFundData" :key="index + fundInfo" @click="goFundInfo(fundInfo.code)">
            <h3 class="medium" @click="goFundInfo(fundInfo.code)">NO {{fundInfo.seq}}. {{fundInfo.name}} ({{fundInfo.code}})</h3>
            <h class="red-growth">+{{fundInfo.lastYearGrowth}}%</h>
            <p>{{fundInfo.netWorthDate}} {{fundInfo.netWorth}}元</p>
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hotFundData: []
    }
  },
  methods: {
    getHotFundData () {
      this.postRequest("https://api.doctorxiong.club/v1/fund/rank", {sort: '1n'})
        .then(res => {
          if (res && res.data.code === 200) {
            for (let i = 0; i < 5; i++) {
              this.hotFundData.push(res.data.data.rank[i])
              this.hotFundData[i].seq = i + 1
            }
            console.log(this.hotFundData)
          }
        })
    },
    goFundInfo (fundId) {
      this.$router.push({path: '/fundList/fundInfo', query: [{code: fundId}, {pageIndex: 1}, 'fundListPage']})
    }
  },
  created () {
    this.getHotFundData()
  }
}
</script>

<style scoped>
.homePage-wrapper {
  margin: 60px;
}

.fundList-header {
  margin: 30px;
  font-size: 15px;
  color: #3479ff;
  font-weight: 700;
  border-left: 3px solid #3479ff;
  padding-left: 7px;
  text-align: left;
}

.red-growth {
  color: red;
  font-size: 40px;
  line-height: 80px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 16px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item p {
  color: #475669;
  font-size: 12px;
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #f2f2f2;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #f2f2f2;
}
</style>
