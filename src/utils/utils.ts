import { Scheme } from '/@/schema/common/FieldSchemaBase';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import useModal from './shared/modal-helper';
import ModalContainer from '/@/engine/renderer/pc/schemes/modal/modal-element.vue';

interface IUtilsContext {
  /** 组件实例集合 */
  instances: InstanceCoreFactory;
}
export class Context {
  public utils: IUtilsContext;

  constructor(instanceContext: InstanceCoreFactory) {
    this.utils = {
      instances: instanceContext,
    };
  }

  $(id: string): Scheme<any> | undefined {
    const { instances } = this.utils;
    if (!instances) return undefined;
    return instances.getInstance(id);
  }

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
}
