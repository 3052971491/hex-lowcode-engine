import { cloneDeep } from 'lodash-es';
import { computed, ComputedRef, onMounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { IDataEngine } from '../../render-inject-key';
import { LowCode } from '/@/types/schema';

interface Props<T> {
  schema: ComputedRef<T>;
}
/**
 * 普通组件 - 数据引擎hooks
 */
export function useElementDataEngine<T extends LowCode.NodeSchema>(schema: T, dataEngine?: IDataEngine | null) {
  /** 初始化默认值 */
  function initDefaultValue() {
    if (!schema.props?.defaultValue) {
      modelValue.value = undefined;
      return;
    }
    // 去掉头尾字符串
    if (schema.props.hasOwnProperty('trim')) {
      modelValue.value = schema.props.defaultValue.trim();
    } else {
      modelValue.value = schema.props.defaultValue;
    }
  }
  const modelValue = computed({
    set(val: any) {
      if (dataEngine?.originData) {
        dataEngine.originData[schema.props?.field] = schema.props?.trim && val ? val.trim() : val;
      }
    },
    get() {
      if (dataEngine?.originData) {
        const val = dataEngine.originData[schema.props?.field];
        if (val) {
          return schema.props?.trim && val ? val.trim() : val;
        }
      }
      return null;
    },
  });

  const getReadonlyData = computed(() => {
    const value = cloneDeep(modelValue.value);
    return value;
  });

  // 初始化默认值, 立即执行
  if (schema.props?.field) {
    initDefaultValue();
  }
  return {
    modelValue,
    getReadonlyData,
    initDefaultValue,
  };
}
