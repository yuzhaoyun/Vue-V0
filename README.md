# 这是一个NB的项目

## NB基础项目代码

### 我们是有灵魂的程序员,所以,我们的代码精益求精,且富有诗意

##[开源协议之间的区别:]
(https://www.zhihu.com/question/19568896)

## 用(传统方式)命令行把修改过后的代码上传到码云
1. git add .
2. git commit -m "提交信息"
3. git push

#测试

##用(传统方式)把修改后的代码上传导github??
*1.git add .
*2.git commit -m "提交信息"
*3.git push

##制作首页App组件
1.完成Header区域,使用的是Mint-UI中的Header组件
2.制作底部的tabbar区域,使用的是MUI的Tabbar.html
    +在制作 购物车 小图标的时候,操作会相对多一些
    +先把 扩展图标的 css 样式,拷贝到项目中
    +拷贝 字体库 ttf文件,到项目中
    +为 购物车 小图标,添加如下样式 `mui-icon-extra mui-icon-extra-cart`
3.要在中间区域放置一个router-view来展示路由破匹配到的组件

##改造tabbar为router-link

##设置路由高亮

##点击 tabbar 中的路由连接,展示对应的路由组件

##制作首页轮播图布局


##加载首页轮播图数据
1.获取数据,如何获取呢,使用vue-resource
2.使用vue-resource的this.$http.get 获取数据
3.获取到的数据要保存到data身上.
4.使用v-for循环渲染每个item项


##改造 九宫格 区域的样式


##改造 新闻资讯 路由链接

##新闻资讯 页面 制作
1.绘制界面, 使用MUI中的 media-list.html
2.使用vue-resource获取数据
3.渲染真实数据

##实现 新闻资讯列表点击,跳转到新闻详情
1.把列表中的每一项改造为router-link,同时,在跳转的时候应该提供唯一的id标识符
2.创建新闻详情的组件页面 NewsInfo.vue
3.在 路由模块中,将 新闻详情的 路由地址 和 组件对应起来