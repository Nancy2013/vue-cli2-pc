import Vue from 'vue';
import Router from 'vue-router';
import Main from 'viewsPath/common/Main.vue';

const login = () => import('viewsPath/login/index.vue'); // 登录
const accountSet = () => import('viewsPath/login/accountSet.vue'); // 账号设置

const context = require.context('./routes', false, /^\.\/(?!index)[^/]*\.js$/);

const childrenRoutes = context.keys().reduce((rs, key) => {
  rs.push(...context(key).default);
  return rs;
}, []);

Vue.use(Router);

export const routes = [
  {
    path: '/',
    component: Main,
    name: 'main',
    redirect: '/login',
    children: [
      {
        path: '/home',
        name: 'home',
        show: false,
        component: () => import('viewsPath/home/index.vue'),
        redirect: '/deviceManage',
        children: childrenRoutes,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    show: false,
    component: login,
  },
  {
    path: '/accountSet',
    name: 'accountSet',
    show: false,
    component: accountSet,
  },
  {
    path: '*',
    show: false,
    component: () => import('viewsPath/Error404/index.vue'),
  },
];
const router = new Router({
  routes,
});
export default router;
