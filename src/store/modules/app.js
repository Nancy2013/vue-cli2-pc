import service from 'servicePath/index';

const { appAsk } = service;
const app = {
  namespaced: true,
  state: {
    window: {
      height: window.innerHeight,
      width: window.innerWidth,
    },
    userInfo: {},
    online: [
      {
        text: '全部状态',
        value: '-1',
        icon: '',
      },
      {
        text: '在线状态',
        value: '1',
        icon: '',
      },
      {
        text: '离线状态',
        value: '0',
        icon: '',
      },
    ],
  },

  mutations: {
    updateWindowSize(state, window) {
      state.window.height = window.innerHeight;
      state.window.width = window.innerWidth;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },

  getters: {
    formatUserInfo: state => `${state.userInfo.userName}-${state.userInfo.passwd}`,
  },

  actions: {
    async setUserInfo({ commit }, params) {
      const { errcode } = await appAsk.loginAccount(params);
      if (errcode === 200) {
        commit('setUserInfo', params);
      }
    },
  },
};

export default app;
