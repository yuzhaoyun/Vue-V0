<template>
    <div>
        <!-- 顶部区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <li v-for="item in list" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="infoTitle">{{item.title}}</h1>
                    <div class="infoBody">{{item.zhaiyao}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// 导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js';
// 
import { Lazyload } from 'mint-ui'
// // 初始化滑动空间
// mui('.mui-scroll-wrapper').scroll({
//     deceleration:0.0005  //flick 减速系数,系数越大,滚动速度越慢,滚动距离越小,默认值0.0006
// })
export default {
    data() {
        return {
            cates: [], //所有分类的列表数组
            list: []
        }
    },
    mounted() {  //当 组件中的DOM结构被渲染好并放到页面中后,会执行这个构造函数
        // 如果要操作元素,最好在 mounted 里面,因为 这里的时候 DOM 元素是最新的
        // 初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005  //flick 减速系数,系数越大,滚动速度越慢,滚动距离越小,默认值0.0006
        })
    },
    methods: {
        getAllCategory() {
            // 获取所有的图片分类
            this.$http.get('Vue2019/photos/photplist.json').then(function (res) {
                if (res.body.status === 0) {
                    // 手动拼接处一个最完整的列表,分类列表
                    res.body.message.unshift({ title: "全部", id: 0, img_url: '' });
                    this.cates = res.body.message;
                } else {
                    Toast('获取图片失败!')
                }
            })
        },
        getPhotoList(id) {
            // 根据分类id获取图片列表
            this.$http.get('Vue2019/photos/images.json').then(function (res) {
                if (res.body.status === 0) {
                    this.list = res.body.message;
                }
            })
        }
    },
    created() {
        this.getAllCategory();
        // 默认进入页面就主动请求 所有图片数据
        this.getPhotoList();
    }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img{
        width: 100%;
        // height: 100%;
        padding: 10px;
        vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
        color: #fff;
        text-align: left;
        position: absolute;
        bottom: 0;
        max-height: 64px;
        padding: 10px;
        background-color: rgba($color: #000000, $alpha: 0.4);
        .infoTitle{
            font-size: 14px;
        }
        .infoBody{
            font-size: 13px;
        }
    }
  }
}
</style>

