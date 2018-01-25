<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
   <div>
    <el-button type="success" plain @click='addHandler'>添加分类</el-button>
   </div>
   <div><tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource" @deleteCate="deleteCategory" @showForm="showEditForm" @refresh="initList"></tree-grid></div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加分类弹窗 -->
    <el-dialog
        title="添加分类"
      :visible.sync="dialogVisible4Add"
       width="50%">
        <div>
          <span>分类名称:</span>
          <el-input class='cname' v-model="cate.cat_name"></el-input>
        </div>
        <div>
          <span>父级分类:</span>
          <el-cascader
            :show-all-levels="false"
            :options="cateList"
            :props='propsDefine'
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4Add = false">取 消</el-button>
    <el-button type="primary"  @click="submitCate">确 定</el-button>
    </span>
    </el-dialog>
    <!-- 编辑分类弹窗 -->
    <el-dialog
        title="编辑分类"
      :visible.sync="dialogVisible4Edit"
       width="50%">
        <div>
          <span>分类名称：</span>
          <el-input class='cname' v-model="ecate.cat_name"></el-input>
        </div>
        <!-- <div>
          <span>父级分类:</span>
          <el-cascader
            :show-all-levels="false"
            :options="ecateList"
            :props='propsDefine'
            v-model="eselectedOptions">
          </el-cascader>
        </div> -->
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4Edit = false">取 消</el-button>
    <el-button type="primary"  @click="submitCate4Edit">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import TreeGrid from './TreeGrid.vue'
import {getCategories, addCate, getCateById, editCate, deleteCate} from '../../api/api.js'
export default {
  data () {
    return {
      propsDefine: {
        value: 'cat_id',
        label: 'cat_name'
      },
      cateList: [],
      ecateList: [],
      selectedOptions: [],
      eselectedOptions: [],
      dataSource: [],
      cate: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      ecate: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: 500
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: 100
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: 100
      }],
      dialogVisible4Add: false,
      dialogVisible4Edit: false,
      currentPage: 1,
      pagesize: 5,
      total: 30
    }
  },
  methods: {
    deleteCategory (cid) {
      deleteCate({id: cid}).then(res => {
        if (res.meta.status) {
          this.initList()
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    submitCate4Edit () {
      // 编辑商品分类
      // 编辑提交
      editCate(this.ecate).then(res => {
        if (res.meta.status === 200) {
          // 刷新
          this.initList()
          // 关闭弹窗
          this.dialogVisible4Edit = false
          // 提示
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    showEditForm (cid) {
      // 编辑商品分类
      // 根据id查询商品列表
      getCategories().then(res => {
        if (res.meta.status === 200) {
          this.ecateList = res.data
          return getCateById({id: cid})
        }
      }).then(res => {
        if (res.meta.status === 200) {
          this.ecate.cat_pid = res.data.cat_id
          this.ecate.cat_name = res.data.cat_name
          this.ecate.cat_level = res.data.cat_level
          this.dialogVisible4Edit = true
        }
      })
    },
    submitCate () {
      // 添加商品分类列表
      if (this.selectedOptions.length === 0) {
        // 分类父元素的id
        this.cate.cat_pid = 0
        // 分类的层级
        this.cate.cat_level = 1
      } else {
        // 分类父元素的id
        this.cate.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
        // 分类的层级
        this.cate.cat_level = this.selectedOptions.length === 1 ? 2 : 3
      }
      addCate(this.cate).then(res => {
        if (res.meta.status === 201) {
          // 刷新列表
          this.initList()
          // 关闭弹窗
          this.dialogVisible4Add = false
          // 提示
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.cate.cat_name = ''
        }
      })
    },
    handleChange () {
      console.log(1)
    },
    addHandler () {
      // 获得分类列表的数据
      getCategories({type: 2}).then(res => {
        if (res.meta.status === 200) {
          this.cateList = res.data
          this.dialogVisible4Add = true
        }
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initList()
    },
    initList () {
      getCategories({type: 3, pagenum: this.currentPage, pagesize: this.pagesize}).then(res => {
        if (res.meta.status === 200) {
          this.dataSource = res.data.result
          this.pagesize = res.data.pagesize
          this.total = res.data.total
        }
      })
    }
  },
  components: {
    TreeGrid
  },
  mounted () {
    this.initList()
  }
}
</script>

<style scoped>
.el-breadcrumb {
    background-color: #D3DCE6;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
}
.el-pagination {
    background-color: #D3DCE6;
    padding-top: 10px;
    height: 35px;
    line-height: 35px;
  }
.cname {
    width: 300px;
  }
</style>
