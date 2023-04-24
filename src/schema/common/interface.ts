import type { LowCode } from '/@/types/schema.d';
import type { I18n } from '/@/types/i18n.d';
import { RadioGroupChildOption } from 'ant-design-vue/lib/radio/Group';

export namespace PcSchema {
  export interface TextSchema extends LowCode.NodeSchema {
    props: TextSchemaProps;
  }

  export interface TextSchemaProps extends LowCode.NodeSchemaProps {
    /** 内容 */
    content: string;
    /** title */
    showTitle: boolean;
    /** 最大行数 */
    maxLine: number;
  }
  export interface ButtonGroupSchema extends LowCode.NodeSchema {
    children: ButtonSchema[];
    props: ButtonGroupSchemaProps;
  }

  export interface ButtonGroupSchemaProps extends LowCode.NodeSchemaProps {
    /** 对齐方式 */
    align: 'flex-start' | 'center' | 'flex-end';
  }

  export interface ButtonSchema extends LowCode.NodeSchema {
    props: ButtonSchemaProps;
  }

  export interface ButtonSchemaProps extends LowCode.NodeSchemaProps {
    /** 名称 */
    title: I18n;
    /** 按钮类型 */
    type: 'primary' | 'dashed' | 'link' | 'text' | 'default';
    /** 将按钮宽度调整为其父宽度的选项 */
    block: boolean;
    /** 尺寸 */
    size: LowCode.Size;
    /** 幽灵模式 */
    ghost: boolean;
    /** 设置危险按钮 */
    danger: boolean;
    /** 设置按钮载入状态 */
    loading: boolean;
  }

  export interface DividerSchemaProps extends LowCode.NodeSchemaProps {
    /** 内容 */
    content: I18n;
    /** 水平还是垂直类型 */
    type: 'horizontal' | 'vertical';
    /** 是否虚线 */
    dashed: boolean;
    /** 标题位置 */
    orientation: 'left' | 'right' | 'center';
    /** 文字是否显示为普通正文样式 */
    plain: boolean;
    /** 标题和最近 left/right 边框之间的距离 */
    orientationMargin: string | number;
  }

  export interface DividerSchema extends LowCode.NodeSchema {
    props: DividerSchemaProps;
  }

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

  export interface SwitchSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
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
    /** 自动获取焦点 */
    autofocus: boolean;
    /** 选中时的内容 */
    checkedChildren: string;
    /** 选中时的值 */
    checkedValue: boolean | string | number;
    /** 非选中时的内容 */
    unCheckedChildren: string;
    /** 非选中时的值 */
    unCheckedValue: boolean | string | number;
  }

  export interface SwitchScheme extends LowCode.NodeSchema {
    props: SwitchSchemeProps;
  }

  export interface RadioSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
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
    /** RadioButton 的风格样式，目前有描边和填色两种风格 */
    buttonStyle: 'outline' | 'solid';
    /** 用于设置 Radio options 类型 */
    optionType: 'default' | 'button';
    /** 子元素集合 */
    options: RadioGroupChildOption[];
  }
  export interface RadioScheme extends LowCode.NodeSchema {
    props: RadioSchemeProps;
  }

  export interface CheckboxSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 默认值 */
    defaultValue: I18n | I18n[];
    /** 尺寸 */
    size: LowCode.Size;
    /** 状态 */
    behavior: LowCode.Behavior;
    /** 描述信息 */
    tips: I18n;
    /** 校验规则 */
    rules: LowCode.RuleMap;
    /** 子元素集合 */
    options: RadioGroupChildOption[];
  }
  export interface CheckboxScheme extends LowCode.NodeSchema {
    props: CheckboxSchemeProps;
  }

  export interface DatePickerSchemeProps extends LowCode.NodeSchemaProps {
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
    /** 是否有边框 */
    bordered: boolean;
    /** 日期格式 */
    format: string;
    /** 绑定值的格式 */
    valueFormat: string;
    /** 不可选择的日期 */
    disabledDate:
      | string
      | {
          type: string;
          start: number;
          end: number;
        };
    /** 设置选择器类型 */
    picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
    /** 增加时间选择功能 */
    showTime: boolean;
    /** 当设定了 showTime 的时候，面板是否显示“此刻”按钮 */
    showNow: boolean;
    /** 是否展示“今天”按钮 */
    showToday: boolean;
    /** 自动获取焦点 */
    autofocus: boolean;
  }
  export interface DatePickerScheme extends LowCode.NodeSchema {
    props: DatePickerSchemeProps;
  }

  export interface RangePickerSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 占位提示 */
    placeholder: I18n[];
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
    /** 是否有边框 */
    bordered: boolean;
    /** 日期格式 */
    format: string;
    /** 绑定值的格式 */
    valueFormat: string;
    /** 不可选择的日期 */
    disabledDate:
      | string
      | {
          type: string;
          start: number;
          end: number;
        };
    /** 设置选择器类型 */
    picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
    /** 增加时间选择功能 */
    showTime: boolean;
    /** 自动获取焦点 */
    autofocus: boolean;
  }
  export interface RangePickerScheme extends LowCode.NodeSchema {
    props: RangePickerSchemeProps;
  }

  export interface RateScheme extends LowCode.NodeSchema {
    props: RateSchemeProps;
  }

  export interface RateSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 默认值 */
    defaultValue: I18n;
    /** 状态 */
    behavior: LowCode.Behavior;
    /** 描述信息 */
    tips: I18n;
    /** 校验规则 */
    rules: LowCode.RuleMap;
    /** 是否显示清除按钮 */
    allowClear: boolean;
    /** 自动获取焦点 */
    autofocus: boolean;
    /** 是否允许半选 */
    allowHalf: boolean;
    /** 自定义字符 */
    character: string | null;
    /** star 总数 */
    count: number;
    /** 自定义每项的提示信息 */
    // tooltips: string[];
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

  export interface CardSchemeProps extends LowCode.NodeSchemaProps {
    /** 卡片标题 */
    title: I18n;
    /** 是否有边框 */
    bordered: boolean;
    /** 鼠标移过时可浮起 */
    hoverable: boolean;
    /** 尺寸 */
    size: LowCode.Size;
  }
  export interface CardScheme extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: CardSchemeProps;
  }

  export interface SpaceSchemeProps extends LowCode.NodeSchemaProps {
    /** 对齐方式 */
    align: 'start' | 'end' | 'center' | 'baseline';
    /** 间距方向 */
    direction: 'vertical' | 'horizontal';
    /** 尺寸 */
    size: LowCode.Size;
  }

  export interface SpaceScheme extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: SpaceSchemeProps;
  }

  export interface CollapseSchemeProps extends LowCode.NodeSchemaProps {
    /** 默认值 */
    defaultValue: string | string[];
    /** 手风琴模式 */
    accordion: boolean;
    /** 带边框风格的折叠面板 */
    bordered: boolean;
    /** 所有子面板是否可折叠或指定可折叠触发区域 */
    collapsible: 'header' | 'disabled' | null;
    /** 销毁折叠隐藏的面板 */
    destroyInactivePanel: boolean;
    /** 图标位置 */
    expandIconPosition: 'left' | 'right';
    /** 使折叠面板透明且无边框 */
    ghost: boolean;
  }

  export interface CollapseScheme extends LowCode.NodeSchema {
    children: CollapsePanelScheme[];
    props: CollapseSchemeProps;
  }

  export interface CollapsePanelSchemeProps extends LowCode.NodeSchemaProps {
    /** 	面板头内容 */
    header: I18n;
    /** 对应 activeKey */
    key: string | number | null;
    /** 被隐藏时是否渲染 DOM 结构 */
    forceRender: boolean;
    /** 是否可折叠或指定可折叠触发区域 */
    collapsible: 'header' | 'disabled' | null;
    /** 是否展示当前面板上的箭头 */
    showArrow: boolean;
  }

  export interface CollapsePanelScheme extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: CollapsePanelSchemeProps;
  }

  export interface TabsSchemeProps extends LowCode.NodeSchemaProps {
    /** 默认值 */
    defaultValue: I18n;
    /** 页签基本样式 */
    type: 'line' | 'card';
    /** 是否使用动画切换 Tabs，在 tabPosition="top" | "bottom" 时有效 */
    animated: boolean;
    /** 标签居中展示 */
    centered: boolean;
    /** 被隐藏时是否销毁 DOM 结构 */
    destroyInactiveTabPane: boolean;
    /** 是否隐藏加号图标，在 type="editable-card" 时有效 */
    hideAdd: boolean;
    /** 大小，提供 large default 和 small 三种大小 */
    size: LowCode.Size;
    /** tabs 之间的间隙 */
    tabBarGutter: number | null;
    /** 页签位置 */
    tabPosition: 'top' | 'right' | 'bottom' | 'left';
  }

  export interface TabsScheme extends LowCode.NodeSchema {
    children: TabPaneScheme[];
    props: TabsSchemeProps;
  }

  export interface TabPaneSchemeProps extends LowCode.NodeSchemaProps {
    /** 	选项卡头显示文字 */
    tab: I18n;
    /** 对应 activeKey */
    value: string;
    /** 被隐藏时是否渲染 DOM 结构 */
    forceRender: boolean;
  }

  export interface TabPaneScheme extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: TabPaneSchemeProps;
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
