import { Scheme } from '/@/schema/common/FieldSchemaBase';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import { LowCode } from '../types/schema';

interface IUtilsContext<T extends LowCode.NodeSchema> {
  /** 组件实例集合 */
  instances: InstanceCoreFactory;
}
export class Context<T extends LowCode.NodeSchema> {
  public utils: IUtilsContext<T>;

  constructor(instanceContext: InstanceCoreFactory) {
    this.utils = {
      instances: instanceContext,
    };
  }

  $(id: string): Scheme<T> | undefined {
    const { instances } = this.utils;
    console.log(instances);
    if (!instances) return undefined;
    return instances.getInstance(id);
  }
}
