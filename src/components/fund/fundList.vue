<template>
  <div class="fundList-wrapper">
    <!--页面header标题-->
    <div class="fundList-header">每日基金净值信息</div>
    <!--页面搜索框-->
    <div class="fundList-search">
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
        搜索
      </el-button>
    </div>
    <!--页面基金表单展示-->
    <div class="fundList-table">
      <el-table
        v-loading="loading"
        :data="fundTableData"
        stripe
        style="width: 100%"
        @row-click="goFundInfo"
        @cell-mouse-enter="cellSelect"
        @cell-mouse-leave="cellUnselect">
        <el-table-column
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="code"
          label="基金代码"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="基金名称"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          prop="netWorth"
          :label=this.netWorthTableTitle
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="dayGrowth"
          label="日涨幅"
          align="center"
          width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.dayGrowth>=0" style="color:#F56C6C">+{{scope.row.dayGrowth}}%</span>
            <span v-else style="color:#67C23A">{{scope.row.dayGrowth}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastWeekGrowth"
          label="近一周涨幅"
          align="center"
          width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.lastWeekGrowth>=0" style="color:#F56C6C">+{{scope.row.lastWeekGrowth}}%</span>
            <span v-else style="color:#67C23A">{{scope.row.lastWeekGrowth}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastMonthGrowth"
          label="近一月涨幅"
          align="center"
          width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.lastMonthGrowth>=0" style="color:#F56C6C">+{{scope.row.lastMonthGrowth}}%</span>
            <span v-else style="color:#67C23A">{{scope.row.lastMonthGrowth}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          label="详情"
          align="center">
          <template slot-scope="scope">
            <!--to do-->
            <!--判断该用户是否持有或自选了该基金-->
            <el-button type="primary" plain size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--页面基金分页-->
    <div class="fundList-pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total = "allPages"
        :current-page="params.pageIndex">
      </el-pagination>
    </div>
    <!--输入基金代码无效时弹出的会话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>输入的基金代码无效！请输入正确代码进行查询。</span>
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
      fundTableData: [{
        netWorthDate: '2021-01-01'
      }],
      params: {
        pageIndex: 1
      },
      allPages: 1,
      fundIdInput: '',
      dialogVisible: false,
      loading: true,
      fromFundListPage: 'fundListPage',
      clickBuyIn: false
    }
  },
  methods: {
    // 获取基金表单需要填入的基本信息
    getFundData () {
      this.postRequest('https://api.doctorxiong.club/v1/fund/rank', this.params)
        .then(response => {
          if (response && response.data.code === 200) {
            this.fundTableData = response.data.data.rank
            this.allPages = response.data.data.allPages
            this.loading = false
          }
        })
    },
    // 根据输入的基金代码搜索单只基金，若代码有效则跳转到该基金信息界面，若代码无效弹出会话框
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
    // 分页
    handleCurrentChange (val) {
      this.params.pageIndex = val
      this.loading = true
      this.getFundData()
    },
    // 鼠标悬停在表单中基金名称和代码上，该字段样式变蓝并出现下滑线，提示用户可以进行点击跳转
    cellSelect (row, column, cell, event) {
      if (column.label === '基金代码' || column.label === '基金名称') {
        cell.classList.add('hoverIn')
      }
    },
    // 鼠标移出表单中基金名称和代码，字段样式变回正常
    cellUnselect (row, column, cell, event) {
      cell.classList.remove('hoverIn')
    },
    // 点击进行路由跳转到该基金详细信息页面
    goFundInfo (data) {
      if (this.clickBuyIn === true) {
        this.$router.push({path: '/fundList/fundInfo', query: [data, this.params, this.fromFundListPage]})
      } else {
        this.$router.push({path: '/fundList/fundInfo', query: [data, this.params, this.fromFundListPage]})
      }
    }
  },
  created () {
    this.params = this.$route.query
    this.params.pageIndex = parseInt(this.params.pageIndex)
    this.getFundData()
  },
  computed: {
    netWorthTableTitle () {
      let netWorthDate = this.fundTableData[0].netWorthDate
      let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
      let netData = netWorthDate.match(reg)
      return '单位净值 ' + netData[2] + '-' + netData[3]
    }
  }
}
</script>

<style>
.fundList-wrapper {
  padding: 30px;
}

.fundList-search {
  float: right;
  margin-right: 50px;
  margin-bottom: 20px;
}

.fundList-header {
  font-size: 15px;
  color: #3479ff;
  font-weight: 700;
  border-left: 3px solid #3479ff;
  padding-left: 7px;
  text-align: left;
}

.fundList-pagination {
  float: right;
  margin: 30px;
}

.hoverIn {
  color: #3479ff;
  text-decoration: underline;
}

</style>
