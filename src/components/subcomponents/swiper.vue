<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="1200">
            <!-- 在组件中,使用v-for循环的话,一定要使用key -->
            <!-- 将来,谁使用此 轮播图 组件,谁为我们传递 lubotuList -->
            <!-- 此时,lunbotuList 应该是 父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.url" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- 商品详情页面中的轮播图,期望 高度是100%, 宽度为 自适应 -->

</template>

<script>
export default {
    props:["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
            /*scss语法写法*/
        .mint-swipe-item {
            text-align: center;
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
.full{
    width: 100%;
}
</style>
