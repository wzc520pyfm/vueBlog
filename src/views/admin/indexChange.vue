<template>
<!--    主页管理-->
    <div>
        <h3>首页轮播图片:</h3>
        <Row class="item-text">
            <i-col span="12">
                已使用的图片Uri地址:
            </i-col>
        </Row>
        <Row class="item-text">
            <i-col span="15">
                <List  style="text-align: center;">
                    <ListItem v-for="item in list" :key="item.id">
                        <ListItemMeta :title="item.img"/>
                            <template>
                                <li>
                                    <Button v-on:click="online(item.id)">
                                        {{ item.show==0?'上线':'下线'}}
                                    </Button>
                                </li>
                            </template>
                    </ListItem>
                </List>

            </i-col>
        </Row>
        <Row class="item-text">
            <i-col span="12">
                输入新增图片uri地址:
            </i-col>
            <i-col span="12">
                <Input v-model="img" placeholder="输入图片外链" style="width: auto"/>
                <Button v-on:click="upPic" style="margin-left: 10px">
                    新增
                </Button>
            </i-col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "IndexArticle",
        data(){
            return {
                img:'',
                list:[]
            };
        },
        created:function(){
            this.getIndexPic()
        },
        methods:{
            online(id){
              let data={a_id:id}
              console.log("发送的数据"+data.a_id)
              this.$api.post('admin/changeIndexPic',data).then((res)=>{
                  this.$Notice.info({
                        title:'提示',
                        desc:res.message
                  })
                  this.getIndexPic()
              })
            },
            upPic(){
                let data={img:this.img}
                console.log("新上传的图片外链"+data.img)
                this.$api.post('admin/pushIndexPic',data).then((res)=>{
                    this.$Notice.info({
                        title:'提示',
                        desc:res.message
                    })
                    this.getIndexPic()
                })
            },
            getIndexPic(){
                this.$api.get('getIndexPic').then((res)=>{
                    this.list=res.data
                    console.log("getPoc在这里:"+this.list)
                })
            }
        }
    }
</script>

<style scoped>
    .item-text{
        padding-top: 10px;
    }
</style>