<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2019-09-24 11:07:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="topbar">
    <div class="header-brand">维护管理后台</div>
    <div class="header-operate">
      <a-icon type="bell" />
      <a-dropdown class="topbar-dropdown mr10">

        <span class="ant-dropdown-link"
              href="#">
          消息
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item @click="accountSet">
            <span>账号设置</span>
          </a-menu-item>
          <a-menu-item @click="exit">
            <span>退出</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <span class="iconfont iconbianzu mr10"></span>
      <a-dropdown class="topbar-dropdown">
        <span class="ant-dropdown-link"
              href="#">
          {{ userInfo.displayname }}
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item @click="accountSet">
            <span>账号设置</span>
          </a-menu-item>
          <a-menu-item @click="exit">
            <span>退出</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import service from 'servicePath/index';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

  const { appAsk } = service;

  export default {
    name: 'Main',
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapState('app', ['userInfo']),
    },
    created() {
      this.setUserInfo(JSON.parse(localStorage.userInfoB));
    },
    mounted() {},
    methods: {
      /* 账号设置 */
      ...mapMutations('app', ['setUserInfo']),
      accountSet() {
        this.$router.push({ path: '/accountSet' });
      },
      /* 退出 */
      exit() {
        const userInfo = JSON.parse(localStorage.userInfoB);
        const params = {
          ...userInfo,
        };
        appAsk
          .logoutAccount(params)
          .then(
            result => {
              const { errcode, data } = result;
              if (errcode === 200) {
                localStorage.clear();
                this.$router.push({ path: '/login' });
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
  .topbar {
    height: 60px;
    padding-right: 24px;
    line-height: 60px;
    .header-brand {
      font-size: 18px;
      width: 200px;
      background: #002140;
      text-align: center;
      color: @bl-white;
    }
    .header-brand,
    .header-operate {
      display: inline-block;
    }
    .header-operate {
      position: absolute;
      right: 24px;
      font-size: 16px;
    }
  }
</style>
