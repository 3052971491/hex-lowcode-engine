import type { Rule } from 'ant-design-vue/es/form';
import type { LowCodeSchema } from '/@/types/schema.d';

interface FormItem {
  /**
   * 获取校验规则
   */
  getRules(): Rule[];
}

/**
 * a-form-item
 * @param 当前组件节点描述
 * @returns
 */
export function useFormItem(schema: LowCodeSchema.Schema): FormItem {
  function getRules() {
    if (!schema || !schema.props.hasOwnProperty('rules')) return [];
    const { rules } = schema.props;
    const arr: Rule[] = [];
    if (rules && rules.length > 0) {
      rules.forEach((rule: LowCodeSchema.Rule) => {
        if (!rule.enable) return;
        const obj: Rule = {
          message: rule.message ? rule.message : '',
          trigger: ['change', 'blur'],
        };
        switch (rule.type) {
          case 'required':
            obj.required = rule.enable;
            break;
          case 'minlength':
            obj.min = rule.value;
            break;
          case 'maxlength':
            obj.max = rule.value;
            break;
          case 'min':
            obj.validator = async (_rule: Rule, value: number) => {
              if (typeof value === 'number') {
                if (value < rule.value) {
                  return Promise.reject(obj.message);
                }
              }
              return Promise.resolve();
            };
            break;
          case 'max':
            obj.validator = async (_rule: Rule, value: number) => {
              if (typeof value === 'number') {
                if (value > rule.value) {
                  return Promise.reject(obj.message);
                }
              }
              return Promise.resolve();
            };
            break;
          case 'custom':
            break;
          default:
            break;
        }
        arr.push(obj);
      });
    }
    return arr;
  }
  return {
    getRules,
  };
}
