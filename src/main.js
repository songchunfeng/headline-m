import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant.js'
import 'amfe-flexible'
import './styles/base.less' // 公共样式
import './utils/validation' // 表单校验

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
