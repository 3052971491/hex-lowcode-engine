// eslint-disable-next-line max-classes-per-file
import type { PcSchema } from './interface';
import { Scheme } from './FieldSchemaBase';

export enum ComponentType {
  'Input' = 'Input',
  'Textarea' = 'Textarea',
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
    this.props = {
      label: this.componentName,
      placeholder: '',
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
    this.props = {
      label: this.componentName,
      placeholder: '',
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
      hideRequiredMark: false,
      labelAlign: 'left',
      __style__: '',
    };
  }
}

export const SchemaMap: Map<ComponentType, any> = new Map([
  [ComponentType.Input, new Input() as any],
  [ComponentType.Textarea, new Textarea() as any],
  [ComponentType.Row, new Row() as any],
  [ComponentType.Column, new Column() as any],
  [ComponentType.Form, new Form() as any],
]);
