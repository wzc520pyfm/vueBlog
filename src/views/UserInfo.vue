<template>
    <div v-if="userInfo.phone">
        <Row class="text-item">
            <i-col span="12">
                输入用户昵称:
            </i-col>
            <i-col span="12">
                <Input v-model="userInfo.nikename" :value="userInfo.nikename" placeholder="输入昵称" style="width: auto"/>
            </i-col>
        </Row>
        <Row class="text-item">
            <i-col span="12">
                输入电话:
            </i-col>
            <i-col span="12">
                <Input v-model="userInfo.phone" :value="userInfo.phone" placeholder="输入电话" style="width:auto"/>
            </i-col>
        </Row>
        <Row class="text-item">
            <i-col span="12">
                输入年龄:
            </i-col>
            <i-col span="12">
                <Input v-model="userInfo.age" v-bind:value="userInfo.age" placeholder="输入年龄" type="number" style="width: auto"/>
            </i-col>
        </Row>
        <br>
        <Button v-on:click="changeUserInfo">修改资料</Button>
        <Button v-on:click="showCPsd">修改密码</Button>
        <div v-show="changePsd">
            <Row class="text-item">
                <i-col span="12">
                    输入密码:
                </i-col>
                <i-col span="12">
                    <Input v-model="password" type="password" placeholder="输入密码" style="width: auto"/>
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">
                    再次输入密码:
                </i-col>
                <i-col span="12">
                    <Input v-model="repassword" type="password" placeholder="重新输入密码" style="width: auto"/>
                </i-col>
            </Row>
            <Button v-on:click="changeUserPsd">修改密码</Button>
        </div>
    </div>
    <div v-else>
        <Row class="text-item">
            <i-col span="12">
                用户名:
            </i-col>
            <i-col span="12">
                {{userInfo.username}}
            </i-col>
        </Row>
        <Row class="text-item">
            <i-col span="12">
                昵称:
            </i-col>
            <i-col span="12">
                {{userInfo.nikename}}
            </i-col>
        </Row>
        <Row class="text-item">
            <i-col span="12">
                年龄:
            </i-col>
            <i-col span="12">
                {{userInfo.age}}
            </i-col>
        </Row>
        <Row class="text-item">
            <i-col span="12">
                性别:
            </i-col>
            <i-col span="12">
                {{userInfo.sex}}
            </i-col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "Register",
        components:{},
        data(){
            return {
                userInfo:{},
                //是否显示修改密码框
                changePsd:false,
                password:'',
                repassword:''
            }
        },
        created:function () {
            if('username' in this.$route.params){
                this.$api.get('users/user/info/'+this.$route.params.username).then((res)=>{
                    if(res.code===0){
                        this.userInfo=res.data
                    }else{
                        this.$Notice.open({
                            title:'错误',
                            desc:'用户信息错误',
                            duration:5
                        })
                        if(res.code===403){
                            this.$router.push({path:"/login"})
                        }
                    }
                })
            }
        },
        methods:{
            showCPsd(){
                this.changePsd=true
            },
            //修改资料
            changeUserInfo(){
                //构造修改字符串
                let data={
                    nikename:this.userInfo.nikename,
                    age:this.userInfo.age,
                    phone:this.userInfo.phone
                }
                this.changeInfo(data)
            },
            //修改密码
            changeUserPsd(){
                if(this.repassword===this.password){
                    let data={password:this.password}
                    this.changeInfo(data)
                }else{
                    this.$Notice.info({
                        title:'提示',
                        desc:'两次输入不一致'
                    })
                }
            },
            //统一的提交方法
            changeInfo(data){
                this.$api.post('users/user/changeInfo',data).then((res)=>{
                    this.$Notice.info({
                        title:'提示',
                        desc:res.message
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .plane{
        padding:10vw 20vw;
    }
    .text-item{
        padding-top:10px;
    }
</style>