<template>
    <div id="app">
        <button @click="openDialog">Dialog</button>
        <button @click="openDialog1">Dialog1</button>
        <button @click="openBusyDialog">Loading</button>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
            openDialog () {
                this.$dialog({
                    content: 'this is a dialog with OK button',
                    onOk: true   //if is function, call while click
                })
            },
            openDialog1 () {
                this.$dialog({
                    content: 'dialog with ok button',
                    onOk () {   //if is function, call while click
                        window.alert('onOk callback')
                    },
                    onCancel: true
                })
            },
            openBusyDialog () {
                this.$loading.show({delay: 0})   //delay default is 300ms
                setTimeout(() => {
                    this.$loading.hide()
                }, 3000)
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

</style>
