/*
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2022-04-27 16:24:12
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-cli2-pc\src\store\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import modules from './modules';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      paths: ['app.userInfo'],
    }),
  ], // 默认存储到本地local Storage里
});

export default store;
