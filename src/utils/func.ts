import { JSFunction } from '/@/types/value-type';
import { unref } from 'vue';
import { RuntimeDataSourceConfig } from '../types/data-source/data-source-runtime';
import { isURL, to } from './common';
import http from './http';
import { __DataHandler__, __WillFetch__, __FitHandler__, __ErrorHandler__ } from '/@/utils/shared/const';

export function BuildFunction(name: string, ...args: any) {
  const code = `try {
    ${args[args.length - 1]}
    ${name ? `return ${name}()` : ''}
  } catch (error) {
    console.error(error);
  }`;
  args[args.length - 1] = code;
  const result = new Function(...args);
  return result;
}

export function func(...args: any) {
  const jsCode = `try {
  ${args[args.length - 1]}
} catch (error) {
  console.error(error);
}`;
  args[args.length - 1] = jsCode;
  return new Function(...args);
}

/**
 * 将方法字符串解析成对象
 * @param code 方法字符串
 * @param context 上下文
 * @returns
 */
export function StringParsedToFunction(
  code: string,
  context: any = null,
): {
  [key: string]: JSFunction;
} {
  // 匹配所有以export function 开头, { 结尾的字符串
  const regExp = /export function.*{/g;
  const result = code.match(regExp);

  // 所有方法的名称
  const functionName: string[] =
    result?.map((res: string) => {
      const flag = 'export function';
      const first = res.indexOf(flag);
      if (first === -1) {
        return '';
      }
      const last = res.indexOf('(');
      if (last === -1) {
        return '';
      }
      return res.substring(flag.length, last).trim();
    }) ?? [];
  let originCode = code;
  // 去除export
  originCode = originCode.replaceAll('export', '');
  const assemblyCode = `return function () {
  ${originCode}
  return {
    ${functionName.join(',')}
  }
}`;

  const res = BuildFunction('', assemblyCode).call(context);
  const methods = res();

  const obj: {
    [key: string]: JSFunction;
  } = {};
  for (const key in methods) {
    if (Object.prototype.hasOwnProperty.call(methods, key)) {
      obj[key] = {
        type: 'JSFunction',
        value: methods[key].toString(),
      };
    }
  }

  return obj;
}

export function run(code?: string, context: any = null): Object {
  if (code) {
    // 匹配所有以export function 开头, { 结尾的字符串
    const regExp = /export function.*{/g;
    const result = code.match(regExp);

    // 所有方法的名称
    const functionName: string[] =
      result?.map((res: string) => {
        const flag = 'export function';
        const first = res.indexOf(flag);
        if (first === -1) {
          return '';
        }
        const last = res.indexOf('(');
        if (last === -1) {
          return '';
        }
        return res.substring(flag.length, last).trim();
      }) ?? [];
    let originCode = code;
    // 去除export
    originCode = originCode.replaceAll('export', '');
    const assemblyCode = `return function () {
      ${originCode}
      return {
        ${functionName.join(',')}
      }
    }`;
    const res = BuildFunction('', assemblyCode).call(context);
    return res();
  }
  return {};
}

function createStyleSheet() {
  const head = document.head || document.getElementsByTagName('head')[0];
  const oldStyle = document.getElementById('hex-lowcode-engine');
  if (oldStyle) {
    head.removeChild(oldStyle);
  }
  const style = document.createElement('style');
  style.setAttribute('data-for', 'page');
  style.setAttribute('id', 'hex-lowcode-engine');

  return [head, style];
}

/** 全局注册样式 */
export function registerGlobalStyle(css = '') {
  const [head, style] = createStyleSheet();
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}

export function removeGlobalStyle() {
  const head = document.getElementsByTagName('head')[0];
  const oldStyle = document.getElementById('hex-lowcode-engine');
  if (oldStyle) {
    head.removeChild(oldStyle);
  }
}

/**
 * 执行数据源请求
 * @param dataSource 远程 API 配置
 * @param root 根实例
 * @param params 请求参数
 * @param context 全局上下文
 * @returns
 */
export async function load(
  dataSource: RuntimeDataSourceConfig,
  root: any,
  params: Record<string, unknown> = {},
  context: any = {},
): Promise<any> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // eslint-disable-next-line prefer-const
    let config: Record<string, unknown> = {
      baseURL: isURL(dataSource.options.api || '') ? undefined : root.config.remoteUrl,
      url: dataSource.options.api,
      method: dataSource.options.method,
    };

    // 参数
    if (dataSource.options.params) {
      if (['GET', 'DELETE'].includes(dataSource.options.method || '')) {
        config.params = unref(Object.assign(dataSource.options.params, params));
      } else {
        config.data = unref(Object.assign(dataSource.options.params, params));
      }
    }
    if (dataSource.willFetch) {
      // 请求发送前处理函数
      const willFetch = async () => {
        let assemblyCode = '';
        if (!dataSource.willFetch) {
          assemblyCode = __WillFetch__;
        } else {
          assemblyCode = dataSource.willFetch;
        }
        func('vars', 'config', (assemblyCode += 'willFetch(vars, config)')).call(
          {},
          ['GET', 'DELETE'].includes(dataSource.options.method || '') ? config.params : config.data,
          config,
        );
        return config;
      };
      const [willFetchError, willFetchData] = await to(willFetch());
      if (willFetchError) {
        reject(willFetchError);
      }
      config = willFetchData!;
    }

    http
      .request(config)
      .then(async (res) => {
        // eslint-disable-next-line prefer-const
        let result: any = res;
        if (dataSource.fitHandler) {
          // 数据适配
          const fit = async () => {
            let assemblyCode = dataSource.fitHandler ? dataSource.fitHandler : __FitHandler__;
            const re = func('response', (assemblyCode += 'response = fit(response);return response;')).call(
              context,
              result,
            );
            result = re;
            return result;
          };
          const [fitError, fitData] = await to(fit());
          if (fitError) {
            reject(fitError);
          }
          result = fitData;
        }
        if (!result?.success) {
          reject(result.error);
        }
        if (dataSource.dataHandler) {
          // 请求完成回调函数
          const didFetch = async () => {
            let assemblyCode = dataSource.dataHandler ? dataSource.dataHandler : __DataHandler__;
            const re = func('content', (assemblyCode += 'content = didFetch(content);return content;')).call(
              context,
              result.content,
            );
            result = re;
            return result;
          };
          const [didFetchError, didFetchData] = await to(didFetch());
          if (didFetchError) {
            reject(didFetchError);
          }
          result = didFetchData;
        }

        resolve(result.content);
      })
      .catch(async (error) => {
        if (dataSource.errorHandler) {
          // 请求错误处理函数
          const onError = async () => {
            let assemblyCode = dataSource.errorHandler ? dataSource.errorHandler : __ErrorHandler__;
            assemblyCode += 'error = onError(error);return error;';
            return func('error', assemblyCode).call(context, error);
          };
          const [onErrorError, onErrorData] = await to(onError());
          if (onErrorError) {
            reject(onErrorError);
          }
          reject(onErrorData);
        }
        reject(error);
      });
  });
}

/**
 * 串行执行远程 API
 * @param arr 远程API组
 * @param root 根实例
 * @param context 全局上下文
 */
export function iteratorPromise(arr: RuntimeDataSourceConfig[], root: any, context: any = {}) {
  let resolve = Promise.resolve();
  arr.forEach((element) => {
    resolve = resolve.then(() => load(element, root, {}, context));
  });
}
