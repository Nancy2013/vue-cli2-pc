import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 添加
  addDevice: reqHandle('/device/add', {
    method: HTTP_METHOD.POST,
  }),
  // 删除
  delDevice: reqHandle('/device/del', {
    method: HTTP_METHOD.POST,
  }),
  // 修改
  modDevice: reqHandle('/device/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 查询
  getDevice: reqHandle('/device/get', {
    method: HTTP_METHOD.POST,
  }),
  // 设备控制
  devControl: reqHandle('/devcontrol/control', {
    method: HTTP_METHOD.POST,
  }),
};
