<template>
  <div style="width: 460px; height: 330px" ref="chart"></div>
</template>

<script>
let Echarts = require('echarts/lib/echarts')
require('echarts/lib/component/grid')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')

export default {
  props: {
    fundChartData2: {
      type: Array
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.chart = Echarts.init(this.$refs.chart)
      this.setOptions(this.fundChartData2)
    },
    setOptions (data) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data[0]
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          data: data[1],
          type: 'line',
          color: ['#3479ff'],
          smooth: true,
          symbol: 'none'
        }]
      }, true)
    }
  },
  watch: {
    fundChartData2: function (val) {
      if (val) {
        this.setOptions(this.fundChartData2)
      }
    }
  }

}
</script>

<style scoped>

</style>
