// eslint-disable-next-line max-classes-per-file
import type { PcSchema } from './interface';
import { Scheme } from './FieldSchemaBase';
import { buildUUID } from '/@/utils/common';
import { sfcTemplateCode } from '/@/components/hex-code-view/helper';

export enum ComponentType {
  'Text' = 'Text',
  'Image' = 'Image',
  'ButtonGroup' = 'ButtonGroup',
  'Button' = 'Button',
  'Divider' = 'Divider',
  'Alert' = 'Alert',
  'Input' = 'Input',
  'Textarea' = 'Textarea',
  'InputNumber' = 'InputNumber',
  'Switch' = 'Switch',
  'Radio' = 'Radio',
  'Checkbox' = 'Checkbox',
  'Select' = 'Select',
  'MultiSelect' = 'MultiSelect',
  'DatePicker' = 'DatePicker',
  'RangePicker' = 'RangePicker',
  'TimePicker' = 'TimePicker',
  'TimeRangePicker' = 'TimeRangePicker',
  'Rate' = 'Rate',
  'Row' = 'Row',
  'Column' = 'Column',
  'Card' = 'Card',
  'Space' = 'Space',
  'Collapse' = 'Collapse',
  'CollapsePanel' = 'CollapsePanel',
  'Tabs' = 'Tabs',
  'TabPane' = 'TabPane',
  'Form' = 'Form',
  'Vue' = 'Vue',
  'Progress' = 'Progress',
  'Table' = 'Table',
  'Modal' = 'Modal',
  'ModalContent' = 'ModalContent',
  'ModalFooter' = 'ModalFooter',
}

export class Text extends Scheme<PcSchema.TextSchema> {
  props: PcSchema.TextSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'BASIC';
    this.componentName = '文本';
    this.componentType = ComponentType.Text;
    this.props = {
      content: '文本',
      showTitle: false,
      maxLine: 0,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Image extends Scheme<PcSchema.ImageSchema> {
  props: PcSchema.ImageSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'BASIC';
    this.componentName = '图片';
    this.componentType = ComponentType.Image;
    this.props = {
      src: '',
      width: 350,
      autoWidth: false,
      height: 200,
      autoHeight: false,
      fit: 'cover',
      title: '',
      alt: 'Image 404',
      preview: true,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class ButtonGroup extends Scheme<PcSchema.ButtonGroupSchema> {
  props: PcSchema.ButtonGroupSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'BASIC';
    this.docUrl = 'https://www.antdv.com/components/button-cn';
    this.componentName = '按钮';
    this.componentType = ComponentType.ButtonGroup;
    this.children = [];
    this.props = {
      align: 'flex-start',
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Button extends Scheme<PcSchema.ButtonSchema> {
  props: PcSchema.ButtonSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'BASIC';
    this.docUrl = 'https://www.antdv.com/components/button-cn';
    this.componentName = '子按钮';
    this.componentType = ComponentType.Button;
    this.internal = false;
    this.props = {
      title: 'Default Button',
      type: 'default',
      block: false,
      size: 'middle',
      ghost: false,
      danger: false,
      loading: false,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Divider extends Scheme<PcSchema.DividerSchema> {
  props: PcSchema.DividerSchemaProps;

  constructor(_data?: any) {
    super();
    this.docUrl = 'https://www.antdv.com/components/divider-cn';
    this.tag = 'BASIC';
    this.componentName = '分割线';
    this.componentType = ComponentType.Divider;
    this.props = {
      content: '',
      type: 'horizontal',
      dashed: false,
      orientation: 'left',
      plain: false,
      orientationMargin: 0,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Alert extends Scheme<PcSchema.AlertSchema> {
  props: PcSchema.AlertSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'BASIC';
    this.componentName = '警告提示';
    this.componentType = ComponentType.Alert;
    this.props = {
      type: 'success',
      message: 'Success Text',
      description: 'Success Description Success Description Success Description',
      showIcon: false,
      closable: false,
      banner: false,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Input extends Scheme<PcSchema.InputScheme> {
  props: PcSchema.InputSchemeProps;

  constructor(_data?: any) {
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
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Textarea extends Scheme<PcSchema.InputScheme> {
  props: PcSchema.InputSchemeProps;

  constructor(_data?: any) {
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
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class InputNumber extends Scheme<PcSchema.InputNumberScheme> {
  props: PcSchema.InputNumberSchemeProps;

  constructor(_data?: any) {
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
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Switch extends Scheme<PcSchema.SwitchScheme> {
  props: PcSchema.SwitchSchemeProps;

  constructor(_data?: any) {
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
      size: 'default',
      behavior: 'normal',
      tips: '',
      rules: [],
      autofocus: false,
      checkedChildren: '',
      checkedValue: true,
      unCheckedChildren: '',
      unCheckedValue: false,
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Radio extends Scheme<PcSchema.RadioScheme> {
  props: PcSchema.RadioSchemeProps;

  constructor(_data?: any) {
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
      size: 'default',
      behavior: 'normal',
      tips: '',
      rules: [],
      buttonStyle: 'outline',
      optionType: 'default',
      options: [],
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Checkbox extends Scheme<PcSchema.CheckboxScheme> {
  props: PcSchema.CheckboxSchemeProps;

  constructor(_data?: any) {
    super();
    this.docUrl = 'https://www.antdv.com/components/checkbox-cn';
    this.componentName = '多选框';
    this.componentType = ComponentType.Checkbox;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      defaultValue: [],
      size: 'default',
      behavior: 'normal',
      tips: '',
      rules: [],
      options: [],
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Select extends Scheme<PcSchema.SelectScheme> {
  props: PcSchema.SelectSchemeProps;

  constructor(_data?: any) {
    super();
    this.docUrl = 'https://www.antdv.com/components/select-cn';
    this.componentName = '下拉选择';
    this.componentType = ComponentType.Select;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: '请输入',
      defaultValue: '',
      size: 'default',
      behavior: 'normal',
      tips: '',
      bordered: true,
      allowClear: false,
      autofocus: false,
      rules: [],
      options: [],
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class MultiSelect extends Scheme<PcSchema.MultiSelectScheme> {
  props: PcSchema.MultiSelectSchemeProps;

  constructor(_data?: any) {
    super();
    this.docUrl = 'https://www.antdv.com/components/select-cn';
    this.componentName = '下拉多择';
    this.componentType = ComponentType.MultiSelect;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: '请输入',
      defaultValue: [],
      size: 'default',
      behavior: 'normal',
      tips: '',
      bordered: true,
      allowClear: false,
      autofocus: false,
      rules: [],
      options: [],
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class DatePicker extends Scheme<PcSchema.DatePickerScheme> {
  props: PcSchema.DatePickerSchemeProps;

  constructor(_data?: any) {
    super();
    this.docUrl = 'https://www.antdv.com/components/date-picker-cn';
    this.componentName = '日期';
    this.componentType = ComponentType.DatePicker;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: '请选择',
      defaultValue: null,
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      allowClear: true,
      bordered: true,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      disabledDate: '',
      picker: 'date',
      showTime: false,
      showNow: false,
      showToday: true,
      autofocus: false,
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class RangePicker extends Scheme<PcSchema.RangePickerScheme> {
  props: PcSchema.RangePickerSchemeProps;

  constructor(_data?: any) {
    super();
    this.docUrl = 'https://www.antdv.com/components/date-picker-cn';
    this.componentName = '日期区间';
    this.componentType = ComponentType.RangePicker;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: ['开始日期', '结束日期'],
      defaultValue: null,
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      allowClear: true,
      bordered: true,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      disabledDate: '',
      picker: 'date',
      showTime: false,
      autofocus: false,
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class TimePicker extends Scheme<PcSchema.TimePickerScheme> {
  props: PcSchema.TimePickerSchemeProps;

  constructor(_data?: any) {
    super();
    this.docUrl = 'https://www.antdv.com/components/time-picker-cn';
    this.componentName = '时间';
    this.componentType = ComponentType.TimePicker;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: '请选择',
      defaultValue: null,
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      allowClear: true,
      bordered: true,
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
      showNow: false,
      use12Hours: false,
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1,
      autofocus: false,
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class TimeRangePicker extends Scheme<PcSchema.TimeRangePickerScheme> {
  props: PcSchema.TimeRangePickerSchemeProps;

  constructor(_data?: any) {
    super();
    this.docUrl = 'https://www.antdv.com/components/time-picker-cn';
    this.componentName = '时间区间';
    this.componentType = ComponentType.TimeRangePicker;
    this.formItemFlag = true;
    this.alwaysCommit = false;
    this.props = {
      field: `Field_${buildUUID()}`,
      label: this.componentName,
      placeholder: ['开始时间', '结束时间'],
      defaultValue: null,
      size: 'middle',
      behavior: 'normal',
      tips: '',
      rules: [],
      allowClear: true,
      bordered: true,
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
      showNow: false,
      use12Hours: false,
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1,
      autofocus: false,
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Rate extends Scheme<PcSchema.RateScheme> {
  props: PcSchema.RateSchemeProps;

  constructor(_data?: any) {
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
      className: '',
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

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Row extends Scheme<PcSchema.RowScheme> {
  props: PcSchema.RowSchemeProps;

  constructor(_data?: any) {
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
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Column extends Scheme<PcSchema.ColumnScheme> {
  props: PcSchema.ColumnSchemeProps;

  constructor(_data?: any) {
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
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      xxl: null,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Card extends Scheme<PcSchema.CardScheme> {
  props: PcSchema.CardSchemeProps;

  constructor(_data?: any) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/card-cn';
    this.componentName = '卡片';
    this.componentType = ComponentType.Card;
    this.children = [];
    this.formItemFlag = false;
    this.internal = true;
    this.props = {
      title: 'Card title',
      bordered: true,
      hoverable: false,
      size: 'small',
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Space extends Scheme<PcSchema.SpaceScheme> {
  props: PcSchema.SpaceSchemeProps;

  constructor(_data?: any) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/space-cn';
    this.componentName = '间距';
    this.componentType = ComponentType.Space;
    this.children = [];
    this.formItemFlag = false;
    this.internal = true;
    this.props = {
      align: 'start',
      direction: 'horizontal',
      size: 'small',
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Collapse extends Scheme<PcSchema.CollapseScheme> {
  props: PcSchema.CollapseSchemeProps;

  constructor(_data?: any) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/collapse-cn';
    this.componentName = '折叠面板';
    this.componentType = ComponentType.Collapse;
    this.children = [];
    this.formItemFlag = false;
    this.internal = true;
    this.props = {
      defaultValue: '',
      accordion: false,
      bordered: true,
      collapsible: null,
      destroyInactivePanel: true,
      expandIconPosition: 'left',
      ghost: false,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class CollapsePanel extends Scheme<PcSchema.CollapsePanelScheme> {
  props: PcSchema.CollapsePanelSchemeProps;

  constructor(_data?: any) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/collapse-cn';
    this.componentName = '子折叠面板';
    this.componentType = ComponentType.CollapsePanel;
    this.children = [];
    this.internal = false;
    this.formItemFlag = false;
    this.props = {
      header: '',
      key: null,
      forceRender: false,
      collapsible: null,
      showArrow: true,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Tabs extends Scheme<PcSchema.TabsScheme> {
  props: PcSchema.TabsSchemeProps;

  constructor(_data?: any) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/tabs-cn';
    this.componentName = '标签页';
    this.componentType = ComponentType.Tabs;
    this.children = [];
    this.formItemFlag = false;
    this.internal = true;
    this.props = {
      defaultValue: '',
      type: 'line',
      animated: false,
      centered: false,
      destroyInactiveTabPane: true,
      hideAdd: false,
      size: 'default',
      tabBarGutter: null,
      tabPosition: 'top',
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class TabPane extends Scheme<PcSchema.TabPaneScheme> {
  props: PcSchema.TabPaneSchemeProps;

  constructor(_data?: any) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/tabs-cn';
    this.componentName = '子标签页';
    this.componentType = ComponentType.TabPane;
    this.children = [];
    this.internal = false;
    this.formItemFlag = false;
    this.props = {
      tab: '',
      value: '',
      forceRender: false,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Form extends Scheme<PcSchema.FormSchema> {
  props: PcSchema.FormSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'ADVANCED';
    this.docUrl = 'https://www.antdv.com/components/form-cn';
    this.componentName = '表单';
    this.componentType = ComponentType.Form;
    this.children = [];
    this.props = {
      model: `Model_${buildUUID()}`,
      hideRequiredMark: false,
      labelAlign: 'left',
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }

  /**
   * 触发表单验证, 同 validateFields
   */
  validate(...args: any) {
    throw new Error('警告【validate】方法暂未实现');
  }

  /**
   * 移除表单项的校验结果。传入待移除的表单项的 name 属性或者 name 组成的数组，如不传则移除整个表单的校验结果
   */
  clearValidate(...args: any) {
    throw new Error('警告【clearValidate】方法暂未实现');
  }

  /**
   * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
   */
  resetFields(...args: any) {
    throw new Error('警告【resetFields】方法暂未实现');
  }

  /**
   * 触发表单验证
   */
  validateFields(...args: any) {
    throw new Error('警告【validateFields】方法暂未实现');
  }

  /**
   * 滚动到对应字段位置
   */
  scrollToField(...args: any) {
    throw new Error('警告【scrollToField】方法暂未实现');
  }
}
export class Vue extends Scheme<PcSchema.VueSchema> {
  props: PcSchema.VueSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'ADVANCED';
    this.docUrl = '';
    this.componentName = 'Vue';
    this.componentType = ComponentType.Vue;
    this.children = [];
    this.formItemFlag = false;
    this.props = {
      render: sfcTemplateCode,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Progress extends Scheme<PcSchema.ProgressSchema> {
  props: PcSchema.ProgressSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'ADVANCED';
    this.docUrl = '';
    this.componentName = 'Progress';
    this.componentType = ComponentType.Progress;
    this.children = [];
    this.formItemFlag = false;
    this.props = {
      size: 'default',
      type: 'line',
      percent: 0,
      status: 'normal',
      progressive: false,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class Table extends Scheme<PcSchema.TableSchema> {
  props: PcSchema.TableSchemaProps;

  constructor(_data?: any) {
    super();
    this.tag = 'ADVANCED';
    this.docUrl = '';
    this.componentName = 'Table';
    this.componentType = ComponentType.Table;
    this.children = [];
    this.formItemFlag = false;
    this.props = {
      title: '',
      api: '',
      rowKey: 'id',
      bordered: true,
      columns: [],
      actionColumn: {
        width: 160,
        title: '操作栏',
        fixed: 'right',
        align: 'center',
        dataIndex: 'action',
      },
      rowSelection: {
        type: 'checkbox',
      },
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class BasicColumnDto {
  title: string = '';

  dataIndex: string = '';

  fixed: boolean = false;

  width: number = 195;

  align: string = 'center';

  ellipsis: boolean = true;

  constructor(_data?: any) {
    if (_data) {
      for (const property in _data) {
        if (Object.prototype.hasOwnProperty.call(_data, property)) {
          (<any>this)[property] = (<any>_data)[property];
        }
      }
    } else {
      const field = `Field_${buildUUID()}`;
      this.title = field;
      this.dataIndex = field;
    }
  }
}

export class Modal extends Scheme<PcSchema.ModalSchema> {
  props: PcSchema.ModalSchemaProps;

  constructor(_data?: PcSchema.ModalSchema) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/modal-cn';
    this.componentName = '模态框';
    this.componentType = ComponentType.Modal;
    this.children = [];
    this.internal = false;
    this.props = {
      title: 'Basic Modal',
      visible: false,
      footer: false,
      className: '',
      __style__: '',
    };

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }

  close() {}

  success() {}
}

export class ModalContent extends Scheme<PcSchema.ModalContentSchema> {
  constructor(_data?: any) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/modal-cn';
    this.componentName = '模态框-内容区';
    this.componentType = ComponentType.ModalContent;
    this.children = [];
    this.internal = false;

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export class ModalFooter extends Scheme<PcSchema.ModalFooterSchema> {
  constructor(_data?: any) {
    super();
    this.tag = 'LAYOUT';
    this.docUrl = 'https://www.antdv.com/components/modal-cn';
    this.componentName = '模态框-操作区';
    this.componentType = ComponentType.ModalFooter;
    this.children = [];
    this.internal = false;

    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }
}

export const SchemaMap: Map<ComponentType, any> = new Map([
  [ComponentType.Text, new Text() as any],
  [ComponentType.Image, new Image() as any],
  [ComponentType.ButtonGroup, new ButtonGroup() as any],
  [ComponentType.Button, new Button() as any],
  [ComponentType.Divider, new Divider() as any],
  [ComponentType.Alert, new Alert() as any],
  [ComponentType.Input, new Input() as any],
  [ComponentType.Textarea, new Textarea() as any],
  [ComponentType.InputNumber, new InputNumber() as any],
  [ComponentType.Switch, new Switch() as any],
  [ComponentType.Radio, new Radio() as any],
  [ComponentType.Checkbox, new Checkbox() as any],
  [ComponentType.Select, new Select() as any],
  [ComponentType.MultiSelect, new MultiSelect() as any],
  [ComponentType.DatePicker, new DatePicker() as any],
  [ComponentType.RangePicker, new RangePicker() as any],
  [ComponentType.TimePicker, new TimePicker() as any],
  [ComponentType.TimeRangePicker, new TimeRangePicker() as any],
  [ComponentType.Rate, new Rate() as any],
  [ComponentType.Row, new Row() as any],
  [ComponentType.Column, new Column() as any],
  [ComponentType.Card, new Card() as any],
  [ComponentType.Space, new Space() as any],
  [ComponentType.Collapse, new Collapse() as any],
  [ComponentType.CollapsePanel, new CollapsePanel() as any],
  [ComponentType.Tabs, new Tabs() as any],
  [ComponentType.TabPane, new TabPane() as any],
  [ComponentType.Form, new Form() as any],
  [ComponentType.Vue, new Vue() as any],
  [ComponentType.Progress, new Progress() as any],
  [ComponentType.Table, new Table() as any],
  [ComponentType.Modal, new Modal() as any],
  [ComponentType.ModalContent, new ModalContent() as any],
  [ComponentType.ModalFooter, new ModalFooter() as any],
]);

export default {
  Text,
  Image,
  ButtonGroup,
  Button,
  Divider,
  Alert,
  Input,
  Textarea,
  InputNumber,
  Switch,
  Radio,
  Checkbox,
  Select,
  MultiSelect,
  DatePicker,
  RangePicker,
  TimePicker,
  TimeRangePicker,
  Rate,
  Row,
  Column,
  Card,
  Space,
  Collapse,
  CollapsePanel,
  Tabs,
  TabPane,
  Form,
  Vue,
  Progress,
  Table,
  Modal,
  ModalContent,
  ModalFooter,
} as Record<string, any>;
