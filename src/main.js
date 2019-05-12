// 入口文件
import Vue from 'vue';
import App from './App.vue';

// 1.1导入路由的包
import VueRouter from 'vue-router';
// 1.2安装路由
Vue.use(VueRouter);

// 导入格式化时间的插件
import moment from 'moment';
// 定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
})

// 2.1导入vue-resource
import VueResource from 'vue-resource';
// 2.2安装vue-resource
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root='http://127.0.0.1'
// 全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

// 导入全部的mint-UIz组件
import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';
// 按需导入mint-ui
/*import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);
Vue.use(Lazyload);*/

//引入并安装vue-preview(图片预览插件)
import preview from "vue-preview";
Vue.use(preview);
// Vue.use(preview, {
//     mainClass: 'pswp--minimal--dark',
//     barsSize: {top: 0, bottom: 0},
//     captionEl: false,
//     fullscreenEl: false,
//     shareEl: false,
//     bgOpacity: 0.85,
//     tapToClose: true,
//     tapToToggleControls: false
//   })


// 引入mui的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
// 1.3导入自己的router.js路由模块
import router from './router.js';

// 配置vuex的步骤
/**
 * 1.装包 npm i vuex -S
 * 2.导入包
 * 3.注册包
 * 4.实例化一个实例,得到一个 数据仓储对象
 * 5.将 vuex 创建的 store 挂载到 VM 实例上
 */
import Vuex from "vuex";
Vue.use(Vuex);

// 每次刚进入网站,肯定会 调用 main.js 在刚调用的时候,先从本地存储中把数据读出来,放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]');


var store = new Vuex.Store({
    state:{
        // 可以把 state 理解成组件中的 data(专门用来存储数据)
        // 如果想在 组件中,想要访问,store 中的数据,只能通过 this.$store.state.*** 来访问
        count:0,
        car:car,// 将 购物车中的数据,用一个数组存储起来,在car数据中存储一些商品的对象
    },
    mutations:{
        // 可以把 mutations 理解成组件中的 methods
        // 注意:如果要操作 store 中的 state 值,只能通过 mutations 提供的方法,才能操作对应的数据,不推荐操作
            // state中的数据,因为 万一导致了数据的紊乱,不能快速定位到错误的原因
        increment(state){
            // 注意:mutations 的 函数参数列表中,最多支持两个参数,其中:参数1:是state状态,参数2:提交过来的参数
            state.count++
        },
        addToCar(state,goodinfo){
            // 点击加入购物车,把商品信息,保存到 store 中的 car 上
            /**
             * 1.如果购物车中,之前就有这个对应的商品了,那么,只需要更新数量
             * 2.如果没有则直接把商品数据push到car中
             */

            // 假设 在购物车中,没有找到对应的商品
            var flag = false;
            state.car.some(item=>{
                if(item.id == goodinfo.id){
                    item.count += parseInt(goodinfo.count);
                    flag = true;
                    return true;
                }
            })
            // 如果最终,循环完毕,得到的flag还是false,则把商品数据直接push到购物车中
            if(!flag){
                state.car.push(goodinfo);
            }
            
            // 当 更新 car 之后,把 car 数组,存储到 本地的 localStorage 中
            localStorage.setItem("car",JSON.stringify(state.car));

        }
        // 注意:如果 组件想要调用mutations 中的方法,只能使用 this.$store.commit('方法名')
        // 这种调用 mutations 方法的格式,和 this.$emit('父组件中的方法名')
    },
    getters:{
        // 相当于 计算属性,也 相当于 filters
        // 注意 getters 只负责提供数据,不负责 修改数据,如果想要修改 state 中的数据,请去找motation
        optCount:function(state){
            return "当前新的count值是:"+state.count;
        },
        // 经过对比,发现 getters 中的方法,和组件中的过滤器比较类似,因为 过滤器和getters都没有原数据
        // 其次 getters也和 computed 比较像,只要state中数据发生变化,那么,如果 getters 正好引用了这个数据,那么就会立即出发 getters 的重新求值
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
                c += item.count;
            })
            return c;
        }
    }
    /**
     * 总结:
     * 1.state中的数据,不能直接修改,如果要修改,必须通过 mutations
     * 2.如果组件想要直接 从state 上获取数据,需要从 this.$store.state.*** 获取
     * 3.如果 组件想要修改数据,必须使用 mutation 提供的方法,需要通过 this.$store.commit("方法名",唯一的参数)
     * 4.如果 store 中的 state 上的数据,对外提供的时候,需要做一层包装,推荐使用getters
     *  如果需要使用getters,则使用 this.$store.getters.***
     */
}) 

var vm=new Vue({
    el:"#app",
    render:c=>c(App),
    // 1.4挂载路由对象到实例上
    router,
    // 只要挂载到了 VM 上,任何组件都能使用store来存取数据
    store
})