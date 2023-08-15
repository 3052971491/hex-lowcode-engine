import { cloneDeep } from 'lodash-es';
import { computed, toRefs, unref } from 'vue';
import { IDataEngine } from '../../render-inject-key';
import { LowCode } from '/@/types/schema';
import { PcSchema } from '/@/schema/common/interface';
import { isUndefined } from '/@/utils/is';

interface Props<T> {
  schema: T;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
  subForm?: {
    schema: PcSchema.SubFormScheme;
    rowIndex: number;
  };
}
/**
 * 普通组件 - 数据引擎hooks
 */
export function useElementDataEngine<T extends LowCode.NodeSchema>(props: Props<T>, dataEngine?: IDataEngine | null) {
  const { schema, subForm } = toRefs(props);
  /** 初始化默认值 */
  function initDefaultValue() {
    // 当源数据中有值时跳过初始化默认值过程
    if (!isUndefined(modelValue.value)) return;
    if (!schema.value.props.hasOwnProperty('defaultValue')) {
      modelValue.value = undefined;
      return;
    }
    // 去掉头尾字符串
    if (schema.value.props.hasOwnProperty('trim')) {
      modelValue.value = schema.value.props.defaultValue.trim();
    } else {
      modelValue.value = schema.value.props.defaultValue;
    }
  }

  /** 是否是子表单 */
  const isSubForm = computed(() => !!unref(subForm));

  const modelValue = computed({
    set(val: any) {
      if (!dataEngine?.originData || !schema.value.props?.field) return;
      // 去空
      const result = schema.value.props?.trim && val ? val.trim() : val;
      // 组件在表单中
      if (!unref(isSubForm)) {
        dataEngine.originData[schema.value.props?.field] = result;
        return;
      }

      // 当组件在子表单中时
      if (unref(isSubForm)) {
        const { schema: subFormSchema, rowIndex } = subForm?.value as Required<Props<T>>['subForm'];
        const { field } = subFormSchema.props;
        if (field && rowIndex >= 0) {
          dataEngine.originData[field][rowIndex][schema.value.props?.field] = result;
        }
      }
    },
    get() {
      if (!dataEngine?.originData || !schema.value.props?.field) return null;
      let val;
      // 组件在表单中
      if (!unref(isSubForm)) {
        val = dataEngine.originData[schema.value.props?.field];
      }
      // 当组件在子表单中时
      if (unref(isSubForm)) {
        const { schema: subFormSchema, rowIndex } = subForm?.value as Required<Props<T>>['subForm'];
        const { field } = subFormSchema.props;
        if (field && rowIndex >= 0) {
          val = dataEngine.originData[field][rowIndex][schema.value.props?.field];
        }
      }

      // 去空
      return schema.value.props?.trim && val ? val.trim() : val;
    },
  });

  const getReadonlyData = computed(() => {
    const value = cloneDeep(modelValue.value);
    return value;
  });

  // 初始化默认值, 立即执行
  if (schema.value.props?.field) {
    initDefaultValue();
  }
  return {
    modelValue,
    getReadonlyData,
  };
}
