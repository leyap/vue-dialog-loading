<template>
    <div id="app">
        <button @click="openDialog">Dialog</button>
        <button @click="openDialog1">Dialog1</button>
        <button @click="openBusyDialog">Loading</button>
        <button @click="openDelayDialog">DelayDialog</button>
        <img class="img" :src="imgUrl" @click="preview(imgUrl)"/>
        <LoadingCom/>
    </div>
</template>

<script>
    import LoadingCom from "./component/LoadingCom";
    // import {LoadingCom} from "./component";

    const imgUrl = require("@/assets/test.jpg")
    export default {
        name: 'app',
        components: {LoadingCom},
        data () {
            return {
                imgUrl
            }
        },
        methods: {
            openDialog () {
                this.$dialog({
                    content: 'this is a dialog with OK button',
                    // onOk: true   //if is function, call while click
                    // background: '#00f',
                    btns: [
                        {
                            label: 'Button1',
                            color: '#f0f'
                        },
                        {
                            label: 'Button2',
                            callback: () => {
                            },
                            color: '#09f',
                            ghost: true,
                            keep: true
                        },
                        {
                            label: 'Button3',
                            callback: () => {
                            },
                            ghost: true,
                            class: 'cancel'
                        },
                    ]
                })
            },
            openDialog1 () {
                this.$dialog({
                    content: 'dialog with ok button',
                    // background: '#00f',
                    btns: [
                        {
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
                        },
                    ],
                })
            },
            openDelayDialog () {
                this.$dialog({
                    content: 'dialog with delay 3s',
                    // background: '#00f',
                    delay: 3000,
                    btns: [
                        {
                            label: 'OK',
                            color: '#09f',
                        }
                    ],
                })
              this.$dialog({
                content: 'dialog with delay 3s',
                // background: '#00f',
                delay: 3000,
                btns: [
                  {
                    label: 'OK',
                    color: '#09f',
                  }
                ],
              })
              this.$dialog({
                content: 'dialog with delay 3s',
                // background: '#00f',
                delay: 3000,
                btns: [
                  {
                    label: 'OK',
                    color: '#09f',
                  }
                ],
              })
            },
            openBusyDialog () {
                this.$loading.show({delay: 0})   //delay default is 300ms
                // this.$loading.show({delay: 0, background: 'rgba(0,0,0,0.5)'})   //delay default is 300ms
                setTimeout(() => {
                    this.$loading.hide()
                }, 3000)
            },
            preview (imgUrl) {
                this.$ImagePreview.show(imgUrl)
            }
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    * {
        outline: none;
    }

    button {
        height: 36px;
        background: #eee;
        border: none;
        border-radius: 18px;
        padding: 0 20px;
        line-height: 36px;
        margin: 0 10px;
        font-size: 14px;
        cursor: pointer;
    }

    .img {
        width: 100px;
        height: 100px;
        display: block;
        cursor: pointer;
    }
</style>
