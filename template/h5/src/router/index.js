import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/index.vue';
import { loadImage } from '../utils';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
];

const statics = {
  home:[]
}; 


const router = new VueRouter({
  mode: 'hash',//history
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if(statics[to.name] && statics[to.name].length){
    //预加载来一波loading
    Promise.all(statics[to.name].map(loadImage)).then(()=> {
      statics[to.name] = [];
      next();
    });
  }
  else{
    next();
  }

});



export default router
