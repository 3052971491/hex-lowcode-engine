import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';

interface IUtilsContext {
  /** 组件实例集合 */
  instances: InstanceCoreFactory | undefined;
}
export class UtilsContextFactory {
  utils: IUtilsContext;

  constructor(instanceContext: InstanceCoreFactory) {
    this.utils = {
      instances: instanceContext,
    };
  }

  $(id: string) {
    const { instances } = this.utils;
    return instances?.getInstance(id);
  }
}
