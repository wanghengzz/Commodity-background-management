import request from '@/utils/request'
// /admin/product/list/{page}/{limit} get
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })
// 正在销售 /admin/product/onSale/{skuId} get
export const reqOnSale = skuId => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })
// 商品下架 /admin/product/cancelSale/{skuId} get
export const reqCancelSale = skuId => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })
// 获取sku详情接口 /admin/product/getSkuById/{skuId}  get
export const reqSkuById = skuId => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })
