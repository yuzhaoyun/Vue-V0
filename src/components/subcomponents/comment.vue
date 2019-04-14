<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(做多120字)" maxlength="120"></textarea>
        <mt-button type='primary' size='large'>发表评论</mt-button>
        <div class="comment">
            <div class="cmt-list" v-for="item in commentList" :key="item.add_time">
                <div class="cmt-title">
                    第一楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{item.content==='undefined'?'此用户未评论':item.content}}
                </div>
            </div>
        </div>
        <mt-button type='danger' size='large' plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            pageIndex:1, //默认展示第一页数据
            commentList:[]
        }
    },
    methods:{
        getComments(){
            this.$http.get('Vue2019/news/newsCommet/'+this.id+'.json').then(function(res){
                if(res.body.status===0){
                    // 每当获取新数据的时候,不要把老数数据覆盖,而是应该以老数据,拼接上新数据
                    this.commentList.push(...res.body.message);
                }else{
                    Toast('获取评论失败!')
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        }
    },
    props:['id'],
    created(){
        this.getComments();
    }
}
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85%;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            font-size: 13px;
            .cmt-title{
                background-color: #ccc;
                line-height: 35px;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>

