/**
 * 多语言数据
 */
export interface I18nData {
  /** 类型 */
  type: 'i18n';
  [key: string]: any;
}

export interface I18nMap {
  [lang: string]: { [key: string]: string };
}

export type I18n = string | number | boolean | I18nData | null;
