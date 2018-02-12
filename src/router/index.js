import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import User from '@/components/user/User'
import Right from '@/components/right/Right'
import Role from '@/components/right/Role'
import Category from '@/components/product/Category'
import Param from '@/components/product/Param'
import PHome from '@/components/product/PHome'
import List from '@/components/product/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/welcome',
      children: [
        {path: '/welcome', component: Welcome},
        {path: '/users', component: User},
        {path: '/rights', component: Right},
        {path: '/roles', component: Role},
        {path: '/categories', component: Category},
        {path: '/params', component: Param},
        {path: '/goods',
          component: PHome,
          redirect: '/list',
          children: [
            {path: '/list', component: List}
          ]
        }
      ]
    }
  ]
})
