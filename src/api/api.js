import axios from 'axios'

// 设置请求的基准路径
// axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1/'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 登陆拦截器
// 拦截器处理token
axios.interceptors.request.use(function (config) {
  // 获取当前是否存在token
  let token = localStorage.getItem('mytoken')
  if (token) {
    // Authorization 请求头的键是前后台约定
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 实现先登录
export const login = (params) => {
  return axios.post('login', params).then(res => {
    // 返回数据
    return res.data
  })
}
// 查找数据
export const getUsersData = (params) => {
  return axios.get('users', {params: params}).then(res => {
    return res.data
  })
}
// 用户管理-状态改变
export const toggleUserState = (params) => {
  return axios.put('users/' + params.uId + '/state/' + params.state).then(res => {
    return res.data
  })
}
// 用户管理-状态改变
export const addUser = (params) => {
  return axios.post('users', params).then(res => {
    return res.data
  })
}
// 用户管理-更加id查询数据
export const getUserById = (params) => {
  return axios.get('users/' + params.id).then(res => {
    return res.data
  })
}
// 用户管理-编辑用户提交
export const editUser = (params) => {
  return axios.put('users/' + params.id, params).then(res => {
    return res.data
  })
}
// 用户管理-删除用户
export const deleteUser = (params) => {
  return axios.delete('users/' + params.id).then(res => {
    return res.data
  })
}
// 权限管理-权限列表查询
export const rightList = (params) => {
  return axios.get('rights/' + params.type).then(res => {
    return res.data
  })
}
// 权限管理-角色列表查询
export const roleList = () => {
  return axios.get('roles').then(res => {
    return res.data
  })
}
// 权限管理-角色添加
export const addRole = (params) => {
  return axios.post('roles', params).then(res => {
    return res.data
  })
}
// 权限管理-根据id查询角色信息
export const getRoleById = (params) => {
  return axios.get('roles/' + params.id).then(res => {
    return res.data
  })
}
// 权限管理-修改用户角色
export const editRole = (params) => {
  return axios.put('roles/' + params.id, params).then(res => {
    return res.data
  })
}
// 权限管理-删除角色
export const deleteRole = (params) => {
  return axios.delete('roles/' + params.id).then(res => {
    return res.data
  })
}
// 权限管理-删除指定角色的权限
export const deleteRoleRight = (params) => {
  return axios.delete('roles/' + params.roleId + '/rights/' + params.rightId).then(res => {
    return res.data
  })
}
// 权限管理-角色授权
export const submitGrant = (params) => {
  return axios.post('roles/' + params.roleId + '/rights/', params).then(res => {
    return res.data
  })
}
// 用户管理-用户角色提交
export const giveRole = (params) => {
  return axios.put('users/' + params.id + '/role', params).then(res => {
    return res.data
  })
}
// 左侧导航栏获取
export const getmenu = () => {
  return axios.get('menus').then(res => {
    return res.data
  })
}
