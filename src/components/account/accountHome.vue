<template>
  <div class="accountHome-wrapper">
    <!--个人账户内容，欢迎title-->
    <div class="accountHome-title">
      <span class="accountHome-accountName">{{accountName}}，欢迎！</span>
    </div>
    <!--个人账户内容，账户信息展示-->
    <div class="accountHome-detail">
      <div class="accountHome-detail-col1">
        <div class="accountHome-detail-col-value" style="float: left">
          <div class="accountHome-detail-valueName-wrapper">
            <p class="accountHome-detail-valueName">账户余额（元）</p>
            <el-tooltip class="item" effect="dark" placement="top">
              <i class="el-icon-warning-outline"></i>
              <div slot="content" class="tooltip-content">
                <div>您的账户余额是可用于买入基金的余额。</div>
              </div>
            </el-tooltip>
          </div>
          <p class="accountHome-detail-value">{{accountBalance}}</p>
        </div>
      </div>

      <div class="accountHome-detail-col2">
        <div class="accountHome-detail-col-value" style="float: left">
          <div class="accountHome-detail-valueName-wrapper">
            <p class="accountHome-detail-valueName">总资产（元）</p>
            <el-tooltip class="item" effect="dark" placement="top">
              <i class="el-icon-warning-outline"></i>
              <div slot="content" class="tooltip-content">
                <div>您的总资产是账户余额与所有持有基金现价值的总和。</div>
              </div>
            </el-tooltip>
          </div>
          <p class="accountHome-detail-value">{{accountAsset}}</p>
        </div>
      </div>

      <div class="accountHome-detail-col3">
        <div class="accountHome-detail-col-value2" style="float: left">
          <div class="accountHome-detail-valueName-wrapper">
            <p class="accountHome-detail-valueName">昨日收益（元）</p>
            <el-tooltip class="item" effect="dark" placement="top">
              <i class="el-icon-warning-outline"></i>
              <div slot="content" class="tooltip-content">
                <div>您的昨日收益是所有持有基金昨日价值变化的总和，</div>
                <div>即为昨日持有基金价格减去前日价格乘以该基金持有份额之和</div>
              </div>
            </el-tooltip>
          </div>
          <p class="accountHome-detail-value" v-if="this.yesterdayYield>=0" style="color:#F56C6C">+{{yesterdayYield}}</p>
          <p class="accountHome-detail-value" v-else style="color:#67C23A">{{yesterdayYield}}</p>
        </div>
      </div>

      <div class="accountHome-detail-col4">
        <div class="accountHome-detail-col-value3" style="float: left">
          <div class="accountHome-detail-valueName-wrapper">
            <p class="accountHome-detail-valueName">持有收益（元）</p>
            <el-tooltip class="item" effect="dark" placement="top">
              <i class="el-icon-warning-outline"></i>
              <div slot="content" class="tooltip-content">
                <div>您的持有收益是所有持有基金自持有起始日期起的价值变化总和，</div>
                <div>即为持有基金买入价格减去当前价格乘以该基金持有份额之和</div>
              </div>
            </el-tooltip>
          </div>
          <p class="accountHome-detail-value" v-if="this.holdingYield>=0" style="color:#F56C6C">+{{holdingYield}}</p>
          <p class="accountHome-detail-value" v-else style="color:#67C23A">{{holdingYield}}</p>
        </div>
      </div>

      <div class="accountHome-detail-col5">
        <div class="accountHome-detail-col-value4" style="float: left">
          <div class="accountHome-detail-valueName-wrapper">
            <p class="accountHome-detail-valueName">累计收益（元）</p>
            <el-tooltip class="item" effect="dark" placement="top">
              <i class="el-icon-warning-outline"></i>
              <div slot="content" class="tooltip-content">
                <div>您的累计收益是自账户注册起买卖基金所产生的所有收益，</div>
                <div>即为您的总资产减去起始虚拟余额10000元</div>
              </div>
            </el-tooltip>
          </div>
          <p class="accountHome-detail-value" v-if="this.totalYield>=0" style="color:#F56C6C">+{{totalYield}}</p>
          <p class="accountHome-detail-value" v-else style="color:#67C23A">{{totalYield}}</p>
        </div>
      </div>
    </div>
    <!--个人账户内容，记录表格展示-->
    <div class="accountHome-chart" style="overflow: auto">
      <!--个人账户内容，收益明细展示-->
      <div class="accountHomeChart-block1" style="float:left; overflow: auto">
        <div>
          <div class="accountHomeChart-block-title">最近收益明细</div>
          <div class="accountHomeChart-detail">
            <el-table
              :data="yieldPageLists"
              :key="itemKey"
              style="width: 100%; font-size: 11px">
              <el-table-column
                prop="yieldDate"
                label="日期"
                width="80">
              </el-table-column>
              <el-table-column
                label="基金信息"
                width="220">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}({{scope.row.fundId}})</span>
                </template>
              </el-table-column>
              <el-table-column
                label="收益"
                width="70">
                <template slot-scope="scope">
                  <span v-if="scope.row.yield>=0" style="color:#F56C6C">+{{scope.row.yield}}元</span>
                  <span v-else style="color:#67C23A">{{scope.row.yield}}元</span>
                </template>
              </el-table-column>
            </el-table>

            <div class="yieldHistory-pagination">
              <el-pagination
                @current-change="yieldHandleCurrentChange"
                :current-page="yieldCurrentPage"
                :page-size="5"
                layout="prev, pager, next"
                :total="this.yieldDetails.length">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <!--个人账户内容，订单交易记录展示-->
      <div class="accountHomeChart-block2" style="float: right;">
        <div>
          <div class="accountHomeChart-block-title">订单交易记录</div>
          <div class="accountHomeChart-detail">
            <el-table
              :data="orderPageLists"
              :key="itemKey"
              @row-click="handleThisOrder"
              style="width: 100%; font-size: 11px">
              <el-table-column
                prop="orderDate"
                label="订单日期"
                width="80">
              </el-table-column>
              <el-table-column
                label="基金信息"
                width="220">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}({{scope.row.fundId}})</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderType"
                label="订单类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.orderType===0">买入{{scope.row.buyingAmount}}元</span>
                  <span v-else>卖出{{scope.row.sellingShares}}份</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderStatus"
                label="状态"
                width="70">
                <template slot-scope="scope">
                  <span v-if="scope.row.orderStatus==='processing'">处理中</span>
                  <span v-else-if="scope.row.orderStatus==='withdrawn'">已撤销</span>
                  <span v-else-if="scope.row.orderStatus==='success'">交易成功</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.orderStatus==='processing'"
                    type="primary"
                    plain size="mini"
                    @click="handleThisOrder">
                    撤销
                  </el-button>
                  <el-button
                    v-else-if="scope.row.orderStatus==='success'"
                    type="success"
                    plain size="mini"
                    @click="handleThisOrder">
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="orderHistory-pagination">
            <el-pagination
              @current-change="orderHandleCurrentChange"
              :current-page="orderCurrentPage"
              :page-size="5"
              layout="prev, pager, next"
              :total="this.orderDetails.length">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--交易详情会话框-->
    <div class="tradeInfo-dialog">
      <el-dialog
        title="交易详情"
        :visible.sync="tradeInfoDialogVisible"
        width="40%"
        center>
        <div class="tradeInfo-dialog-detail">
          <span>基金信息：{{tradeInfoDialogForm.name}}({{tradeInfoDialogForm.fundId}})</span>
        </div>
        <div class="tradeInfo-dialog-detail">
          <span v-if="tradeInfoDialogForm.tradeType===0">订单类型：买入</span>
          <span v-else>订单类型：卖出</span>
        </div>
        <div class="tradeInfo-dialog-detail">
          <span>订单日期：{{tradeInfoDialogForm.orderDate}}</span>
        </div>
        <div class="tradeInfo-dialog-detail">
          <span>交易日期：{{tradeInfoDialogForm.tradeDate}}</span>
        </div>
        <div class="tradeInfo-dialog-detail">
          <span>交易价格：{{tradeInfoDialogForm.tradePrice}}元</span>
        </div>
        <div class="tradeInfo-dialog-detail">
          <span> 交易份额：{{tradeInfoDialogForm.tradeShares}}份</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="tradeInfoDialogVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="tradeInfoDialogVisible = false">确 定</el-button>
         </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accountName: '',
      accountBalance: '',
      accountAsset: '',
      yesterdayYield: '',
      holdingYield: '',
      totalYield: '',
      yieldDetails: [],
      yieldHistoryLists: [],
      orderDetails: [],
      orderPageLists: [],
      yieldPageLists: [],
      orderCurrentPage: 1,
      yieldCurrentPage: 1,
      itemKey: 0,
      tradeInfoDialogVisible: false,
      tradeInfoDialogForm: {
        fundId: '',
        name: '',
        orderDate: '',
        tradeDate: '',
        tradePrice: '',
        tradeShares: '',
        tradeType: ''
      }
    }
  },
  methods: {
    // 根据uuid获取该用户的账户信息，包括用户名、账户余额、昨日收益、持有收益、总收益、收益记录、订单记录
    getUserInfo () {
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/accountEntity', this.$qs.stringify(data))
        .then(res => {
          // 渲染res中携带的账户数据
          if (res.status === 200) {
            this.accountBalance = res.data.accountBalance
            this.accountAsset = res.data.assets
            this.yesterdayYield = res.data.yesterdayYield
            this.holdingYield = res.data.holdingYield
            this.totalYield = res.data.totalYield
          }
      })
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/orderHistory', this.$qs.stringify(data))
        .then(res => {
          if (res.status === 200) {
            this.orderDetails = res.data
            for (let i = 0; i < this.orderDetails.length; i++) {
              this.orderDetails[i].orderDate = res.data[i].orderDate.slice(0,10)
              this.getRequest('https://api.doctorxiong.club/v1/fund?code=' + res.data[i].fundId + '&token=39CknoZcrT')
                .then(response => {
                  if (response && response.data.code === 200) {
                    this.orderDetails[i].name = response.data.data[0].name
                    this.$set(this.orderDetails[i], name, response.data.data[0].name)
                  }
                })
            }
          }
        })
    },
    // 订单操作 —> 撤回处理中的订单 or 查看交易成功订单详情
    handleThisOrder (row, column) {
      // 撤回处理中的订单
      if (column.label === '操作' && row.orderStatus === 'processing') {
        let data = {
          orderId: row.orderId
        }
        this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/withdrawOrder', this.$qs.stringify(data))
          .then(res => {
            if (res.status === 200) {
              this.getUserInfo()
              this.$message({
                message: '您已成功撤销此订单！',
                type: 'success'
              })
            }
          })
      }
      // 查看交易成功的订单详情
      if (column.label === '操作' && row.orderStatus === 'success') {
        let data = {
          uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid
        }
        this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/tradeHistory', this.$qs.stringify(data))
          .then(res => {
            if (res.status === 200) {
              console.log(res)
              for (let i = 0; i < res.data.length; i++) {
                if (row.fundId === res.data[i].fundId) {
                  this.tradeInfoDialogForm = {
                    fundId: row.fundId,
                    name: row.name,
                    orderDate: res.data[i].orderDate.slice(0,10) + " " + res.data[i].orderDate.slice(11,19),
                    tradeDate: res.data[i].tradeDate.slice(0,10) + " " + res.data[i].tradeDate.slice(11,19),
                    tradePrice: res.data[i].tradePrice,
                    tradeShares: res.data[i].tradeShares,
                    tradeType: res.data[i].tradeType
                  }
                }
              }
            }
          })
        this.tradeInfoDialogVisible = true
      }
    },
    // 根据uuid获取该用户的持有基金列表及信息
    getUserYieldHistoryInfo () {
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/currentHoldings', this.$qs.stringify(data))
        .then(res => {
          if (res.status === 200) {
            for (let i = 0; i < res.data.length; i++) {
              let code = res.data[i].fundId
              this.getRequest('https://api.doctorxiong.club/v1/fund?code=' + code + '&token=39CknoZcrT')
                .then(response => {
                  if (response && response.data.code === 200) {
                    for (let n = 0; n < res.data[i].yieldDate.length; n++) {
                      let yieldRecord = {
                        fundId: code,
                        name: response.data.data[0].name,
                        yield: res.data[i].yieldHistory[n],
                        yieldDate: res.data[i].yieldDate[n].slice(0,10)
                      }
                      this.yieldDetails.push(yieldRecord)
                    }
                  }
                })
            }
          }
        })
    },
    // 初始化分页数据
    initPageLists () {
      this.orderPageLists = this.orderDetails.slice(0,5)
      this.yieldPageLists = this.yieldDetails.slice(0,5)
    },
    // 分页处理订单记录
    orderHandleCurrentChange (val) {
      this.orderPageLists = this.orderDetails.slice((val-1)*5,val*5)
    },
    // 分页处理历史收益
    yieldHandleCurrentChange (val) {
      this.yieldPageLists = this.yieldDetails.slice((val-1)*5,val*5)
    },
  },
  created () {
    this.getUserInfo()
    this.getUserYieldHistoryInfo()
    this.initPageLists()
    // 获取localStorage里存储的登陆账户用户名进行回显
    this.accountName = JSON.parse(window.localStorage.getItem('uuid')).username
  },
  watch: {
    // 监听订单表格数据
    orderDetails: function() {
      this.initPageLists()
    },
    // 监听历史收益表格数据
    yieldDetails: function() {
      this.initPageLists()
    },
    deep: true
  }
}
</script>

<style scoped>
.accountHome-wrapper {
  margin-left: 30px;
  margin-right: 30px;
  text-align: left;
  height: 100%;
}

.accountHome-title {
  position: relative;
  margin-top: 20px;
  margin-bottom: 30px;
}

.accountHome-accountName {
  font-size: 16px;
  font-weight: 700;
  color: #000;
}

.accountHome-detail {
  height: 45px;
  position: relative;
  zoom: 1;
  display: block;
}

.accountHome-detail-col1 {
  margin-left: 50px;
  margin-right: 20px;
  height: 100%;
  float: left;
}

.accountHome-detail-col2 {
  margin-left: 50px;
  height: 100%;
  float: left;
}

.accountHome-detail-col3 {
  height: 100%;
  border-left: 1px solid #ddd;
  float: left;
  margin-left: 50px;
}

.accountHome-detail-col4 {
  height: 100%;
  float: left;
}

.accountHome-detail-col5 {
  height: 100%;
  float: left;
  border-right: 1px solid #ddd;
}

.accountHome-detail-valueName-wrapper {
  font-size: 12px;
}

.accountHome-detail-valueName {
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 12px;
}

.accountHome-detail-value {
  margin-top: 5px;
  font-size: 20px;
  font-weight: 700;
}

.accountHome-button-col6 {
  height: 100%;
  float: left;
  margin-left: 50px;
  margin-top: 5px;
}

.accountHome-detail-col-value2 {
  margin-left: 50px;
  margin-right: 30px;
}

.accountHome-detail-col-value3 {
  margin-left: 30px;
  margin-right: 30px;
}

.accountHome-detail-col-value4 {
  margin-left: 30px;
  margin-right: 30px;
}

.accountHome-chart {
  margin-top: 30px;
  border-top: 1px solid #ddd;
  padding-top: 15px;
  margin-right: 0;
}

.accountHomeChart-block1 {
  display: inline-block;
  width: 40%;
  margin: 0;
  padding: 0;
}

.accountHomeChart-block2 {
  display: inline-block;
  width: 58%;
  margin: 0;
  padding: 0;
}

.accountHomeChart-block-title {
  font-size: 14px;
  color: #3479ff;
  font-weight: 700;
  border-left: 3px solid #3479ff;
  padding-left: 5px;
}

.item {
  display: inline-block;
}

.tooltip-content {
  font-size: 12px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.accountHomeChart-detail {
  margin: 10px;
  height: 100%;
  text-align: center;
}

.orderHistory-pagination {
  float: right;
  margin: 10px;
}

.yieldHistory-pagination {
  float: right;
  margin: 10px;
}

.tradeInfo-dialog-detail {
  margin-left: 50px;
  margin-bottom: 20px;
}

.dialog-footer {
  margin-bottom: 30px;
}
</style>
