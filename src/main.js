import Vue    from 'vue'
import App    from './App.vue'
import Dialog from './component'
// import Dialog from '../dist/index.umd'
// import Dialog from 'vue-cropper'

Vue.use(Dialog, {
    dialogBtnColor: '#0a0'
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
