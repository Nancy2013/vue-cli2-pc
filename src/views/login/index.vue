<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2019-09-24 11:12:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login">
    <div class="center">
      <div class="header">
        <div class="title-panel">
          <div class="title">
            维护管理后台
          </div>
          <div class="sub-title">
            Maintenance management background
          </div>
        </div>
      </div>
      <div class="form-panel">
        <div class="form-content mt30">
          <a-form :form="form"
                  hide-required-mark
                  class="reset-form-item">
            <a-form-item :label-col="{ span: 0 }"
                         :wrapper-col="{ span: 24 }"
                         :colon="false"
                         style="margin-bottom:20px;"
                         label="">
              <a-input v-decorator="formRules.accountName"
                       placeholder="账号"
                       @focus="focus">
                <a-icon slot="prefix"
                        type="user" />
              </a-input>
            </a-form-item>
            <a-form-item :label-col="{ span: 0 }"
                         :wrapper-col="{ span: 24 }"
                         :colon="false"
                         label="">
              <a-input v-decorator="formRules.password"
                       placeholder="密码"
                       type="password"
                       style="margin-bottom:10px;"
                       @focus="focus">
                <span slot="prefix"
                      class="iconfont iconxingzhuangjiehe1"></span>
              </a-input>
            </a-form-item>
            <span v-if="isError"
                  class="error-tips">账号或密码错误，请重新输入</span>
            <a-form-item :label-col="{ span: 0 }"
                         :wrapper-col="{ span: 24 }"
                         :colon="false"
                         label="">
              <a-button type="primary"
                        class="bottom-btn mt20"
                        @click="login">登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import service from 'servicePath/index';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

  const { appAsk } = service;
  export default {
    name: 'Login',
    components: {},
    props: {},
    data() {
      return {
        isError: false,
        form: this.$form.createForm(this),
        formRules: {
          accountName: [
            'accountname',
            {
              rules: [{ required: true, message: '请输入用户名' }],
            },
          ],
          password: [
            'password',
            {
              rules: [{ required: true, message: '请输入密码' }],
            },
          ],
        },
      };
    },
    computed: {
      ...mapState('app', ['userInfo']),
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      ...mapMutations('app', ['setUserInfo']),
      // 清除错误提示
      focus() {
        this.isError = false;
      },
      // 登录
      login() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { accountname, password } = fieldsValue;
          const params = {
            accountname,
            password: this.$md5(password),
            pid: '2',
          };
          appAsk
            .loginAccount(params)
            .then(result => {
              const { errcode, data } = result;
              if (errcode === 200) {
                const { accountinfo, uid, token } = data;
                // 同步用户登录信息
                const auth = {
                  token,
                  expired: new Date(),
                };
                localStorage.setItem('authB', JSON.stringify(auth));
                localStorage.setItem(
                  'userInfoB',
                  JSON.stringify({ ...accountinfo, accountpwd: this.$md5(password) })
                );
                this.setUserInfo(accountinfo);
                setTimeout(() => {
                  this.$router.push({ path: '/home' });
                }, 500);
              }
            })
            .catch(e => {
              const { errcode } = e;
              if (errcode === 403) {
                this.isError = true;
              }
              console.error(e);
            });
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .login {
    color: #fff;
    .center {
      text-align: center;
    }
  }
  .header {
    background: url(../../styles/images/body_bg.png);
    background-repeat: repeat-x;
    padding-top: 150px;
    padding-bottom: 60px;
    .title-panel {
      display: inline-block;
      border: 1px solid #ffff;
      border-radius: 10px;
      padding: 10px 90px;
      .title {
        font-size: 36px;
      }
      .sub-header {
        font-size: 14px;
      }
    }
  }
  .form-panel {
    text-align: center;
    .form-content {
      text-align: left;
      background: #fff;
      border-radius: 10px;
      width: 380px;
      display: inline-block;
    }
    .bottom-btn {
      width: 100%;
    }
  }
</style>
