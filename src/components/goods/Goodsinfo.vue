<template>
    <div class="Goodsinfo-container">
        <!-- 在网页中,有两种跳转方式:
        1. 使用 a 标签的形式 叫做 标签跳转
        2. 使用 window.location.href 的形式,叫做 编程式导航 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id, //将路由中的参数id挂载到data,方便后期调用
            lunbotu:[],//轮播图数据
        }
    },
    methods:{
        getLunbotu(){
            this.$http.get("Vue2019/photos/photoInfo/"+this.id+".json").then(function(res){
                if(res.body.status === 0){
                    this.lunbotu = res.body.message;
                }
            })
        }
    },
    created(){
        this.getLunbotu();
    }
}
</script>

<style lang="scss" scoped>
    .Goodsinfo-container{
        background-color: #ccc;
        overflow: hidden;
    }
</style>
