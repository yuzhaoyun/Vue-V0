// 1. 导入vue-router包
import VueRouter from 'vue-router'

// 导入对应的组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue';
import Newsinfo from './components/news/Newsinfo.vue';
import Photolist from './components/photos/Photolist.vue';
import Photoinfo from './components/photos/Photoinfo.vue';
import Goodslist from './components/goods/goodslist.vue';
import Goodsinfo from './components/goods/Goodsinfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsComment from './components/goods/GoodsComment.vue';


// 3. 创建路由对象
var router = new VueRouter({
    routes: [  //配置路由规则
        {path:'/',component:HomeContainer},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsInfo/:id',component:Newsinfo},
        {path:'/home/photolist',component:Photolist},
        {path:'/home/photo/photoinfo/:id',component:Photoinfo},
        {path:'/home/goodslist',component:Goodslist},
        {path:'/home/goodsinfo/:id',component:Goodsinfo,name:"goodsinfo"},
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
    ],
    linkActiveClass:'mui-active'  //覆盖默认的router-link-active
})

export default router;