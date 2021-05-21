<template>
  <div class="certainFundInfo-wrapper">
    <!--    基金信息展示页面-->
    <div class="fundInfo-wrapper">

      <div class="fundInfo-title">
        <el-page-header
          @back="goBack"
          class="fundInfo-header"
          title="返回列表"
          style="color: #3479ff"></el-page-header>
        <span class="fundInfo-fundName">{{fundData.name}}</span>
        <span class="fundInfo-fundCode">({{fundData.code}})</span>
        <span class="fundInfo-fundType">{{fundInfo.type}}</span>

        <div class="fundInfo-buttons-col5" :style="fromAccountPage">
          <el-button
            type="primary"
            plain size="mini"
            style="margin: 5px; position: relative;"
            :style="notHoldThisFund"
            @click="buyIn">
            买入
          </el-button>
          <el-button
            type="primary"
            plain size="mini"
            style="margin-bottom: 5px; position: relative;"
            :style="holdThisFund"
            @click="buyInOrSellOut">
            买入\卖出
          </el-button>
          <el-button
            type="success"
            plain size="mini"
            :style="notSelfListThisFund"
            @click="addSelect">
            加入自选
          </el-button>
          <el-button
            type="success"
            plain size="mini"
            :style="selfListThisFund"
            @click="removeSelect">
            取消自选
          </el-button>
        </div>
      </div>

      <div class="fundInfo-detail">

        <div class="fundInfo-detail-col1">
          <div class="fundInfo-detail-col-value" style="float: left">
            <p class="fundInfo-detail-valueName">估算净值 {{fundData.expectWorthDate}}</p>
            <p class="fundInfo-detail-value">{{fundData.expectWorth}}</p>
          </div>
          <div class="fundInfo-detail-col-value" style="margin-left: 30px">
            <p class="fundInfo-detail-valueName">估算涨跌幅</p>
            <p class="fundInfo-detail-value">
              <span v-if="fundData.expectGrowth>=0" style="color:#F56C6C">+{{fundData.expectGrowth}}%</span>
              <span v-else style="color:#67C23A">{{fundData.expectGrowth}}%</span>
            </p>
          </div>
        </div>

        <div class="fundInfo-detail-col2">
          <div class="fundInfo-detail-col-value2" style="float: left">
            <p class="fundInfo-detail-valueName">单位净值 {{fundData.netWorthDate}}</p>
            <p class="fundInfo-detail-value">{{fundData.netWorth}}</p>
          </div>
          <div class="fundInfo-detail-col-value2" style="float: right">
            <p class="fundInfo-detail-valueName">日涨跌幅</p>
            <p class="fundInfo-detail-value">
              <span v-if="fundData.dayGrowth>=0" style="color:#F56C6C">+{{fundData.dayGrowth}}%</span>
              <span v-else style="color:#67C23A">{{fundData.dayGrowth}}%</span>
            </p>
          </div>
        </div>

        <div class="fundInfo-detail-col3">
          <div class="fundInfo-detail-col-text">
            <p class="fundInfo-detail-text">
              <span>基金经理</span>
              <span style="margin-left: 10px">{{fundInfo.manager}}</span>
            </p>
            <p class="fundInfo-detail-text">
              <span>基金规模</span>
              <span style="margin-left: 10px">{{fundInfo.fundScale}}</span>
            </p>
          </div>
        </div>

        <div class="fundInfo-detail-col4">
          <div class="fundInfo-detail-col-text2">
            <p class="fundInfo-detail-text">
              <span>成立日期</span>
              <span style="margin-left: 10px">{{fundInfo.netWorthData[0][0]}}</span>
            </p>
            <p class="fundInfo-detail-text">
              <span>买入费率（当前/原始）</span>
              <span style="margin-left: 10px">{{fundInfo.buyRate}}%/{{fundInfo.buySourceRate}}%</span>
            </p>
          </div>
        </div>

        <div class="fundInfo-buttons-col5" :style="fromFundListPage">
          <el-button
            type="primary"
            plain size="mini"
            style="margin-left: 5px; position: relative;"
            :style="notHoldThisFund"
            @click="buyIn">
            买入
          </el-button>
          <el-button
            type="primary"
            plain size="mini"
            style="margin-left: 5px; position: relative;"
            :style="holdThisFund"
            @click="buyInOrSellOut">
            买入/卖出
          </el-button>
          <el-button
            type="success"
            plain size="mini"
            :style="notSelfListThisFund"
            @click="addSelect">
            加入自选
          </el-button>
          <el-button
            type="success"
            plain size="mini"
            :style="selfListThisFund"
            @click="removeSelect">
            取消自选
          </el-button>
        </div>
      </div>

      <div class="fundInfo-chart" style="overflow: auto">
        <div class="fundChart-block" style="float:left; overflow: auto">
          <div>
            <div class="fundChart-block-title">业绩走势</div>
            <div>
              <div :id="fundChartRange" style="margin-left: 30px">
                <div :id="fundChartNo" style="position: relative">
                  <fund-chart-1 v-if = 'flag' :fundChartData="fundChartData">
                  </fund-chart-1>
                </div>
              </div>

              <div class="fundChartRangeSelector">
                <el-tabs
                  stretch
                  v-model="fundChartRange"
                  @tab-click="fundChartRangeClick">
                  <el-tab-pane :disabled="fundExistOneMonth" label="近1个月" name="1"></el-tab-pane>
                  <el-tab-pane :disabled="fundExistThreeMonth" label="近3个月" name="2"></el-tab-pane>
                  <el-tab-pane :disabled="fundExistHalfYear" label="近6个月" name="3"></el-tab-pane>
                  <el-tab-pane :disabled="fundExistOneYear" label="近1年" name="4"></el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </div>

        <div class="fundChart-block" style="float: right;">
          <div>
            <div class="fundChart-block-title">净值估算</div>
            <div>
              <div style="margin-left: 30px">
                <div style="position: relative">
                  <fund-chart-2 v-if = 'flag2' :fundChartData2="fundChartData2">
                  </fund-chart-2>
                </div>
              </div>
            </div>
            <span style="font-size: 12px; margin-left: 50px; margin-top: 20px">估值收益仅供参考，实际涨跌幅以基金净值为准</span>
          </div>
        </div>
      </div>
    </div>
    <!--    买入时的弹窗-->
    <div class="buyIn-dialog">
      <el-dialog
        title="买入操作"
        :visible.sync="buyInDialogFormVisible"
        width="1000px"
        center>
        <div class="buyIn-dialog-body">
          <div class="buyIn-input">
            <el-form :model="buyInForm">
              <p class="dialog-instruction">购买信息确认</p>
              <p style="margin: 30px">购买基金名称：{{fundData.name}} ({{fundData.code}})</p>
              <el-form-item label="买入金额：¥" :label-width="formLabelWidth">
                <el-input v-model="buyInForm.amount" autocomplete="off" placeholder="最低买入100.00元"></el-input>
              </el-form-item>
              <el-form-item label="交易密码：" :label-width="formLabelWidth">
                <el-input v-model="buyInForm.payPwd" autocomplete="off" placeholder="请输入六位交易密码"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="buyIn-instruction">
            <p class="dialog-instruction" style="margin-left: 50px">交易规则</p>
            <el-steps :active="3" space="400%" style="margin-left: 40px" align-center>
              <el-step title="T日" description="买入提交"></el-step>
              <el-step title="T+1日" description="确认份额"></el-step>
              <el-step title="T+1当日净值更新后" description="查看盈亏"></el-step>
            </el-steps>
            <p class="dialog-rule">T日：交易日，以每天15:00为界限，15:00之前为T日，15:00及之后为T+1日。周末和法定节假日属于非交易日，以支付成功时间为准。</p>
            <p class="dialog-rule">T日申请，将按T日基金净值确认份额。份额确认当日，基金净值更新后即可查看首笔盈亏。开放赎回的基金在买入确认后下一T日可卖出。</p>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button
            @click="buyInDialogFormVisible = false"
            size="mini"
            style="margin: 20px">
            取 消
          </el-button>
          <el-button
            type="primary"
            @click="buyInThisFund"
            size="mini"
            style="margin: 20px">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <!--    卖出时的弹窗-->
    <div class="sellOut-dialog">
      <el-dialog
        title="卖出操作"
        :visible.sync="sellOutDialogFormVisible"
        width="1000px"
        center>
        <div class="sellOut-dialog-body">
          <div class="sellOut-input">
            <el-form :model="sellOutForm">
              <p class="dialog-instruction">卖出信息确认</p>
              <p style="margin: 30px">卖出基金名称：{{fundData.name}} ({{fundData.code}})</p>
              <el-form-item label="卖出份额：" :label-width="formLabelWidth">
                <el-input v-model="sellOutForm.shares" autocomplete="off" :placeholder=sellSharesPlaceholder></el-input>
              </el-form-item>
              <el-form-item label="交易密码：" :label-width="formLabelWidth">
                <el-input v-model="sellOutForm.payPwd" autocomplete="off" placeholder="请输入六位交易密码"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="sellOut-instruction">
            <p class="dialog-instruction" style="margin-left: 50px">交易规则</p>
            <el-steps :active="3" space="400%" style="margin-left: 40px" align-center>
              <el-step title="T日" description="卖出提交"></el-step>
              <el-step title="T+1日" description="确认价格"></el-step>
              <el-step title="T+1当日净值更新后" description="资金到账"></el-step>
            </el-steps>
            <p class="dialog-rule">T日：交易日，以每天15:00为界限，15:00之前为T日，15:00及之后为T+1日。周末和法定节假日属于非交易日，以支付成功时间为准。</p>
            <p class="dialog-rule">T日申请，将按T日基金净值确认份额。份额确认当日，基金净值更新后即可查看首笔盈亏。开放赎回的基金在买入确认后下一T日可卖出。</p>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button
            @click="sellOutDialogFormVisible = false"
            size="mini"
            style="margin: 20px">
            取 消
          </el-button>
          <el-button
            type="primary"
            @click="sellOutThisFund"
            size="mini"
            style="margin: 20px">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <!--    询问要买入还是卖出的弹窗-->
    <div class="buyInOrSellOut-dialog">
      <el-dialog
        title="提示"
        :visible.sync="buyInOrSellOutDialogVisible"
        width="30%"
        center>
        <span>请确认您要买入还是卖出</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="buyInOrSellOutDialogVisible = false; buyInDialogFormVisible = true">买 入</el-button>
          <el-button type="primary" @click="buyInOrSellOutDialogVisible = false; sellOutDialogFormVisible = true">卖 出</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 子组件引入
import fundChart1 from './fundChart1'
import fundChart2 from './fundChart2'
export default {
  inject: ['reload'],
  data () {
    return {
      fullscreenLoading: true,
      fundId: 0,
      params: {},
      fundData: {},
      fundInfo: {},
      fundChartRange: '1',
      fundChartNo: 'g-chart1',
      sh300Data: {},
      fundExpectWorthTrend: [],
      fundChartData: [[], [], [], []],
      fundChartData2: [[], []],
      flag: false,
      flag2: false,
      fundExistOneMonth: false,
      fundExistThreeMonth: false,
      fundExistHalfYear: false,
      fundExistOneYear: false,
      fromAccountPage: {display: 'none'},
      fromFundListPage: {display: 'none'},
      notHoldThisFund: {display: 'inline-block'},
      holdThisFund: {display: 'none'},
      notSelfListThisFund: {display: 'inline-block'},
      selfListThisFund: {display: 'none'},
      appCode: 'APPCODE 664cf5062a344ddea1aab8daf9ae71ba',
      buyInDialogFormVisible: false,
      sellOutDialogFormVisible: false,
      buyInOrSellOutDialogVisible: false,
      formLabelWidth: '120px',
      buyInForm: {
        amount: '',
        payPwd: ''
      },
      sellOutForm: {
        shares: '',
        payPwd: ''
      },
      holdingShares: -1,
      sellSharesPlaceholder: "最多卖出" + this.holdingShares + "份额"
    }
  },
  methods: {
    // 根据uuid和fundId获取用户是否持有该基金
    checkHoldingOrNot () {
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/currentHoldings', this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            // 检查该用户持有基金里有无该基金，若有，获取持有shares
            for (let i = 0; i < res.data.length; i++) {
              if (this.fundId === res.data[i].fundId) {
                this.holdingShares = res.data[i].holdingShares
              }
            }
            // 判断是否持有，若有(>0)，按钮显示"买入/卖出"
            if (this.holdingShares > 0) {
              this.notHoldThisFund = {display: 'none'}
              this.holdThisFund = {display: 'inline-block'}
              this.sellSharesPlaceholder = "最多卖出" + this.holdingShares + "份额"
            }
          }
      })
    },
    // 根据uuid和fundId获取用户是否自选该基金
    checkSelfListedOrNot () {
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/selfListed', this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            for (let i = 0; i < res.data.length; i++) {
              if (this.fundId === res.data[i]) {
                // 如已加入自选，按钮显示"取消自选"
                this.selfListThisFund = {display: 'inline-block'}
                this.notSelfListThisFund = {display: 'none'}
              }
            }
          }
      })
    },
    // 将fundId该基金加入uuid用户的自选列表
    addSelfListed () {
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
        fundId: this.fundId
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/addToSelfListed', this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.selfListThisFund = {display: 'inline-block'}
            this.notSelfListThisFund = {display: 'none'}
            this.$message({
              message: '您已成功将该基金加入自选！',
              type: 'success'
            })
          }
      })
    },
    // 在uuid用户的自选列表中移除该fundId基金
    removeSelfListed () {
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
        fundId: this.fundId
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/deleteFromSelfListed',this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.selfListThisFund = {display: 'none'}
            this.notSelfListThisFund = {display: 'inline-block'}
            // this.reload()
            this.$message({
              message: '您已成功将该基金取消自选！',
              type: 'success'
            })
          }
      })
    },
    // 买入基金订单，请求body为uuid，买入基金代码，买入金额，交易密码
    buyInThisFund () {
      // 最低买入100元，判断是否达到要求
      if (parseFloat(this.buyInForm.amount) >= 100) {
        let data = {
          uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
          fundId: this.fundId,
          buyingAmount: this.buyInForm.amount,
          payPwd: this.buyInForm.payPwd
        }
        // 请求place买入订单
        this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/buyOrder', this.$qs.stringify(data))
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.buyInDialogFormVisible = false
              this.$message({
                message: '买入操作成功！',
                type: 'success'
              })
            } else {
              this.buyInForm.payPwd = ""
              this.$message.error("交易密码输入有误！请确认后再输入。")
            }
          })
      } else if (parseFloat(this.buyInForm.amount) < 100) {
        this.buyInForm.amount = ""
        this.$message.error("最低买入100元，请确认买入金额。")
      }
    },
    // 卖出基金订单，请求body为uuid，卖出基金代码，卖出份额，交易密码
    sellOutThisFund () {
      // 最高卖出持有份额，判断是否达到要求
      if (parseFloat(this.sellOutForm.shares) <= this.holdingShares) {
        let data = {
          uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
          fundId: this.fundId,
          sellingShares: this.sellOutForm.shares,
          payPwd: this.sellOutForm.payPwd
        }
        // 请求place卖出订单
        this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/sellOrder', this.$qs.stringify(data))
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.sellOutDialogFormVisible = false
              this.$message({
                message: '卖出操作成功！',
                type: 'success'
              })
            } else {
              this.sellOutForm.payPwd = ""
              this.$message.error("交易密码输入有误！请确认后再输入。")
            }
          })
      } else if (parseFloat(this.sellOutForm.shares) > this.holdingShares) {
        this.sellOutForm.shares = ""
        this.$message.error("超出持有份额，请确认卖出份额。")
      }
    },
    // 获取该基金信息接口
    getFundData () {
      this.getRequest('https://api.doctorxiong.club/v1/fund?code=' + String(this.fundId) + '&token=39CknoZcrT')
        .then(response => {
          if (response && response.data.code === 200) {
            this.fundData = response.data.data[0]
          }
        })
    },
    // 获取该基金信息接口
    getFundInfo () {
      this.getRequest('https://api.doctorxiong.club/v1/fund/detail?code=' + String(this.fundId) + '&token=39CknoZcrT')
        .then(response => {
          if (response && response.data.code === 200) {
            this.fundInfo = response.data.data
            this.getSh300Data()
            this.checkFundExistTime()
          }
        })
    },
    // 获取沪深300指数信息接口
    getSh300Data () {
      this.getRequest('https://api.doctorxiong.club/v1/stock/kline/day?code=sh000300&startDate=' + this.getNextOrPreviousDate(this.previousOneYear, -7) + '&token=39CknoZcrT')
        .then(response => {
          this.sh300Data = response.data.data
          this.sh300Data.shift()
          this.sh300Data.pop()
          this.drawEChart1()
        })
    },
    // 获取当天估值历史信息接口
    getFundExpectWorthData () {
      this.getRequest('http://fund.market.alicloudapi.com/fundGuzhi?fundcode=' + String(this.fundId), this.appCode)
        .then(response => {
          this.fundExpectWorthTrend = response.data.trend
          for (let i = 0; i < this.fundExpectWorthTrend.length; i++) {
            let content = this.fundExpectWorthTrend[i]
            let arr = content.split(',')
            this.fundChartData2[0][i] = arr[0]
            this.fundChartData2[1][i] = arr[2]
            this.flag2 = true
          }
        })
    },
    // 选择业绩走势图表时间范围
    fundChartRangeClick (tab) {
      if (tab.label === '近1个月') {
        this.drawEChart1()
      }
      if (tab.label === '近3个月') {
        this.drawEChart2()
      }
      if (tab.label === '近6个月') {
        this.drawEChart3()
      }
      if (tab.label === '近1年') {
        this.drawEChart4()
      }
    },
    // helper function，根据时间范围获取走势图需要的数据组，传给子组件fundChart进行走势图绘制
    drawEChart (timeRange, timeRangeGrowth) {
      this.emptyArr()
      let len = this.fundInfo.netWorthData.length
      for (let i = 0; i < len; i++) {
        if (this.fundInfo.netWorthData[len - 1 - i][0] === timeRange) {
          for (let n = i; n >= 0; n--) {
            this.fundChartData[0].push(this.fundInfo.netWorthData[len - n - 1][0])
            let yF = (this.fundInfo.netWorthData[len - n - 1][1] - this.fundInfo.netWorthData[len - i - 1][1])
              / this.fundInfo.netWorthData[len - i - 1][1]
            this.fundChartData[1].push(this.toPercent(yF))
          }
          let len2 = this.fundChartData[0].length - 1
          let lenSh = this.sh300Data.length
          for (let m = len2; m >= 0; m--) {
            let yS = (this.sh300Data[lenSh - m - 1][2] - this.sh300Data[lenSh - len2 - 1][2]) / this.sh300Data[lenSh - len2 - 1][2]
            this.fundChartData[2].push(this.toPercent(yS))
          }
          this.fundChartData[3] = timeRangeGrowth
          this.flag = true
          return this.fundChartData
        }
      }
    },
    // 近1个月业绩走势数据组
    drawEChart1 () {
      this.drawEChart(this.previousMonth, this.fundInfo.lastMonthGrowth)
    },
    // 近3个月业绩走势数据组
    drawEChart2 () {
      this.drawEChart( this.previousThreeMonth, this.fundInfo.lastThreeMonthsGrowth)
    },
    // 近6个月业绩走势数据组
    drawEChart3 () {
      this.drawEChart(this.previousHalfYear, this.fundInfo.lastSixMonthsGrowth)
    },
    // 近1年业绩走势数据组
    drawEChart4 () {
      this.drawEChart(this.previousOneYear, this.fundInfo.lastYearGrowth)
      // console.log(this.fundChartData)
    },
    // 清空向子组件1传递的数组
    emptyArr () {
      this.fundChartData = [[], [], [], [], []]
    },
    // 取百分比并保留两位小数
    toPercent (point) {
      return Number(point * 100).toFixed(2)
    },
    // 取date后days天数的日期，例：2021-04-14后3天，nextData('2021-04-14', 3)
    // 若要取前一天，days为-1即可
    getNextOrPreviousDate (date, days) {
      let dd = new Date(date)
      dd.setDate(dd.getDate() + days)
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
      let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
      return y + '-' + m + '-' + d
    },
    // 取date前一个月的日期，例：2021-04-14前一个月为2021-03-14
    getPreviousMonth (nowDate) {
      let arr = nowDate.split('-')
      let year = arr[0]
      let month = arr[1]
      let day = arr[2]
      let year2 = year
      let month2 = parseInt(month) - 1
      if (month2 === 0) {
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      let date = new Date(year2 + '-' + month2 + '-' + day2)
      let y = date.getFullYear()
      let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return y + '-' + m + '-' + d
    },
    // 检查前date日期是否是交易日并存在于数据中，是则直接返回，否的话取下一个最近的交易日继续检查
    checkLastedExchangeDate (date) {
      let index = this.fundInfo.netWorthData.length - 1
      for (let ddPlus = 0; ddPlus < 5; ddPlus++) {
        for (let i = 0; i < index; i++) {
          if (this.fundInfo.netWorthData[index - i][0] === date) {
            return date
          }
        }
        date = this.getNextOrPreviousDate(date, -1)
      }
    },
    // 计算两个日期之间的月数
    getDateMonths (date1, date2) {
      date1 = date1.split('-')
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1])
      date2 = date2.split('-')
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1])
      return this.$math.abs(date1 - date2)
    },
    // 检查该基金成立时间是否大于1个月、3个月、6个月、1年
    checkFundExistTime () {
      if (this.previousMonth === undefined) {
        this.fundExistOneMonth = true
      } else {
        if (this.getDateMonths(this.nowDate, this.fundInfo.netWorthData[0][0]) < 1) {
          this.fundExistOneMonth = true
        }
      }
      if (this.previousThreeMonth === undefined) {
        this.fundExistThreeMonth = true
      } else {
        if (this.getDateMonths(this.nowDate, this.fundInfo.netWorthData[0][0]) < 3) {
          this.fundExistThreeMonth = true
        }
      }
      if (this.previousHalfYear === undefined) {
        this.fundExistHalfYear = true
      } else {
        if (this.getDateMonths(this.nowDate, this.fundInfo.netWorthData[0][0]) < 6) {
          this.fundExistHalfYear = true
        }
      }
      if (this.previousOneYear === undefined) {
        this.fundExistOneYear = true
      } else {
        if (this.getDateMonths(this.nowDate, this.fundInfo.netWorthData[0][0]) < 12) {
          this.fundExistOneYear = true
        }
      }
      return 0
    },
    // 返回基金列表
    goBack () {
      if (this.fromFundListPage.display === 'inline-block') {
        this.$router.push({path: '/fundList', query: this.params})
      }
      if (this.$route.query[2] === 'accountPage1') {
        this.$router.push({path: '/myAccount/selfListedFund', query: this.params})
      }
      if (this.$route.query[2] === 'accountPage2') {
        this.$router.push({path: '/myAccount/holdingFund', query: this.params})
      }
    },
    // 判断是否登陆，路由守卫，若未登录则跳转到登陆页面
    checkLogin () {
      let uuid = window.localStorage.uuid
      if (uuid === 'null' || uuid === '' || uuid === undefined) {
        this.$message({
          message: '您还未登陆，请先登录！',
          type: 'warning'
        });
        this.$router.push({path:'/login'})
        return false
      }
      return true
    },
    // 买入基金按钮，首先路由守卫检查是否登陆，如已登陆弹出买入会话框
    buyIn () {
      this.checkLogin()
      this.buyInDialogFormVisible = true
    },
    // 卖出基金按钮，登陆后才会有，不需要路由守卫，弹出卖出会话框
    sellOut () {
      this.sellOutDialogFormVisible = true
    },
    // 选择买入或卖出按钮，登陆后才会有，不需要路由守卫，弹出选择买入还是迈出会话框
    buyInOrSellOut () {
      this.buyInOrSellOutDialogVisible =true
    },
    // 加入自选按钮，首先路由守卫检查是否登陆，如已登陆发送加自选请求
    addSelect () {
      this.checkLogin()
      this.addSelfListed()
    },
    // 取消自选按钮，登陆后才会有，不需要路由守卫，发送移除自选请求
    removeSelect () {
      this.removeSelfListed()
    }
  },
  created () {
    // 数据载入时显示loading加载
    const loading = this.$loading()
    // 获取基金详情页面需加载的基金代码
    this.fundId = this.$route.query[0].code
    // 如是从基金列表跳转过来，记录跳转时的pageIndex，返回列表则直接返回该index
    this.params = this.$route.query[1]
    // 获取基金详情页面的前一个页面，判断是否由account或list页面来，分别显示不同位置功能按钮
    if (this.$route.query[2] === 'accountPage1' || this.$route.query[2] === 'accountPage2') {
      this.fromAccountPage.display = 'block'
    }
    if (this.$route.query[2] === 'fundListPage') {
      this.fromFundListPage.display = 'inline-block'
    }
    // 加载该基金数据
    this.getFundData()
    this.getFundInfo()
    this.getFundExpectWorthData()
    // 载入完成关闭loading加载
    loading.close()
    // 检查是否登陆，判断显示的按钮（买入or买入卖出，加入自选or取消自选）
    let uuid = JSON.parse(window.localStorage.getItem('uuid')).uuid
    if (uuid === 'null' || uuid === '' || uuid === undefined) {
      // 未登陆，显示买入+加入自选
      return false
    } else {
      // 已登陆，获取自选基金列表判断该用户是否自选了该基金
      this.checkSelfListedOrNot()
      // 已登陆，获取持有基金列表判断该用户是否持有该基金
      this.checkHoldingOrNot()
    }
  },
  computed: {
    // 获取基金的当天日期
    nowDate: function () {
      return this.fundInfo.netWorthDate
    },
    // 获取基金的日期一个月前
    previousMonth: function () {
      let index = this.fundInfo.netWorthData.length - 1
      let nowDate = this.fundInfo.netWorthData[index][0]
      let previousMonthDate = this.getPreviousMonth(nowDate)
      return this.checkLastedExchangeDate(previousMonthDate)
    },
    // 获取基金的日期三个月前
    previousThreeMonth: function () {
      let index = this.fundInfo.netWorthData.length - 1
      let nowDate = this.fundInfo.netWorthData[index][0]
      let previousOneMonthDate = this.getPreviousMonth(nowDate)
      let previousTwoMonthDate = this.getPreviousMonth(previousOneMonthDate)
      let previousThreeMonthDate = this.getPreviousMonth(previousTwoMonthDate)
      return this.checkLastedExchangeDate(previousThreeMonthDate)
    },
    // 获取基金的日期半年前
    previousHalfYear: function () {
      let index = this.fundInfo.netWorthData.length - 1
      let nowDate = this.fundInfo.netWorthData[index][0]
      let previousOneMonthDate = this.getPreviousMonth(nowDate)
      let previousTwoMonthDate = this.getPreviousMonth(previousOneMonthDate)
      let previousThreeMonthDate = this.getPreviousMonth(previousTwoMonthDate)
      let previousFourMonthDate = this.getPreviousMonth(previousThreeMonthDate)
      let previousFiveMonthDate = this.getPreviousMonth(previousFourMonthDate)
      let previousHalfYearDate = this.getPreviousMonth(previousFiveMonthDate)
      return this.checkLastedExchangeDate(previousHalfYearDate)
    },
    // 获取基金的日期一年前
    previousOneYear: function () {
      let index = this.fundInfo.netWorthData.length - 1
      let nowDate = this.fundInfo.netWorthData[index][0]
      let arr = nowDate.split('-')
      let y = arr[0] - 1
      let m = arr[1]
      let d = arr[2]
      let date = y + '-' + m + '-' + d
      return this.checkLastedExchangeDate(date)
    }
  },
  // 子组件注册
  components: {
    'fund-chart-1': fundChart1,
    'fund-chart-2': fundChart2
  }
}
</script>

<style>
.fundInfo-wrapper {
  margin-left: 2.5%;
  margin-right: 2.5%;
  text-align: left;
  height: 100%;
}

.fundInfo-title {
  position: relative;
  margin-top: 20px;
  margin-bottom: 30px;
}

.fundInfo-header {
  margin-top: 3px;
  float: left;
}

.fundInfo-fundName {
  font-size: 16px;
  font-weight: 700;
  color: #000;
}

.fundInfo-fundCode {
  font-size: 12px;
  margin-left: 9px;
}

.fundInfo-fundType {
  font-size: 12px;
  margin-left: 9px;
}

.fundInfo-detail {
  height: 45px;
  position: relative;
  zoom: 1;
  display: block;
}

.fundInfo-detail-col1 {
  height: 100%;
  float: left;
}

.fundInfo-detail-col2 {
  height: 100%;
  border-left: 1px solid #ddd;
  float: left;
  margin-left: 4.2%;
}

.fundInfo-detail-col3 {
  height: 100%;
  border-left: 1px solid #ddd;
  float: left;
  margin-left: 4.2%;
}

.fundInfo-detail-col4 {
  height: 100%;
  float: left;
}

.fundInfo-detail-value {
  margin-top: 5px;
  font-size: 20px;
  font-weight: 700;
}

.fundInfo-detail-col-value {
  position: relative;
  float: left;
}

.fundInfo-detail-col-value2 {
  float: left;
  margin-left: 50px;
}

.fundInfo-detail-valueName {
  margin: 0;
  padding: 0;
  font-size: 10px;
}

.fundInfo-detail-col-text {
  margin: 0;
  padding: 0;
  float: left;
}

.fundInfo-detail-col-text2 {
  float: left;
}

.fundInfo-detail-text {
  font-size: 11px;
  margin-left: 50px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.fundInfo-chart {
  margin-top: 30px;
  border-top: 1px solid #ddd;
  padding-top: 15px;
}

.fundChart-block {
  display: inline-block;
  width: 48.5%;
  margin: 0;
  padding: 0;
}

.fundChart-block-title {
  font-size: 14px;
  color: #3479ff;
  font-weight: 700;
  border-left: 3px solid #3479ff;
  padding-left: 5px;
}

.fundChartRangeSelector {
  overflow: auto;
  margin: 15px 60px 50px 20px;
}

.el-tabs__item {
  font-size: 12px !important;
}

.fundInfo-buttons-col5 {
  height: 100%;
  float: right;
  margin-top: 5px;
}

.buyIn-dialog-body {
  height: 200px;
  margin-left: 30px;
  margin-bottom: 50px;
}

.sellOut-dialog-body {
  height: 200px;
  margin-left: 30px;
  margin-bottom: 50px;
}

.buyIn-input {
  float: left;
  width: 40%;
}

.sellOut-input {
  float: left;
  width: 40%;
}

.buyIn-instruction {
  margin-left: 75px;
  float: left;
  border-left: 1px solid #ddd;
  width: 50%;
}

.sellOut-instruction {
  margin-left: 75px;
  float: left;
  border-left: 1px solid #ddd;
  width: 50%;
}

.dialog-instruction {
  font-size: 15px;
  color: #3479ff;
}

.dialog-rule {
  color: darkgrey;
  font-size: 12px;
  margin-top: 20px;
  margin-left: 70px;
}

.el-step__title {
  font-size: 12px !important;
  color: darkgrey !important;
}

.el-step__description {
  font-size: 12px !important;
  color: dimgrey !important;
}

.el-steps__line {
  color: #abe7ff !important;
}

.el-step__icon-inner {
  display: none !important;
}

</style>
