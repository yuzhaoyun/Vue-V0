<template>
   <h1>新闻详情 --- {{id}}</h1>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,// 将 url 地址中传递过来的 Id值,挂载到data上,方便后续调用
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

