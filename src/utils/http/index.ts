import { AxiosRequestConfig } from 'axios';

import VAxios from './Axios';

function createAxios(opt?: Partial<AxiosRequestConfig>) {
  return new VAxios({
    ...{
      baseURL: '/platform',
      timeout: 10 * 1000,
      requestOptions: {
        // 忽略重复请求
        ignoreCancelToken: true,
      },
    },
    ...opt,
  });
}

const http = createAxios();

export default http;
