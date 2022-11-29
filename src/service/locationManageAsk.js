import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 查询
  getProject: reqHandle('/project/get', {
    method: HTTP_METHOD.POST,
  }),
};
