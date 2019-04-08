<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="800">
            <!-- 在组件中,使用v-for循环的话,一定要使用key -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.url">
            </mt-swipe-item>
        </mt-swipe>
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
        getLunbotu(){  //获取轮播图数据的方法
            this.$http.get('../../statics/images').then(function(result){
                var data=result.body;
                for(var i=0;i<data.length;i++){
                    var obj={};
                    obj.id=i+1;
                    obj.url='../../statics/images/'+data[i]
                    this.lunbotuList.push(obj);
                }
                Toast('加载轮播图Ok')
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

    img{
        width: 100%;
        height: 100%;
    }
  }
}
</style>
