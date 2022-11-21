import request from '@/utils/request'
// 获取spu列表的接口  /admin/product/{page}/{limit}   get  参数 page limit category3Id
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
// 获取spuForm列表（四个接口获取数据）
// 1.spu获取名称  /admin/product/getSpuById/{spuId} get
export const reqSpuName = spuId => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
// 2.获取品牌信息的接口 /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })
// 3.spu图片的接口 /admin/product/spuImageList/{spuId} get
export const reqSpuImg = spuId => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 4.获取销售属性 /admin/product/baseSaleAttrList get
export const reqAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })
// 添加或者修改spu的请求
// /admin/product/saveSpuInfo post
// /admin/product/updateSpuInfo post
export const reqSaveOrUpdateSpuInfo = spuInfo => {
  // 带有id则更新数据
  if (spuInfo.id) {
    return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
  } else {
    // 不带id则添加数据
    return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
  }
}
// 删除spu /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = spuId => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })
// /admin/product/spuImageList/{spuId} get
// 获取图片接口
export const reqSkuImgList = spuId => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// /admin/product/spuSaleAttrList/{spuId} get
// 获取销售属性的接口
export const reqSkuAttrList = spuId => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
// 获取平台属性的数据
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
// 保存sku  /admin/product/saveSkuInfo   post
export const reqAddSku = skuInfo => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })

// 获取sku列表数据的接口 /admin/product/findBySpuId/{spuId}
export const reqSkuList = spuId => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
