<template>
    <div class="bwa-dialog-warp">
        <div class="bwa-mask"></div>
        <div class="bwa-dialog">
            <div class="bwa-dialog-hd">
                <strong class="bwa-dialog-title" v-text="title"></strong>
            </div>
            <div class="bwa-dialog-bd">
                {{message}}
                <div v-if="!message">
                    <slot>
                        弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
                    </slot>
                </div>
            </div>
            <div class="bwa-dialog-ft">
                <a href="javascript:" v-if="showClearBtn" @click="onClearHandler" class="bwa-dialog-btn bwa-dialog-btn-clear">取消</a>
                <a href="javascript:" @click="onConfirmHandler" class="bwa-dialog-btn bwa-dialog-btn-confirm">确认</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{ 
        title:{
            type:String
        },
        message:{
            type:String
        },
        showClearBtn:{
            type:Boolean,
            default:false
        }
    },
    data() {
      return {}
    },
    mounted(){
        document.body.appendChild(this.$el);
    },
    methods:{
        onConfirmHandler(){
            this.$emit("on-confirm");
        },
        onClearHandler(){
            this.$emit("on-clear");
        }
    },
    destroyed(){
        document.body.removeChild(this.$el);
    }
}
</script>
<style scoped lang="less">
    @keyframes bwa-fade-in {
        0% {
            opacity:0;
            -webkit-transform:translate3d(0, 0%, 0);
            transform:translate3d(0, 0%, 0)
        }
        to {
            opacity:1;
            -webkit-transform:translate3d(0, -50%, 0);
            transform:translate3d(0, -50%, 0)
        }
    }
    .bwa-dialog-warp{
        position:fixed;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        z-index: 111;

        .bwa-mask {
            position: fixed;
            z-index: 1000;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(0,0,0,0.6);
        }

        .bwa-dialog {
            position: fixed;
            z-index: 5000;
            top: 50%;
            left: 16px;
            right: 16px;
            -webkit-transform: translate(0,-50%);
            transform: translate(0,-50%);
            background-color: #fff;
            text-align: center;
            border-radius: 12px;
            overflow: hidden;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-flex-direction: column;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            max-height: 90%;
            animation: bwa-fade-in 0.3s ease-out forwards;

            .bwa-dialog-hd {
                padding: 32px 24px 16px;

                .bwa-dialog-title {
                    font-weight: 700;
                    font-size: 17px;
                    line-height: 1.4;
                }
            }

            .bwa-dialog-bd {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                padding: 0 24px;
                margin-bottom: 32px;
                font-size: 17px;
                line-height: 1.4;
                word-wrap: break-word;
                -webkit-hyphens: auto;
                hyphens: auto;
                color: rgba(0,0,0,0.5);
            }

            .bwa-dialog-ft {
                position: relative;
                line-height: 56px;
                min-height: 56px;
                font-size: 17px;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;

                &:after {
                    content: " ";
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    height: 1px;
                    border-top: 1px solid rgba(0,0,0,0.1);
                    color: rgba(0,0,0,0.1);
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                }

                .bwa-dialog-btn {
                    display: block;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    flex: 1;
                    color: #576b95;
                    font-weight: 700;
                    text-decoration: none;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    position: relative;

                    &:after {
                        content: " ";
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 1px;
                        bottom: 0;
                        border-left: 1px solid rgba(0,0,0,0.1);
                        color: rgba(0,0,0,0.1);
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        -webkit-transform: scaleX(0.5);
                        transform: scaleX(0.5);
                    }

                    &.bwa-dialog-btn-clear{
                        color: rgba(0,0,0,0.9);
                    }
                }

            }
        }
    }

    @media screen and (min-width: 352px){
        .bwa-dialog {
            width: 320px;
            margin: 0 auto;
        }
    }
</style>