import Vue from 'vue'
import App from './App.vue'
import Dialog from './component'

Vue.use(Dialog)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
