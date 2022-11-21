// 引入二次封装的axios
import request from '@/utils/request.js'
// /admin/product/getCategory1 get
export const getCategory1 = () => request({ url: '/admin/product/getCategory1', method: 'get' })
// /admin/product/getCategory2/{category1Id} get
export const getCategory2 = category1Id => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
// /admin/product/getCategory3/{category2Id} get
export const getCategory3 = category2Id => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'GEt' })

// 添加属性  /admin/product/saveAttrInfo post   保存属性也是用这个接口
export const reqAddAttr = data => request({ url: '/admin/product/saveAttrInfo', method: 'post', data })
