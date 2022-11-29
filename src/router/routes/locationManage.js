const Index = () => import('viewsPath/locationManage/index.vue'); // 位置管理

const locationManage = [
  {
    // 位置管理
    path: '/locationManage',
    name: '位置管理',
    show: true,
    icon: 'iconxiangmuguanli',
    component: Index,
    index: 4,
    // redirect: '/locationManage/list',
    meta: {
      activeName: '位置管理',
      openName: '位置管理',
    },
    children: [],
  },
];

export default [...locationManage];
