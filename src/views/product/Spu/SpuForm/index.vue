<template>
  <div>
    <el-form label-width="80px" size="normal">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" />
      </el-form-item>
      <el-form-item label="品牌" size="normal">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="tm in tradeMark" :key="tm.id" :label="tm.tmName" :value="tm.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" size="normal">
        <el-input v-model="spu.description" size="normal" clearable type="textarea" rows="4" placeholder="描述" />
      </el-form-item>
      <el-form-item label="SPU图片" size="normal">
        <el-upload action="/dev-api/admin/product/fileUpload" :file-list="spuImg" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handlerSuccess">
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" size="normal">
        <el-select v-model="attrIdAndName" :placeholder="`还有${unSelectSaleAttr.length}未选择`" clearable filterable>
          <el-option v-for="unselect in unSelectSaleAttr" :key="unselect.id" :value="`${unselect.id}:${unselect.name}`" :label="unselect.name" />
        </el-select>
        <el-button style="margin-left:20px" type="primary" size="default" icon="el-icon-plus" :disabled="!attrIdAndName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border stripe style="margin-top:20px" :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="saleAttrName" label="属性名" width="width" align="center" />
          <el-table-column prop="" label="属性值名称列表" width="width" align="center">
            <!-- Tag标签 -->
            <template slot-scope="{row}">
              <el-tag v-for="(tag,index) in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">{{ tag.saleAttrValueName }}</el-tag>
              <!-- input 和 span的切换 -->
              <!-- @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" -->
              <el-input v-if="row.inputVisible" ref="saveTagInput" v-model="row.inputValue" class="input-new-tag" size="small" @blur="handleInputConfirm(row)" @keyup.enter.native="$event.target.blur" />
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">+ 添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="width" align="center">
            <template slot-scope="{row,$index}">
              <el-button type="danger" size="default" icon="el-icon-delete" @click="spu.spuSaleAttrList.splice($index,1)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item size="normal">
        <el-button type="primary" size="default" @click="addOrUpdateSpu">保存</el-button>
        <el-button type="danger" size="default" @click="Cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  naem: 'SpuForm',
  data() {
    return {
      // 照片墙
      dialogImageUrl: '',
      dialogVisible: false,
      // 品牌名称数据
      spu: {
        category3Id: 0,
        description: '',
        spuName: '',
        tmId: '',
        spuImageList: [
          {
            imgName: '',
            imgUrl: '',
            spuId: 0
          }
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: 'string',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: 'string',
          //       saleAttrName: 'string',
          //       saleAttrValueName: 'string',
          //       spuId: 0
          //     }
          //   ]
          // }
        ]
      },
      // 品牌信息
      tradeMark: [],
      // 图片信息
      spuImg: [],
      // 销售属性列表
      saleAttrList: [],
      // 收集未选择销售属性的id
      attrIdAndName: ''
    }
  },
  computed: {
    // 计算出还未选择出的销售属性
    unSelectSaleAttr() {
      return this.saleAttrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name !== item1.saleAttrName
        })
      })
    }
  },
  methods: {
    handleRemove(file, fileList) {
      // file表示被删除的那张图片
      // fileList 表示照片墙剩余的照片
      // 收集照片墙图片的数据
      this.spuImg = fileList
      // fileList 为了显示照片墙 人为添加了  name 和 url字段因此需要删除这两个字段 才能发送给服务器（服务器不需要name 和url字段）
    },
    handlePictureCardPreview(file) {
      // 将数据中图片的地址赋值给数据
      this.dialogImageUrl = file.url
      // 图片放大显示
      this.dialogVisible = true
    },
    // 当照片墙新增图片成功时的回调
    // response 图片上传成功的响应信息
    // file 上传的那张图片信息
    // fileList 所哟图片的信息
    handlerSuccess(response, file, fileList) {
      // console.log(response, file, fileList)
      this.spuImg = fileList
    },
    // 初始化数据 发送请求的函数 在父组件中触发
    async initSpuData(spu) {
      //  名称
      const SpuName = await this.$API.spu.reqSpuName(spu.id)
      if (SpuName.code === 200) {
        this.spu = SpuName.data
      }
      // 获取品牌信息
      const TradeMark = await this.$API.spu.reqTradeMarkList()
      if (TradeMark.code === 200) {
        this.tradeMark = TradeMark.data
      }
      // 获取spu图片
      const SpuImg = await this.$API.spu.reqSpuImg(spu.id)
      if (SpuImg.code === 200) {
        // 需要整理数据之后再放入照片墙
        const imgListArr = SpuImg.data
        // 新增两个属性
        imgListArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        // 把整理好的数据给响应式数组
        this.spuImg = imgListArr
      }
      // 获取销售属性
      const AttrList = await this.$API.spu.reqAttrList()
      if (AttrList.code === 200) {
        this.saleAttrList = AttrList.data
      }
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 将收集到的数据 进行分割 保存到数据中发送给服务器
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      // （对象形式）整理格式
      const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      // 向spu的spuSaleAttrList中添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr)
      // 清空
      this.attrIdAndName = ''
    },
    // 添加销售属性 值
    addSaleAttrValue(row) {
      // 给点击项 动态的添加 切换属性
      // 控制button 与input的切换
      this.$set(row, 'inputVisible', true)
      // 新增inputValue 响应式字段 收集input值
      this.$set(row, 'inputValue', '')
    },
    // input 失去焦点的回调函数
    handleInputConfirm(row) {
      // 结构出参数展示属性值
      const { baseSaleAttrId, inputValue } = row
      // 新增属性值不能为空
      if (inputValue.trim() === '') {
        this.$message({
          type: 'warning',
          message: '属性值不能为空！'
        })
        return
      }
      // 新增属性值不能重复 spuSaleAttrValueList saleAttrValueName
      // res为true表示不重复    false 表示重复
      const res = row.spuSaleAttrValueList.every(item => item.saleAttrValueName !== inputValue)
      console.log(res)
      if (!res) {
        this.$message({
          type: 'warning',
          message: '输入属性值重复！'
        })
        this.$nextTick(() => this.$refs.saveTagInput.focus())
        return
      }
      const newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    // 保存或者修改属性 保存按钮的回调
    async addOrUpdateSpu() {
      // 如果data中的数据不为空数据则发送请求
      if (this.spu.description !== '' && this.spu.spuName !== '') {
        // 1.整理参数 照片墙多了name 和 url参数
        this.spu.spuImageList = this.spuImg.map(item => {
          return {
            imgName: item.name,
            imgUrl: item.response ? item.response.data : item.url
          }
        })
        const result = await this.$API.spu.reqSaveOrUpdateSpuInfo(this.spu)
        // 修改成功之后
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '属性保存成功！'
          })
          // 通知父组件回到scene==0的场景
          this.$emit('changeScene', 0)
        }
        // 保存之后需要清除data中的数据
        // 清空 data中的数据
        Object.assign(this._data, this.$options.data())
      } else {
        //  spu中的数据为空提示用户输入信息
        this.$message({
          type: 'warning',
          message: '属性名称和属性描述不能为空！'
        })
      }
    },
    // 父组件中通过ref获取子组件 并且在父组件中触发子组件事件 发送两个请求
    async addSpuData(cateGory3Id) {
      // 获取品牌信息
      const TradeMark = await this.$API.spu.reqTradeMarkList()
      if (TradeMark.code === 200) {
        this.tradeMark = TradeMark.data
      }
      // 获取销售属性
      const AttrList = await this.$API.spu.reqAttrList()
      if (AttrList.code === 200) {
        this.saleAttrList = AttrList.data
      }
      // 添加spu的时候收集三级分类的ID
      this.spu.category3Id = cateGory3Id
    },
    // 取消按钮
    Cancel() {
      // 跳转场景
      this.$emit('changeScene', 0)
      // 清空 data中的数据
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
