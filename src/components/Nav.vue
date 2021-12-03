<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="1">
<!--            icon+MySite-->
            <MenuItem name="1">
                <div class="main">
                    <Icon type="md-book"/>
                    <router-link to="/">
                        {{index}}
                    </router-link>
                </div>
            </MenuItem>

            <MenuItem v-for="item in menu" :name="item.name" :key="item.name">
                <router-link :to="item.src">
                    {{item.name}}
                </router-link>
            </MenuItem>
            <MenuItem name="2">
                <Dropdown v-if="userBtn">
                    <a href="javascript:void(0)">
                        用户:{{username}}
                        <Icon type="arrow-dowm-b"></Icon>
                    </a>
                    <Dropdown-menu slot="list">
                        <Dropdown-item>
                            <div v-on:click="goUrl('/userInfo/'+username)">个人信息</div>
                        </Dropdown-item>
                        <Dropdown-item>
                            <div v-on:click="goUrl('/mail')">我的私信</div>
                        </Dropdown-item>
                        <Dropdown-item>
                            <div v-on:click="goUrl('/collection')">我的收藏</div>
                        </Dropdown-item>
                        <Dropdown-item>
                            <div v-on:click="exit">退出</div>
                        </Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
                <router-link v-if="!userBtn" :to="{path:'/login'}">登录</router-link>
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                menu: [],
                index: 'MySite',
                theme1: 'light',
                userBtn: false,
                username: ''
            }
        },
        created() {
            //获取导航菜单
            this.$api.get('getNavMenu').then((res) => {
                //写数据
                this.menu = res.data
            })
            setInterval(()=>{
                console.log("轮询")
                //用户Token是否存在
                if(sessionStorage.getItem('token')){
                    this.userBtn=true
                    this.username=sessionStorage.getItem('username')
                }else{
                    this.userBtn=false
                }
            },3000)
        },
        updated() {

        },
        methods:{
            //用户退出
            exit(){
                console.log(sessionStorage.getItem('token'))
                sessionStorage.removeItem('token')
                console.log(sessionStorage.getItem('token'))
            },
            goUrl(url){
                this.$router.push({path:url})
            }
        }
    }
</script>

<style scoped>
    .main {
        font-weight: 600;
    }

    a {
        color: #2f2f2f;
    }
</style>