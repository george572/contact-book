import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false
import "./assets/css/main.scss";

new Vue({
  render: h => h(App),
}).$mount('#app')
