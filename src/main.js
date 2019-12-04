import Vue    from 'vue'
import App    from './App.vue'
import Dialog from './component'
// import Dialog from '../dist/index.umd'
// import Dialog from 'vue-cropper'

Vue.use(Dialog, {
    dialogBtnColor: '#0a0',
    background: 'rgba(0,0,0,0.5)'
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
