import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(Element, {
  size: 'medium'
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
