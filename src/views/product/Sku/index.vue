<template>
  <div>
    <el-card shadow="always">
      <!-- 表格 -->
      <el-table border stripe :data="records">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="skuName" label="名称" width="width" align="center" />
        <el-table-column prop="skuDesc" label="描述" width="width" align="center" />
        <el-table-column label="默认图片" width="width" align="center">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="80" align="center" />
        <el-table-column prop="price" label="价格" width="80" align="center" />
        <el-table-column prop="col.id" label="操作" width="400" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.isSale==0" type="warning" size="mini" icon="el-icon-sort-down" @click="OnSale(row)" />
            <el-button v-else type="success" size="mini" icon="el-icon-sort-up" @click="CancelSale(row)" />
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit" />
            <el-button type="info" size="mini" icon="el-icon-zoom-in" @click="getSkuInfo(row)" />
            <el-button type="danger" size="mini" icon="el-icon-delete" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!--  @size-change="sizeChange" @current-change="currentChange" -->
      <el-pagination :current-page.sync="page" :page-sizes="[6, 9, 12, 15]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total" background style="text-align:center;margin-top: 20px;" @current-change="getSkuList" @size-change="sizeChange">
        :pager-count="7">
      </el-pagination>
      <!-- 抽屉效果 从右往左 -->
      <el-drawer :visible.sync="drawer" :show-close="false" size="40%">
        <el-row>
          <el-col :span="5">名称</el-col>
          <el-col :span="16">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">描述</el-col>
          <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">价格</el-col>
          <el-col :span="16">￥ {{ skuInfo.price }} 元</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">平台属性</el-col>
          <el-col :span="16">
            <el-tag v-for="(attr) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px" type="success">{{ attr.attrId }}--{{ attr.valueId }}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品图片</el-col>
          <el-col :span="16">
            <el-carousel height="450px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" style="height:450px;width:409px">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      // 当前页
      page: 1,
      // 当前页面有几条数据
      limit: 3,
      // 存储分页器一共展示的数据数目
      total: 0,
      // 存储sku列表数据
      records: [],
      // sku列表
      skuInfo: {},
      // 控制抽屉效果的显示与隐藏
      drawer: false
    }
  },
  mounted() {
    // 获取sku列表的方法
    // 组件一挂载完毕就发送请求
    this.getSkuList()
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const result = await this.$API.sku.reqSkuList(page, limit)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 改变分页器
    sizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    // 上架
    async OnSale(row) {
      const result = await this.$API.sku.reqOnSale(row.id)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: '商品上架成功！'
        })
        this.getSkuList()
      }
    },
    // 下架
    async CancelSale(row) {
      const result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: '商品下架成功！'
        })
        this.getSkuList()
      }
    },
    // 编辑
    edit() {
      this.$message({
        type: 'info',
        message: '正在开发中 ^_^ !'
      })
    },
    // 获取sku详情的方法
    async getSkuInfo(row) {
      const result = await this.$API.sku.reqSkuById(row.id)
      if (result.code === 200) {
        this.skuInfo = result.data
        this.drawer = true
      }
    }
  }
}
</script>

<style>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
