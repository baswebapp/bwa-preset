<template>
    <div class="bwa-page-warp" :style="styles">
        <slot>我是页面内容</slot>
    </div>
</template>
<script>
export default {
    props: {
        backgroundColor: {
            type: String,
            default: "",
        },
        backgroundImage: {
            type: String,
            default: "",
        },
        contentWidth:{
            type:Number,
            default:750
        },
        contentHeight:{
            type:Number,
            default:1218
        }
    },
    data() {
        return {
            styles: {
                backgroundColor: this.backgroundColor,
                backgroundImage: this.backgroundImage,
            },
        };
    },
    methods: {},
};
</script>
<style scoped lang="less">
    .bwa-page-warp{
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>