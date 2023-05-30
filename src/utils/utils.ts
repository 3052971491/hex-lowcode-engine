import { Scheme } from '/@/schema/common/FieldSchemaBase';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import useModal from './shared/modal-helper';
import ModalContainer from '/@/engine/renderer/pc/schemes/modal/modal-element.vue';
import { cloneDeep, isArray, isObject } from 'lodash-es';
import { RuntimeDataSourceConfig } from '../types/data-source/data-source-runtime';
import { message } from 'ant-design-vue';
import { MessageInstance } from 'ant-design-vue/lib/message';
import http from '/@/utils/http';
import { isURL } from './common';

interface IUtilsContext {
  /** 组件实例集合 */
  instances: InstanceCoreFactory;
  /** ant-design-vue Message 全局提示 */
  message: MessageInstance;
  /** 获取当前的语言环境 */
  getLocale(): string;
  /** 格式化 */
  formatter(): string;
}

/** 执行数据源请求 */
function load(dataSource: RuntimeDataSourceConfig, root: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const config: Record<string, unknown> = {
      baseURL: isURL(dataSource.options.api || '') ? undefined : root.config.remoteUrl,
      url: dataSource.options.api,
      method: dataSource.options.method,
    };

    // 参数
    if (dataSource.options.params) {
      if (['GET', 'DELETE'].includes(dataSource.options.method || '')) {
        config.params = dataSource.options.params;
      } else {
        config.data = dataSource.options.params;
      }
    }
    // 请求发送前处理函数
    const willFetch = () => {};
    willFetch();
    http
      .request(config)
      .then((res) => {
        // 数据适配
        const fit = () => {};
        fit();

        // 请求完成回调函数
        const didFetch = () => {};
        didFetch();
        resolve(dataSource.name);
      })
      .catch((error) => {
        // 请求错误处理函数
        const onError = () => {};
        onError();
      });
  });
}

/** 串行执行远程 API */
function iteratorPromise(arr: RuntimeDataSourceConfig[], root: any) {
  let resolve = Promise.resolve();
  arr.forEach((element) => {
    resolve = resolve.then(() => load(element, root));
  });
}

export class Context {
  public utils: IUtilsContext;

  public state: Record<string, unknown>;

  public dataSourceMap: RuntimeDataSourceConfig[];

  constructor(
    instanceContext: InstanceCoreFactory,
    _state_: Record<string, unknown> = {},
    _dataSourceMap: RuntimeDataSourceConfig[] = [],
  ) {
    // 方法
    this.utils = {
      instances: instanceContext,
      message,
      getLocale: () => {
        return this.root().config.i18n;
      },
      formatter: () => {
        return '';
      },
    };

    // 全局变量
    this.state = cloneDeep(_state_);

    // 全局数据源
    this.dataSourceMap = cloneDeep(_dataSourceMap);
  }

  /**
   * 获取组件实例
   * @param id 组件唯一标识
   * @returns
   */
  $(id: string): Scheme<any> | undefined {
    const { instances } = this.utils;
    if (!instances) return undefined;
    return instances.getInstance(id);
  }

  /** 获取渲染器实例 */
  root() {
    const { instances } = this.utils;
    if (!instances) return undefined;
    return instances.getRootInstance();
  }

  /**
   * 开启模态框
   * @param modalId 弹框唯一标识
   * @param props props传参
   * @param opt模态框配置
   */
  showModal(modalId: string, props: any = {}, opt: any = {}) {
    return new Promise((resolve) => {
      // 获取模态框Schema
      const component = this.$(modalId);

      // 更新模态框配置
      opt.visible = true;
      for (const key in opt) {
        if (Object.prototype.hasOwnProperty.call(opt, key)) {
          const element = opt[key];
          component?.set(key, element);
        }
      }

      // todo 执行开启前回调

      // 开启弹框
      const { modalHelper } = useModal();

      // 获取视图实例
      const root = this.root();

      modalHelper.value
        .create(
          ModalContainer,
          {
            schema: component,
            redactState: false,
            projectSchema: root,
            ...props,
          },
          { title: component?.props.title },
        )
        .then((res) => {
          resolve(res);
        });

      // todo 执行关闭后回调
    });
  }

  /**
   * 设置全局变量
   * @param value 值
   */
  setState(value: Record<string, unknown>) {
    if (!isObject(value)) return;
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        if (!this.state.hasOwnProperty(key)) {
          throw new Error(`数据源-变量中不存在参数: ${key}`);
        }
        const element = value[key];
        this.state[key] = element;
      }
    }
  }

  /**
   * 重新请求所有自动加载设置为 true 的远程 API
   */
  reloadDataSource() {
    const automaticDataSourceMap = this.dataSourceMap.filter((item) => item.isInit);

    /** 串行 */
    let serial: RuntimeDataSourceConfig[] = [];
    /** 并行 */
    const parallel: RuntimeDataSourceConfig[] = [];

    const result: any[] = [];

    automaticDataSourceMap.forEach((item, index) => {
      if (item.isSync) {
        serial.push(item);
      } else {
        parallel.push(item);
        result.push(item);
      }

      if (index + 1 !== automaticDataSourceMap.length) {
        if (automaticDataSourceMap[index + 1].isSync !== item.isSync) {
          if (serial.length > 0) {
            result.push(serial);
            serial = [];
          }
        }
      } else if (serial.length > 0) {
        result.push(serial);
        serial = [];
      }
    });

    // 执行远程 API
    result.forEach((item) => {
      if (isArray(item) && item.length > 0) {
        iteratorPromise(item, this.root());
      } else if (item) {
        load(item, this.root());
      }
    });
  }

  http(name: string): Promise<any> {
    const index = this.dataSourceMap.findIndex((item) => item.name === name);
    if (index !== -1) {
      return load(this.dataSourceMap[index], this.root());
    }
    return Promise.reject(new Error(`数据源-远程 API中不存在: ${name}`));
  }
}
