<template>
  <div>
    <el-form ref="form" label-width="80px" :inline="false" size="normal">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称" size="normal">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称" size="normal" clearable />
      </el-form-item>
      <el-form-item label="价格(元)" size="normal">
        <el-input v-model="skuInfo.price" placeholder="价格（元）" size="normal" clearable type="number" />
      </el-form-item>
      <el-form-item label="重量(Kg)" size="normal">
        <el-input v-model="skuInfo.weight" placeholder="重量(Kg)" size="normal" clearable />
      </el-form-item>
      <el-form-item label="规格描述" size="normal">
        <el-input v-model="skuInfo.skuDesc" rows="4" placeholder="规格描述" type="textarea" size="normal" clearable />
      </el-form-item>
      <el-form-item label="平台属性" size="normal">
        <el-form ref="form" label-width="80px" :inline="true" size="normal">
          <el-form-item v-for="(attr) in skuAttrInfoList" :key="attr.id" style="margin-bottom:15px" :label="attr.attrName">
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择" clearable filterable>
              <el-option v-for="attrValue in attr.attrValueList" :key="attrValue.id" :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性" size="normal">
        <el-form ref="form" label-width="80px" :inline="false" size="normal">
          <el-form-item v-for="saleValue in skuSaleAttrList" :key="saleValue.id" :label="saleValue.saleAttrName" style="margin-bottom:15px">
            <el-select v-model="saleValue.attrIdAndAttrValueId" placeholder="请选择" clearable filterable>
              <el-option v-for="saleAttrValue in saleValue.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${saleValue.id}:${saleAttrValue.id}`" />
            </el-select>
          </el-form-item>
        </el-form>

      </el-form-item>
      <el-form-item label="图片列表" size="normal">
        <el-table border stripe :data="skuImgList" @selection-change="handleSelectionChange">
          <el-table-column width="80" type="selection" align="center" />
          <el-table-column label="图片" width="width" align="center">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="col.width" align="center" />
          <el-table-column label="操作" width="width" align="center">
            <template slot-scope="{row}">
              <el-button v-if="row.isDefault==0" type="primary" size="default" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else type="success" size="default">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item size="normal">
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="info" size="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  naem: 'SkuForm',
  data() {
    return {
      skuImgList: [],
      skuSaleAttrList: [],
      skuAttrInfoList: [],
      // 收集sku数据的字段
      skuInfo: {
        // 第一类收集数据是父组件的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类 通过数据的双向绑定来收集数据
        price: 0,
        skuName: '',
        weight: '',
        skuDesc: '',
        // 手动收集
        skuAttrValueList: [
          // 只需要收集两个id即可
          // {
          //   attrId: 0,
          //   attrName: 'string',
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: 'string'
          // }
        ],
        // 图片类的
        skuDefaultImg: '',
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   isDefault: 'string',
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: 'string',
          //   saleAttrValueId: 0,
          //   saleAttrValueName: 'string',
          //   skuId: 0,
          //   spuId: 0
          // }
        ]
      },
      // 存储父亲传来的spu
      spu: {},
      // 收集图片的字段
      imgList: []
    }
  },
  methods: {
    // 父组件中调用该方法发送三个请求
    // 获取SKu数据
    async getSkuData(cateGory1Id, cateGory2Id, spu) {
      // 收集父组件给的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      // 获取图片请求
      const result = await this.$API.spu.reqSkuImgList(spu.id)
      if (result.code === 200) {
        const list = result.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.skuImgList = list
      }
      // 获取销售属性
      const result1 = await this.$API.spu.reqSkuAttrList(spu.id)
      if (result1.code === 200) {
        this.skuSaleAttrList = result1.data
      }
      const result2 = await this.$API.spu.reqAttrInfoList(cateGory1Id, cateGory2Id, spu.category3Id)
      if (result2.code === 200) {
        this.skuAttrInfoList = result2.data
      }
    },
    // table表格复选框按钮的事件
    handleSelectionChange(select) {
      // select 获取到用户选中图片的信息
      this.imgList = select
    },
    // 按钮切换   排他操作
    changeDefault(row) {
      // 将所有图片的isDefault字段切换为0
      this.skuImgList.forEach(item => {
        item.isDefault = 0
      })
      // 然后将点击的那个图片的切换为1
      row.isDefault = 1

      // 收集默认图片的信息
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 关闭按钮的事件
    cancel() {
      // 通知父组件切换场景
      this.$emit('changeScenes', 0)
      // 清除数据
      Object.assign(this._data, this.$options.data())
    },
    // 保存按钮事件
    async save() {
      // 整理数据 发送给服务器
      // 平台属性
      // 方案一
      // const { skuAttrInfoList, skuInfo } = this
      // const arr = []
      // skuAttrInfoList.forEach(item => {
      //   if (item.attrIdAndValueId) {
      //     // 如果有id则进行数据的分割
      //     const [attrId, valueId] = item.attrIdAndValueId.split(':')
      //     // 携带给服务器的参数应该是一个对象
      //     const obj = { attrId, valueId }
      //     // 然后将对象添加到数组中
      //     arr.push(obj)
      //   }
      // })
      // // 然后将数组给skuInfo 最终作为参数发送给服务器
      // skuInfo.skuAttrValueList = arr
      // 方式二
      const { skuAttrInfoList, skuInfo, skuSaleAttrList, imgList } = this
      skuInfo.skuAttrValueList = skuAttrInfoList.reduce((pre, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          pre.push({ attrId, valueId })
        }
        return pre
      }, [])
      skuInfo.skuSaleAttrValueList = skuSaleAttrList.reduce((pre, item) => {
        if (item.attrIdAndAttrValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndAttrValueId
          pre.push({ saleAttrId, saleAttrValueId })
        }
        return pre
      }, [])
      // 收集图片数据
      skuInfo.skuImageList = imgList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 发起请求
      const result = await this.$API.spu.reqAddSku(this.skuInfo)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: 'SKU添加成功'
        })
        // 并且切换场景
        this.$emit('changeScenes', 0)
      }
    }
  }
}
</script>

<style>
</style>
