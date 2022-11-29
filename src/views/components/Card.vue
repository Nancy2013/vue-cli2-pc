<template>
  <div class="card-panel mb10">
    <div class="left title">
      {{ title }}
    </div>
    <div class="right">
      <span class="right-icon"
            @click="go">
        <a-icon type="right" /></span>
    </div>
  </div>
</template>
<script>
  // import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'CardPanel',
    components: {},
    props: {
      title: {
        type: String,
        required: true,
        default: '',
      },
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      go() {
        this.$emit('click');
      },
    },
  };
</script>

<style lang="less" scoped>
  .card-panel {
    background: #fff;
    padding: 40px 30px;
    border-radius: 4px;
    display: flex;
    .title {
      font-size: 16px;
    }
    .left,
    .right {
      flex: 1;
    }
    .right {
      text-align: right;
      .right-icon {
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }
</style>
