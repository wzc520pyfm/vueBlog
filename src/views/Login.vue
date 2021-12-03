<template>
    <div class="plane">
        <h2>登录</h2>
        <br><br>
        <row>
            <Input v-model="username" prefix="ios-contact" placeholder="输入用户名" style="width:auto"/>
        </row>
        <br>
        <row>
            <Input v-model="password" icon="ios-clock-outline" type="password" placeholder="输入密码" style="width: auto"/>
        </row>
        <br>
        <Button v-on:click="login" type="primary">用户登录</Button>
        <Button v-on:click="register">用户注册</Button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        components:{},
        data(){
            return {
                password:'',
                username:''
            }
        },
        created:function () {

        },
        methods:{
            login(){
                let data={
                    password:this.password,
                    username:this.username
                }
                this.$api.post('users/login',data).then((res)=>{
                    console.log(res.data)
                    this.$Notice.info({
                        title:'提示',
                        desc:res.message
                    });
                    if(res.code===0){
                        sessionStorage.setItem('token',res.data.token)
                        sessionStorage.setItem('username',this.username)
                        this.$router.push({path:'/'})
                    }else{
                        sessionStorage.removeItem('token')
                    }
                })
            },
            register(){
                this.$router.push({path:'register'})
            }
        }
    }
</script>

<style scoped>
    .plane{
        padding: 10vw 20vw;
    }
</style>