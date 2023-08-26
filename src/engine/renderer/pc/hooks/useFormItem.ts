import type { Rule } from 'ant-design-vue/es/form';
import { computed, nextTick, toRefs, unref } from 'vue';
import type { LowCode } from '/@/types/schema.d';
import { copyElementSchema } from '/@/utils/draggable-api';
import { PcSchema } from '/@/schema/common/interface';

interface FormItem {
  /**
   * 获取校验规则
   */
  getRules(): Rule[];
  /**
   * 获取name
   * @description 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
   */
  getName(): string;
  /** 删除当前组件 */
  onDelete(event: Event): LowCode.Schema | undefined;
  /** 复制当前组件 */
  onCopy(event: Event): LowCode.Schema | undefined;
}
interface Props {
  schema: LowCode.Schema;
  parentSchema: LowCode.Schema;
  parentSchemaList: LowCode.Schema[];
  indexOfParentList: number;
  subForm?: {
    schema: PcSchema.SubFormScheme;
    rowIndex: number;
  };
}

/**
 * a-form-item
 * @param 当前组件节点描述
 * @returns
 */
export function useFormItem(schema: LowCode.Schema, props?: Props): FormItem {
  /** 是否是子表单 */
  const isSubForm = computed(() => !!unref(props?.subForm));

  function getRules() {
    if (!schema || !schema.props?.hasOwnProperty('rules')) return [];
    const { rules } = schema.props;
    const arr: Rule[] = [];
    if (rules && rules.length > 0) {
      rules.forEach((rule: LowCode.Rule) => {
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
            obj.min = rule.value as any;
            break;
          case 'maxlength':
            obj.max = rule.value as any;
            break;
          case 'min':
            obj.validator = async (_rule: Rule, value: number) => {
              if (typeof value === 'number') {
                if (rule.value && value < Number(rule.value)) {
                  return Promise.reject(obj.message);
                }
              }
              return Promise.resolve();
            };
            break;
          case 'max':
            obj.validator = async (_rule: Rule, value: number) => {
              if (typeof value === 'number') {
                if (rule.value && value > Number(rule.value)) {
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

  function getName() {
    if (!schema.alwaysCommit && schema.props?.behavior === 'hidden') return undefined;

    if (unref(isSubForm)) {
      return [props?.subForm?.schema.props.field, props?.subForm?.rowIndex, schema.props?.field];
    }
    return schema.props?.field;
  }

  function onDelete() {
    if (!props) return undefined;
    // 判断是否有父级容器
    if (props.parentSchemaList) {
      let nextSelected: LowCode.Schema | undefined;

      if (props.parentSchemaList.length === 1) {
        // 当父级容器的children只有1项时, 则需要选中父级容器
        // 需过滤根级组件(根据是否存在componentsTree属性判断)
        if (props.parentSchema && !props.parentSchema.hasOwnProperty('componentsTree')) {
          nextSelected = props.parentSchema;
        }
      } else if (props.parentSchemaList.length === props.indexOfParentList + 1) {
        // 当删除的是父级容器的最后一个时, 则需要选中倒数第二个
        nextSelected = props.parentSchemaList[props.indexOfParentList - 1];
      } else {
        // 否则默认选中下一个
        nextSelected = props.parentSchemaList[props.indexOfParentList + 1];
      }

      // 删除当前组件, 此处写法是解决props无法直接修改, 采用中间变量, 其引用地址是相同的
      const arr = props.parentSchemaList;
      arr.splice(props.indexOfParentList, 1);
      return nextSelected;
    }
  }

  function onCopy() {
    if (!props) return undefined;
    if (props.parentSchemaList) {
      const copySelected: LowCode.Schema = copyElementSchema(props.schema);
      const arr = props.parentSchemaList;
      arr.push(copySelected);
      return copySelected;
    }
  }
  return {
    getRules,
    getName,
    onDelete,
    onCopy,
  };
}
