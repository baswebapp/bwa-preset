<template>
    <page class="home">
        this is home
    </page>
</template>
<script>
import Page from '@c/page';
export default {
    data() {
      return{}
    },
    created(){
       
    },
    methods:{},
    components:{ Page }
}
</script>
<style scoped lang="less">

.home{
    .content{
        width: 100%;
        position: relative;
        img{
            width: 100%;
        }
    }

    .next-btn{
        padding-top: 4%;
        text-align: center;
        img{
            width: 79%;
        }
    }
}

</style>