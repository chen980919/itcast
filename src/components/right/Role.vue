<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
     <el-button type="success" plain @click='dialogVisible4Add = true'>添加用户</el-button>
    </div>
          <template>
    <el-table
      border
      :data="tableData"
      style="width: 100%">
         <el-table-column type="expand">
        <template slot-scope='scope'>
          <el-row :key="item.id" v-for="item in scope.row.children">
            <el-col :span="3">
              <el-tag @close="deleteRight(item.id)" closable>{{item.authName}}</el-tag>
              <i v-if="item.children.length>0" class="el-icon-arrow-right arrow"></i>
            </el-col>
            <el-col :span="21">
              <el-row class="authlist" :key="tag.id" v-for="tag in item.children">
                <el-col :span="4">
                  <el-tag @close="deleteRight(tag.id)" type="success" closable>{{tag.authName}}</el-tag>
                  <i v-if="tag.children.length>0" class="el-icon-arrow-right arrow"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="deleteRight(btn.id)" :key="btn.id" type="warning" closable v-for="btn in tag.children">{{btn.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
       <el-table-column
        type="index"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述"
         width="500">
      </el-table-column>
      <el-table-column
         width="260"
        label="操作">
        <template slot-scope="scope">
           <el-button type="primary" size="mini"  @click='editHandler(scope.row)' icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" @click='deleteHandler(scope.row)' icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色弹窗 -->
    <el-dialog
        title="添加用户"
      :visible.sync="dialogVisible4Add"
       width="50%">
      <el-form ref="roleform" :rules="rules" :model="role" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="role.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4Add = false">取 消</el-button>
    <el-button type="primary" @click="submitRole">确 定</el-button>
    </span>
    </el-dialog>
    <!-- 编辑角色弹窗 -->
    <el-dialog
        title="编辑用户"
      :visible.sync="dialogVisible4Edit"
       width="50%">
      <el-form ref="eroleform" :rules="rules" :model="erole" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="erole.roleName"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="erole.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4Edit = false">取 消</el-button>
    <el-button type="primary" @click="submitRole4Edit">确 定</el-button>
    </span>
    </el-dialog>
  </template>
    </div>
</template>

<script>
import {roleList, addRole, getRoleById, editRole, deleteRole} from '../../api/api.js'
export default {
  data () {
    return {
      role: {
        roleName: '',
        roleDesc: ''
      },
      erole: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      dialogVisible4Add: false,
      dialogVisible4Edit: false,
      tableData: []
    }
  },
  methods: {
    deleteHandler (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({id: row.id}).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.initList()
        })
      })
    },
    submitRole4Edit () {
      // 编辑角色
      this.$refs['eroleform'].validate(valid => {
        if (valid) {
          editRole(this.erole).then(res => {
            if (res.meta.status === 200) {
              this.initList()
              this.dialogVisible4Edit = false
              this.$notify({
                title: '成功',
                message: '修改用户成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    editHandler (row) {
      // 查询角色
      getRoleById({id: row.id}).then(res => {
        if (res.meta.status === 200) {
          // 填充表单
          this.erole.id = res.data.roleId
          this.erole.roleName = res.data.roleName
          this.erole.roleDesc = res.data.roleDesc
          // 显示弹框
          this.dialogVisible4Edit = true
        }
      })
    },
    submitRole () {
    // 添加角色
      this.$refs['roleform'].validate(valid => {
        if (valid) {
          addRole(this.role).then(res => {
            if (res.meta.status === 201) {
              this.dialogVisible4Add = false
              this.role.roleName = ''
              this.role.roleDesc = ''
              this.initList()
              this.$notify({
                title: '成功',
                message: '添加用户成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    initList () {
      roleList().then(res => {
        if (res.meta.status === 200) {
          this.tableData = res.data
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
    padding-left: 10px;
  }
  .el-tag  {
    margin-left: 5px;
  }
  .authlist {
    border-top: solid 1px #D3DCE6;
    padding-bottom: 5px;
  }
  .arrow {
    font-size: 18px;
    font-weight: bold;
  }
</style>
