<template>
    <div class="Goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 在网页中,有两种跳转方式:
        1. 使用 a 标签的形式 叫做 标签跳转
        2. 使用 window.location.href 的形式,叫做 编程式导航 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull='false'></swiper>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>$2399</del> &nbsp;&nbsp;销售价:<span class="now_price">$2199</span>
                    </p>
                    <p>
                        购买数量: <numbox></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 分析:如何实现加入购物车的时候,拿到 选择的数量 -->
                        <!-- 经过分析:按钮属于goodsinfo页面,数字属于numbox组件 -->
                        <!-- 解决问题 -->
                    </p>
                </div>
            </div>
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数:</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:</p>
                    <p>库存情况:</p>
                    <p>上架时间:</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type='primary' size='large' plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type='danger' size='large' plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
    
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
// 导入数字选择框组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
    data(){
        return {
            id:this.$route.params.id, //将路由中的参数id挂载到data,方便后期调用
            lunbotu:[],//轮播图数据
            ballFlag:false, //控制小球显示和隐藏的标识符
            selectedCount:1, //保存用户选中商品的数量,默认用户购买一个
        }
    },
    methods:{
        getLunbotu(){
            this.$http.get("Vue2019/photos/photoInfoImg/"+this.id+".json").then(function(res){
                if(res.body.status === 0){
                    // 先循环轮播图数组的每一项,为 item 添加 img 属性,因为 轮播图 组件中,只认识 item.img
                    res.body.message.forEach(function(item,index){
                        item.url =item.src;
                        item.id = index;
                    })
                    this.lunbotu = res.body.message;
                }
            })
        },
        goDesc(id){
            // 点击使用编程式导航跳转到 图文介绍页面
            this.$router.push({name:'goodsdesc',params:{id}})
        },
        goComment(id){
            // 点击使用编程式导航跳转到 评论 页面
            this.$router.push({name:'goodscomment',params:{id}})
        },
        addToShopCar(){
            // 添加到购物车
            this.ballFlag = !this.ballFlag;
            // { id:商品的id,count:要购买的数量,price:商品的单价,selected:false }
            var goodsinfo = { 
                id:this.id,
                count:this.selectedCount,
                price:this.goodsinfo.now_price,
                selected:true 
                };
            debugger;
            // 调用 store 中的 mutations 来将商品加入购物车
            this.$store.commit("addToCar",goodsinfo);
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            /**
             * 小球动画优化思路
             * 1. 分析导致动画不准确的原因(代码局限某一分辨率小的滚动条未滚动的情况下);
             * 2. 只要分辨率和测试的时候不一样,或者滚动条有一定的滚动距离之后,问题就出现;
             * 3. 经过分析,得到结论:不能把 位置的距离写死,而是应该 根据不同情况,动态计算这个坐标值;
             * 4. 经过分析,得出解题思路:先得到 徽标的横纵坐标,再得到小球的横纵坐标,然后让y值求差,x值同理
             * 5. 如何获取徽标和小球的位置?? domObject.getBoundingClientRect();
             */
            // 1.获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 2.获取徽标在页面中的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();
         10   
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(0.4,-0.3,1,0.68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        }
    },
    created(){
        this.getLunbotu();
    },
    components:{
        swiper,
        numbox,
    }
}
</script>

<style lang="scss" scoped>
    .Goodsinfo-container{
        background-color: #ccc;
        overflow: hidden;
        padding: 0;
        margin: 0;
        .now_price{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 10px;
            }
        }
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 390px;
            left: 146px;
        }
    }
</style>
