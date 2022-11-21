<template>
  <div>
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <!--  v-model="activeName" @tab-click="handleClick" -->
        <!-- 头部左侧内容 -->
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="sale" />
          <el-tab-pane label="访问量" name="visit" />
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
          <el-button @click="setDay">今日</el-button>
          <el-button @click="setWeek">本周</el-button>
          <el-button @click="setMonth">本月</el-button>
          <el-button @click="setYear">本年</el-button>
          <!-- v-model="value1" -->
          <el-date-picker v-model="date" size="mini" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
        </div>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="18" :offset="0">
            <!-- 柱状图 -->
            <div ref="charts" class="charts" />
          </el-col>
          <el-col :span="6" :offset="0" class="right">
            <h3>{{ title }}排名</h3>
            <ul>
              <li>
                <span class="rindex">1</span>
                <span class="name">蜡笔小新</span>
                <span class="value">323,234</span>
                <svg t="1668933062161" class="icon value" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2163" data-spm-anchor-id="a313x.7781069.0.i4" width="16" height="16">
                  <path d="M510.1 510.1l3.8 3.8-3.8-3.8zM514.3 509.6l-4.7 4.7c1.9-1.5 3.4-3 4.7-4.7z" fill="#d81e06" p-id="2164" />
                  <path d="M712.2 230.6c21.3 47.2 24.5 125.2-19.6 162.7C621 118.1 442 64.4 442 64.4c21.3 139.9-74.8 293-169.2 408.4-3.2-55.3-6.6-92.7-37.4-149.7C228.8 425.6 150.8 507 128 609.5c-27.6 141.6 22.8 240.9 214.7 350-60.2-125.2-27.6-196.9 19.6-261.9 50.4-74.8 63.6-146.5 63.6-146.5s40.6 50.4 24.5 130.1c68.2-78 81.4-203.5 71.7-249 156.1 109.1 226 350 135 524.1 481.4-275 118.5-683.5 55.1-725.7z" fill="#d81e06" p-id="2165" />
                </svg>
              </li>
              <li>
                <span class="rindex">2</span>
                <span class="name">野原小葵</span>
                <span class="value">298,234</span>
                <svg t="1668933062161" class="icon value" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2163" data-spm-anchor-id="a313x.7781069.0.i4" width="16" height="16">
                  <path d="M510.1 510.1l3.8 3.8-3.8-3.8zM514.3 509.6l-4.7 4.7c1.9-1.5 3.4-3 4.7-4.7z" fill="#d81e06" p-id="2164" />
                  <path d="M712.2 230.6c21.3 47.2 24.5 125.2-19.6 162.7C621 118.1 442 64.4 442 64.4c21.3 139.9-74.8 293-169.2 408.4-3.2-55.3-6.6-92.7-37.4-149.7C228.8 425.6 150.8 507 128 609.5c-27.6 141.6 22.8 240.9 214.7 350-60.2-125.2-27.6-196.9 19.6-261.9 50.4-74.8 63.6-146.5 63.6-146.5s40.6 50.4 24.5 130.1c68.2-78 81.4-203.5 71.7-249 156.1 109.1 226 350 135 524.1 481.4-275 118.5-683.5 55.1-725.7z" fill="#d81e06" p-id="2165" />
                </svg>
              </li>
              <li>
                <span class="rindex">3</span>
                <span class="name">野原广志</span>
                <span class="value">280,134</span>
                <svg t="1668933062161" class="icon value" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2163" data-spm-anchor-id="a313x.7781069.0.i4" width="16" height="16">
                  <path d="M510.1 510.1l3.8 3.8-3.8-3.8zM514.3 509.6l-4.7 4.7c1.9-1.5 3.4-3 4.7-4.7z" fill="#d81e06" p-id="2164" />
                  <path d="M712.2 230.6c21.3 47.2 24.5 125.2-19.6 162.7C621 118.1 442 64.4 442 64.4c21.3 139.9-74.8 293-169.2 408.4-3.2-55.3-6.6-92.7-37.4-149.7C228.8 425.6 150.8 507 128 609.5c-27.6 141.6 22.8 240.9 214.7 350-60.2-125.2-27.6-196.9 19.6-261.9 50.4-74.8 63.6-146.5 63.6-146.5s40.6 50.4 24.5 130.1c68.2-78 81.4-203.5 71.7-249 156.1 109.1 226 350 135 524.1 481.4-275 118.5-683.5 55.1-725.7z" fill="#d81e06" p-id="2165" />
                </svg>
              </li>
              <li>
                <span class="rindex">4</span>
                <span class="name">野原美伢</span>
                <span class="value">263,134</span>
                <svg t="1668933062161" class="icon value" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2163" data-spm-anchor-id="a313x.7781069.0.i4" width="16" height="16">
                  <path d="M510.1 510.1l3.8 3.8-3.8-3.8zM514.3 509.6l-4.7 4.7c1.9-1.5 3.4-3 4.7-4.7z" fill="#d81e06" p-id="2164" />
                  <path d="M712.2 230.6c21.3 47.2 24.5 125.2-19.6 162.7C621 118.1 442 64.4 442 64.4c21.3 139.9-74.8 293-169.2 408.4-3.2-55.3-6.6-92.7-37.4-149.7C228.8 425.6 150.8 507 128 609.5c-27.6 141.6 22.8 240.9 214.7 350-60.2-125.2-27.6-196.9 19.6-261.9 50.4-74.8 63.6-146.5 63.6-146.5s40.6 50.4 24.5 130.1c68.2-78 81.4-203.5 71.7-249 156.1 109.1 226 350 135 524.1 481.4-275 118.5-683.5 55.1-725.7z" fill="#d81e06" p-id="2165" />
                </svg>
              </li>
              <li>
                <span class="rindex">5</span>
                <span class="name">风间彻</span>
                <span class="value">233,234</span>
              </li>
              <li>
                <span class="rindex">6</span>
                <span class="name">阿呆</span>
                <span class="value">200,244</span>
              </li>
              <li>
                <span class="rindex">7</span>
                <span class="name">正男</span>
                <span class="value">193,234</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      activeName: 'sale',
      date: [],
      data1: [200, 82, 100, 234, 190, 130, 120, 340, 80, 250, 245, 313],
      data2: [100, 562, 200, 334, 590, 330, 420, 440, 510, 220, 345, 113]
    }
  },
  computed: {
    // 计算属性-标题
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  // 监听属性
  watch: {
    activeName() {
      // 重新修改图标配置的数据
      this.myCharts.setOption({
        title: {
          text: this.title
        },
        series: [
          {
            data: this.activeName === 'sale' ? this.data1 : this.data2
          }
        ]
      })
    }
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts)
    this.myCharts.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: this.data1,
          color: '#329592'
        }
      ]
    })
  },
  methods: {
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      console.log(day)
      this.date = [day, day]
    },
    setWeek() {
      // 获取本周一
      const start = dayjs().day(1).format('YYYY-MM-DD')
      // 获取本周星期天
      const end = dayjs().day(7).format('YYYY-MM-DD')
      console.log(start, end)
      this.date = [start, end]
    },
    setMonth() {
      // 获取月份第一天
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 200px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 20px;
}
.right button{
  margin: 0px 10px;
  margin-top: -10px;
}
.charts {
  width: 100%;
  height: 300px;
}
.el-col {
  padding: 0;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 15%;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  line-height: 20px;
}
ul svg {
  vertical-align: baseline;
}
.value {
  float: right;
}
</style>
