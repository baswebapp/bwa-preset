import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
let _resize = (window.onresize = () => {
  window.document.documentElement.style.fontSize = (screen.availWidth / 750) + "px";
});
_resize();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
