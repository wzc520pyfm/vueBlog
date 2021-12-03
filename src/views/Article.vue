<template>
<!--    文章详情页-->
    <div class="article">
<!--        面包屑分类导航-->
        <div class="type">
            <Breadcrumb>
                <BreadcrumbItem to="/">
                    <Icon type="ios-home-outline"></Icon>
                    主页
                </BreadcrumbItem>
                <BreadcrumbItem to="/articles">
                    <Icon type="logo-buffer"></Icon>
                    全部文章
                </BreadcrumbItem>
                <BreadcrumbItem :to="{path:'/articleType', query:{type:article.type}}">
                    <Icon type="ios-body"></Icon>
                    {{article.typename}}
                </BreadcrumbItem>
                <BreadcrumbItem :to="'/article/'+article.a_id">
                    <Icon type="ios-body"></Icon>
                    {{article.title}}
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
<!--        显示小标签-->
        <div>
            <Tag v-for="item in article.tag" :key="item">
                <router-link :to="{path:'/articleType',query:{tag:item}}">
                    {{item}}
                </router-link>
            </Tag>
        </div>
<!--        文章详情-->
        <div>
            <h2>{{article.title}}</h2>
<!--            下方的Date对时间戳进行了格式化处理-->
            <p class="article-p">{{new Date(parseInt(article.time)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</p>
            <p class="article-p">作者:{{article.writer}} 浏览量:{{article.view}} 收藏:{{article.like}}</p>
<!--            显示HTML内容-->
            <div v-html="article.text" class="article-text"></div>
        </div>
<!--        增加用户相关的功能-->
<!--        收藏和点赞-->
        <div>
            <Button v-on:click="aLike(article.a_id,1)" type="info" ghost>
                <Icon type="ios-arrow-up"/>
                赞
            </Button>
            <Button v-on:click="aLike(article.a_id,0)" type="info" ghost>
                <Icon type="ios-arrow-down"/>
                踩
            </Button>
        </div>
<!--        收藏-->
        <span>
            <Button v-on:click="collection(article.a_id)" type="text">
                <Icon type="ios-heart"/>收藏
            </Button>
        </span>

<!--        评论详情-->
        <div class="type">
            <Divider/>
            <List item-layout="vertical">
                <ListItem v-for="talk in articleTalk" :key="talk.talk">
                    <ListItemMeta :title="talk.username" :description="new Date(parseInt(article.time)).toLocaleString().replace(/:\d{1,2}$/,' ')"/>
                    {{talk.talk}}
                </ListItem>
            </List>
        </div>
        <Talk :a_id="article.a_id"></Talk>
    </div>
</template>

<script>

    import Talk from '../components/Talk'

    export default {
        name: "Article",
        components:{
            Talk
        },
        data(){
            return {
                article:{},
                articleTalk:[]
            }
        },
        created:function () {
            if('id' in this.$route.params){
                let id=this.$route.params.id
                console.log(this.$route.params.id)
                //获取文章
                this.$api.get('getArticle/'+id).then((res)=>{
                    if(res.code===0){
                        this.article=res.data
                        console.log(this.article)
                    }else{
                        this.info(res.message)
                    }
                    //编写为方法,供子组件调用
                    this.getArticleTalk(id)
                })

                //判断用户是否看过该篇文章,如果是第一次看,则调用浏览量+1的API
                let view=localStorage.getItem('article_'+id)
                console.log(view)
                if(view){
                    //如果有数据则将数据+1
                    localStorage.setItem('article_'+id,parseInt(view)+1)
                }else{
                    //增加次数
                    this.$api.get('viewArticle/'+id).then((res)=>{
                        console.log(res)
                    })
                    localStorage.setItem('article_'+id,1)
                }
            }
        },
        methods:{
            info(text){
                this.$Notice.info({
                    title:'提示',
                    desc:text
                });
            },
            getArticleTalk(id){
                //获得所有评论
                this.$api.get('getArticleTalk/'+id).then((res)=>{
                    this.articleTalk=res.data
                    console.log(this.articleTalk)
                })
            },
            //收藏该文章
            collection(id){
                this.$api.get('users/user/save/'+id).then((res)=>{
                    this.info(res.message)
                })
            },
            //通过传递参数的不同进行"赞"和"踩"的判断
            aLike(id,like){
                if(localStorage.getItem('article_'+id+'_like')){
                    this.info('您已经进行过了选择')
                }else{
                    this.$api.get('users/user/like/'+id+'/'+like).then((res)=>{
                        this.info(res.message)
                        localStorage.setItem('article_'+id+'_like',1)
                    })
                }
            }
        },
    }
</script>

<style scoped>
    .type{
        text-align: left;
    }
    .article{
        padding:40px 10vw 40px 10vw;
    }
    .article-p{
        color:#ababab;
    }
    .article h2{
        padding:20px;
    }
    .article-text{
        padding: 20px 10vw 20px 10vw;
    }
</style>