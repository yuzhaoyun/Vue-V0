<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{ item.sell_price }}</span>
                    <span class="old">${{ item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩 {{ item.stock_quantity }} 件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中有两种跳转方式:
        1. 使用a标签的形式 叫做 标签跳转
        2. 使用 window.location.href 的形式,叫做 编程式导航  -->
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{ item.sell_price }}</span>
                    <span class="old">${{ item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩 {{ item.stock_quantity }} 件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodsList:[]
        }
    },
    methods:{
        getGoodsLsit(){
            /**
             * 获取商品列表
             */
            this.$http.get("Vue2019/goods/goodsList.json").then(function(res){
                if(res.body.status === 0){
                    this.goodsList = [...this.goodsList,...res.body.message];
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getGoodsLsit()
        },
        goDetail(id){
            // 使用JS的形式进行路由导航
            /**
             * 注意:一定要区分 this.$route 和 this.$router 这两个对象
             * 其中:this.$router 是路由参数对象,所有路由中的参数,params,query都属于它
             *      this.$router 是一个路由导航对象,用它 可以方便的 使用JS代码,实现 路由的前进,后退,跳转到新的url地址
             */
            // 1.最简单的
            // this.$router.push('/home/goodsinfo/'+id);
            // 2.传递对象
            // this.$router.push({path:'/home/goodsinfo/'+id})
            // 3.传递命名的路由
            this.$router.push({name:"goodsinfo",params:{id}})
        }
    },
    created(){
        this.getGoodsLsit();
    }
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 182px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>

