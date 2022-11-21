<template>
  <div ref="bar" class="barChart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'ProgressCharts',
  mounted() {
    const barCharts = echarts.init(this.$refs.bar)
    barCharts.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: {
        type: 'bar',
        data: [78],
        color: '#82C95E',
        // 柱状图得宽度
        barWidth: 15,
        // 背景颜色
        showBackground: true,
        backgroundStyle: {
          color: '#eee'
        },
        // 文本设置
        label: {
          show: true,
          // 标签显示内容
          formatter: '|',
          position: 'right'
        }
      },
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
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
