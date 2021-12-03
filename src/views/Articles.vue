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
                listTitle:'所有文章'
            }
        },
        created:function(){
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
</script>

<style scoped>

</style>