import axios from 'axios'

// 设置请求的基准路径
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1/'

// 实现先登录
export const login = (params) => {
  return axios.post('login', params).then(res => {
    // 返回数据
    return res.data
  })
}
