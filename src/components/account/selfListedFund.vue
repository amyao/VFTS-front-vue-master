<template>
  <div class="selfListed-wrapper">

    <div class="selfListed-header">自选基金列表</div>
    <!--自选基金页面，搜索框-->
    <div class="selfListed-search">
      <el-input
        v-model="fundIdInput"
        placeholder="请输入基金代码"
        size="mini"
        style="width:120px">
      </el-input>
      <el-button
        type="primary"
        plain size="mini"
        @click="addSelfListed">
        加入自选
      </el-button>
    </div>
    <!--自选基金页面，表格展示-->
    <div class="selfListed-table">
      <el-table
        :data="pageLists"
        stripe
        style="width: 100%"
        @row-click="goFundInfo"
        @cell-click="removeSelfListed"
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
          label="基金详情"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini">详情操作</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click="removeSelfListed">取消自选</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--自选基金页面，页脚-->
    <div class="selfListed-pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="5"
        background
        layout="prev, pager, next, jumper"
        :total="this.selfListedFundCodes.length">
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
  inject: ['reload2'],
  data () {
    return {
      selfListedFundCodes: [],
      selfListedData: [],
      fundIdInput: '',
      dialogVisible: false,
      loading: true,
      fromAccountPage: 'accountPage1',
      currentPage: 1,
      pageLists: [],
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
    // 根据uuid获取该用户的自选基金列表
    getUserSelfListedCodes () {
      this.selfListedFundCodes = []
      let data = {
        uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid
      }
      this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/selfListed', this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            for (let i = 0; i < res.data.length; i++) {
              this.selfListedFundCodes.push(res.data[i])
            }
            // 根据自选基金列表获取基金信息
            this.getSelfListedData()
          }
        })
    },
    // 获取自选基金信息
    getSelfListedData () {
      this.selfListedData = []
      for (let i = 0; i < this.selfListedFundCodes.length; i++) {
        this.getRequest('https://api.doctorxiong.club/v1/fund?code=' + this.selfListedFundCodes[i] + '&token=39CknoZcrT')
          .then(response => {
            this.selfListedData.push(response.data.data[0])
          })
      }
    },
    // 取消自选
    removeSelfListed (row, column) {
      if (column.label === '操作') {
        let data = {
          uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
          fundId: row.code
        }
        this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/deleteFromSelfListed',this.$qs.stringify(data))
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message({
                message: '您已成功将该基金取消自选！',
                type: 'success'
              })
              // 重新加载自选基金列表
              this.getUserSelfListedCodes()
              this.reload2()
            }
          })
      }
    },
    // 通过输入基金代码加入自选基金
    addSelfListed () {
      // 判断输入基金代码是否有效
      this.getRequest('https://api.doctorxiong.club/v1/fund?code=' + String(this.fundIdInput) + '&token=39CknoZcrT')
        .then(response => {
          if (response && response.data.data.length === 1) {
            // 输入基金代码有效，进行加入自选操作
            let data = {
              uuid: JSON.parse(window.localStorage.getItem('uuid')).uuid,
              fundId: this.fundIdInput
            }
            this.postServerRequest('http://127.0.0.1:28885/uiapi/trade/addToSelfListed', this.$qs.stringify(data))
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: '您已成功将该基金加入自选！',
                    type: 'success'
                  })
                  this.getUserSelfListedCodes()
                  this.reload2()
                }
              })
          }
          if (response && response.data.data.length === 0) {
            // 输入基金代码无效，弹出会话框提示基金代码无效
            this.dialogVisible = true
          }
        })
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
    goFundInfo (row, column) {
      if (column.label !== "操作") {
        this.$router.push({path: '/myAccount/selfListedFund/fundInfo', query: [row, this.params, this.fromAccountPage]})
      }
    },
    // 初始化分页数据
    initPageLists () {
      this.pageLists = this.selfListedData.slice(0,5)
    },
    // 处理分页操作，改变页码展示数据
    handleCurrentChange(val) {
      this.pageLists = this.selfListedData.slice((val-1)*5,val*5)
    }
  },
  created () {
    this.getNetWorthDateLabel()
    this.getUserSelfListedCodes()
    this.initPageLists()
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
    selfListedData: function () {
      this.initPageLists()
    }
  }
}
</script>

<style scoped>
.selfListed-wrapper {
  padding: 30px;
}

.selfListed-search {
  float: right;
  margin-right: 50px;
  margin-bottom: 20px;
}

.selfListed-header {
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

.selfListed-pagination {
  float: right;
  margin: 30px;
}
</style>
