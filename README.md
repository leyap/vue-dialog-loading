# vue-dialog-loading

### A light vue dialog plugin with loading animation and image preview

View the [Demo](https://vue-dialog-loading.github.io/)
and its [source](https://github.com/leyap/vue-dialog-loading) for more.


![](https://media.giphy.com/media/ckrKKwKh444nS6HuWo/giphy.gif)

## Install
````
npm install --save vue-dialog-loading
````

## Quick Start

> main.js
````
import Dialog from 'vue-dialog-loading'

//global config
Vue.use(Dialog, {
    dialogBtnColor: '#0f0',
    background:'rgba(0, 0, 0, 0.5)'
})

````

> your vue file
````
this.$dialog({
     title: 'title',
     content: 'some information',
     // background:'rgba(0,0,0, 0.5)',
     delay: 3000,   //options, close after 3s
     btns: [{
                    label: 'OK',
                    color: '#09f',
             },
             {
                    label: 'Cancel',
                    color: '#444',
                    ghost: true,
                    callback: () => {
                        window.alert('onOk callback')
                    },
             }],
})

this.$loading.show({delay:0, background: '#444'})   //delay 0ms, default is 300ms
this.$loading.hide()

## Components:
<LoadingCom/>

//preview image, support double touch to scale 2.0 and touch drag
this.$ImagePreview.show(imgUrl)
````

