const Index = () => import('viewsPath/taskManage/index.vue'); // 任务管理


const taskManage = [
  {
    // 任务管理
    path: '/taskManage',
    name: '任务管理',
    show: true,
    icon: 'iconchanpinguanli',
    component: Index,
    index: 5,
    // redirect: '/taskManage/list',
    meta: {
      activeName: '任务管理',
      openName: '任务管理',
    },
    children: [],
  }
];

export default [...taskManage];
