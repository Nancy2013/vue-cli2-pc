const Index = () => import('viewsPath/dataDisplay/index.vue'); // 数据展示

const dataDisplay = [
  {
    // 数据展示
    path: '/dataDisplay',
    name: '数据展示',
    show: true,
    icon: 'iconrizhiguanli',
    component: Index,
    // redirect: '/dataDisplay/wechatLogin',
    index: 6,
    meta: {
      activeName: '数据展示',
      openName: '数据展示',
    },
    children: [],
  },
];

export default [...dataDisplay];
