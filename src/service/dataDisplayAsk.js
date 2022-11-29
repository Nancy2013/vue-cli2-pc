import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  getLogList: reqHandle('/loginlog/get', {
    method: HTTP_METHOD.POST,
  }),
};
