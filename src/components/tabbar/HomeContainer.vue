<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="1200">
            <!-- 在组件中,使用v-for循环的话,一定要使用key -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.url">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 到 六宫格 的改造工程-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu10.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">视屏专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu9.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            lunbotuList: [
                // { id: 1, url: "../../statics/images/1.jpg" },
                // { id: 2, url: "../../statics/images/2.jpg" },
                // { id: 3, url: "../../statics/images/3.jpg" }
            ]//保存轮播图的数组
        }
    },
    created() {
        this.getLunbotu();
    },
    methods: {
        getLunbotu() {  //获取轮播图数据的方法
            this.$http.get('../../statics/images').then(function (result) {
                var data = result.body;
                for (var i = 0; i < data.length; i++) {
                    var obj = {};
                    obj.id = i + 1;
                    obj.url = '../../statics/images/' + data[i]
                    this.lunbotuList.push(obj);
                }
                // Toast('加载轮播图Ok')
            })
        }
    }
}
</script>

 <style lang="scss" scoped>
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
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img{
      width: 60px;
      height: 60px;
  };
  .mui-media-body{
      font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0;
}

</style>
