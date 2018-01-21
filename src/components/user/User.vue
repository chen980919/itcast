<template>
  <div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-input placeholder="请输入内容" class="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
       width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
       width="180">
    </el-table-column>
    <el-table-column
      prop="mg_state"
      label="用户状态"
       width="180">
      <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change='toggleUser(scope.row )'></el-switch>
      </template>
    </el-table-column>
    <el-table-column
      prop="mg_state"
      label="操作"
       width="280">
      <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 50, 100]"
      :page-size= pagesize
      layout="total, sizes, prev, pager, next, jumper"
      :total= total>
    </el-pagination>
  </div>
</template>

<script>
import {getUsersData, toggleUserState} from '../../api/api.js'
export default {
  data () {
    return {
      currentPage: 1,
      pagesize: 5,
      total: 100,
      tableData: []
    }
  },
  methods: {
    toggleUser (data) {
      toggleUserState({
        uId: data.id,
        state: data.mg_state
      }).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
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
      getUsersData({
        query: '',
        pagenum: this.currentPage,
        pagesize: this.pagesize
      }).then(res => {
        if (res.meta.status === 200) {
          this.tableData = res.data.users
          this.total = res.data.total
          this.currentPage = res.data.pagenum
        }
      })
    }
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
  padding-left: 15px;
}
.search {
    width: 300px;
  }
.el-pagination {
  background-color: #D3DCE6;
  height: 35px;
  padding-top: 10px;

}
</style>
