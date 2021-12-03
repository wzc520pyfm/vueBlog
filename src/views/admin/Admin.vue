<template>
<!--    导航抽屉-->
    <div>
        <Drawer title="用户管理菜单" placement="left" :closable="false" v-model="value2">
            <p v-on:click="goUrl('article')">文章编写</p>
            <p v-on:click="goUrl('type')">类型管理</p>
            <p v-on:click="goUrl('articles')">文章管理</p>
            <p v-on:click="goUrl('indexChange')">主页管理</p>
            <p v-on:click="goUrl('users')">用户管理</p>
        </Drawer>
        <Button class="admin-btn" @click="value2=true" type="primary">导航菜单</Button>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "App",
        components:{},
        data(){
            return {
                value2:true
            }
        },
        methods:{
            goUrl(url){
                this.$router.push({path:'/admin/'+url})
            }
        }
    }
</script>

<style scoped>
    .admin-btn{
        position:fixed;
        right:10vw;
        top:30vh;
        z-index: 999;
    }
</style>