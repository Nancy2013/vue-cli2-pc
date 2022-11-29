<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2019-07-04 09:27:57
 * @LastEditors: your name
 -->
<template>
  <div>
    <Topbar />
    <div class="reset-container">
      <div :style="{'min-height':minHeight+'px'}"
           class="reset-panel">
        <div>
          <a-button type="primary"
                    @click="goBack">
            <a-icon type="left" />
            账号设置</a-button>
          <div class="form-panel">
            <div class="form-content">
              <a-form hide-required-mark>
                <a-form-item :label-col="{ span: 6 }"
                             :wrapper-col="{ span: 16 }"
                             :colon="false"
                             label="账号">
                  <a-input v-model="userInfo.accountname"
                           disabled />
                </a-form-item>

                <a-form-item :label-col="{ span: 6}"
                             :wrapper-col="{ span: 16 }"
                             :colon="false"
                             label="用户名">
                  <a-row :gutter="10">
                    <a-col :span="18">
                      <a-input v-model="userInfo.displayname"
                               disabled />
                    </a-col>
                    <a-col :span="6">
                      <a-button type="primary"
                                class="edit-btn"
                                disabled
                                @click="editName">编辑</a-button>
                    </a-col>
                  </a-row>
                </a-form-item>

                <a-form-item :label-col="{ span: 6 }"
                             :wrapper-col="{ span: 16 }"
                             :colon="false"
                             label="密码">
                  <a-row :gutter="10">
                    <a-col :span="18">
                      <a-input placeholder="*********"
                               disabled
                               type="password" />
                    </a-col>
                    <a-col :span="6">
                      <a-button type="primary"
                                class="edit-btn"
                                disabled
                                @click="editPSD">编辑</a-button>
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改用户名 -->
    <a-modal v-if="isUserModal"
             :mask-closable="false"
             :width="400"
             :closable="false"
             v-model="isUserModal"
             title="修改用户名"
             ok-text="确定"
             cancel-text="取消"
             @ok="setNameOk">
      <a-input v-model.trim="displayName"
               placeholder="请输入用户名" />
    </a-modal>

    <!-- 修改密码 -->
    <a-modal v-if="isPSDModal"
             :mask-closable="false"
             :width="400"
             :closable="false"
             v-model="isPSDModal"
             title="修改密码"
             ok-text="确定"
             cancel-text="取消"
             @ok="setPSDOk">
      <a-input v-model.trim="passWord"
               type="password"
               style="margin-bottom:20px;"
               placeholder="请输入密码" />
      <a-input v-model.trim="passWordAgin"
               type="password"
               placeholder="请确认密码"
               style="margin-bottom:10px;" />
      <span v-if="isError"
            class="error-tips">原密码输入错误，请重新输入</span>
    </a-modal>
  </div>
</template>


<script>
  import Topbar from 'viewsPath/common/Topbar.vue';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { appAsk } = service;
  export default {
    name: 'AccountSet',
    components: {
      Topbar,
    },
    props: {},
    data() {
      return {
        user: '',
        displayName: '',
        passWord: '',
        passWordAgin: '',
        isUserModal: false,
        isPSDModal: false,
        isError: false,
      };
    },
    computed: {
      ...mapState('app', ['userInfo']),
      minHeight() {
        return this.$store.state.app.window.height - 100;
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      ...mapMutations('app', ['setUserInfo']),
      goBack() {
        this.$router.back(-1);
      },
      /* 编辑用户名 */
      editName() {
        this.displayName = this.userInfo.displayname;
        this.isUserModal = true;
      },
      /* 确定保存用户名 */
      setNameOk() {
        const { displayName } = this;
        const { id } = this.userInfo;
        if (displayName) {
          // 昵称
          const params = {
            id,
            displayname: displayName,
          };
          appAsk
            .modAccount(params)
            .then(
              result => {
                const { errcode, data } = result;
                if (errcode === 200) {
                  this.$message.success('修改成功！');
                  const userInfo = {
                    ...this.userInfo,
                    displayname: displayName,
                  };

                  this.setUserInfo(userInfo);
                  localStorage.setItem('userInfoB', JSON.stringify(userInfo));
                  this.isUserModal = false;
                }
              },
              () => {}
            )
            .catch(e => {
              console.error(e);
            });
        } else {
          this.$message.warning('用户名不能为空！');
        }
      },
      /* 编辑密码 */
      editPSD() {
        this.passWord = this.userInfo.accountpwd;
        this.isPSDModal = true;
      },
      /* 确定保存密码 */
      setPSDOk() {
        const { passWord, passWordAgin } = this;
        const { id } = this.userInfo;
        if (passWord) {
          if (passWord === passWordAgin) {
            // 修改密码
            const params = {
              id,
              accountpwd: passWord,
            };
            appAsk
              .modAccount(params)
              .then(
                result => {
                  const { errcode, data } = result;
                  if (errcode === 200) {
                    this.$message.success('修改成功！');
                    const userInfo = {
                      ...this.userInfo,
                      accountpwd: passWord,
                    };
                    this.setUserInfo(userInfo);
                    localStorage.setItem('userInfoB', JSON.stringify(userInfo));
                    this.isPSDModal = false;
                  }
                },
                () => {}
              )
              .catch(e => {
                console.error(e);
              });
          } else {
            this.$message.warning('请确认输入的密码一致！');
          }
        } else {
          this.$message.warning('密码不能为空！');
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .reset-container {
    background: #eef2f5;
    padding: 20px;
    box-sizing: border-box;
    .reset-panel {
      padding: 20px;
      background: #fff;
      .form-panel {
        margin-top: 100px;
        text-align: center;
      }
      .form-content {
        display: inline-block;
        width: 520px;
        .edit-btn {
          width: 100%;
        }
      }
    }
  }
</style>
