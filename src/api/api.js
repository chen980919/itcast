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
// 测试请求头
export const getUsersData = (params) => {
  return axios.get('users', {params: params}).then(res => {
    return res.data
  })
}
// 用户管理-状态改变
export const toggleUserState = (params) => {
  // restful /users/512/state/true
  return axios.put('users/' + params.uId + '/state/' + params.state).then(res => {
    return res.data
  })
}
