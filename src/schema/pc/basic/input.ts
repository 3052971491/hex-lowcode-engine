import type { LowCodeSchema } from '/@/types/schema.d';
/**
 * Input 单行文本
 * 参考地址: https://www.antdv.com/components/input-cn
 */
const Input: LowCodeSchema.Schema = {
  device: 'PC',
  tag: 'BASIC',
  description: '',
  docUrl: 'https://www.antdv.com/components/input-cn',
  componentName: '单行文本',
  componentType: 'Input',
  icon: '',
  iconType: 'DEFAULT',
  formItemFlag: true,
  id: '',
  props: {
    label: '单行文本',
    placeholder: null,
    defaultValue: null,
    size: 'middle',
    behavior: 'normal',
    tips: null,
    rules: [
      {
        enable: false,
        type: 'required',
        label: '必填',
        value: null,
        message: null,
      },
      {
        enable: false,
        type: 'minlength',
        label: '最小长度',
        value: null,
        message: null,
      },
      {
        enable: false,
        type: 'maxlength',
        label: '最大长度',
        value: null,
        message: null,
      },
      {
        enable: false,
        type: 'custom',
        label: '自定义函数',
        value: 'function validateRule(value) { }',
        message: null,
      },
    ],
    allowClear: true,
    addonBefore: null,
    addonAfter: null,
    bordered: true,
    showCount: false,
    maxlength: 200,
    trim: false,
    autofocus: false,
    __style__: '',
  },
  condition: true,
};

export default Input;
