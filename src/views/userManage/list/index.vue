<template>
  <div></div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { userManageAsk } = service;
  export default {
    name: 'RoleManage',
    components: {},
    props: {},
    data() {
      return {
        roleList: [],
        current: 1,
        pageSize: 5,
        total: 0,
      };
    },
    computed: {},
    watch: {},
    created() {
      this.getProject();
    },
    mounted() {},
    methods: {},
  };
</script>

<style scoped>

</style>
