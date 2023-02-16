/** 大小 */
export enum Size {
  /** 小 */
  SMALL = 'small',
  /** 众中 */
  MIDDLE = 'middle',
  /** 大 */
  LARGE = 'large',
}

/** 文本对齐方式 */
export enum TextAlign {
  /** 居左 */
  LEFT = 'left',
  /** 局中 */
  CENTER = 'center',
  /** 居右 */
  RIGHT = 'right',
}

/** 表单 label 标签的文本对齐方式 */
export enum LabelAlign {
  /** 居左 */
  LEFT = 'left',
  /** 居右 */
  RIGHT = 'right',
}

export enum Layout {
  /** 垂直 */
  HORIZONTAL = 'horizontal',
  /** 水平 */
  VERTICAL = 'vertical',
}
/** 状态 */
export enum Behavior {
  /** 正常态，即输入态 */
  NORMAL = 'normal',
  /** 只读态 */
  READONLY = 'readonly',
  /** 禁用态 */
  DISABLED = 'disabled',
  /** 隐藏态 */
  HIDDEN = 'hidden',
}

/** 规则类型 */
export enum RuleType {
  /** 必填 */
  REQUIRED = 'required',
  /** 最小值 */
  MIN = 'min',
  /** 最大值 */
  MAX = 'max',
  /** 最小长度 */
  MINLENGTH = 'minlength',
  /** 最大长度 */
  MAXLENGTH = 'maxlength',
  /** 自定义 */
  CUSTOM = 'custom',
}
