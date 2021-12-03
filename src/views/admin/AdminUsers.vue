<template>
    <div>
<!--        用户管理-->
        <div class="list-manger">
            <row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="15">
                    <List>
                        <ListItem v-for="item in list" :key="item.id" class="item">
                            <ListItemMeta :title="item.username" :description="'ip地址:'+item.ip"/>
                            <template slot="action">
                                <li>
                                    <Button v-on:click="online(item.username)">
                                        {{item.login==0?'封停':'解封'}}
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
        name: "AdminUsers",
        components:{},
        data(){
            return {
                list:[]
            }
        },
        created:function(){
            this.getUsers()
        },
        methods:{
            online(username){
                this.$api.get('admin/stopLogin/'+username).then((res)=>{
                    this.$Notice.info({
                        title:'提示',
                        desc:res.message
                    })
                    this.getUsers()
                })
            },
            getUsers(){
                //获取所有用户
                this.$api.get('admin/getAllUser').then((res)=>{
                    this.list=res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>

