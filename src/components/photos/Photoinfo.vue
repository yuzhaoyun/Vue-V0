<template>
    <div class="photoinfo-container">
        <h3>{{photoInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间: {{photoInfo.add_time | dateFormat }}</span>
            <span>点击: {{ photoInfo.click }}次 </span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item,index) in list" :key="item.src" :src="item.src" height="100" @click="$preview.open(index,list)">
        </div>
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoInfo.content"></div>
        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
// 导入评论子组件
import comment from "../subcomponents/comment.vue"

export default {
    data(){
        return {
            id:this.$route.params.id,  //从路由中获取到的图片id
            photoInfo:{}, //图片详情
            list:[], // 缩略图数组
        }
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("Vue2019/photos/photoInfo/"+this.id+".json").then(function(res){
                if(res.body.status===0){
                    this.photoInfo=res.body.message[0];
                }
            })
        },
        getThumbs(){
            // 获取缩略图
            this.$http.get("Vue2019/photos/photoInfoImg/"+this.id+".json").then(function(res){
                if(res.body.status === 0){
                    // 循环每个图片数据,不全图片的宽和高
                    res.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                    });
                    // 把完整的数据保存到list中
                    this.list = res.body.message;
                }
            })
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    components:{
        "cmt-box":comment
    }
}
</script>

<style lang="scss">
.photoinfo-container{
    padding: 3px;
    h3{
        font-size: 15px;
        color: #26A2FF;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
        img{
            margin: 10px;
            box-shadow: 0 0 8px #999;
        }
    }
}
</style>

