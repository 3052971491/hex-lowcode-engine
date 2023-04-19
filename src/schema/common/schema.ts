// eslint-disable-next-line max-classes-per-file
import type { PcSchema } from './interface';
import { Scheme } from './FieldSchemaBase';
import { buildUUID } from '/@/utils/common';

export enum ComponentType {
  'Input' = 'Input',
  'Textarea' = 'Textarea',
  'InputNumber' = 'InputNumber',
  'Switch' = 'Switch',
  'Radio' = 'Radio',
  'Rate' = 'Rate',
  'Row' = 'Row',
  'Column' = 'Column',
  'Form' = 'Form',
}

export class Input extends Scheme<PcSchema.InputScheme> {
  props: PcSchema.InputSchemeProps;

  constructor() {
    super();
    this.docUrl = 'https://www.antdv.com/components/input-cn';
    this.componentName = '单行文本';
    this.componentType = ComponentType.Input;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: '请输入',
      defaultValue: '',
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      allowClear: true,
      addonBefore: '',
      addonAfter: '',
      bordered: true,
      showCount: false,
      maxlength: 255,
      trim: false,
      autofocus: false,
      __style__: '',
    };

    this.props.rules = [
      {
        enable: false,
        type: 'required',
        label: '必填',
        value: null,
        message: '该字段不能为空',
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
    ];
  }
}

export class Textarea extends Scheme<PcSchema.InputScheme> {
  props: PcSchema.InputSchemeProps;

  constructor() {
    super();
    this.docUrl = 'https://www.antdv.com/components/input-cn';
    this.componentName = '多行文本';
    this.componentType = ComponentType.Textarea;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: '请输入',
      defaultValue: '',
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      allowClear: true,
      addonBefore: '',
      addonAfter: '',
      bordered: true,
      showCount: false,
      maxlength: 255,
      trim: false,
      autofocus: false,
      __style__: '',
    };

    this.props.rules = [
      {
        enable: false,
        type: 'required',
        label: '必填',
        value: null,
        message: '该字段不能为空',
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
    ];
  }
}

export class InputNumber extends Scheme<PcSchema.InputNumberScheme> {
  props: PcSchema.InputNumberSchemeProps;

  constructor() {
    super();
    this.docUrl = 'https://www.antdv.com/components/input-number-cn';
    this.componentName = '数值输入';
    this.componentType = ComponentType.InputNumber;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: '请输入',
      defaultValue: null,
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      addonBefore: '',
      addonAfter: '',
      bordered: true,
      autofocus: false,
      controls: true,
      decimalSeparator: '.',
      keyboard: true,
      max: null,
      min: null,
      precision: 0,
      step: 1,
      stringMode: false,
      __style__: '',
    };

    this.props.rules = [
      {
        enable: false,
        type: 'required',
        label: '必填',
        value: null,
        message: '该字段不能为空',
      },
      {
        enable: false,
        type: 'min',
        label: '最小值',
        value: null,
        message: null,
      },
      {
        enable: false,
        type: 'max',
        label: '最大值',
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
    ];
  }
}

export class Switch extends Scheme<PcSchema.SwitchScheme> {
  props: PcSchema.SwitchSchemeProps;

  constructor() {
    super();
    this.docUrl = 'https://www.antdv.com/components/switch-cn';
    this.componentName = '开关';
    this.componentType = ComponentType.Switch;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      defaultValue: false,
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      autofocus: false,
      checkedChildren: '',
      checkedValue: true,
      unCheckedChildren: '',
      unCheckedValue: false,
      __style__: '',
    };

    this.props.rules = [
      {
        enable: false,
        type: 'required',
        label: '必填',
        value: null,
        message: '该字段不能为空',
      },
      {
        enable: false,
        type: 'custom',
        label: '自定义函数',
        value: 'function validateRule(value) { }',
        message: null,
      },
    ];
  }
}

export class Radio extends Scheme<PcSchema.RadioScheme> {
  props: PcSchema.RadioSchemeProps;

  constructor() {
    super();
    this.docUrl = 'https://www.antdv.com/components/radio-cn';
    this.componentName = '单选框';
    this.componentType = ComponentType.Radio;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      defaultValue: null,
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      buttonStyle: 'outline',
      optionType: 'default',
      options: [],
      __style__: '',
    };

    this.props.rules = [
      {
        enable: false,
        type: 'required',
        label: '必填',
        value: null,
        message: '该字段不能为空',
      },
      {
        enable: false,
        type: 'custom',
        label: '自定义函数',
        value: 'function validateRule(value) { }',
        message: null,
      },
    ];

    this.props.options = [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ];
  }
}

export class Rate extends Scheme<PcSchema.RateScheme> {
  props: PcSchema.RateSchemeProps;

  constructor() {
    super();
    this.docUrl = 'https://www.antdv.com/components/switch-cn';
    this.componentName = '评分';
    this.componentType = ComponentType.Rate;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      defaultValue: 0,
      behavior: 'normal',
      tips: '',
      allowClear: true,
      rules: [],
      autofocus: false,
      allowHalf: false,
      character: null,
      count: 5,
      __style__: '',
    };

    this.props.rules = [
      {
        enable: false,
        type: 'required',
        label: '必填',
        value: null,
        message: '该字段不能为空',
      },
      {
        enable: false,
        type: 'custom',
        label: '自定义函数',
        value: 'function validateRule(value) { }',
        message: null,
      },
    ];
  }
}

export class Row extends Scheme<PcSchema.RowScheme> {
  props: PcSchema.RowSchemeProps;

  constructor() {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/grid-cn';
    this.componentName = '栅格';
    this.componentType = ComponentType.Row;
    this.children = [];
    this.formItemFlag = false;
    this.internal = true;
    this.props = {
      align: 'top',
      justify: 'start',
      wrap: true,
      rowGutter: 0,
      columnGutter: 0,
      __style__: '',
    };
  }
}

export class Column extends Scheme<PcSchema.ColumnScheme> {
  props: PcSchema.ColumnSchemeProps;

  constructor() {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/grid-cn';
    this.componentName = '栅格列';
    this.componentType = ComponentType.Column;
    this.children = [];
    this.internal = false;
    this.formItemFlag = false;
    this.props = {
      flex: null,
      offset: 0,
      order: 0,
      pull: 0,
      push: 0,
      span: 12,
      xxxl: null,
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      xxl: null,
      __style__: '',
    };
  }
}

export class Form extends Scheme<PcSchema.FormSchema> {
  props: PcSchema.FormSchemaProps;

  constructor() {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/form-cn';
    this.componentName = '表单';
    this.componentType = ComponentType.Form;
    this.children = [];
    this.props = {
      model: `Model_${buildUUID()}`,
      hideRequiredMark: false,
      labelAlign: 'left',
      __style__: '',
    };
  }
}

export const SchemaMap: Map<ComponentType, any> = new Map([
  [ComponentType.Input, new Input() as any],
  [ComponentType.Textarea, new Textarea() as any],
  [ComponentType.InputNumber, new InputNumber() as any],
  [ComponentType.Switch, new Switch() as any],
  [ComponentType.Radio, new Radio() as any],
  [ComponentType.Rate, new Rate() as any],
  [ComponentType.Row, new Row() as any],
  [ComponentType.Column, new Column() as any],
  [ComponentType.Form, new Form() as any],
]);
