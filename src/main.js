// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import qs from 'qs'
import App from './App'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
//全局注册axios
Vue.prototype.axios = axios;
        //正式
       // Vue.prototype.HOST = 'http://baochen.irzhd.com/';
       //测试
       Vue.prototype.HOST = 'http://baochencs.irzhd.com/';
        //本地
        // Vue.prototype.HOST = '/api/';
 Vue.prototype.$qs = qs;
 axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.use(VueRouter);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
