<template>
  <div class="content-header">
    <div class="left">
      <slot name="left">
      </slot>
    </div>
    <div class="right">
      <slot name="right">
      </slot>
    </div>
  </div>
</template>

<script>
  // import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'HeaderPanel',
    components: {},
    props: {},
    data() {
      return {
        temp: '',
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>
<style lang="less">
  .content-header {
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
  }
</style>

<style lang="less" scoped>
  .content-header {
    background: #efefef;
    padding: 0px 20px;
    display: flex;
    height: 60px;
    box-sizing: border-box;
    align-items: center;
    .left {
      display: inline-block;
      flex: 1;
    }
    .right {
      display: inline-block;
      flex: 2;
    }
    .left {
      font-size: 16px;
    }
    .right {
      text-align: right;
    }
  }
</style>
