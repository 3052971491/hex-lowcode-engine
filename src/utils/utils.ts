import { Scheme } from '/@/schema/common/FieldSchemaBase';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import useModal from './shared/modal-helper';
import ModalContainer from '/@/engine/renderer/pc/schemes/modal/modal-element.vue';
import { cloneDeep, forIn, isObject } from 'lodash-es';

interface IUtilsContext {
  /** 组件实例集合 */
  instances: InstanceCoreFactory;
}
export class Context {
  public utils: IUtilsContext;

  public state: Record<string, unknown>;

  constructor(instanceContext: InstanceCoreFactory, _state_: Record<string, unknown> = {}) {
    // 方法
    this.utils = {
      instances: instanceContext,
    };

    // 全局变量
    this.state = cloneDeep(_state_);

    // 全局数据源
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
}
