<template>
    <transition name="fadex">
        <div class="imgpreviewMask" v-show="isShow">
            <div class="imgpreviewDialog" @touchstart.prevent.stop="ontouchstart" @touchmove.prevent.stop="ontouchmove" @touchend="ontouchend">
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
                this.$refs.img.style.transform = "scale(1)"
                this.$refs.imgBox.style.transform = "translate(0,0)"
                this.isShow = false
                this.scaled = false
                this.x = 0
                this.y = 0
            },
            ontouchstart (e) {
                let touch = e.touches[0]
                this.startx = this.currentx = touch.clientX
                this.starty = this.currenty = touch.clientY
                let time = new Date()
                let diffTime = time - this.startTime
                if (diffTime < 300) {
                    if (this.scaled) {
                        this.scaled = false
                        this.x = 0
                        this.y = 0
                        this.$refs.img.style.transform = "scale(1)"
                        this.$refs.imgBox.style.transform = "translate(0,0)"
                    } else {
                        this.scaled = true
                        this.$refs.img.style.transform = 'scale(2)'
                        // this.$refs.img.style.transition = "unset"
                    }
                    return
                } else {
                    this.startTime = time
                }
                this.$refs.imgBox.style.transition = "unset"
            },
            ontouchmove (e) {
                if (!this.scaled) {
                    return
                }
                let img = this.$refs.imgBox
                let touch = e.touches[0]
                this.currentx = touch.clientX
                this.currenty = touch.clientY
                let dx = this.currentx - this.startx
                let dy = this.currenty - this.starty
                img.style.transform = `translate( ${this.x + dx}px, ${this.y + dy}px)`
            },
            ontouchend () {
                if (!this.scaled) {
                    // this.$refs.img.style.transition = "all 0.3s ease"
                    return
                }
                this.$refs.imgBox.style.transition = "all 0.3s ease"
                this.x += this.currentx - this.startx
                this.y += this.currenty - this.starty
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
        background: rgba(200, 200, 200, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .closeBtn > i {
        background: #fff;
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
