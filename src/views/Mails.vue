<template>
    <div class="article">
<!--        私信详情-->
        <div class="type">
            <Divider/>
            <List item-layout="vertical">
                <ListItem v-for="mail in mails" :key="mail.m_id">
<!--                    下面的本来是...+mail.m_id-->
                    <router-link :to="/mailGetter/+mail.m_id">
                        <ListItemMeta title="私信" :description="mail.users[1]+'与'+mail.users[0]"/>
                    </router-link>
                </ListItem>
            </List>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Mails",
        components:{},
        data(){
            return {
                mails:[]
            }
        },
        created:function () {
            //获取文章
            this.$api.get('users/user/mailsGet').then((res)=>{
                if(res.code===0){
                    this.mails=res.data
                }else{
                    this.info(res.message)
                }
            })
        },
        methods:{
            info(text){
                this.$Notice.info({
                    title:'提示',
                    desc:text
                });
            },
            getArticleTalk(id){
                //获取所有评论
                this.$api.get('getArticleTalk/'+id).then((res)=>{
                    this.articleTalk=res.data
                    console.log(this.articleTalk)
                })
            }
        },
    }
</script>

<style scoped>
    .type {
        text-align: left;
    }

    .article {
        padding: 40px 10vw 40px 10vw;
    }

    .article-p {
        color: #ababab;
    }

    .article h2 {
        padding: 20px;
    }

    .article-text {
        padding: 20px 10vw 20px 10vw;
    }
</style>