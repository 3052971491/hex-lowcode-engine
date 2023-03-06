import { computed, ComputedRef } from 'vue';
import { IDataEngine } from '../../render-inject-key';
import { LowCode } from '/@/types/schema';

interface Props<T> {
  schema: ComputedRef<T>;
}
/**
 * 普通组件 - 数据引擎hooks
 */
export function useElementDataEngine<T extends LowCode.NodeSchema>(schema: T, dataEngine?: IDataEngine | null) {
  const modelValue = computed({
    set(val) {
      if (dataEngine?.originData) {
        dataEngine.originData[schema.props?.field] = val;
      }
    },
    get() {
      if (dataEngine?.originData) {
        return dataEngine.originData[schema.props?.field];
      }
      return '';
    },
  });
  return {
    modelValue,
  };
}
