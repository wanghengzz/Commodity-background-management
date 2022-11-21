<template>
  <div ref="charts" class="lineCharts" />
</template>

<script>
// 引入echarts
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  mounted() {
    // 初始化实例
    const lineChart = echarts.init(this.$refs.charts)
    lineChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      // 系列
      series: [
        {
          type: 'line',
          data: [0, 10, 6, 13, 3, 8, 15],
          // 拐点的样式设置
          itemStyle: {
            opacity: 0
          },
          // 线条的样式
          lineStyle: {
            color: 'skyblue'
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#4BC3B7' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#2F8E56' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          },
          smooth: true
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 10,
        bottom: 0
      }
    })
  }
}
</script>

<style>
.lineCharts {
  width: 100%;
  height: 100%;
}
</style>
