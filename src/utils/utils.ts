import { Scheme } from '/@/schema/common/FieldSchemaBase';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import { LowCode } from '../types/schema';

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
}
