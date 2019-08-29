import Vue          from 'vue'
import Dialog       from './Dialog'
import Loading      from './Loading'
import ImagePreview from './ImagePreview'

const dialogConstructor = Vue.extend(Dialog)
const loadingConstructor = Vue.extend(Loading)
const ImagePreviewConstructor = Vue.extend(ImagePreview)

const loadingInstance = new loadingConstructor()
loadingInstance.vm = loadingInstance.$mount()
document.body.appendChild(loadingInstance.$el)

const imgPreviewInstance = new ImagePreviewConstructor()
imgPreviewInstance.vm = imgPreviewInstance.$mount()
document.body.appendChild(imgPreviewInstance.$el)

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


export {Dialog, Loading, ImagePreview}

const install = function (Vue) {
    Vue.prototype.$dialog = dialog
    Vue.prototype.$loading = loadingInstance
    Vue.prototype.$ImagePreview = imgPreviewInstance
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

// console.log(Dialog)

export default {
    version: '0.1.13',
    install,
    Dialog,
    Loading,
    ImagePreview
}
