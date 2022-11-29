<template>
  <div>
    <a-table :columns="columns"
             :row-key="record => record.id"
             :data-source="data"
             :loading="loading"
             :pagination="pagination"
             class="reset-pagination"
             @change="roleListChange">
      <template slot="index"
                slot-scope="text, record,index">
        <span>{{ index+1 }}</span>
      </template>
      <template slot="operation"
                slot-scope="text, record">
        <a @click="edit(record)">编辑</a>
      </template>
    </a-table>
    <!-- 人员弹窗 -->
    <a-modal v-if="isModal"
             ref="modalBlack"
             :title="modalTitle"
             v-model="isModal"
             :mask-closable="false"
             :width="468"
             :closable="false"
             ok-text="确定"
             cancel-text="取消">
      <a-form :form="form"
              hide-required-mark>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="项目">
          <a-select v-model="projectid">
            <a-select-option v-for="item in projectList"
                             :key="item.id"
                             :value="item.id">
              {{ item.projectname }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-show="isEdit"
                     :label-col="{ span: 4 }"
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
            <a-select-option key="4"
                             value="4">
              安装工
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="权限">
          <a-checkbox-group v-model="selected"
                            @change="onSaveConnect">
            <a-row v-for="item in data"
                   :key="item.id"
                   class="mb10">
              <a-checkbox :value="item.id">{{ item.privilegename }}</a-checkbox>
            </a-row>
          </a-checkbox-group>
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
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

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
      title: '项目名称',
      dataIndex: 'projectname',
      width: '10%',
      align: 'center',
    },
    {
      title: '角色名称',
      dataIndex: 'rolename',
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
    name: 'RoleList',
    mixins: [PageTableCreaterMix('roleList')],
    data() {
      return {
        projectid: '',
        form: this.$form.createForm(this),
        isModal: false,
        isEdit: false,
        id: this.$route.params.id,
        data: [],
        rolenameList: [],
        selected: [],
        current: {},
        columns,
      };
    },
    computed: {
      modalTitle() {
        const { isEdit } = this;
        return `${isEdit ? '编辑' : '添加'}角色`;
      },
    },
    methods: {
      init() {
        this.pagination.current = 1;
        this.roleListFetch();
      },
      // 添加
      add() {
        this.isModal = true;
        this.isEdit = false;
        this.current = {};
        this.getPrivilegeName();
      },
      // 编辑
      edit(record) {
        this.isModal = true;
        this.isEdit = true;
        this.current = record;
        this.getPrivilegeName();
      },
      // 删除
      showDelModal(record) {
        const that = this;
        this.$confirm({
          title: '确定要删除角色？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del(record);
          },
          onCancel() {},
        });
      },
      // 取消
      handleCancel() {
        this.isModal = false;
      },
      // 删除
      del(record) {
        const { id } = record;
        const params = {
          id,
        };
        userManageAsk
          .delRole(params)
          .then(
            result => {
              const { errcode } = result;
              if (errcode === 200) {
                this.$message.success('操作成功！');
                this.roleListFetch();
                this.isModal = false;
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
      // 获得选择项
      onSaveConnect(val) {
        console.log(val);
      },
      getPrivilegeName() {
        const { projectid } = this;
        const params = {
          limit: 10,
          offset: 1,
          projectid: projectid,
        };
        userManageAsk
          .getPrivilege(params)
          .then(
            result => {
              const { errcode, data } = result;
              if (errcode === 200) {
                this.data = data.privilegename || [];
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
        this.selected = this.data.privilegename;
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { edit } = this;
          if (edit) {
            // 编辑
            this.modRoletable(fieldsValue);
          } else {
            // 添加
            this.addRoletable(fieldsValue);
          }
        });
      },
      //编辑
      modRoletable(fieldsValue) {
        const { rolename, selected } = fieldsValue;
        this.current = {
          ...this.current,
          pid: this.projectid,
          roleid: rolename,
          privilegeid: selected,
          rpids: selected,
        };
        const params = {
          ...this.current,
        };
        userManageAsk
          .bindRP(params)
          .then(
            result => {
              const { errcode } = result;
              if (errcode === 200) {
                this.$message.success('操作成功！');
                this.isModal = false;
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
        userManageAsk
          .unbindRP(params)
          .then(
            result => {
              const { errcode } = result;
              if (errcode === 200) {
                this.$message.success('操作成功！');
                this.isModal = false;
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
      //添加
      addRoletable(fieldsValue) {
        const { rolename, selected } = fieldsValue;
        this.current = {
          ...this.current,
          pid: this.projectid,
          roleid: rolename,
          privilegeid: selected,
        };
        const params = {
          ...this.current,
        };
        userManageAsk
          .bindRP(params)
          .then(
            result => {
              const { errcode } = result;
              if (errcode === 200) {
                this.$message.success('操作成功！');
                this.isModal = false;
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
      // 请求数据
      async roleListFetchList(params) {
        const { data = {} } = await userManageAsk.getRole(params);
        return { total: data.totalsize, rolenameList: data.rolename, data: data.data };
      },
    },
  };
</script>

<style scoped>
</style>
