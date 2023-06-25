export { default as zhCN } from './lang/zh-CN';
export { default as en } from './lang/en';

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair;
};

export type Language = {
  name: string;
  el: TranslatePair;
};
