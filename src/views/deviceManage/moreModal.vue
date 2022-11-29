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
      <a-form class="reset-form-item reset-form-item-label">
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="设备类型">
          <span>{{ data.typename }}</span>
        </a-form-item>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="设备名称">
          <span>{{ data.displayname }}</span>
        </a-form-item>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="DID">
          <span>{{ data.did }}</span>
        </a-form-item>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="PID">
          <span>{{ data.productid }}</span>
        </a-form-item>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="IP">
          <span>{{ data.ip }}</span>
        </a-form-item>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="location">
          <span>{{ data.location }}</span>
        </a-form-item>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     label="备注">
          <span>{{ data.remark }}</span>
        </a-form-item>
      </a-form>
      <div class="modal-footer-btn">
        <a-button type="danger"
                  @click="showDelModal">删除设备</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
  // import { mapGetters, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { deviceManageAsk } = service;
  export default {
    name: 'MoreModal',
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
        modalTitle: '更多',
        isModal: true,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 删除提示
      showDelModal(record) {
        const that = this;
        this.$confirm({
          title: '确定删除该设备？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del(record);
          },
          onCancel() {},
        });
      },
      // 关闭弹窗
      cancel() {
        this.$emit('cancel');
      },
      // 确定删除
      del() {
        const { did, projectid } = this.data;
        const params = {
          dids: [did],
          projectid: `${projectid}`,
        };
        deviceManageAsk
          .delDevice(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$emit('del');
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
