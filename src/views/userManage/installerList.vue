<template>
  <div>
    <a-table :columns="columns"
             :row-key="record => record.id"
             :data-source="data"
             :loading="loading"
             :pagination="pagination"
             class="reset-pagination"
             @change="installerListChange">
      <template slot="index"
                slot-scope="text, record,index">
        <span>{{ index+1 }}</span>
      </template>
      <template slot="operation"
                slot-scope="text, record">
        <a @click="generate(record)">生成二维码</a>
        <a-divider type="vertical" />
        <a @click="edit(record)">编辑</a>
      </template>
    </a-table>
    <!-- 二维码弹窗 -->
    <a-modal v-if="isModal"
             ref="modalBlack"
             :title="安装APP授权"
             v-model="isModal"
             :mask-closable="false"
             :width="400"
             :closable="false"
             class="qrcodeModal">
      <p v-show="isgenerate"
         class="settime">请设置授权有限期限</p>
      <a-range-picker v-show="isgenerate"/>
      <div v-show="isdownload"
           id="qrcode">
        <canvas width="100"
                height="100">
        </canvas>
      </div>
      <span v-show="isdownload">请使用安装APP扫码</span>
      <template slot="footer">
        <a-button v-show="isgenerate"
                  key="submit"
                  type="primary"
                  @click="handlegenerate">生成二维码</a-button>
        <a-button v-show="isdownload"
                  type="primary"
                  @click="handledownload">下载</a-button>
      </template>
    </a-modal>
    <!-- 人员弹窗 -->
    <a-modal v-if="isMdl"
             ref="modalBlack"
             :title="modalTitle"
             v-model="isMdl"
             :mask-closable="false"
             :width="332"
             :closable="false"
             ok-text="确定"
             cancel-text="取消">
      <a-form :form="form"
              hide-required-mark>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="角色">
          <a-select v-model="current.rolename"
                    style="width: 100%">
            <a-select-option key="1"
                             value="1">
              超级管理员
            </a-select-option>
            <a-select-option key="2"
                             value="2">
              项目管理员
            </a-select-option>
            <a-select-option key="3"
                             value="3">
              运维人员
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="名称">
          <a-input v-decorator="[ `displayname`,{
            initialValue: current.displayname,
            rules: [{ required: true, message: '请输入用户名称' }],} ]" />
        </a-form-item>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="账号">
          <a-input v-decorator="[ `accountname`,{
            initialValue: current.accountname,
            rules: [{ required: true, message: '请输入账号' }],} ]" />
        </a-form-item>
        <a-form-item v-if="isEdit"
                     :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="密码">
          <a-input v-decorator="[ `accountpwd`,{
            initialValue: current.accountpwd,
            rules: [{ required: true, message: '请输入密码' }],} ]" />
          <a-button key="submit"
                    type="primary"
                    @click="resetPwd">重置为初始密码</a-button>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button key="back"
                  @click="handleCancel">取消</a-button>
        <a-button v-show="isEdit"
                  type="danger"
                  @click="showDelModal">删除</a-button>
        <a-button key="submit"
                  type="primary"
                  @click="handleOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import service from 'servicePath/index';
  import Mix from '@/mixins';
  import QRcode from 'qrcode';

  const { userManageAsk } = service;
  const { PageTableCreaterMix } = Mix;
  // 表头
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: '10%',
      align: 'center',
      scopedSlots: { customRender: 'index' },
    },
    {
      title: '账号',
      dataIndex: 'accountname',
      width: '10%',
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'displayname',
      width: '10%',
      align: 'center',
    },
    {
      title: '二维码时效',
      dataIndex: 'qrtiming',
      width: '10%',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'left',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  export default {
    name: 'InstallerList',
    mixins: [PageTableCreaterMix('installerList')],
    data() {
      return {
        form: this.$form.createForm(this),
        isModal: false,
        isgenerate: true,
        isdownload: false,
        isMdl: false,
        isEdit: false,
        projectId: this.$route.params.id,
        current: {},
        columns,
      };
    },
    computed: {
      modalTitle() {
        const { isEdit } = this;
        return `${isEdit ? '编辑' : '添加'}人员`;
      },
    },
    methods: {
      init() {
        this.pagination.current = 1;
        this.installerListFetch();
      },
      // 添加
      add() {
        this.isMdl = true;
        this.isEdit = false;
        this.current = {
          pid: this.projectId
        };
      },
      // 编辑
      edit(record) {
        this.isMdl = true;
        this.isEdit = true;
        this.current = {
          ...record,
          pid: this.projectId
        };
      },
      //重置密码
      resetPwd() {
        this.form.validateFields((fieldsValue) => {
          const { accountpwd } = fieldsValue;
          accountpwd.value = '123456';
        });
      },
      // 生成
      generate() {
        this.isModal = true;
      },
      //删除
      showDelModal(record) {
        const that = this;
        this.$confirm({
          title: '确定要删除人员？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del(record);
          },
          onCancel() {},
        });
      },
      //取消
      handleCancel() {
        this.isMdl = false;
      },
      //删除
      del() {
        const { accountname, id } = this.current;
        const params = {
          accountname,
          pid: this.projectId,
          uid: id,
        };
        userManageAsk
          .delAccounttable(params)
          .then(
            result => {
              const { errcode } = result;
              if (errcode === 200) {
                this.$message.success('操作成功！');
                this.installerListFetch();
                this.isMdl = false;
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
      // 确定弹窗
      handleOk() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { isEdit } = this;
          if (isEdit) {
            // 编辑
            this.modInstallertable(fieldsValue);
          } else {
            // 添加
            this.addInstallertable(fieldsValue);
          }
        });
      },
      modInstallertable(fieldsValue) {
        const { displayname, accountname, accountpwd } = fieldsValue;
        const params = {
          ...this.current,
          displayname,
          accountname,
          accountpwd,
        };
        userManageAsk
          .modAccounttable(params)
          .then(
            result => {
              const { errcode } = result;
              if (errcode === 200) {
                this.$message.success('操作成功！');
                this.isMdl = false;
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
      addInstallertable(fieldsValue) {
        const { displayname, accountname } = fieldsValue;
        const params = {
          ...this.current,
          displayname,
          accountname,
          accountpwd: accountname.substr(5)
        };
        userManageAsk
          .addAccounttable(params)
          .then(
            result => {
              const { errcode } = result;
              if (errcode === 200) {
                this.$message.success('操作成功！');
                this.isMdl = false;
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
      //二维码
      qrcode (qrCodeText) {
        const qrcode = new QRcode('qrcode', {
          width: 100,
          height: 100,
          text: qrCodeText,
        });
        return qrcode;
      },
      //生成二维码
      handlegenerate(qrCodeText) {
        const { account, username } = qrCodeText;
        this.qrcode(JSON.stringify({ account, username }));
      },
      //下载
      handledownload() {
        const canvasData = document.getElementById('qrcode').getElementsByTagName('canvas');
        const a = document.createElement('a');
        a.href = canvasData[0].toDataURL('image/png').replace('image/png', 'image/octet-stream');
        a.download = '二维码';
        a.click();
      },
      // 请求数据
      async installerListFetchList(params) {
        const { errcode, data = {} } = await userManageAsk.getAccounttable(params);
        return { total: data.totalsize, data: data.data };
      },
    }
  };
</script>

<style scoped>

</style>
