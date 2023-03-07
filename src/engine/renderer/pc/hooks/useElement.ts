import type { LowCode } from '/@/types/schema.d';
import { cloneDeep } from 'lodash-es';
import { computed, ComputedRef } from 'vue';
import ElementWrapper from '../components/element-wrapper.vue';

interface Props<T> {
  schema: T;
}
interface IElement<T> {
  /** 组件副本 */
  ectype: ComputedRef<T>;
  /** 组件包裹容器 */
  ElementWrapper: any;
  /** 注册监听事件 */
  registerEvent(): void;
  /** 注册生命周期OnMounted */
  registerOnCreated(): void;
  /** 注册生命周期OnMounted */
  registerOnMounted(): void;
  /** 注册当前组件实例 */
  registerInstance(): void;
  /** 注销当前组件实例 */
  unregisterInstance(): void;
}
/**
 * 组件
 * @param props
 * @returns
 */
export function useElement<T extends LowCode.NodeSchema>(props: Props<T>): IElement<T> {
  const ectype = computed((): T => {
    return cloneDeep(props.schema);
  });

  function registerEvent() {}
  function registerOnCreated() {}
  function registerOnMounted() {}
  function registerInstance() {}
  function unregisterInstance() {}

  return {
    ectype,
    ElementWrapper,
    registerEvent,
    registerOnCreated,
    registerOnMounted,
    registerInstance,
    unregisterInstance,
  };
}
