// 入口文件
import Vue from 'vue';
import App from './App.vue';
// 导入全部的mint-UIz组件
// import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.use(MintUI);
// 按需导入mint-ui
import {Header} from 'mint-ui';
Vue.component(Header.name,Header)
// 引入mui的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

var vm=new Vue({
    el:"#app",
    render:c=>c(App)
})