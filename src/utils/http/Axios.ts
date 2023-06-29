import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { cloneDeep } from 'lodash-es';
import { message, Modal } from 'ant-design-vue';
import { h } from 'vue';

/**
 * 接口返回统一类型
 */
export interface HttpResponse<T = any> {
  /** 状态码 */
  code: number;
  /** 类型 */
  type?: 'success' | 'error' | 'warning';
  /** 信息 */
  message: string;
  /** 数据 */
  result: T;
}
/** 弹框提示类型 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
function checkStatus(status: number | undefined, msg: string, errorMessageMode: ErrorMessageMode = 'modal') {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      // ErrMsg401
      errMessage = msg || '用户没有权限(令牌、用户名、密码错误)';
      break;
    case 403:
      // ErrMsg403
      errMessage = '用户得到授权, 但是访问是被禁止的';
      break;
    // 404请求不存在
    case 404:
      // ErrMsg404
      errMessage = '网络请求错误, 未找到该资源';
      break;
    case 405:
      // ErrMsg405
      errMessage = '网络请求错误, 请求方法未允许';
      break;
    case 408:
      // ErrMsg408
      errMessage = '网络请求超时';
      break;
    case 500:
      // ErrMsg500
      errMessage = '服务器错误, 请联系管理员';
      break;
    case 501:
      // ErrMsg501
      errMessage = '网络未实现';
      break;
    case 502:
      // ErrMsg502
      errMessage = '网络错误';
      break;
    case 503:
      // ErrMsg503
      errMessage = '服务不可用, 服务器暂时过载或维护';
      break;
    case 504:
      // ErrMsg504
      errMessage = '网络超时';
      break;
    case 505:
      // ErrMsg505
      errMessage = 'HTTP版本不支持该请求';
      break;
    default:
  }
  if (errMessage) {
    if (errorMessageMode === 'message') {
      message.error({
        content: errMessage || 'Error',
      });
    } else if (errorMessageMode === 'modal') {
      Modal.error({
        width: '600px',
        title: 'ErrorTip',
        content: () => h('div', { style: { wordBreak: 'break-all' } }, errMessage || 'Error'),
      });
    }
  }
}
function responseInterceptorsCatch(error: AxiosResponse<AxiosError> | any) {
  const errorMessageMode = 'message';
  const { response, message } = error || {};
  if (error.code === 'ERR_NETWORK') {
    checkStatus(502, message, 'message');
  } else if (error.code === 'ERR_BAD_REQUEST') {
    checkStatus(404, message, 'message');
  } else {
    checkStatus(response, message, errorMessageMode);
  }
  return Promise.reject(error);
}

export default class VAxios {
  private axiosInstance: AxiosInstance;

  private options: AxiosRequestConfig | undefined;

  constructor(options?: AxiosRequestConfig) {
    if (options) {
      this.options = options;
      this.axiosInstance = axios.create(this.options);
    } else {
      this.axiosInstance = axios.create();
    }
    this.setupInterceptor();
  }

  private setupInterceptor(): void {
    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use(
      (conf: InternalAxiosRequestConfig) => {
        return conf;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((response: AxiosResponse<any>) => {
      return response.data;
    }, responseInterceptorsCatch);
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  request<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
    const conf: AxiosRequestConfig = cloneDeep(config);

    const opt: AxiosRequestConfig = { ...conf, ...options };

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<HttpResponse>>(opt)
        .then((res: AxiosResponse<HttpResponse>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }
}
