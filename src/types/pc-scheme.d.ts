import type { LowCodeScheme } from '/@/types/scheme.d';
import type { I18n } from '/@/types/i18n.d';
import type { CompositeValue } from '/@/types/value-type';

export namespace PcSchemePro {
  export interface InputProps extends LowCodeScheme.NodePCSchemeProps {
    /** 标签 */
    label?: I18n;
    /** 占位提示 */
    placeholder?: I18n;
    /** 默认值 */
    defaultValue?: I18n;
    /** 尺寸 */
    size?: LowCodeScheme.Size;
    /** 状态 */
    behavior?: LowCodeScheme.Behavior;
    /** 描述信息 */
    tips?: I18n;
    /** 校验规则 */
    rules?: LowCodeScheme.RuleMap;
    /** 是否显示清除按钮 */
    allowClear?: boolean;
    /** 带标签的 input，设置前置标签 */
    addonBefore?: I18n;
    /** 带标签的 input，设置后置标签 */
    addonAfter?: I18n;
    /** 是否有边框 */
    bordered?: boolean;
    /** 是否展示字数 */
    showCount?: boolean;
    /** 最大长度 */
    maxlength?: number;
    /** 自动去除头尾空字符 */
    trim?: boolean;
    /** 自动获取焦点 */
    autofocus?: boolean;
  }

  export interface RowProps extends LowCodeScheme.NodePCSchemeProps {
    /** flex 布局下的垂直对齐方式 */
    align?: 'top' | 'middle' | 'bottom';
    /** flex 布局下的水平排列方式 */
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    /** 是否自动换行 */
    wrap?: boolean;
    /**
     * 列间距
     * @description 单位: px
     */
    rowGutter?: number;
    /**
     * 行间距
     * @description 单位: px
     */
    columnGutter?: number;
  }

  export interface ColumnProps extends LowCodeScheme.NodeSchemeProps {
    /** flex 布局填充 */
    flex?: string | number | null;
    /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
    offset?: number;
    /** 栅格顺序，flex 布局模式下有效 */
    order?: number;
    /** 栅格向左移动格数 */
    pull?: number;
    /** 栅格向右移动格数 */
    push?: number;
    /** 栅格占位格数，为 0 时相当于 display: none */
    span?: number | null;
    /** ≥2000px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xxxl?: number | object | null;
    /** <576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xs?: number | object | null;
    /** ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    sm?: number | object | null;
    /** ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    md?: number | object | null;
    /** ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    lg?: number | object | null;
    /** ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xl?: number | object | null;
    /** ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xxl?: number | object | null;
  }

  export interface PcSchemeProProps extends InputProps, RowProps, ColumnProps {
    [key: string]: CompositeValue;
  }
}
