// store数据盒子

import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

const USER_KET = 'user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 获取用户的token，并进行本地持久化存储
    user: getItem(USER_KET)
    // user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser (state, data) {
      // 将获取到的token存储到user中，并放到浏览器中
      state.user = data
      setItem(USER_KET, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
