# vue-dialog-loading

### A light vue dialog plugin with loading animation

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

Vue.use(Dialog)
````

> your vue file
````
this.$dialog({
     content: 'some information',
     okText: 'OK',
     cancelText: 'Cancel',
     onOk () {   //if is function, call while click
     },
     onCancel: true  //if is true, just show the button
})

this.$loading.show({delay:0})   //delay 0ms, default is 300ms
this.$loading.hide()
````

