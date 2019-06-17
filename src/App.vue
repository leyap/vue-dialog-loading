<template>
    <div id="app">
        <button @click="openDialog">Open Dialog</button>
        <button @click="openBusyDialog">show loading</button>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
            openDialog () {
                this.$dialog({
                    content: 'dialog with ok button',
                    onOk () {   //if is function, call while click
                        window.alert('onOk callback')
                    },
                    onCancel: true  //if is true, just show the button
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
