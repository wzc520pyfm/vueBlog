<template>
<!--    文章编辑页面-->
    <div class="article_writer">
        <div class="item">
            <h3>文章名称</h3>
            <Input v-model="title" style="width: 300px" placeholder="输入文章名称"/>
        </div>
        <div class="item">
            <h3>文章作者</h3>
            <Input v-model="writer" style="width: 300px" placeholder="输入文章作者"/>
        </div>
        <div class="item">
            <h3>文章分类</h3>
            <Select v-model="type" style="width: 200px">
                <Option v-for="item in articleType" :value="item.uid" :key="item.uid">{{item.name}}</Option>
            </Select>
        </div>
        <div class="item">
            <h3>文章小标签</h3>
            <Input v-model="tag" style="width: 300px" placeholder="使用空格进行分割"/>
        </div>
<!--        文章详情-->
        <div>
            <h3 style="text-align: left">文章详情</h3>
            <editor id="tinymce" v-model="text" :init="init"></editor>
            <br>  <br>
            <Button v-on:click="submission">提交</Button>
        </div>
    </div>
</template>

<script>
    //使用富文本编辑器,与其他组件一样需要在components中声明
    //使用方法与其他组件一样--作为标签
    import tinymce from 'tinymce/tinymce'//tinymce默认hidden，不引入则不显示编辑器
    import Editor from '@tinymce/tinymce-vue'//引入tinymce编辑器
    import 'tinymce/themes/silver/theme'//编辑器主题，不引入则报错
    import 'tinymce/icons/default'//引入编辑器图标icon，不引入则不显示对应图标
    export default {
        name: "WriterArticle",
        components:{
            Editor
        },
        data(){
            return {
                text:'',
                title:'',
                type:'',
                tag:'',
                writer:'',
                //类别
                articleType:[],
                //初始化配置
                init:{
                    selector:'textarea',//change this value according to your HTML
                    plugin:'a_tinymce_plugin',
                    a_plugin_option:true,
                    skin_url:"/tinymce/skins/ui/oxide",//skin路径
                    height:300,//编辑器高度
                    branding:false,//是否禁用"Powered by TinyMCE"
                }
            }
        },
        mounted() {
            tinymce.init({})
        },
        created:function(){
            //获取所有分类
            this.$api.get('users/user/articleType').then((res)=>{
                //写数据
                this.articleType=res.data
            })
        },
        methods:{
            info(text){
                this.$Notice.info({
                    title:'提示',
                    desc:text
                });
            },
            //文章提交方法
            submission(){
                let data={
                    title:this.title,
                    writer:this.writer,
                    text:this.text,
                    type:parseInt(this.type),
                    tag:this.tag.split(" ")
                }
                this.$api.post('admin/setArticle',{article:data}).then((res)=>{
                    //写数据
                    this.info(res.message)
                })
            }
        },
    }
</script>

<style scoped>
    .article_writer{
        padding:40px 10vw 40px 10vw;
        text-align: left;
    }
    .article_writer .item{
        padding-bottom: 20px;
    }
    .article h2{
        padding: 20px;
    }
</style>