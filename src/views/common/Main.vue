<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2019-09-24 11:09:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="common-container">
    <Topbar />
    <div :style="{'min-height':minHeight+'px'}"
         class="common-side">
      <SideBar />
    </div>
    <div :style="{'min-height':minHeight+'px','max-height':minHeight+'px'}"
         class="common-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import Topbar from './Topbar.vue';
  import SideBar from './SideBar.vue';

  export default {
    name: 'Main',
    components: {
      Topbar,
      SideBar,
    },
    data() {
      return {};
    },
    computed: {
      minHeight() {
        return this.$store.state.app.window.height - 60;
      },
    },
    created() {},
    mounted() {},
    beforeMount() {},
    methods: {},
  };
</script>
<style lang="less" scoped>
  .common-side {
    position: absolute;
    background: @bl-brown-1;
    width: 200px;
  }
  .common-content {
    margin-left: 200px;
    overflow: auto;
  }
</style>
