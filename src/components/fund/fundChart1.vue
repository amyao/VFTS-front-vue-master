<template>
  <div style="width: 460px; height: 330px" ref="chart"></div>
</template>

<script>
let Echarts = require('echarts/lib/echarts')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/legend')
require('echarts/lib/chart/line')

export default {
  props: {
    fundChartData: {
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
      this.setOptions(this.fundChartData)
    },
    setOptions (data) {
      let xLength = data[0].length
      if (xLength < 60) {
        if (xLength < 30) {
          xLength = xLength - 2
        } else {
          xLength = (xLength - 3) / 2
        }
      } else {
        xLength = (xLength - 4) / 2
      }
      this.chart.clear()
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['本基金', '沪深300'],
          formatter: function (name) {
            if (name === '本基金') {
              if (data[3] >= 0) {
                return name + ' +' + data[3] + '%'
              } else {
                return name + ' ' + data[3] + '%'
              }
            }
            if (name === '沪深300') {
              if (data[2][data[2].length - 1] >= 0) {
                return name + ' +' + data[2][data[2].length - 1] + '%'
              } else {
                return name + ' ' + data[2][data[2].length - 1] + '%'
              }
            }
          }
        },
        grid: {
          left: '0%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data[0],
          boundaryGap: true,
          axisLabel: {
            interval: xLength,
            formatter: function (name) {
              let arr = name.split('-')
              let arr1 = data[0][0].split('-')
              let arr2 = data[0][data[0].length - 1].split('-')
              if (arr1[0] === arr2[0]) {
                return arr[1] + '-' + arr[2]
              } else {
                return name
              }
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [
          {
            name: '本基金',
            type: 'line',
            symbol: 'none',
            stack: '1',
            color: ['#3479ff'],
            data: data[1]
          },
          {
            name: '沪深300',
            type: 'line',
            symbol: 'none',
            stack: '2',
            color: ['orange'],
            data: data[2]
          }
        ]}, true)
    }
  },
  watch: {
    fundChartData: function (val) {
      if (val) {
        this.setOptions(this.fundChartData)
      }
    }
  }
}
</script>

<style scoped>

</style>
