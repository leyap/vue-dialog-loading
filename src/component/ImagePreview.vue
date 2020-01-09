<template>
    <transition name="fadex">
        <div class="imgpreviewMask" v-show="isShow">
            <div class="imgpreviewDialog"
                 @touchstart.prevent.stop="ontouchstart" @mousedown.prevent.stop="ontouchstart"
                 @touchmove.prevent.stop="ontouchmove" @mousemove.prevent.stop="ontouchmove"
                 @touchend="ontouchend" @mouseup="ontouchend" @touchcancel="ontouchend" @mouseleave="ontouchend"
                 @wheel.prevent="onwheelFunc">
                <div class="imgBox" ref="imgBox">
                    <img :src="imgUrl" ref="img"/>
                </div>
            </div>
            <div class="closeBtn" @click="hide">
                <i></i> <i></i>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'imgpreviewDialog',
        data () {
            return {
                isShow: false,
                imgUrl: '',
                startx: -1,
                starty: -1,
                x: 0,
                y: 0,
                currentx: 0,
                currenty: 0,
                scaled: false,
                startTime: null,
                inTouch: false,
                scale: 1,
                offx: 0,
                offy: 0
            }
        },
        methods: {
            show (params) {
                if (params) {
                    if (params.imgUrl) {
                        this.imgUrl = params.imgUrl
                    } else if (typeof params === 'string') {
                        this.imgUrl = params
                    }
                    this.isShow = true
                }
            },
            hide () {
                this.scale = 1
                this.$refs.img.style.transform = "scale(1)"
                this.$refs.imgBox.style.transform = "translate(0,0)"
                this.isShow = false
                this.scaled = false
                this.x = 0
                this.y = 0
            },
            ontouchstart (e) {
                this.inTouch = true
                let touch = e.touches ? e.touches[0] : null
                let clientX = touch ? touch.clientX : e.clientX
                let clientY = touch ? touch.clientY : e.clientY
                this.startx = this.currentx = clientX
                this.starty = this.currenty = clientY
                let time = new Date()
                let diffTime = time - this.startTime
                if (diffTime < 300) {       //double click
                    if (this.scaled || this.x !== 0 || this.y !== 0) {
                        this.scaled = false
                        this.x = 0
                        this.y = 0
                        this.$refs.img.style.transform = "scale(1)"
                        this.$refs.imgBox.style.transform = "translate(0,0)"
                    } else {
                        this.scaled = true
                        this.scale = 2
                        this.$refs.img.style.transform = 'scale(' + this.scale + ')'
                    }
                    return
                } else {
                    this.startTime = time
                }
                this.$refs.imgBox.style.transition = "unset"
            },
            ontouchmove (e) {
                if (!this.inTouch) {
                    return
                }
                let touch = e.touches ? e.touches[0] : null
                let clientX = touch ? touch.clientX : e.clientX
                let clientY = touch ? touch.clientY : e.clientY
                this.currentx = clientX
                this.currenty = clientY
                let dx = this.currentx - this.startx
                let dy = this.currenty - this.starty
                this.$refs.imgBox.style.transform = `translate( ${this.x + dx}px, ${this.y + dy}px)`
            },
            ontouchend () {
                if (this.inTouch) {
                    this.inTouch = false
                    this.$refs.imgBox.style.transition = "all 0.3s ease"
                    this.x += this.currentx - this.startx
                    this.y += this.currenty - this.starty
                }
            },
            onwheelFunc (e) {
                this.scaled = true
                this.scale -= e.deltaY / 100;
                this.imageScale();
            },
            imageScale () {
                if (this.scale < 0.1) {
                    this.scale = 0.1;
                }
                if (this.scale > 100) {
                    this.scale = 100;
                }
                this.$refs.img.style.transform = "translate(" + (this.offx) + "px," + (this.offy) + "px)" + "scale(" + this.scale + ") ";
            }
        },
    }
</script>

<style scoped>
    .fadex-enter-active, .fadex-leave-active {
        transition: all 0.2s ease-out;
    }

    .fadex-enter {
        opacity: 0;
        /*transform: scale(0.5);*/
    }

    .fadex-leave-to {
        opacity: 0;
        /*transform: scale(0.5);*/
    }

</style>

<style scoped>
    .imgpreviewMask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
    }

    .imgpreviewDialog {
        width: 100%;
        height: 100%;
        position: relative;
        /*overflow: auto;*/
    }

    .imgpreviewDialog > .imgBox {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
    }

    .imgpreviewDialog > .imgBox > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: all 0.3s ease;
        /*pointer-events: none;*/
    }

    .closeBtn {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        /*background: rgba(200, 200, 200, 0.7);*/
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .closeBtn > i {
        background: #888;
        position: absolute;
        margin: 0;
    }

    .closeBtn > i:first-child {
        width: 2px;
        height: 60%;
        transform: rotate(45deg);
    }

    .closeBtn i:last-child {
        width: 60%;
        height: 2px;
        transform: rotate(45deg);
    }

</style>
