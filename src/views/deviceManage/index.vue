<template>
  <div>
    <div class="header-panel">
      <bl-header>
        <span slot="left"
              class="title">全部设备</span>
        <div slot="right">
          <a-select v-model="online"
                    :default-value="-1"
                    class="component-w-224"
                    style="margin:0 10px;"
                    @change="doSearch">
            <a-select-option v-for="item in onlineStatusList"
                             :key="item.value"
                             :value="item.value">
              {{ item.text }}
            </a-select-option>
          </a-select>
          <a-input-search v-model.trim="search"
                          placeholder="输入设备名称搜索"
                          class="component-w-224"
                          enter-button
                          @search="doSearch" />
        </div>
      </bl-header>
    </div>
    <bl-page-wrapper>
      <div slot="content">
        <a-table :columns="columns"
                 :row-key="record => record.id"
                 :data-source="data"
                 :loading="loading"
                 :pagination="pagination"
                 class="reset-pagination"
                 @change="deviceChange">
          <template slot="index"
                    slot-scope="text, record,index">
            <span>{{ index+1 }}</span>
          </template>
          <template slot="online"
                    slot-scope="text, record">
            <span :class="{error:record.online==='0'}">{{ record.online==='0'?'离线':"在线" }}</span>
          </template>
          <template slot="operation"
                    slot-scope="text, record">
            <a :class="{disabled:record.online!=='1'}"
               @click="control(record)">控制</a>
            <a-divider type="vertical" />
            <a @click="more(record)">更多</a>
          </template>
        </a-table>
      </div>
    </bl-page-wrapper>
    <MoreModal v-if="isMoreModal"
               :data="current"
               @del="del"
               @cancel="cancelMoreModal" />
    <ControlModal v-if="isControlModal"
                  :data="current"
                  @cancel="cancelControlModal"
                  @ok="sendCommand" />
  </div>
</template>


<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';
  import MoreModal from './moreModal.vue';
  import ControlModal from './controlModal.vue';

  const { deviceManageAsk } = service;
  const { PageTableCreaterMix } = Mix;
  export default {
    name: 'DeviceManage',
    components: {
      MoreModal,
      ControlModal,
    },
    mixins: [PageTableCreaterMix('device')],
    props: {},
    data() {
      return {
        projectid: '',
        onlineStatusList: this.$store.state.app.online,
        online: '-1',
        search: '',
        isMoreModal: false,
        isControlModal: false,
        timeOut: null,
      };
    },
    computed: {},
    created() {},
    mounted() {},
    beforeDestroy() {
      this.stopTime();
    },
    methods: {
      init() {
        this.pagination.current = 1;
        this.deviceFetch();
      },
      // 表头
      deviceColumns() {
        const columns = [
          {
            title: '序号',
            dataIndex: 'index',
            width: '20%',
            align: 'center',
            scopedSlots: { customRender: 'index' },
          },
          {
            title: '设备类型',
            dataIndex: 'typename',
            align: 'center',
          },
          {
            title: '设备名称',
            dataIndex: 'displayname',
            align: 'center',
          },
          {
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
          },
          {
            title: '在线状态',
            dataIndex: 'online',
            align: 'center',
            scopedSlots: { customRender: 'online' },
          },
          {
            title: '操作',
            dataIndex: 'operate',
            align: 'left',
            scopedSlots: { customRender: 'operation' },
          },
        ];
        return columns;
      },
      doSearch() {
        this.init();
      },
      // 控制
      control(record) {
        this.current = record;
        this.isControlModal = true;
      },
      // 取消控制弹窗
      cancelControlModal() {
        this.isControlModal = false;
      },
      // 更多
      more(record) {
        this.current = {
          ...record,
          projectid: this.projectid,
        };
        this.isMoreModal = true;
      },
      // 确定删除
      del() {
        this.deviceFormatPagination('del');
        this.deviceFetch();
        this.isMoreModal = false;
      },
      cancelMoreModal() {
        this.isMoreModal = false;
      },
      sendCommand(params) {
        const { id } = this.current;
        params.dids = [id];
        deviceManageAsk
          .devControl(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              const { current } = this;
              current[params.param] = params.value;
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      stopTime() {
        // TODO kill不掉轮询复现
        if (this.timeOut) {
          clearTimeout(this.timeOut);
        }
      },
      // 请求数据
      async deviceFetchList(params) {
        const { online, projectid, search } = this;
        params.online = online === '-1' ? null : online;
        const { errcode, data = {} } = await deviceManageAsk.getDevice({
          ...params,
          projectid: `${projectid}`,
          displayname: search,
        });
        /* this.timeOut = setTimeout(() => {
                                                        this.deviceFetch();
                                                      }, this.GLOBAL.TIME_INTERVAL); */
        return { total: data.totalsize, data: data.deviceInfos };
      },
      formatPagination(operate) {
        const { data, pagination } = this;
        console.log(this.data);
        if (operate === 'add') {
          if (data.length === pagination.pageSize) {
            this.pagination.current = pagination.current + 1;
          }
        } else if (data.length === 1) {
          if (pagination.current > 1) {
            this.pagination.current = pagination.current - 1;
          }
        }
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
