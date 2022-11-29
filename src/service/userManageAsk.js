import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 添加
  addRole: reqHandle('/role/add', {
    method: HTTP_METHOD.POST,
  }),
  // 删除
  delRole: reqHandle('/role/del', {
    method: HTTP_METHOD.POST,
  }),
  // 修改
  modRole: reqHandle('/role/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 查询
  getRole: reqHandle('/role/get', {
    method: HTTP_METHOD.POST,
  }),
 // 查询人员名单
  getAccounttable: reqHandle('/account/get', {
    method: HTTP_METHOD.POST,
 }),
  // 添加人员名单
  addAccounttable: reqHandle('/account/add', {
    method: HTTP_METHOD.POST,
 }),
  // 删除人员名单
  delAccounttable: reqHandle('/account/del', {
    method: HTTP_METHOD.POST,
 }),
  // 修改人员名单
  modAccounttable: reqHandle('/account/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 添加
  addPrivilege: reqHandle('/privilege/add', {
    method: HTTP_METHOD.POST,
  }),
  // 删除
  delPrivilege: reqHandle('/privilege/del', {
    method: HTTP_METHOD.POST,
  }),
  // 修改
  modPrivilege: reqHandle('/privilege/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 查询
  getPrivilege: reqHandle('/privilege/get', {
    method: HTTP_METHOD.POST,
  }),
  // 绑定角色权限
  bindRP: reqHandle('/roleprivilege/bindrp', {
    method: HTTP_METHOD.POST,
  }),
  // 解绑角色权限
  unbindRP: reqHandle('/roleprivilege/unbindrp', {
    method: HTTP_METHOD.POST,
  }),
};
