<template>
  <div ref="bar" class="barChart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarCharts',
  mounted() {
    const barCharts = echarts.init(this.$refs.bar)
    barCharts.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: {
        type: 'bar',
        data: [22, 33, 55, 31, 24, 36, 21, 44, 22],
        color: '#88D79F'
      },
      // 提示插件
      tooltip: {}
    })
  }
}
</script>

<style>
.barChart {
  width: 100%;
  height: 100%;
}
</style>
