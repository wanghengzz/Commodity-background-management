// 主要获取品牌管理数据的模块
import request from '@/utils/request'
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMark = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'GET' })

// 处理添加品牌操作 /admin/product/baseTrademark/save  post
export const addOrUpdateTradeMark = tradeList => {
  if (tradeList.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'PUT', data: tradeList })
  } else {
    return request({ url: '/admin/product/baseTrademark/save', method: 'POST', data: tradeList })
  }
}
// 修改品牌 /admin/product/baseTrademark/update put   三个参数 id、品牌名称、品牌logo

// 删除品牌
export const deleteTradeMark = id => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
