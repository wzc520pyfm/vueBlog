<template>
    <div class="article">
<!--        私信详情-->
        <div>
            <h3>与{{mail.toUser}}的对话</h3>
            <List style="text-align: left" item-layout="vertical">
                <ListItem v-for="item in mail.mail" :key="item.time">
                    <ListItemMeta :title="Date(item.time)" :description="item.text"/>
                </ListItem>
            </List>
        </div>
<!--        评论-->
        <div>
            <h3 style="text-align: left">评论</h3>
            <i-input v-model="mailText" type="textarea" :rows="4" placeholder="请输入..."></i-input>
            <br>  <br>
            <Button v-on:click="submitMail">提交</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Mail",
        components:{},
        data(){
            return {
                mail:{mail:[],toUser:''},
                mailText:'',
                id:''
            }
        },
        created:function(){
            if('id' in this.$route.params){
                let id=this.$route.params.id
                console.log(id)
                this.mail.toUser=id;
                // this.id=id;
                this.getMail(id)
            }
        },
        methods:{
            info(text){
                this.$Notice.info({
                    title:'提示',
                    desc:text
                });
            },
            //提交评论
            submitMail(){
                let sendData={
                    text:this.mailText
                }
                //toUser应该是用户名
                this.$api.post('users/user/mail/'+this.mail.toUser,
                sendData).then((res)=>{
                    if(res.code===0){
                        // console.log('ss'+this.id)
                        this.getMail(this.id)
                    }else{
                        this.info(res.message)
                    }
                })
            },
            getMail(id){
                //获取私信
                this.$api.get('users/user/mailGetter/'+id).then((res)=>{
                    if(res.code===0){
                        this.mail.mail=res.data
                        this.id=id
                    }else{
                        this.info(res.message)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .article {
        padding: 40px 10vw 40px 10vw;
    }

    .article h2 {
        padding: 20px;
    }
</style>