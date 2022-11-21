// 四个模块的接口函数统一暴漏
import * as trademark from './product/tradeMark.js'
import * as attr from './product/attr'
import * as spu from './product/spu'
import * as sku from './product/sku'

// 权限模块的接口
import * as user from './acl/user'
import role from './acl/role'
import permission from './acl/permission'
// 对外暴漏
export default {
  trademark,
  attr,
  sku,
  spu,
  user,
  role,
  permission
}
