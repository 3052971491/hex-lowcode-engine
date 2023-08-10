import type { LowCode } from '/@/types/schema.d';
import type { I18n } from '/@/types/i18n.d';
import { RadioGroupChildOption } from 'ant-design-vue/lib/radio/Group';
import { ActionItem, BasicColumn } from '/@/components/hex-table';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';

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
  export interface ImageSchema extends LowCode.NodeSchema {
    props: ImageSchemaProps;
  }

  export interface ImageSchemaProps extends LowCode.NodeSchemaProps {
    /** 图片地址 */
    src: string;
    /** 宽度 */
    width: number;
    /** 自适应宽度 */
    autoWidth: boolean;
    /** 高度 */
    height: number;
    /** 自适应高度 */
    autoHeight: boolean;
    /** 摆放方式 */
    fit: string;
    /** title */
    title: string;
    /** 图像描述 */
    alt: string;
    /** 开启图片预览 */
    preview: boolean;
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

  export interface AlertSchemaProps extends LowCode.NodeSchemaProps {
    /** 指定警告提示的样式 */
    type: 'success' | 'info' | 'warning' | 'error';
    /** 警告提示内容 */
    message: I18n;
    /** 警告提示的辅助性文字介绍 */
    description: I18n;
    /** 是否显示辅助图标 */
    showIcon: boolean;
    /** 默认不显示关闭按钮 */
    closable: boolean;
    /** 是否用作顶部公告 */
    banner: boolean;
  }

  export interface AlertSchema extends LowCode.NodeSchema {
    props: AlertSchemaProps;
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
  export interface SelectScheme extends LowCode.NodeSchema {
    props: SelectSchemeProps;
  }

  export interface SelectSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 占位提示 */
    placeholder: I18n;
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
    /** 是否显示清除按钮 */
    allowClear: boolean;
    /** 是否有边框 */
    bordered: boolean;
    /** 自动获取焦点 */
    autofocus: boolean;
    /** 子元素集合 */
    options: RadioGroupChildOption[];
  }
  export interface MultiSelectScheme extends LowCode.NodeSchema {
    props: MultiSelectSchemeProps;
  }

  export interface MultiSelectSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 占位提示 */
    placeholder: I18n;
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
    /** 是否显示清除按钮 */
    allowClear: boolean;
    /** 是否有边框 */
    bordered: boolean;
    /** 自动获取焦点 */
    autofocus: boolean;
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

  export interface TimePickerSchemeProps extends LowCode.NodeSchemaProps {
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
    /** 当设定了 showTime 的时候，面板是否显示“此刻”按钮 */
    showNow: boolean;
    /** 使用 12 小时制，为 true 时 format 默认为 h:mm:ss a */
    use12Hours: boolean;
    /** 小时选项间隔 */
    hourStep: number;
    /** 分钟选项间隔 */
    minuteStep: number;
    /** 秒选项间隔 */
    secondStep: number;
    /** 自动获取焦点 */
    autofocus: boolean;
  }
  export interface TimePickerScheme extends LowCode.NodeSchema {
    props: TimePickerSchemeProps;
  }

  export interface TimeRangePickerSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 占位提示 */
    placeholder: I18n[];
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
    /** 是否显示清除按钮 */
    allowClear: boolean;
    /** 是否有边框 */
    bordered: boolean;
    /** 日期格式 */
    format: string;
    /** 绑定值的格式 */
    valueFormat: string;
    /** 当设定了 showTime 的时候，面板是否显示“此刻”按钮 */
    showNow: boolean;
    /** 使用 12 小时制，为 true 时 format 默认为 h:mm:ss a */
    use12Hours: boolean;
    /** 小时选项间隔 */
    hourStep: number;
    /** 分钟选项间隔 */
    minuteStep: number;
    /** 秒选项间隔 */
    secondStep: number;
    /** 自动获取焦点 */
    autofocus: boolean;
  }
  export interface TimeRangePickerScheme extends LowCode.NodeSchema {
    props: TimeRangePickerSchemeProps;
  }

  export interface RangePickerSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 占位提示 */
    placeholder: I18n[];
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

  export interface UploadScheme extends LowCode.NodeSchema {
    props: UploadSchemeProps;
  }

  export interface UploadSchemeProps extends LowCode.NodeSchemaProps {
    /** 数据模型字段, 即对应后端的表中的字段 */
    field: string;
    /** 标签 */
    label: I18n;
    /** 默认值 */
    defaultValue: I18n[];
    /** 状态 */
    behavior: LowCode.Behavior;
    /** 描述信息 */
    tips: I18n;
    /** 校验规则 */
    rules: LowCode.RuleMap;
    /** 请求接口对象 */
    api: string;
    /** 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件 */
    maxCount: number;
    /** 上传文件类型 */
    accept: string[];
    /** 单文件上传大小 */
    maxFileSize: number;
    /** 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card */
    listType: string;
    /** 是否开启多选 */
    multiple: boolean;
    [key: string]: any;
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
    defaultValue: string;
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

  export interface VueSchema extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: VueSchemaProps;
  }

  export interface VueSchemaProps extends LowCode.NodeSchemaProps {
    render: string;
  }

  export interface ProgressSchema extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: ProgressSchemaProps;
  }

  export interface ProgressSchemaProps extends LowCode.NodeSchemaProps {
    /** 大小，提供 large default 和 small 三种大小 */
    size: LowCode.Size;
    /** 形态 */
    type: string;
    /** 百分比 */
    percent: number;
    /** 状态，可选：success exception normal */
    status: string;
    /** 色彩阶段变化模式 */
    progressive: boolean;
  }

  export interface TableSchema extends LowCode.NodeSchema {
    props: TableSchemaProps;
  }

  export interface TableSchemaProps extends LowCode.NodeSchemaProps {
    /** 表格标题 */
    title: string;
    /** 请求接口对象 */
    api: string;
    /** 唯一行标识 */
    rowKey: string;
    /** 是否显示表格边框 */
    bordered: boolean;
    /** 列配置 */
    columns: BasicColumn[];
    /** 操作栏配置 */
    actionColumn: BasicColumn | null;
    /** 行选择配置 */
    rowSelection: TableRowSelection | null;
    actionItem: (ActionItem & {
      events?: {
        [key: string]: any;
      };
    })[];
    noPadding: boolean;
    [key: string]: any;
  }

  export interface FilterSchema extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: FilterSchemaProps;
  }

  export interface FilterSchemaProps extends LowCode.NodeSchemaProps {
    /** 数据模型, 即对应后端的表 */
    model: string;
    /** 标题位置 'horizontal'|'vertical' */
    layout: string;
    /** 每列数量 */
    columnNumber: number;
    /** 筛选项配置 */
    config: FilterConfigItem[];
  }

  export interface FilterConfigItem {
    /** 唯一标识 */
    id: string;
    /** 对应的组件唯一标识 */
    componentId: string;
    /** 跨列数量 */
    span: number;
    /** 是否高级搜索 */
    isAdvanced: boolean;
  }

  export interface ModalSchema extends LowCode.NodeSchema {
    children: LowCode.Schema[];
    props: ModalSchemaProps;
  }

  export interface ModalSchemaProps extends LowCode.NodeSchemaProps {
    /** 标题 */
    title: I18n;
    /** 默认显示 */
    visible: boolean;
    /** 是否显示footer */
    footer: boolean;
  }

  export interface ModalContentSchema extends LowCode.NodeSchema {
    children: LowCode.Schema[];
  }

  export interface ModalFooterSchema extends LowCode.NodeSchema {
    children: LowCode.Schema[];
  }

  export interface QRcodeSchema extends LowCode.NodeSchema {
    props: QRcodeSchemaProps;
  }

  export interface QRcodeSchemaProps extends LowCode.NodeSchemaProps {
    /** 扫描后的地址 */
    content: string;
    /** 渲染类型 */
    type: string;
    /** 二维码中图片的地址（目前只支持图片地址） */
    icon: string;
    /** 二维码大小 */
    size: number;
    /** 二维码中图片的大小 */
    iconSize: number;
    /** 二维码颜色 #000 */
    color: string;
    /** 二维码背景颜色 transparent */
    bgColor: string;
    /** 是否有边框 */
    bordered: boolean;
    /** 二维码纠错等级 'L' | 'M' | 'Q' | 'H' */
    errorLevel: string;
    /** 二维码状态 active | expired | loading */
    status: string;
  }
}
