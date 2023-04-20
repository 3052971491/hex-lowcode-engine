import { AttributeItem } from './interface';

/** 单行文本, 多行文本属性配置 */
const INPUT_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Input', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Input', name: 'defaultValue', label: '默认值', editor: 'input-editor' },
  { type: 'Input', name: 'placeholder', label: '占位提示', editor: 'input-editor', i18n: true },
  { type: 'Input', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Input', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'Input', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'Input', name: 'allowClear', label: '清除按钮', editor: 'switch-editor' },
  { type: 'Input', name: 'addonBefore', label: '输入框前附加内容', editor: 'input-editor', i18n: true },
  { type: 'Input', name: 'addonAfter', label: '输入框后附加内容', editor: 'input-editor', i18n: true },
  { type: 'Input', name: 'bordered', label: '边框', editor: 'switch-editor' },
  { type: 'Input', name: 'showCount', label: '计数器', editor: 'switch-editor' },
  { type: 'Input', name: 'maxlength', label: '字数上限', editor: 'input-number-editor' },
  { type: 'Input', name: 'trim', label: '自动去除头尾空字符', editor: 'switch-editor' },
  { type: 'Input', name: 'autofocus', label: '自动聚焦', editor: 'switch-editor' },
  { type: 'Input', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'Input', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Input', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'Input', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const INPUT_NUMBER_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'InputNumber', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'InputNumber', name: 'defaultValue', label: '默认值', editor: 'input-number-editor' },
  { type: 'InputNumber', name: 'placeholder', label: '占位提示', editor: 'input-editor', i18n: true },
  { type: 'InputNumber', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'InputNumber', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'InputNumber', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'InputNumber', name: 'addonBefore', label: '输入框前附加内容', editor: 'input-editor', i18n: true },
  { type: 'InputNumber', name: 'addonAfter', label: '输入框后附加内容', editor: 'input-editor', i18n: true },
  { type: 'InputNumber', name: 'bordered', label: '边框', editor: 'switch-editor' },
  { type: 'InputNumber', name: 'autofocus', label: '自动聚焦', editor: 'switch-editor' },
  { type: 'InputNumber', name: 'controls', label: '显示增减按钮', editor: 'switch-editor' },
  { type: 'InputNumber', name: 'decimalSeparator', label: '小数点', editor: 'input-editor' },
  { type: 'InputNumber', name: 'keyboard', label: '键盘快捷行为', editor: 'switch-editor' },
  { type: 'InputNumber', name: 'max', label: '最大值', editor: 'input-number-editor' },
  { type: 'InputNumber', name: 'min', label: '最小值', editor: 'input-number-editor' },
  { type: 'InputNumber', name: 'precision', label: '数值精度', editor: 'input-number-editor' },
  { type: 'InputNumber', name: 'step', label: '自动聚焦', editor: 'input-number-editor' },
  { type: 'InputNumber', name: 'stringMode', label: '字符值模式', editor: 'switch-editor' },
  { type: 'InputNumber', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'InputNumber', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'InputNumber', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'InputNumber', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const SWITCH_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Switch', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Switch', name: 'defaultValue', label: '默认值', editor: 'switch-editor' },
  { type: 'Switch', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Switch', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'Switch', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'Switch', name: 'checkedChildren', label: '选中时的内容', editor: 'input-editor', i18n: true },
  { type: 'Switch', name: 'checkedValue', label: '选中时的值', editor: 'switch-editor' },
  { type: 'Switch', name: 'unCheckedChildren', label: '非选中时的内容', editor: 'input-editor', i18n: true },
  { type: 'Switch', name: 'unCheckedValue', label: '非选中时的值', editor: 'switch-editor' },
  { type: 'Switch', name: 'autofocus', label: '自动聚焦', editor: 'switch-editor' },
  { type: 'Switch', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'Switch', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Switch', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'Switch', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const RADIO_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Radio', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Radio', name: 'defaultValue', label: '默认值', editor: 'input-editor' },
  { type: 'Radio', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Radio', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'Radio', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'Radio', name: 'buttonStyle', label: '风格样式', editor: 'button-style-editor', merge: true },
  { type: 'Radio', name: 'optionType', label: '展示形状', editor: 'option-type-editor', merge: true },
  { type: 'Radio', name: 'options', label: '选项', editor: 'options-editor' },
  { type: 'Radio', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'Radio', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Radio', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'Input', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const CHECKBOX_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Checkbox', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Checkbox', name: 'defaultValue', label: '默认值', editor: 'input-editor' },
  { type: 'Checkbox', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Checkbox', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'Checkbox', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'Checkbox', name: 'options', label: '选项', editor: 'options-editor' },
  { type: 'Checkbox', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'Checkbox', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Checkbox', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'Checkbox', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const RATE_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Rate', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Rate', name: 'defaultValue', label: '默认值', editor: 'input-number-editor' },
  { type: 'Rate', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'Rate', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'Rate', name: 'allowHalf', label: '是否允许半选', editor: 'switch-editor' },
  { type: 'Rate', name: 'character', label: '自定义字符', editor: 'input-editor' },
  { type: 'Rate', name: 'count', label: 'star 总数', editor: 'input-number-editor' },
  { type: 'Rate', name: 'autofocus', label: '自动聚焦', editor: 'switch-editor' },
  { type: 'Rate', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'Rate', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Rate', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'Rate', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

/** 栅格-行 */
const ROW_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Row', name: 'rowGutter', label: '列间距', editor: 'input-number-editor' },
  { type: 'Row', name: 'columnGutter', label: '行间距', editor: 'input-number-editor' },
  { type: 'Row', name: 'align', label: '垂直对齐方式', editor: 'align-editor', merge: true },
  { type: 'Row', name: 'justify', label: '水平排列方式', editor: 'justify-editor', merge: true },
  { type: 'Row', name: 'wrap', label: '自动换行', editor: 'switch-editor' },
];

const COLUMN_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Column', name: 'flex', label: 'flex 布局填充', editor: 'flex-editor', merge: true },
  { type: 'Column', name: 'offset', label: '左侧间隔格数', editor: 'input-number-editor' },
  { type: 'Column', name: 'order', label: '顺序', editor: 'input-number-editor' },
  { type: 'Column', name: 'pull', label: '向左移动格数', editor: 'input-number-editor' },
  { type: 'Column', name: 'push', label: '向右移动格数', editor: 'input-number-editor' },
  { type: 'Column', name: 'span', label: '占位格数', editor: 'input-number-editor' },
  { type: 'Column', name: 'xxxl', label: ' ≥2000px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'xs', label: '<576px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'sm', label: '≥576px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'md', label: '≥768px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'lg', label: '≥992px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'xl', label: '≥1200px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'xxl', label: '≥1600px 响应式栅格', editor: 'input-number-editor' },
];

const CARD_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Card', name: 'title', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Card', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Card', name: 'bordered', label: '边框', editor: 'switch-editor' },
  { type: 'Card', name: 'hoverable', label: '鼠标移过时可浮起', editor: 'switch-editor' },
];

const SPACE_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Space', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Space', name: 'align', label: '对齐方式', editor: 'align-editor', merge: true },
  { type: 'Space', name: 'direction', label: '间距方向', editor: 'direction-editor', merge: true },
];

const COLLAPSE_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Collapse', name: 'defaultValue', label: '默认值', editor: 'input-editor' },
  { type: 'Collapse', name: 'accordion', label: '手风琴模式', editor: 'switch-editor' },
  { type: 'Collapse', name: 'bordered', label: '边框', editor: 'switch-editor' },
  {
    type: 'Collapse',
    name: 'collapsible',
    label: '所有子面板可折叠触发区域',
    editor: 'collapsible-editor',
    merge: true,
  },
  {
    type: 'Collapse',
    name: 'destroyInactivePanel',
    label: '销毁折叠隐藏的面板',
    editor: 'switch-editor',
  },
  {
    type: 'Collapse',
    name: 'expandIconPosition',
    label: '图标位置',
    editor: 'expand-icon-position-editor',
    merge: true,
  },
  { type: 'Collapse', name: 'ghost', label: '幽灵模式', editor: 'switch-editor' },
  { type: 'Collapse', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const COLLAPSE_PANEL_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'CollapsePanel', name: 'header', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'CollapsePanel', name: 'key', label: '值', editor: 'input-editor' },
  {
    type: 'CollapsePanel',
    name: 'forceRender',
    label: '隐藏时是否渲染DOM',
    editor: 'switch-editor',
  },
  {
    type: 'Collapse',
    name: 'collapsible',
    label: '可折叠触发区域',
    editor: 'collapsible-editor',
    merge: true,
  },
  { type: 'CollapsePanel', name: 'showArrow', label: '是否展示箭头', editor: 'switch-editor' },
];

const FROM_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Form', name: 'hideRequiredMark', label: '隐藏必选标记', editor: 'switch-editor' },
  { type: 'Form', name: 'labelAlign', label: '标签对齐方式', editor: 'label-align-editor', merge: true },
  { type: 'Form', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const obj: { [key: string]: Array<AttributeItem> } = {
  Input: INPUT_ATTRIBUTES,
  Textarea: INPUT_ATTRIBUTES,
  InputNumber: INPUT_NUMBER_ATTRIBUTES,
  Switch: SWITCH_ATTRIBUTES,
  Radio: RADIO_ATTRIBUTES,
  Checkbox: CHECKBOX_ATTRIBUTES,
  Rate: RATE_ATTRIBUTES,
  Row: ROW_ATTRIBUTE,
  Column: COLUMN_ATTRIBUTE,
  Card: CARD_ATTRIBUTES,
  Space: SPACE_ATTRIBUTES,
  Collapse: COLLAPSE_ATTRIBUTE,
  CollapsePanel: COLLAPSE_PANEL_ATTRIBUTE,
  Form: FROM_ATTRIBUTE,
};

export default obj;
