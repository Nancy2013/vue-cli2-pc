<template>
  <div class="sidebar">
    <div style="width: 200px">
      <div class="side-menu">
        导航
      </div>
      <a-menu :default-selected-keys="defaultSelectedKeys"
              mode="inline"
              theme="dark"
              @click="selectMenu">
        <a-menu-item v-for="item in menuList"
                     :key="item.name"
                     :value="item.path">
          <span :class="['iconfont',item.icon]"></span>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
  // import { mapGetters, mapMutations } from 'vuex';
  import { routes } from 'routerPath';

  export default {
    name: 'SideBar',
    components: {},
    props: {},
    data() {
      return {
        menuList: [],
      };
    },
    computed: {
      defaultSelectedKeys() {
        return [this.$route.meta.activeName || this.$route.name];
      },
    },
    watch: {},
    created() {},
    mounted() {
      this.getMenu();
    },
    methods: {
      // 生成menu菜单
      getMenu() {
        const main = routes[0].children;
        const menu = main[0].children.filter(v => v.show);
        menu.sort((a, b) => a.index - b.index);
        this.menuList = menu;
      },
      // 选择菜单
      selectMenu({ item, key, keyPath }) {
        this.$router.push({ path: item.value });
      },
    },
  };
</script>

<style lang="less" scoped>
  .side-menu {
    padding-left: 24px;
    line-height: 40px;
    color: #fff;
  }
</style>
