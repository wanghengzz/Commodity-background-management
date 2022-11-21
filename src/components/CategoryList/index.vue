<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item v-model="cateGory" label="一级分类">
        <el-select v-model="cateGory.cateGory1id" :disabled="show" placeholder="请选择" @change="handler1">
          <el-option v-for="c1 in list1" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item v-model="cateGory" label="二级分类">
        <el-select v-model="cateGory.cateGory2id" :disabled="show" placeholder="请选择" @change="handler2">
          <el-option v-for="c2 in list2" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cateGory.cateGory3id" :disabled="show" placeholder="请选择" @change="handler3">
          <el-option v-for="c3 in list3" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  props: ['show'],
  data() {
    return {
      // 一级列表数据存贮
      list1: [],
      list2: [],
      list3: [],
      cateGory: {
        cateGory1id: '',
        cateGory2id: '',
        cateGory3id: ''
      }
    }
  },

  // 组件已挂载完毕就发送请求获取数据
  mounted() {
    this.getCateGoryList()
  },
  methods: {
    async getCateGoryList() {
      const result = await this.$API.attr.getCategory1()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    async handler1() {
      // 当一级分类改变时需要清空二三级分类
      this.list2 = []
      this.list3 = []
      this.cateGory.cateGory2id = ''
      this.cateGory.cateGory3id = ''
      const { cateGory1id } = this.cateGory
      this.$emit('getAttrList', { cateGoryId: cateGory1id, id: 1 })
      const result = await this.$API.attr.getCategory2(cateGory1id)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    async handler2() {
      // 当选项改变时清空数组
      this.list3 = []
      this.cateGory.cateGory3id = ''
      const { cateGory2id } = this.cateGory
      this.$emit('getAttrList', { cateGoryId: cateGory2id, id: 2 })
      const result = await this.$API.attr.getCategory3(cateGory2id)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    handler3() {
      // 当三级分类选择完成之后需要将1，2，3id传递给父组件
      const { cateGory3id } = this.cateGory
      this.$emit('getAttrList', { cateGoryId: cateGory3id, id: 3 })
    }
  }
}
</script>

<style>
</style>
