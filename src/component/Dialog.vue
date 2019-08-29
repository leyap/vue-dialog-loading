<template>
    <transition name="fade">
        <div class="dialog-mask" v-show="this.visible" @click="handleBgClose" :id="id">
            <div class="dialog">
                <h3 class="title">{{title}}</h3>
                <div class="content"> {{content}}</div>
                <div class="btnBox">
                    <button v-if="onOk" @click="handleOnOk">{{okText}}</button>
                    <button class="cancelBtn" v-if="onCancel" @click="handleOnCancel">{{cancelText}}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'LDialog',
        data () {
            return {
                id: '',
                visible: false,
                bgClose: false,
                title: '',
                content: '',
                okText: 'OK',
                cancelText: 'Cancel',
                onOk: null,
                onCancel: null,
            }
        },
        methods: {
            handleOnOk () {
                if (typeof this.onOk === 'function') {
                    this.onOk()
                }
                this.close()
            },
            handleOnCancel () {
                if (typeof this.onCancel === 'function') {
                    this.onCancel()
                }
                this.close()
            },
            close () {
                this.visible = false
                setTimeout(() => {
                    this.$destroy(true)
                    this.$el.parentNode.removeChild(this.$el)
                }, 330)
            },
            handleBgClose (e) {
                if (this.visible && this.bgClose && !document.querySelector('.dialog').contains(e.target)) {
                    this.close()
                }
            }
        },
        created () {
        },
        mounted () {
        },
        beforeDestroy () {
        },
        destroyed () {
        }

    }
</script>

<style scoped>
    .dialog-mask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        text-align: center;
        margin: 0;
        height: 46px;
        line-height: 46px;
    }

    .dialog {
        /*width: 260px;*/
        max-width: 400px;
        background: #fff;
        border-radius: 10px;
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
        margin: 5px;
        padding: 10px 15px;
    }

    .title, .btnBox {
        flex-shrink: 0;
    }

    .btnBox {
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    .btnBox button {
        min-width: 100px;
        max-width: 100%;
        height: 36px;
        border: none;
        margin: 0 10px;
        font-size: 15px;
        border-radius: 5px;
        background: #00a0ff;
        color: #fff;
    }

    .btnBox button.cancelBtn {
        color: #00a0ff;
        background: #fff;
        border: 1px solid #00a0ff;
    }

    .content {
        flex-grow: 1;
        font-size: 16px;
        display: flex;
        justify-content: center;
        padding: 15px;
    }

    .fade-enter-active, .fade-enter-active .dialog,
    .fade-leave-active, .fade-leave-active .dialog {
        transition: all 0.3s ease-out;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter .dialog {
        transform: scale(0.8) translateY(50%);
    }

    .fade-leave-to {
        opacity: 0;
    }

    .fade-leave-to .dialog {
        transform: translateY(-50%) scale(0.8);
    }

</style>
