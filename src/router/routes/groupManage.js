const Index = () => import('viewsPath/groupManage/index.vue'); // 分组管理


const groupManage = [
  {
    // 分组管理
    path: '/groupManage',
    name: '分组管理',
    show: true,
    icon: 'iconchanpinguanli',
    component: Index,
    index: 2,
    // redirect: '/groupManage/list',
    meta: {
      activeName: '分组管理',
      openName: '分组管理',
    },
    children: [],
  }
];

export default [...groupManage];
