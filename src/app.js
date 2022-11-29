/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2019-09-24 10:53:08
 * @LastEditors: Please set LastEditors
 */
/**
 *  @module app
 *  @requires vue
 *  @requires vuex-router-sync
 *  @requires store/index
 *  @requires router/index
 */
import 'stylesPath/css';
import 'babel-polyfill';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import router from 'routerPath/index';
import I18n from 'vue-i18n';
import store from 'storePath/index';
import App from 'viewsPath/App.vue';
import global from 'commonPath/global';
import moment from 'moment';
import md5 from 'md5';
import EN from './locale/en_US';
import libs from './libs';
import plugins from './plugins';


libs(Vue);
plugins(Vue);
Vue.use(I18n);

const i18n = new I18n({
  locale: EN.locale,
  messages: { [EN.locale]: EN },
});

Vue.prototype.GLOBAL = global; // 挂载到全局变量到Vue实例上面
Vue.prototype.$moment = moment;
Vue.prototype.$md5 = md5;

/* 计算屏幕高度 */
window.addEventListener('resize', () => {
  store.commit('app/updateWindowSize', window);
});

router.beforeEach((to, from, next) => {
  const auth = JSON.parse(localStorage.authB || '{}');
  if (to.name !== 'login') {
    if (!auth.token) {
      return next('/login');
    }
  }
  next();
  return true;
});

// 使用vuex管理 router状态
// 会在store上注册 `store.state.route`
sync(store, router);

new Vue({
  i18n,
  store,
  router,
  ...App,
}).$mount('#app');
