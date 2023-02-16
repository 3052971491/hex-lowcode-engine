export interface AttributeItem {
  /** 组件类型 */
  type?: string | null;
  /** 属性名 */
  label: string;
  /** 组件 */
  name: string;
  /** 组件对应编辑器 */
  editor: string;
  /** 是否合并组件类型和编辑器查找组件 */
  merge?: boolean;
  /** 是否高级属性 */
  advanced?: boolean;
  /** 是否开启可选择多语言 */
  i18n?: boolean;
}
