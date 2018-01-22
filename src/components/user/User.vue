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
      <el-button type="success" @click="dialogVisible = true"  plain>添加用户</el-button>
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
    <!-- 添加用户的弹窗 -->
    <el-dialog
        title="添加用户"
      :visible.sync="dialogVisible"
       width="50%">
      <el-form ref="userform" :rules="rules" :model="user" label-width="80px">
      <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
          <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="邮 箱" prop="password">
          <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="电 话" prop="mobile">
          <el-input v-model="user.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitUser">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUsersData, toggleUserState, addUser} from '../../api/api.js'
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      currentPage: 1,
      pagesize: 5,
      total: 100,
      tableData: []
    }
  },
  methods: {
    submitUser () {
      // 添加用户
      this.$refs['userform'].validate(valid => {
        if (valid) {
          addUser(this.user).then(res => {
            if (res.meta.status === 201) {
              this.dialogVisible = false
              this.initList()
            }
          })
        }
      })
    },
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
