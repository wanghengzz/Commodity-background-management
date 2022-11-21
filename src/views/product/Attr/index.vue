<template>
  <div>
    <el-card>
      <CategoryList :show="!isShowing" @getAttrList="getAttrList" />
    </el-card>
    <el-card v-show="isShowing">
      <el-button type="primary" icon="el-icon-plus" :disabled="!cateGory3Id" style="margin-bottom:20px" @click="addAttr">添加属性</el-button>
      <!-- 表格展示平台数据 -->
      <el-table border stripe :data="attrList">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="attrName" label="属性名称" width="150" align="center" />
        <el-table-column prop="prop" label="属性值列表" width="width" align="center">
          <template slot-scope="{row}">
            <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" type="success" style="margin:0 20px">{{ attrValue.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150" align="center">
          <template slot-scope="{row}">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)" />
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttrList($index)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-show="!isShowing">
      <el-form ref="form" label-width="80px" :inline="true" size="normal" style="margin-left:-20px" :model="attrInfo">
        <el-form-item label="属性名">
          <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" icon="el-icon-plus" style="margin-bottom:20px" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
      <el-button type="info" size="default" @click="isShowing=true">取消</el-button>
      <el-table border stripe style="margin-bottom:20px" :data="attrInfo.attrValueList">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="prop" label="属性值名称" width="width" align="center">
          <template slot-scope="{row}">
            <!-- 失焦时展示span 聚焦时展示input -->
            <el-input v-if="row.flag" ref="editTask" v-model="row.valueName" clearable="true" minlength="2" maxlength="10" show-word-limit placeholder="请输入属性值名称" size="mini" @blur="complate(row)" @keyup.native.enter="complate2(row)" />
            <span v-else style="display:block" @click="change(row)">{{ row.valueName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" align="center">
          <template slot-scope="{row,$index}">
            <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon="el-icon-loading" icon-color="skyblue" :title="`确定删除${row.valueName}？`" @onConfirm="deleteAttr($index)">
              <el-button slot="reference" type="info">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" :disabled="attrInfo.attrValueList.length<1" @click="addOrUpdateAttr">保存</el-button>
      <el-button type="info" size="default" @click="isShowing=true">取消</el-button>
    </el-card>
  </div>
</template>
<script>
// 按需引入lodash的深拷贝
import clonDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      cateGory1Id: '',
      cateGory2Id: '',
      cateGory3Id: '',
      attrList: [],
      isShowing: true,
      // 收集添加属性
      attrInfo: {
        attrName: '',
        // 属性值默认占位了。打开添加就会自动添加一行input框
        // 需要用户点击时才 通过push向数组中添加对象
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      }
      // 控制input和span的检查编辑切换
    }
  },
  methods: {
    getAttrList({ cateGoryId, id }) {
      if (id === 1) {
        this.cateGory1Id = cateGoryId
        // 当一级改变的时候需要将二级三级分类置空
        this.cateGory2Id = ''
        this.cateGory3Id = ''
      } else if (id === 2) {
        this.cateGory2Id = cateGoryId
        this.cateGory3Id = ''
      } else {
        this.cateGory3Id = cateGoryId
        // 当三个分类的id都获取到的时候就可以发送请求获取数据了
        this.getAttrPageList()
      }
    },
    // 发送获取请求
    async getAttrPageList() {
      const result = await this.$API.attr.reqAttrList(this.cateGory1Id, this.cateGory2Id, this.cateGory3Id)
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    addAttrValue() {
      // attrId 是你相应的属性的id 目前而言我们是添加属性的操作 没有相应的属性ID ，目前带给服务器的id为undefined
      // flag属性给每一个属性值添加一个标记用于切换查看模式和编辑模式 每一个属性值都是独立的控制自己的模式切换
      this.attrInfo.attrValueList.push({ attrId: this.attrInfo.id, valueName: '', flag: true })
      // 当DOM结构更新之后自动获取焦点
      this.$nextTick(() => this.$refs.editTask.focus())
    },
    addAttr() {
      // 添加属性首先切换页面
      this.isShowing = false
      // 然后将上次添加至表单的数据清空
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.cateGory3Id,
        categoryLevel: 3
      }
    },
    updateAttr(row) {
      this.isShowing = false
      // 如果直接修改值，点击取消时也会修改 获取到的数据 一级添加属性的数据
      // 因为 attrInfo对象中嵌套对象因此需要 深拷贝
      this.attrInfo = clonDeep(row)

      // 修改属性时，因为其身上没有flag属性所以无法进行视图模式和编辑模式的切换需要向数据中的每一项添加flag属性
      this.attrInfo.attrValueList.forEach(item => {
        // 以下形式的添加vue无法检测到不是响应式数据（数据变化 视图跟着变化）
        // item.flag = false
        // 对象中添加响应式 属性 通过$set(添加的对象，属性名，属性值)
        this.$set(item, 'flag', false)
      })
    },
    change(row) {
      // 如果输入的值为空则提示用户输入不能为空
      // 首先切换状态
      row.flag = true
      // 当DOM结构更新之后自动获取焦点
      this.$nextTick(() => this.$refs.editTask.focus())
    },
    // input 框输入重复属性 或者空属性时的判断
    complate2(row) {
      // 输入为空时
      if (row.valueName.trim() === '') {
        this.$message({
          type: 'warning',
          message: '属性值不能为空！'
        })
        return
      }
      // 过滤出不重复项
      const newArr = this.attrInfo.attrValueList.filter(item => item !== row)
      // 判断是否重复
      const isRepeat = newArr.some(item => item.valueName === row.valueName)
      // // 当属性值重复时
      if (isRepeat) {
        this.$message({
          type: 'error',
          message: '属性值重复！'
        })
        return
      }
      // input 消失显示span  编辑模式-->查看模式
      row.flag = false
    },
    complate(row) {
      // 输入为空时
      if (row.valueName.trim() === '') {
        this.$message({
          type: 'warning',
          message: '属性值不能为空！'
        })
        return
      }
      // 过滤出不重复项
      const newArr = this.attrInfo.attrValueList.filter(item => item !== row)
      // 判断是否重复
      const isRepeat = newArr.some(item => item.valueName === row.valueName)
      // // 当属性值重复时
      if (isRepeat) {
        this.$message({
          type: 'error',
          message: '属性值重复！'
        })
        return
      }
      // input 消失显示span  编辑模式-->查看模式
      row.flag = false
    },
    // 删除属性的回调
    deleteAttr(index) {
      // 最新版本的elelmentUI  这个的版本落后
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存属性 向服务器发起请求
    async addOrUpdateAttr() {
      // 整理参数
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        // 首先需要确保添加属性不为空
        if (item.valueName !== '') {
          // 删除用于控制编辑显示切换的flag属性将数据发送给服务器
          delete item.flag
          return item
        }
      })
      // 发起请求保存属性
      try {
        await this.$API.attr.reqAddAttr(this.attrInfo)
        // 切换页面到展示页面
        this.isShowing = true
        // 成功了 弹窗提示
        this.$message({ type: 'success', message: '保存成功！' })
        // 成功以后要重新获取列表并展示
        this.getAttrPageList()
      } catch (error) {
        this.$message({ type: 'error', message: '保存失败！' })
      }
    },
    // 删除属性
    deleteAttrList(index) {
      this.$confirm('是否删除该属性？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.attrList.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style>
</style>
