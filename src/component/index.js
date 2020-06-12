import Vue          from 'vue'
import Dialog       from './Dialog'
import Loading      from './Loading'
import ImagePreview from './ImagePreview'
import LoadingCom   from "./LoadingCom";

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
let options = {}
let lastDialog = null;

const dialog = (params) => {
    let id = 'dialog-' + count++
    const instance = new dialogConstructor()
    // instance.id = id
    instance.vm = instance.$mount()

    let {title, content, btns, bgClose, background, delay} = params || {}
    if (!background) {
        background = options.background;
    }

    instance.visible = true
    instance.bgClose = bgClose
    instance.id = id

    if (typeof title == 'string') {
        instance.title = title
    }
    if (typeof content == 'string') {
        instance.content = content
    }
    if (typeof background === 'string') {
        instance.background = background
    }
    if (Array.isArray(btns)) {
        instance.btns = btns.map(item => {
            if (!item.color && options.dialogBtnColor) {
                item.color = options.dialogBtnColor
            }
            return item
        })
    }

    if (Number.isInteger(delay)) {
        if (delay > 30000) {
            delay = 30000
        }
        if (delay < 20) {
            delay = 20
        }
        instance.delay = delay
    }

    document.body.appendChild(instance.$el)
    if (lastDialog) {
        lastDialog.close();
    }
    lastDialog = instance
    return instance
}

export {Dialog, Loading, ImagePreview}

const install = function (Vue, _options) {
    Vue.prototype.$dialog = dialog
    Vue.prototype.$loading = loadingInstance
    Vue.prototype.$ImagePreview = imgPreviewInstance

    Vue.component(LoadingCom.name, LoadingCom)

    if (_options) {
        options = _options
    }
    if (typeof options.background === 'string') {
        loadingInstance.defaultBackground = options.background
    }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.5.3',
    install,
    Dialog,
    Loading,
    LoadingCom,
    ImagePreview
}
