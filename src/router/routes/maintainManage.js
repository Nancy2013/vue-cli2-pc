const Index = () => import('viewsPath/maintainManage/index.vue'); // 维护管理


const maintainManage = [
  {
    // 维护管理
    path: '/maintainManage',
    name: '维护管理',
    show: true,
    icon: 'iconchanpinguanli',
    component: Index,
    // redirect: '/maintainManage/list',
    index: 3,
    meta: {
      activeName: '维护管理',
      openName: '维护管理',
    },
    children: [],
  }
];

export default [...maintainManage];
