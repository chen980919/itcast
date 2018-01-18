import Vue from 'vue'
import App from './App'
import router from './router'

// 加载UI组件
import ElementUI from 'element-ui'
// 加载主题
import 'element-ui/lib/theme-chalk/index.css'
// 启用ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('mytoken')
  console.log(user)
  if (user) {
    next()
  } else {
    if (to.path !== '/') {
      next({path: '/'})
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
