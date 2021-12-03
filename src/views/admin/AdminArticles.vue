<template>
    <div>
<!--        文章列表-->
        <div class="list-manger">
            <row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="15">
                    <List>
                        <ListItem v-for="item in list" :key="item.id" class="item">
                            <ListItemMeta :title="item.title" :description="Date(item.date)"/>
                            <template slot="action">
                                <li>
                                    <Button v-on:click="online(item.id)">
                                        {{item.show==0?'上线':'下线'}}
                                    </Button>
                                </li>
                            </template>
                        </ListItem>
                    </List>
                </i-col>
            </row>
        </div>
    </div>
</template>

<script>

    export default {
        name: "AdminArticles",
        components:{},
        data(){
            return {
                list:[],
                listTitle:''
            }
        },
        created:function(){
            this.getArticles()
        },
        methods:{
            online(id){
                let data={a_id:id}
                this.$api.post('admin/showArticle',data).then((res)=>{
                    this.$Notice.info({
                        title:'提示',
                        desc:res.message
                    })
                    this.getArticles()
                })
            },
            getArticles(){
                //获取所有文章
                this.$api.get('getNewArticle').then((res)=>{
                    let tData=[]
                    res.data.map((item)=>{
                        if(item.id!==0){
                            tData.push(item)
                        }
                    })
                    this.list=tData
                })
            }
        }
    }
</script>

<style scoped>
    .list-manger{
        text-align: left;
    }
</style>