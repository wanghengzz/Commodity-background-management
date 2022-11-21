<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card shadow="always">
          <Detail title="总销售额" count="￥ 126560">
            <!-- 插槽传结构 -->
            <template slot="charts">
              <span class="num">周同比&nbsp;&nbsp;56.77% <svg t="1668925263276" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5180" width="16" height="16">
                  <path d="M854.016 739.328l-313.344-309.248-313.344 309.248q-14.336 14.336-32.768 21.504t-37.376 7.168-36.864-7.168-32.256-21.504q-29.696-28.672-29.696-68.608t29.696-68.608l376.832-373.76q14.336-14.336 34.304-22.528t40.448-9.216 39.424 5.12 31.232 20.48l382.976 379.904q28.672 28.672 28.672 68.608t-28.672 68.608q-14.336 14.336-32.768 21.504t-37.376 7.168-36.864-7.168-32.256-21.504z" p-id="5181" fill="#1afa29" />
                </svg>
              </span>
              <span class="num">日同比&nbsp;&nbsp;19.96%<svg t="1668925415498" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6245" width="16" height="16">
                  <path d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z" p-id="6246" fill="#d81e06" />
                </svg>
              </span>
            </template>
            <template slot="footer">
              <span>日销售额 ￥ 12322</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <Detail title="访问量" count="88676">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量 12421</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <Detail title="支付笔数" count="378137">
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              <span>转发率 35%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <Detail title="运营活动效果" count="78 %">
            <template slot="charts">
              <ProgressChart />
            </template>
            <template slot="footer">
              <span class="number">周同比&nbsp;&nbsp;12% <svg t="1668925263276" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5180" width="16" height="16">
                  <path d="M854.016 739.328l-313.344-309.248-313.344 309.248q-14.336 14.336-32.768 21.504t-37.376 7.168-36.864-7.168-32.256-21.504q-29.696-28.672-29.696-68.608t29.696-68.608l376.832-373.76q14.336-14.336 34.304-22.528t40.448-9.216 39.424 5.12 31.232 20.48l382.976 379.904q28.672 28.672 28.672 68.608t-28.672 68.608q-14.336 14.336-32.768 21.504t-37.376 7.168-36.864-7.168-32.256-21.504z" p-id="5181" fill="#1afa29" />
                </svg>
              </span>
              <span class="number">日同比&nbsp;&nbsp;28%<svg t="1668925415498" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6245" width="16" height="16">
                  <path d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z" p-id="6246" fill="#d81e06" />
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail/index.vue'
import LineChart from './lineChart/index.vue'
import BarChart from './barCharts/index.vue'
import ProgressChart from './progressChart/index.vue'
export default {
  name: 'Card',
  components: {
    Detail,
    LineChart,
    BarChart,
    ProgressChart
  }
}
</script>

<style>
.num {
  font-size: 15px;
  line-height: 50px;
}
.num svg {
  vertical-align: middle;
  margin: 0 5px;
}
.number svg {
  vertical-align: middle;
  margin: 0 2px;
}
</style>
