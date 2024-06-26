import { Scheme } from '/@/schema/common/FieldSchemaBase';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import useModal from './shared/modal-helper';
import ModalContainer from '/@/engine/renderer/pc/schemes/modal/modal-element.vue';
import { cloneDeep, isArray, isObject } from 'lodash-es';
import { RuntimeDataSourceConfig } from '../types/data-source/data-source-runtime';
import { message } from 'ant-design-vue';
import { MessageInstance } from 'ant-design-vue/lib/message';
import { iteratorPromise, load } from './func';
import { isUndefined } from './is';

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

export class Context {
  public utils: IUtilsContext;

  public state: Record<string, unknown>;

  public dataSourceMap: RuntimeDataSourceConfig[];

  public params: any = {};

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
   * @param extraId 可选, 用于子表单, 子表单中的组件
   * @param rowIndex 可选, 用于子表单, 当前行
   * @returns
   */
  $(id: string, extraId?: string, rowIndex?: number): Scheme<any> | undefined {
    const { instances } = this.utils;
    if (!instances) return undefined;
    if (!isUndefined(extraId) && !isUndefined(rowIndex)) {
      return instances.getInstance(`${id}@${extraId}@${rowIndex}`);
    }
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
        iteratorPromise(item, this.root(), this);
      } else if (item) {
        load(item, this.root(), {}, this);
      }
    });
  }

  /**
   * 加载数据源
   * @param name Api过滤标识
   * @param params 请求参数
   * @param idProperty 属性名: 获取Api过滤标识
   * @returns
   */
  http(name: string, params: Record<string, unknown> = {}, idProperty: any = 'name'): Promise<any> {
    const index = this.dataSourceMap.findIndex((item) => item[idProperty] === name);
    if (index !== -1) {
      return load(this.dataSourceMap[index], this.root(), params, this);
    }
    return Promise.reject(new Error(`数据源-远程 API中不存在: ${name}`));
  }
}
