import type { LowCode } from '/@/types/schema.d';
import type { I18n } from '/@/types/i18n.d';

export namespace PcSchema {
  export interface InputSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 占位提示 */
    placeholder: I18n;
    /** 默认值 */
    defaultValue: I18n;
    /** 尺寸 */
    size: LowCode.Size;
    /** 状态 */
    behavior: LowCode.Behavior;
    /** 描述信息 */
    tips: I18n;
    /** 校验规则 */
    rules: LowCode.RuleMap;
    /** 是否显示清除按钮 */
    allowClear: boolean;
    /** 带标签的 input，设置前置标签 */
    addonBefore: I18n;
    /** 带标签的 input，设置后置标签 */
    addonAfter: I18n;
    /** 是否有边框 */
    bordered: boolean;
    /** 是否展示字数 */
    showCount: boolean;
    /** 最大长度 */
    maxlength: number;
    /** 自动去除头尾空字符 */
    trim: boolean;
    /** 自动获取焦点 */
    autofocus: boolean;
  }
  export interface InputScheme extends LowCode.NodeSchema {
    props: InputSchemeProps;
  }

  export interface InputNumberSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 占位提示 */
    placeholder: I18n;
    /** 默认值 */
    defaultValue: I18n;
    /** 尺寸 */
    size: LowCode.Size;
    /** 状态 */
    behavior: LowCode.Behavior;
    /** 描述信息 */
    tips: I18n;
    /** 校验规则 */
    rules: LowCode.RuleMap;
    /** 带标签的 input，设置前置标签 */
    addonBefore: I18n;
    /** 带标签的 input，设置后置标签 */
    addonAfter: I18n;
    /** 是否有边框 */
    bordered: boolean;
    /** 自动获取焦点 */
    autofocus: boolean;
    /** 是否显示增减按钮 */
    controls: boolean;
    /** 小数点 */
    decimalSeparator: string;
    /** 	指定输入框展示值的格式 */
    // formatter: fn;
    /** 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 */
    // parser: fu;
    /** 是否启用键盘快捷行为 */
    /** 带有前缀图标的 input */
    // prefix: string;
    /** 是否启用键盘快捷行为 */
    keyboard: boolean;
    /** 最大值 */
    max: number | null;
    /** 最小值 */
    min: number | null;
    /** 数值精度 */
    precision: number;
    /** 每次改变步数，可以为小数 */
    step: string | number;
    /** 字符值模式，开启后支持高精度小数。同时 change 事件将返回 string 类型 */
    stringMode: boolean;
  }
  export interface InputNumberScheme extends LowCode.NodeSchema {
    props: InputNumberSchemeProps;
  }

  export interface RowSchemeProps extends LowCode.NodeSchemaProps {
    /** flex 布局下的垂直对齐方式 */
    align: 'top' | 'middle' | 'bottom';
    /** flex 布局下的水平排列方式 */
    justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    /** 是否自动换行 */
    wrap: boolean;
    /**
     * 列间距
     * @description 单位: px
     */
    rowGutter: number;
    /**
     * 行间距
     * @description 单位: px
     */
    columnGutter: number;
  }
  export interface RowScheme extends LowCode.NodeSchema {
    children: ColumnScheme[];
    props: RowSchemeProps;
  }

  export interface ColumnSchemeProps extends LowCode.NodeSchemaProps {
    /** flex 布局填充 */
    flex: string | number | null;
    /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
    offset: number;
    /** 栅格顺序，flex 布局模式下有效 */
    order: number;
    /** 栅格向左移动格数 */
    pull: number;
    /** 栅格向右移动格数 */
    push: number;
    /** 栅格占位格数，为 0 时相当于 display: none */
    span: number | null;
    /** ≥2000px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xxxl: number | object | null;
    /** <576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xs: number | object | null;
    /** ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    sm: number | object | null;
    /** ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    md: number | object | null;
    /** ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    lg: number | object | null;
    /** ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xl: number | object | null;
    /** ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xxl: number | object | null;
  }
  export interface ColumnScheme extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: ColumnSchemeProps;
  }

  /** 表单容器 */
  export interface FormSchema extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: FormSchemaProps;
  }
  export interface FormSchemaProps extends LowCode.NodeSchemaProps {
    /** 数据模型, 即对应后端的表 */
    model: string;
    /** 隐藏所有表单项的必选标记 */
    hideRequiredMark: boolean;
    /** label 标签的文本对齐方式 */
    labelAlign: 'left' | 'right';
  }
}
