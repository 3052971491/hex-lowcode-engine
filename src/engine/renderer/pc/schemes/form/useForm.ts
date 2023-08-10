import { PcSchema } from '/@/schema/common/interface';
import { FormInstance } from 'ant-design-vue';
import { NamePath } from 'ant-design-vue/lib/form/interface';
import { reactive } from 'vue';
import { Scheme } from '/@/schema/common/FieldSchemaBase';

interface Props {
  schema: Scheme<PcSchema.FormSchema | PcSchema.FilterSchema>;
  formRef: FormInstance | undefined;
}

interface IForm {
  /** 表单数据对象 */
  state: {
    modelValue: Record<string, unknown>;
  };
  /**
   * 移除表单项的校验结果
   * @param nameList
   * @description 传入待移除的表单项的 name 属性或者 name 组成的数组，如不传则移除整个表单的校验结果
   */
  clearValidate(nameList?: NamePath): void;
  /**
   * 对整个表单进行重置
   * @param nameList
   * @description 将所有字段值重置为初始值并移除校验结果
   */
  resetFields(nameList?: NamePath): void;
  /**
   * 触发表单验证
   * @param nameList
   * @description 同 validateFields
   */
  validate(nameList?: NamePath[] | string): Promise<{
    [key: string]: any;
  }>;
  /**
   * 触发表单验证
   * @param nameList
   */
  validateFields(nameList?: NamePath[] | string): Promise<{
    [key: string]: any;
  }>;
}
/**
 * Form组件 - 专有
 * @param props
 */
export function useForm(props: Props): IForm {
  const state = reactive({
    modelValue: {},
  });
  function clearValidate(nameList?: NamePath) {
    props.formRef?.clearValidate(nameList);
  }

  function resetFields(nameList?: NamePath) {
    props.formRef?.clearValidate(nameList);
  }

  function validate(nameList?: NamePath[] | string): Promise<{
    [key: string]: any;
  }> {
    return new Promise((resolve, reject) => {
      props.formRef
        ?.validate(nameList)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function validateFields(nameList?: NamePath[] | string) {
    return props.formRef?.validateFields(nameList)!;
  }

  return {
    state,
    clearValidate,
    resetFields,
    validate,
    validateFields,
  };
}
