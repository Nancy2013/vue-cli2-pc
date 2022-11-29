<template>
  <div>
    <a-modal :title="modalTitle"
             v-model="isModal"
             :mask-closable="false"
             :width="520"
             :footer="null"
             ok-text="确定"
             cancel-text="取消"
             @cancel="cancel">
      <a-form>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="电源">
          <a-row>
            <a-col :span="6">
              <a-button :type="pwrStatus('on')"
                        class="reset-btn-padding"
                        @click="debounceSet('power','on')"> 开启 </a-button>
            </a-col>
            <a-col :span="6">
              <a-button :type="pwrStatus('off')"
                        class="reset-btn-padding"
                        @click="debounceSet('power','off')"> 关闭 </a-button>
            </a-col>
          </a-row>

        </a-form-item>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="模式">
          <a-row>
            <a-col v-for="item in modeList"
                   :span="6"
                   :key="item.value">
              <a-button :type="mode(item)"
                        @click="debounceSet('mode',item.value)">{{ item.text }}</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  // import { mapGetters, mapMutations } from 'vuex';
  import _ from 'lodash';
  import service from 'servicePath/index';

  const { deviceManageAsk } = service;
  export default {
    name: 'ControlModal',
    components: {},
    props: {
      data: {
        type: Object,
        default: () => {},
        required: true,
      },
    },
    data() {
      return {
        isModal: true,
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
        device: { ...this.data },
        modeList: [
          {
            text: '精选体验',
            value: 1,
          },
          {
            text: '夜间睡眠',
            value: 2,
          },
          {
            text: '头颈放松',
            value: 3,
          },
          {
            text: '腰臀舒缓',
            value: 4,
          },
          {
            text: '全身放松',
            value: 5,
          },
          {
            text: '全身伸展',
            value: 6,
          },
          {
            text: '运动恢复',
            value: 7,
          },
          {
            text: '肩颈呵护',
            value: 8,
          },
        ],
        controllingFlag: false,
        debounceResetFlag: _.debounce(() => {
          this.controllingFlag = false;
        }, 10000),
        debounceSet: _.debounce((key, val) => {
          this.controlDevice(key, val);
        }, 1000),
      };
    },
    computed: {
      modalTitle() {
        const { displayname } = this.data;
        return `设备控制-${displayname}`;
      },
      pwrStatus() {
        return function(val) {
          const { status } = this.device;
          return status.power === val ? 'primary' : null;
        };
      },
      mode() {
        return function(item) {
          const { status } = this.device;
          return status.mode === item.text ? 'primary' : null;
        };
      },
    },
    watch: {
      'data.status': {
        handler(newV, oldV) {
          if (!this.controllingFlag) {
            this.device = Object.assign({}, this.data);
          }
        },
        immediate: true,
        deep: true,
      },
    },
    created() {
      console.log(this.data);
    },
    mounted() {},
    methods: {
      // 取消弹窗
      cancel() {
        this.$emit('cancel');
      },
      // 控制设备
      controlDevice(key, value) {
        const { status } = this.device;
        status[key] = value;
        this.device = Object.assign({}, this.device, status);
        const params = {
          param: key,
          value,
        };
        this.controllingFlag = true;
        this.$emit('ok', params);
        this.debounceResetFlag();
      },
    },
  };
</script>
<style lang="less">
  .reset-btn-padding.ant-btn {
    padding: 0 28px;
  }
</style>

<style lang="less" scoped>
  .btn-bottom {
    text-align: center;
  }
</style>
