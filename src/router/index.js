import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Index from '../views/Index'
import Articles from "../views/Articles";
import ArticleType from '../views/ArticleType'
import Article from "../views/Article";
import Login from '../views/Login'
import Register from '../views/Register'
import UserInfo from '../views/UserInfo'
import Mails from '../views/Mails'
import Mail from '../views/Mail'
import Admin from '../views/admin/Admin'
import WriterArticle from "../views/admin/WriterArticle";
import AdminArticles from "../views/admin/AdminArticles";
import AdminUsers from "../views/admin/AdminUsers";
import Collection from "../views/Collection";
import indexChange from "../views/admin/indexChange";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path:'/articles',
    name:'Articles',
    component: Articles
  },
  {
    path:'/ArticleType',
    name:'ArticleType',
    component: ArticleType
  },
  {
    path: '/article/:id',
    name:'/Article',
    component: Article
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path:'/register',
    name:'Register',
    component: Register
  },
  {
    path:'/userInfo/:username',
    name:'UserInfo',
    component: UserInfo
  },
  {
    path:'/mail',
    name:'Mails',
    component: Mails
  },
  {
    path:'/mailGetter/:id',
    name:'Mail',
    component: Mail
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },
  {
    //符号admin路径的所有URL都使用组件Admin
    path:'/admin',
    component: Admin,
    children:[
      {
        //当 /admin匹配成功在进行匹配
        path:'article',
        component:WriterArticle,
      },
      {
        path: 'articles',
        component: AdminArticles,
      },
      {
        path: 'users',
        component: AdminUsers
      },
      {
        path: 'indexChange',
        component: indexChange
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
