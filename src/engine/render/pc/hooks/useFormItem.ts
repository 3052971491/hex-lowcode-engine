import type { Rule } from 'ant-design-vue/es/form';
import type { LowCodeScheme } from '/@/types/scheme.d';
import { RuleType } from '/@lowcode-engine/enum/element-option-enum';

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
export function useFormItem(scheme: LowCodeScheme.Scheme): FormItem {
  function getRules() {
    if (!scheme || !scheme.props.hasOwnProperty('rules')) return [];
    const { rules } = scheme.props;
    const arr: Rule[] = [];
    if (rules && rules.length > 0) {
      rules.forEach((rule: LowCodeScheme.Rule) => {
        if (!rule.enable) return;
        const obj: Rule = {
          message: rule.message ? rule.message : '',
          trigger: ['change', 'blur'],
        };
        switch (rule.type) {
          case RuleType.REQUIRED:
            obj.required = rule.enable;
            break;
          case RuleType.MINLENGTH:
            obj.min = rule.value;
            break;
          case RuleType.MAXLENGTH:
            obj.max = rule.value;
            break;
          case RuleType.MIN:
            obj.validator = async (_rule: Rule, value: number) => {
              if (typeof value === 'number') {
                if (value < rule.value) {
                  return Promise.reject(obj.message);
                }
              }
              return Promise.resolve();
            };
            break;
          case RuleType.MAX:
            obj.validator = async (_rule: Rule, value: number) => {
              if (typeof value === 'number') {
                if (value > rule.value) {
                  return Promise.reject(obj.message);
                }
              }
              return Promise.resolve();
            };
            break;
          case RuleType.CUSTOM:
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
