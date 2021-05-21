<template>
  <div class="holding-wrapper">
    <div class="holding-header">持有基金列表</div>
    <!--持有基金页面，搜索框-->
    <div class="holding-search">
      <el-input
        v-model="fundIdInput"
        placeholder="请输入基金代码"
        size="mini"
        style="width:120px">
      </el-input>
      <el-button
        type="primary"
        plain size="mini"
        @click="searchFundInfo">
        查询
      </el-button>
    </div>
    <!--持有基金页面，表格展示-->
    <div class="holding-table">
      <el-table
        :data="holdingData"
        stripe
        style="width: 100%"
        @row-click="goFundInfo"
        @cell-mouse-enter="cellSelect"
        @cell-mouse-leave="cellUnselect">
        <el-table-column
          type="index"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          prop="code"
          label="基金代码"
          align="center"
          width="110">
        </el-table-column>
        <el-table-column
          prop="name"
          label="基金名称"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="netWorth"
          :label=this.netWorthTableTitle
          align="center"
          width="130">
        </el-table-column>
        <el-table-column
          prop="dayGrowth"
          label="日涨幅"
          align="center"
          width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.dayGrowth>=0" style="color:#F56C6C">+{{scope.row.dayGrowth}}%</span>
            <span v-else style="color:#67C23A">{{scope.row.dayGrowth}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastWeekGrowth"
          label="近一周涨幅"
          align="center"
          width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.lastWeekGrowth>=0" style="color:#F56C6C">+{{scope.row.lastWeekGrowth}}%</span>
            <span v-else style="color:#67C23A">{{scope.row.lastWeekGrowth}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="holdingShares"
          label="持有份额"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini">基金详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--持有基金页面，页脚-->
    <div class="holding-pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="5"
        background
        layout="prev, pager, next, jumper"
        :total="this.holdingFundCodes.length">
      </el-pagination>
    </div>
    <!--输入搜索基金代码无效时弹出的会话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>输入的基金代码无效！请输入正确代码。</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      holdingFundCodes: [],
      holdingFundInfo: [],
      holdingData: [],
      fundIdInput: '',
      dialogVisible: false,
      fromAccountPage: 'accountPage2',
      pageLists: [],
      currentPage: 1,
      netWorthDate: ''
    }
  },
  methods: {
    // 表格展示表头label"单位净值"后日期的获取
    getNetWorthDateLabel () {
      this.getRequest('https://api.doctorxiong.club/v1/fund?code=007555&token=39CknoZcrT')
        .then(response => {
          this.netWorthDate = response.data.data[0].netWorthDate
        })
    },
    // 根据uuid获取该用户的持有基金列表及信息
    getUserHoldingInfo () {
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/currentHoldings', this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            // 存储持有基金信息
            this.holdingFundInfo = res.data
            // 取出所有持有基金代码放入array
            for (let i = 0; i < res.data.length; i++) {
              this.holdingFundCodes.push(res.data[i].fundId)
            }
            // 用持有基金代码array获取持有基金价格等信息
            this.getHoldingData()
            console.log(this.holdingData)
          }
        })
    },
    // 根据持有基金代码获取信息
    getHoldingData () {
      if (this.holdingFundCodes.length !== 0) {
        for (let i = 0; i < this.holdingFundCodes.length; i++) {
          this.getRequest('https://api.doctorxiong.club/v1/fund?code=' + this.holdingFundCodes[i] + '&token=39CknoZcrT')
            .then(response => {
              console.log(response.data.data[0])
              response.data.data[0].holdingShares = this.holdingFundInfo[i].holdingShares
              this.holdingData.push(response.data.data[0])
            })
        }

      } else if (this.holdingFundCodes.length === 0 ) {
        return 0
      }
    },
    // 根据输入的基金代码进行查询
    searchFundInfo () {
      this.getRequest('https://api.doctorxiong.club/v1/fund?code=' + String(this.fundIdInput) + '&token=39CknoZcrT')
        .then(response => {
          if (response && response.data.data.length === 1) {
            this.goFundInfo(response.data.data[0])
          }
          if (response && response.data.data.length === 0) {
            this.dialogVisible = true
          }
        })
    },
    // 初始化分页数据
    initPageLists () {
      this.pageLists = this.holdingData.slice(0,5)
    },
    // 处理分页操作，改变页码展示数据
    handleCurrentChange(val) {
      this.pageLists = this.holdingData.slice((val-1)*5,val*5)
    },
    // 鼠标移入时改变样式
    cellSelect (row, column, cell) {
      if (column.label === '基金代码' || column.label === '基金名称') {
        cell.classList.add('hoverIn')
      }
    },
    // 鼠标移出时恢复样式
    cellUnselect (row, column, cell) {
      cell.classList.remove('hoverIn')
    },
    // 前往基金详情页面
    goFundInfo (data) {
      this.$router.push({path: '/myAccount/holdingFund/fundInfo', query: [data, this.params, this.fromAccountPage]})
    }
  },
  created () {
    this.getUserHoldingInfo()
    this.getHoldingData()
    this.initPageLists()
    this.getNetWorthDateLabel()
  },
  computed: {
    netWorthTableTitle () {
      let netWorthDate = this.netWorthDate
      let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
      let netData = netWorthDate.match(reg)
      return '单位净值 ' + netData[2] + '-' + netData[3]
    }
  },
  watch: {
    // 监控分页变化
    holdingData: function () {
      this.initPageLists()
    }
  }
}
</script>

<style scoped>
.holding-wrapper {
  padding: 30px;
}

.holding-search {
  float: right;
  margin-right: 50px;
  margin-bottom: 20px;
}

.holding-header {
  font-size: 15px;
  color: #3479ff;
  font-weight: 700;
  border-left: 3px solid #3479ff;
  padding-left: 7px;
  text-align: left;
}

.hoverIn {
  color: #3479ff;
  text-decoration: underline;
}

.noHoldingFund {
  text-align: center;
  line-height: 300px;
}

.holding-pagination {
  float: right;
  margin: 30px;
}
</style>
