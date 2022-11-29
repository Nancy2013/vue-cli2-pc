import service from 'servicePath/index';
import global from 'commonPath/global';

const { userManageAsk } = service;
const userManage = {
  namespaced: true,
  state: {
    projectId: '',
  },
  mutations: {
    setProjectid(state, payload) {
      state.projectId = payload;
    },
  },

  getters: {},
  actions: {},
};

export default userManage;
