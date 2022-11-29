import { HTTP_METHOD } from 'configPath/index';

import { reqHandle } from 'commonPath/ajax';

export default {
  /* 分组 */
  getProduct: reqHandle('/product/get', {
    method: HTTP_METHOD.POST,
  }),
};
