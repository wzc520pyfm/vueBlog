<template>
    <div>
<!--        文章列表-->
        <div class="article-list">
            <row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="24">
                    <article-list :list="list" :title="listTitle">

                    </article-list>
                </i-col>
            </row>
        </div>
    </div>
</template>

<script>
    import ArticleList from "../components/ArticleList";
    export default {
        name: "Home",
        components: {ArticleList},
        data(){
            return {
                list:[],
                listTitle:'收藏文章'
            }
        },
        created:function () {
            //获取所有收藏的文章
            this.$api.get('users/user/saveList').then((res)=>{
                let tData=[]
                console.log('看这里'+res.data)
                res.data.map((item)=>{
                    if(item.a_id!==0){
                        tData.push({id:parseInt(item.a_id),title:item.title})
                    }
                })
                this.list=tData
            })
        }
    }
</script>

<style scoped>

</style>