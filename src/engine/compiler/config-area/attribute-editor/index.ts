import { AttributeItem } from './interface';

/** 单行文本, 多行文本属性配置 */
const INPUT_ATTRIBUTES: Array<AttributeItem> = [
  { type: 'Input', name: 'label', label: '标题', editor: 'input-editor', i18n: true },
  { type: 'Input', name: 'defaultValue', label: '默认值', editor: 'input-editor', i18n: true },
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

const obj: { [key: string]: Array<AttributeItem> } = {
  Input: INPUT_ATTRIBUTES,
  Textarea: INPUT_ATTRIBUTES,
  Row: ROW_ATTRIBUTE,
  Column: COLUMN_ATTRIBUTE,
};

export default obj;
