import { AttributeItem } from './interface';

const TEXT_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Text', name: 'content', label: '内容', editor: 'textarea-editor', i18n: true },
  { type: 'Text', name: 'maxLine', label: '最大行数', editor: 'input-number-editor' },
  { type: 'Text', name: 'showTitle', label: '开启文本提示', editor: 'switch-editor' },
  { type: 'Text', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Text', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const IMAGE_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Image', name: 'src', label: '图片地址', editor: 'input-editor' },
  { type: 'Image', name: 'width', label: '宽度', editor: 'input-number-editor' },
  { type: 'Image', name: 'autoWidth', label: '宽度自适应', editor: 'switch-editor' },
  { type: 'Image', name: 'height', label: '高度', editor: 'input-number-editor' },
  { type: 'Image', name: 'autoHeight', label: '高度自适应', editor: 'switch-editor' },
  { type: 'Image', name: 'fit', label: '摆放方式', editor: 'fit-editor', merge: true },
  { type: 'Image', name: 'alt', label: '图像描述', editor: 'input-editor' },
  { type: 'Image', name: 'preview', label: '开启图片预览', editor: 'switch-editor' },
  { type: 'Image', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const DIVIDER_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Divider', name: 'content', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Divider', name: 'type', label: '方向', editor: 'type-editor', merge: true },
  { type: 'Divider', name: 'dashed', label: '是否虚线', editor: 'switch-editor' },
  { type: 'Divider', name: 'orientation', label: '标题位置', editor: 'orientation-editor', merge: true },
  { type: 'Divider', name: 'plain', label: '标题是为否普通正文', editor: 'switch-editor' },
  // { type: 'Divider', name: 'orientationMargin', label: ' 标题与边框之间的距离', editor: 'input-number-editor' },
  { type: 'Divider', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const ALERT_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Alert', name: 'type', label: '警告提示的样式', editor: 'type-editor', merge: true },
  { type: 'Alert', name: 'message', label: '提示内容', editor: 'input-editor', i18n: true },
  { type: 'Alert', name: 'description', label: '辅助性文字', editor: 'textarea-editor', i18n: true },
  { type: 'Alert', name: 'showIcon', label: '是否显示辅助图标', editor: 'switch-editor' },
  { type: 'Alert', name: 'closable', label: '默认不显示关闭按钮', editor: 'switch-editor' },
  { type: 'Alert', name: 'banner', label: '是否用作顶部公告', editor: 'switch-editor' },
  { type: 'Alert', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

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
  { type: 'InputNumber', name: 'step', label: '步数', editor: 'input-number-editor' },
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

const SELECT_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Select', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Select', name: 'defaultValue', label: '默认值', editor: 'input-editor' },
  { type: 'Select', name: 'placeholder', label: '占位提示', editor: 'input-editor', i18n: true },
  { type: 'Select', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Select', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'Select', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'Select', name: 'allowClear', label: '清除按钮', editor: 'switch-editor' },
  { type: 'Select', name: 'bordered', label: '边框', editor: 'switch-editor' },
  { type: 'Select', name: 'autofocus', label: '自动聚焦', editor: 'switch-editor' },
  { type: 'Select', name: 'options', label: '选项', editor: 'options-editor' },
  { type: 'Select', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'Select', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Select', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'Select', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const MULTI_SELECT_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'MultiSelect', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  // { type: 'MultiSelect', name: 'defaultValue', label: '默认值', editor: 'input-editor' },
  { type: 'MultiSelect', name: 'placeholder', label: '占位提示', editor: 'input-editor', i18n: true },
  { type: 'MultiSelect', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'MultiSelect', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'MultiSelect', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'MultiSelect', name: 'allowClear', label: '清除按钮', editor: 'switch-editor' },
  { type: 'MultiSelect', name: 'bordered', label: '边框', editor: 'switch-editor' },
  { type: 'MultiSelect', name: 'autofocus', label: '自动聚焦', editor: 'switch-editor' },
  { type: 'MultiSelect', name: 'options', label: '选项', editor: 'options-editor' },
  { type: 'MultiSelect', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'MultiSelect', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'MultiSelect', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'MultiSelect', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const DATE_PICKER_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'DatePicker', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'DatePicker', name: 'defaultValue', label: '默认值', editor: 'date-picker-editor' },
  // { type: 'DatePicker', name: 'placeholder', label: '占位提示', editor: 'input-editor', i18n: true },
  { type: 'DatePicker', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'DatePicker', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'DatePicker', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'DatePicker', name: 'allowClear', label: '清除按钮', editor: 'switch-editor' },
  { type: 'DatePicker', name: 'format', label: '显示日期格式', editor: 'format-editor', merge: true },
  { type: 'DatePicker', name: 'valueFormat', label: '绑定值的格式', editor: 'value-format-editor', merge: true },
  { type: 'DatePicker', name: 'picker', label: '设置选择器类型', editor: 'picker-editor', merge: true },
  { type: 'DatePicker', name: 'showTime', label: '时间选择', editor: 'switch-editor' },
  { type: 'DatePicker', name: 'showNow', label: '是否显示“此刻”', editor: 'switch-editor' },
  { type: 'DatePicker', name: 'showToday', label: '是否显示“今天”', editor: 'switch-editor' },
  { type: 'DatePicker', name: 'disabledDate', label: '可选择时间区间', editor: 'disabled-date-editor', merge: true },
  { type: 'DatePicker', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'DatePicker', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'DatePicker', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'DatePicker', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const TIME_PICKER_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'TimePicker', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'TimePicker', name: 'defaultValue', label: '默认值', editor: 'time-picker-editor' },
  { type: 'TimePicker', name: 'placeholder', label: '占位提示', editor: 'input-editor', i18n: true },
  { type: 'TimePicker', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'TimePicker', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'TimePicker', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'TimePicker', name: 'allowClear', label: '清除按钮', editor: 'switch-editor' },
  { type: 'TimePicker', name: 'format', label: '显示时间格式', editor: 'format-editor', merge: true },
  { type: 'TimePicker', name: 'valueFormat', label: '绑定值的格式', editor: 'value-format-editor', merge: true },
  { type: 'TimePicker', name: 'showNow', label: '是否显示“此刻”', editor: 'switch-editor' },
  { type: 'TimePicker', name: 'use12Hours', label: '开启12小时制', editor: 'switch-editor' },
  { type: 'TimePicker', name: 'hourStep', label: '小时选项间隔', editor: 'input-number-editor' },
  { type: 'TimePicker', name: 'minuteStep', label: '分钟选项间隔', editor: 'input-number-editor' },
  { type: 'TimePicker', name: 'secondStep', label: '秒选项间隔', editor: 'input-number-editor' },
  { type: 'TimePicker', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'TimePicker', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'TimePicker', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'TimePicker', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const TIME_RANGE_PICKER_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'TimeRangePicker', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'TimeRangePicker', name: 'defaultValue', label: '默认值', editor: 'time-range-picker-editor' },
  // { type: 'TimeRangePicker', name: 'placeholder', label: '占位提示', editor: 'input-editor', i18n: true },
  { type: 'TimeRangePicker', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'TimeRangePicker', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'TimeRangePicker', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'TimeRangePicker', name: 'allowClear', label: '清除按钮', editor: 'switch-editor' },
  { type: 'TimePicker', name: 'format', label: '显示时间格式', editor: 'format-editor', merge: true },
  { type: 'TimePicker', name: 'valueFormat', label: '绑定值的格式', editor: 'value-format-editor', merge: true },
  { type: 'TimeRangePicker', name: 'showNow', label: '是否显示“此刻”', editor: 'switch-editor' },
  { type: 'TimeRangePicker', name: 'use12Hours', label: '开启12小时制', editor: 'switch-editor' },
  { type: 'TimeRangePicker', name: 'hourStep', label: '小时选项间隔', editor: 'input-number-editor' },
  { type: 'TimeRangePicker', name: 'minuteStep', label: '分钟选项间隔', editor: 'input-number-editor' },
  { type: 'TimeRangePicker', name: 'secondStep', label: '秒选项间隔', editor: 'input-number-editor' },
  { type: 'TimeRangePicker', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'TimeRangePicker', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'TimeRangePicker', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'TimeRangePicker', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const Range_PICKER_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'RangePicker', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'RangePicker', name: 'defaultValue', label: '默认值', editor: 'range-picker-editor' },
  { type: 'RangePicker', name: 'placeholder', label: '占位提示', editor: 'input-editor', i18n: true },
  { type: 'RangePicker', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'RangePicker', name: 'behavior', label: '状态', editor: 'behavior-editor' },
  { type: 'RangePicker', name: 'tips', label: '描述信息', editor: 'tips-editor', i18n: true },
  { type: 'RangePicker', name: 'allowClear', label: '清除按钮', editor: 'switch-editor' },
  { type: 'DatePicker', name: 'format', label: '显示日期格式', editor: 'format-editor', merge: true },
  { type: 'DatePicker', name: 'valueFormat', label: '绑定值的格式', editor: 'value-format-editor', merge: true },
  { type: 'RangePicker', name: 'picker', label: '设置选择器类型', editor: 'picker-editor', merge: true },
  { type: 'RangePicker', name: 'showTime', label: '时间选择', editor: 'switch-editor' },
  { type: 'DatePicker', name: 'disabledDate', label: '可选择时间区间', editor: 'disabled-date-editor', merge: true },
  { type: 'RangePicker', name: 'rules', label: '校验', editor: 'rules-editor' },
  { type: 'RangePicker', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'RangePicker', name: 'alwaysCommit', label: '数据提交', editor: 'always-commit-editor', advanced: true },
  { type: 'RangePicker', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
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
  { type: 'Row', name: 'children', label: '子集', editor: 'children-editor' },
  { type: 'Row', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const COLUMN_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Column', name: 'flex', label: 'flex 布局填充', editor: 'flex-editor', merge: true },
  { type: 'Column', name: 'offset', label: '左侧间隔格数', editor: 'input-number-editor' },
  { type: 'Column', name: 'order', label: '顺序', editor: 'input-number-editor' },
  { type: 'Column', name: 'pull', label: '向左移动格数', editor: 'input-number-editor' },
  { type: 'Column', name: 'push', label: '向右移动格数', editor: 'input-number-editor' },
  { type: 'Column', name: 'span', label: '占位格数', editor: 'input-number-editor' },
  { type: 'Column', name: 'xs', label: '<576px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'sm', label: '≥576px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'md', label: '≥768px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'lg', label: '≥992px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'xl', label: '≥1200px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'xxl', label: '≥1600px 响应式栅格', editor: 'input-number-editor' },
  { type: 'Column', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const CARD_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Card', name: 'title', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Card', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Card', name: 'bordered', label: '边框', editor: 'switch-editor' },
  { type: 'Card', name: 'hoverable', label: '鼠标移过时可浮起', editor: 'switch-editor' },
  { type: 'Card', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const SPACE_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Space', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Space', name: 'align', label: '对齐方式', editor: 'align-editor', merge: true },
  { type: 'Space', name: 'direction', label: '间距方向', editor: 'direction-editor', merge: true },
  { type: 'Space', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
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
  { type: 'Collapse', name: 'children', label: '子集', editor: 'children-editor' },
  { type: 'Collapse', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
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
  { type: 'CollapsePanel', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const TABS: Array<AttributeItem> = [
  { type: 'Tabs', name: 'defaultValue', label: '默认值', editor: 'input-editor' },
  { type: 'Tabs', name: 'type', label: '页签基本样式', editor: 'type-editor', merge: true },
  { type: 'Tabs', name: 'animated', label: '是否使用动画切换', editor: 'switch-editor' },
  { type: 'Tabs', name: 'centered', label: '标签居中展示', editor: 'switch-editor' },
  {
    type: 'Tabs',
    name: 'destroyInactiveTabPane',
    label: '隐藏时销毁DOM',
    editor: 'switch-editor',
  },
  { type: 'Tabs', name: 'hideAdd', label: '隐藏加号图标', editor: 'switch-editor' },
  { type: 'Tabs', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Tabs', name: 'tabBarGutter', label: '间隙', editor: 'input-number-editor' },
  { type: 'Tabs', name: 'tabPosition', label: '页签位置', editor: 'tab-position-editor', merge: true },
  { type: 'Tabs', name: 'children', label: '子集', editor: 'children-editor' },
  { type: 'Tabs', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Tabs', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const TAB_PANE_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'TabPane', name: 'tab', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'TabPane', name: 'value', label: '值', editor: 'input-editor' },
  {
    type: 'TabPane',
    name: 'forceRender',
    label: '隐藏时是否渲染DOM',
    editor: 'switch-editor',
  },
  { type: 'TabPane', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const FROM_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Form', name: 'hideRequiredMark', label: '隐藏必选标记', editor: 'switch-editor' },
  { type: 'Form', name: 'labelAlign', label: '标签对齐方式', editor: 'label-align-editor', merge: true },
  { type: 'Form', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const VUE_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Vue', name: 'render', label: 'render', editor: 'render-editor', merge: true },
  { type: 'Vue', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const PROGRESS_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Progress', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Progress', name: 'type', label: '形态', editor: 'type-editor', merge: true },
  { type: 'Progress', name: 'percent', label: '百分比', editor: 'input-number-editor' },
  { type: 'Progress', name: 'status', label: '状态', editor: 'status-editor', merge: true },
  { type: 'Progress', name: 'progressive', label: '色彩阶段变化模式', editor: 'progressive-editor', merge: true },
  { type: 'Progress', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const TABLE_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Table', name: 'title', label: '表格标题', editor: 'input-editor', i18n: true },
  { type: 'Table', name: 'api', label: '请求接口对象', editor: 'api-editor', merge: true },
  { type: 'Table', name: 'rowKey', label: '表格行 key', editor: 'input-editor' },
  { type: 'Table', name: 'bordered', label: '边框', editor: 'switch-editor' },
  { type: 'Table', name: 'columns', label: '列配置', editor: 'columns-editor', merge: true },
  { type: 'Table', name: 'actionItem', label: '操作列配置', editor: 'action-item-editor', merge: true },
  { type: 'Table', name: 'rowSelection', label: '选择功能配置', editor: 'row-selection-editor', merge: true },
  { type: 'Table', name: 'noPadding', label: '隐藏边距', editor: 'switch-editor' },
  { type: 'Table', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const BUTTON_GROUP_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'ButtonGroup', name: 'align', label: '对齐方式', editor: 'align-editor', merge: true },
  { type: 'ButtonGroup', name: 'children', label: '子集', editor: 'children-editor' },
  { type: 'ButtonGroup', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
];

const BUTTON_ATTRIBUTE: Array<AttributeItem> = [
  { type: 'Button', name: 'size', label: '尺寸', editor: 'size-editor' },
  { type: 'Button', name: 'title', label: '名称', editor: 'input-editor', i18n: true },
  { type: 'Button', name: 'type', label: '按钮类型', editor: 'type-editor', merge: true },
  { type: 'Button', name: 'ghost', label: '幽灵模式', editor: 'switch-editor' },
  { type: 'Button', name: 'danger', label: '设置危险按钮', editor: 'switch-editor' },
  { type: 'Button', name: 'loading', label: '加载状态', editor: 'switch-editor' },
  { type: 'Button', name: 'block', label: '宽度占满', editor: 'switch-editor' },
  { type: 'Button', name: 'id', label: '唯一标识', editor: 'id-editor', advanced: true },
  { type: 'Button', name: 'events', label: '动作设置', editor: 'events-editor', advanced: true },
];

const obj: { [key: string]: Array<AttributeItem> } = {
  Text: TEXT_ATTRIBUTE,
  Image: IMAGE_ATTRIBUTE,
  ButtonGroup: BUTTON_GROUP_ATTRIBUTE,
  Button: BUTTON_ATTRIBUTE,
  Divider: DIVIDER_ATTRIBUTE,
  Alert: ALERT_ATTRIBUTE,
  Input: INPUT_ATTRIBUTES,
  Textarea: INPUT_ATTRIBUTES,
  InputNumber: INPUT_NUMBER_ATTRIBUTES,
  Switch: SWITCH_ATTRIBUTES,
  Radio: RADIO_ATTRIBUTES,
  Checkbox: CHECKBOX_ATTRIBUTES,
  Select: SELECT_ATTRIBUTES,
  MultiSelect: MULTI_SELECT_ATTRIBUTES,
  DatePicker: DATE_PICKER_ATTRIBUTES,
  RangePicker: Range_PICKER_ATTRIBUTES,
  TimePicker: TIME_PICKER_ATTRIBUTES,
  TimeRangePicker: TIME_RANGE_PICKER_ATTRIBUTES,
  Rate: RATE_ATTRIBUTES,
  Row: ROW_ATTRIBUTE,
  Column: COLUMN_ATTRIBUTE,
  Card: CARD_ATTRIBUTES,
  Space: SPACE_ATTRIBUTES,
  Collapse: COLLAPSE_ATTRIBUTE,
  CollapsePanel: COLLAPSE_PANEL_ATTRIBUTE,
  Tabs: TABS,
  TabPane: TAB_PANE_ATTRIBUTE,
  Form: FROM_ATTRIBUTE,
  Vue: VUE_ATTRIBUTE,
  Progress: PROGRESS_ATTRIBUTE,
  Table: TABLE_ATTRIBUTE,
};

export default obj;
