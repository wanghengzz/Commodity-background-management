<template>
  <div>
    <!-- 三级联动区域 -->
    <el-card style="margin:20px 0">
      <CategoryList :show="scene!==0" @getAttrList="getAttrList" />
    </el-card>
    <!-- 卡片展示区域 -->
    <el-card v-show="scene==0">
      <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px" :disabled="!cateGory3Id" @click="addSpu">添加SPU</el-button>
      <!-- 表格区域 -->
      <el-table border stripe :data="records">
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column label="SPU名称" width="col.width" align="center" prop="spuName" />
        <el-table-column label="SPU描述" width="col.width" align="center" prop="description" />
        <el-table-column label="操作" width="col.width" align="center" prop="prop">
          <template slot-scope="{row}">
            <HintButton type="success" size="mini" icon="el-icon-plus" title="添加sku" @click="addSku(row)" />
            <HintButton type="warning" size="mini" icon="el-icon-edit" title="修改spu" @click="updateSpu(row)" />
            <HintButton type="info" size="mini" icon="el-icon-info" title="查看当前spu全部sku列表" @click="handler(row)" />
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
              <HintButton slot="reference" type="danger" size="mini" icon="el-icon-delete" title="删除spu" />
            </el-popconfirm>
          </template>
        </el-table-column>>
      </el-table>
      <!-- 分页器区域 -->
      <!-- :current-page.sync="currentPage"
      @size-change="sizeChange" @current-change="currentChange"
      -->
      <el-pagination style="margin-top:20px;textAlign:center" :current-page.sync="page" :page-sizes="[3, 6, 9, 12]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total" background @size-change="sizeChange" @current-change="currentChange">
        :pager-count="7" >
      </el-pagination>
    </el-card>
    <!-- <el-card v-show="scene==2">添加sku</el-card> -->
    <el-card v-show="scene==1" shadow="always">
      <SpuForm ref="SpuForm" @changeScene="toScene1" />
    </el-card>
    <!-- <el-card v-show="scene==1">添加修改spu</el-card> -->
    <el-card v-show="scene==2" shadow="always">
      <SkuForm ref="SkuForm" @changeScenes="toScene0" />
    </el-card>
    <!-- 对话框 -->
    <el-dialog :title="spu.spuName" :visible.sync="dialogTableVisible" :before-close="closeDialog">
      <el-table v-loading="loading" :data="skuList" border>
        <el-table-column label="名称" width="150" align="center" prop="skuName" />
        <el-table-column label="价格" width="200" align="center" prop="price" />
        <el-table-column label="重量" align="center" prop="weight" />
        <el-table-column label="默认图片" align="center">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width:100px;height: 100px;">
          </template>
        </el-table-column>>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SkuForm from './SkuForm/index.vue'
import SpuForm from './SpuForm/index.vue'
export default {
  name: 'Spu',
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      // 存储三级联动的菜单的id
      cateGory1Id: '',
      cateGory2Id: '',
      cateGory3Id: '',
      // 分页器 页数 和 限制
      page: 1,
      limit: 3,
      total: 0,
      // 展示的数据
      records: [],
      // 控制展示列表的切换
      scene: 0, // 0表示展示spu列表  1表示添加修改spu 2添加sku
      // 控制对话框的出现与隐藏
      dialogTableVisible: false,
      // 对话框的数据存储
      spu: {},
      skuList: [],
      // 加载动画控制
      loading: true
    }
  },
  methods: {
    // 三级联动
    getAttrList({ cateGoryId, id }) {
      if (id === 1) {
        this.cateGory1Id = cateGoryId
        // 每次获取到一级目录 就说明切换了一级菜单 需要将 二级三级菜单清空
        this.cateGory2Id = ''
        this.cateGory3Id = ''
      } else if (id === 2) {
        this.cateGory2Id = cateGoryId
        this.cateGory3Id = ''
      } else {
        this.cateGory3Id = cateGoryId
        // 当三个目录都获取到 响应的id时要发送请求获取数据
        this.getSpuPageList()
      }
    },
    // 发送请求获取表格数据
    async getSpuPageList() {
      // 整理参数
      const { page, limit, cateGory3Id } = this
      const result = await this.$API.spu.reqSpuList(page, limit, cateGory3Id)
      if (result.code === 200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    // 分页器
    currentChange(page) {
      // 修改页数
      this.page = page
      // 再次获取最新的数据
      this.getSpuPageList()
    },
    // 修改限制页数
    sizeChange(limit) {
      this.limit = limit
      this.getSpuPageList()
    },
    // 添加spu的场景切换
    addSpu() {
      this.scene = 1
      // 通知子组件 添加的时候发两个请求
      this.$refs.SpuForm.addSpuData(this.cateGory3Id)
    },
    updateSpu(row) {
      this.scene = 1
      // 点击修改按钮时需要发送请求 因为是父子组件 通过$ref或者$children(this.$children[2]) 获取子组件 然后调用子组件中的方法来发起请求
      this.$refs.SpuForm.initSpuData(row)
    },
    // spuform自定义事件 取消时切换场景1
    toScene1(scene0) {
      // 子组件通知父组件切换场景
      this.scene = scene0
      // 修改属性之后 切换场景，需要重新发起请求获取最新的列表数据
      this.getSpuPageList()
    },
    // 删除spu按钮的回调
    async deleteSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: '删除品牌属性成功！'
        })
        // 提示删除成功以后重新获取页面数据
        this.getSpuPageList(this.records.length > 1 ? this.page : this.page - 1)
      } else {
        this.$message({
          type: 'error',
          message: '删除品牌属性失败！'
        })
      }
    },
    // 添加sku按钮的回调 跳转场景
    addSku(row) {
      this.scene = 2
      // 父组件中调用子组件的方法  发送请求（三个）
      this.$refs.SkuForm.getSkuData(this.cateGory1Id, this.cateGory2Id, row)
    },
    // SKU切换场景为0
    toScene0(scenes) {
      this.scene = scenes
    },
    // 查看sku的回调函数
    async handler(spu) {
      // 点击按钮对话框显示
      this.dialogTableVisible = true
      this.spu = spu
      // 获取sku列表的数据进行展示
      const result = await this.$API.spu.reqSkuList(spu.id)
      if (result.code === 200) {
        this.skuList = result.data
        // 让loading隐藏
        this.loading = false
      }
    },
    // 关闭对话框时需要清除数据
    closeDialog(done) {
      // loading属性再次变为真
      this.loading = true
      // 清除sku列表的数据
      this.skuList = []
      // 关闭对话框
      done()
    }
  }
}
</script>

<style>
</style>
