<template>
  <div class="log-wrapper">
    <div class="log-top">
      <p class="top-title">全部人员</p>
      <div class="top-right">
        <!-- <a-select v-model="projectid"
                  class="component-w-224"
                  @change="handleChange">
          <a-select-option v-for="item in projectList"
                           :key="item.id"
                           :value="item.id">
            {{ item.projectname }}
          </a-select-option>
        </a-select> -->
        <a-button v-show="defaultActiveKey==='userList'"
                  class="ml10"
                  type="primary"
                  @click="add">添加名单
        </a-button>
        <a-button v-show="defaultActiveKey==='installerList'"
                  class="ml10"
                  type="primary"
                  @click="add">添加人员
        </a-button>
        <a-button v-show="defaultActiveKey==='roleList'"
                  class="ml10"
                  type="primary"
                  @click="add">添加角色
        </a-button>
      </div>
    </div>
    <div class="log-menu">
      <a-tabs :default-active-key="defaultActiveKey"
              class="log-list"
              @change="changeTab">
        <a-tab-pane key="userList"
                    tab="普通人员">
        </a-tab-pane>
        <a-tab-pane key="installerList"
                    tab="安装工"
                    force-render>
        </a-tab-pane>
        <a-tab-pane key="roleList"
                    tab="角色列表"
                    force-render>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="menu-list">
      <router-view ref="listModal"></router-view>
    </div>
  </div>
</template>


<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    name: 'UserManage',
    components: {},
    props: {},
    data() {
      return {
        projectid: '',
        id: this.$route.params.id,
        defaultActiveKey: '普通人员',
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 添加人员
      handleChange(val) {
        this.setProjectid(val);
      },

      add() {
        this.$refs.listModal.add();
      },
      // 切换Tab
      changeTab(activeKey) {
        this.defaultActiveKey = activeKey;
        const { id } = this;
        if (id) {
          // 详情
          this.$router.push({ name: activeKey });
        } else {
          // 添加
          this.$router.push({ path: activeKey });
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .log-wrapper {
    background-color: #eef2f5;
  }
  .log-top {
    height: 50px;
    background-color: #fff;
  }
  .top-title {
    font-size: 18px;
    color: #333;
    font-weight: 500;
    display: inline-block;
    line-height: 25px;
    margin: 13px 0 0 20px;
  }
  .top-right {
    margin-top: 9px;
    margin-right: 20px;
    float: right;
  }
  .log-menu {
    margin: 0 20px;
  }
  /*.log-list{*/
  /*line-height: 40px;*/
  /*background-color: #eef2f5;*/
  /*border-bottom: 2px solid rgba(204,204,204,0.6962);*/
  /*}*/
  .ll {
    width: 124px;
    text-align: center;
  }
  .menu-list {
    height: 760px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #fff;
  }
</style>
