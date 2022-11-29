const Index = () => import('viewsPath/deviceManage/index.vue'); // 设备管理

const deviceManage = [
  {
    // 设备管理
    path: '/deviceManage',
    name: '设备管理',
    show: true,
    icon: 'iconshebeiguanli',
    component: Index,
    index: 1,
    meta: {
      activeName: '设备管理',
      openName: '设备管理',
    }
  }
];

export default [...deviceManage];
