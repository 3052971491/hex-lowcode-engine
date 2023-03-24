import { reactive } from 'vue';

export interface InstanceCoreFactory {
  /** 所有组件实例集合 */
  instances: any;
  /**
   * 新增组件实例
   * @param instance Schema的class实例
   */
  setInstance(instance: any): void;
  /** 获取组件实例 */
  getInstance(id: string): any;
}

export function useInstanceCore(): InstanceCoreFactory {
  const instances = new Map([]);
  function setInstance(instance: any) {
    console.log(instance);
    const { id } = instance;
    instances.set(id, instance);
  }
  function getInstance(id: string) {
    return instances.get(id);
  }

  return {
    instances,
    setInstance,
    getInstance,
  };
}
