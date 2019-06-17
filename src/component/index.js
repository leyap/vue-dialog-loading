import Vue     from 'vue'
import Dialog  from './Dialog'
import Loading from './Loading'

const dialogConstructor = Vue.extend(Dialog)
const loadingConstructor = Vue.extend(Loading)

const loadingInstance = new loadingConstructor()
loadingInstance.vm = loadingInstance.$mount()
document.body.appendChild(loadingInstance.$el)

let count = 1

const dialog = (params) => {
    let id = 'dialog-' + count++
    const instance = new dialogConstructor()
    // instance.id = id
    instance.vm = instance.$mount()

    let {title, content, okText, cancelText, onOk, onCancel, bgClose} = params || {}

    instance.visible = true
    instance.bgClose = bgClose
    instance.id = id

    if (typeof title == 'string') {
        instance.title = title
    }
    if (typeof content == 'string') {
        instance.content = content
    }
    if (typeof okText == 'string') {
        instance.okText = okText
    }
    if (typeof cancelText == 'string') {
        instance.cancelText = cancelText
    }
    if (onOk) {
        instance.onOk = onOk
    }
    if (onCancel) {
        instance.onCancel = onCancel
    }

    document.body.appendChild(instance.$el)
    return instance.el
}


export default {
    install: Vue => {
        Vue.prototype.$dialog = dialog
        Vue.prototype.$loading = loadingInstance
    }
}
