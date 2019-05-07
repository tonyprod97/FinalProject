import Vue from 'vue'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/spacelab/bootstrap.min.css'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import userService from './services/UserService';
import authService from './services/AuthService';
import SignForm from './components/sign-form/index'
import Home from './components/home/home'
import {loginProps,registerProps} from './constants/userForm'
import Error from './components/error/error'
import TablePage from './components/pages/table-page/index';
import ChartPage from './components/pages/chart-page/index';



Vue.use(Vuetify)

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: SignForm, props: loginProps },
  { path: '/register', component: SignForm, props: registerProps },
  { path:'/home', component: Home},
  { path:'/table', component: TablePage},
  { path:'/chart', component: ChartPage},
  
  { path:'/error', component: Error},
  { path:'/', redirect: '/home'},
  {path: '*', redirect:'/error'}
]


const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let user = authService.isUserLoggedIn();

  if(to.fullPath === '/login' || to.fullPath==='/register') {
    next();
    authService.logout();
    return;
  }
  if(user === null) {
    next('/login');
  } else {
    next();
  }
})

export const authEmitter = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
