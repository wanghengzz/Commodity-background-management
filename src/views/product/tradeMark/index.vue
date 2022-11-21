<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog">添加</el-button>
    <!-- 表格 -->
    <el-table border stripe :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center" />
      <el-table-column prop="logoUrl" label="品牌logo" width="width" align="center">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width:100px;height:80px">
        </template>>
      </el-table-column>>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" @click="updateDialog(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination style="margin-top:20px;textAlign:center" :current-page.sync="currentPage" :page-sizes="[3, 6, 9, 12]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total" background @size-change="sizeChange" @current-change="currentChange">
      :pager-count="7" >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog :title=" tradeName.id ? '修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- 收集表单的数据到对象身上 ，将来进行表单验证也需要整个属性 -->
      <el-form ref="ruleForm" style="width:80%" :model="tradeName" :rules="rules">
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="tradeName.tmName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-form style="width:80%">
        <el-form-item label="品牌logo" :label-width="formLabelWidth" prop="logoUrl">
          <!-- 图片上传模块 -->
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tradeName.logoUrl" :src="tradeName.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMarkList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      // 代表的是分页器第几页
      page: 1,
      // 当前页数展示的条数
      limit: 3,
      // 总共数据
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏的控制属性
      dialogFormVisible: false,
      // 收集表单数据 品牌信息
      tradeName: {
        tmName: '',
        logoUrl: ''
      },
      // 表单验证规则
      rules: {
        tmName: [
          {
            required: true,
            message: '请输入品牌名称！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在2到10个字符',
            trigger: 'change'
          }
        ],
        logoUrl: [
          {
            required: true,
            message: '请添加图片',
            trigger: 'change'
          }
        ]
      }
    }
  },
  // 组件挂载完毕发送请求
  mounted() {
    // 获取数据列表的方法
    this.getPageList()
  },
  methods: {
    async getPageList() {
      // 解构出参数
      const { page, limit } = this
      const result = await this.$API.trademark.reqTradeMark(page, limit)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 分页器的改变
    currentChange(pager) {
      // 获取点击页面 改变页码数 再次发送请求
      this.page = pager
      this.getPageList()
    },
    sizeChange(pagelimit) {
      this.limit = pagelimit
      this.getPageList()
    },
    showDialog() {
      // 每次点开添加都清除一下数组
      this.tradeName = { tmName: '', logoUrl: '' }
      this.dialogFormVisible = true
    },
    updateDialog(row) {
      // row 当前用户选中的品牌信息
      this.dialogFormVisible = true
      // 修改品牌信息，不能直接操作服务器返回的数据因此浅拷贝
      this.tradeName = { ...row }
    },
    // 上传图片相关的回调
    handleAvatarSuccess(res, file) {
      this.tradeName.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    addOrUpdateTradeMarkList() {
      this.$refs.ruleForm.validate(async success => {
        if (success) {
          this.dialogFormVisible = false
          // 发起请求
          const result = await this.$API.trademark.addOrUpdateTradeMark(this.tradeName)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: this.tradeName.id ? '修改商品成功！' : '添加商品成功！'
            })
            this.getPageList()
          }
        } else {
          this.$message({
            message: '添加修改失败！！！',
            type: 'warning'
          })
          return false
        }
      })
    },
    deleteTradeMark(row) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const result = await this.$API.trademark.deleteTradeMark(row.id)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 再次获取品牌列表数组
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
          }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
