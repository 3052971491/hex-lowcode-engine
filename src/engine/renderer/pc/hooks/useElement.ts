import type { LowCode } from '/@/types/schema.d';
import { cloneDeep } from 'lodash-es';
import { computed } from 'vue';
import ElementWrapper from '../components/element-wrapper.vue';

interface Props<T> {
  schema: T;
}
/**
 * 组件
 * @param props
 * @returns
 */
export function useElement<T extends LowCode.NodeSchema>(props: Props<T>) {
  const ectype = computed((): T => {
    return cloneDeep(props.schema);
  });
  return { ElementWrapper, ectype };
}
