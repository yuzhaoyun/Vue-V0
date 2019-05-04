<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="1200">
            <!-- 在组件中,使用v-for循环的话,一定要使用key -->
            <!-- 将来,谁使用此 轮播图 组件,谁为我们传递 lubotuList -->
            <!-- 此时,lunbotuList 应该是 父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.url">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:["lunbotuList"]
}
</script>

<style lang="scss">
    .mint-swipe {
        height: 200px;
            /*scss语法写法*/
        .mint-swipe-item {
            &:nth-child(1) {
            background-color: red;
            }
            &:nth-child(2) {
            background-color: blue;
            }
            &:nth-child(3) {
            background-color: yellow;
            }
            img {
            width: 100%;
            height: 100%;
            }
        }
} 
</style>
