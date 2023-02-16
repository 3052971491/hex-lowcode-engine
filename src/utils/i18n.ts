import type { I18nMap } from '/@/types/i18n.d';

export interface i18n {
  id: string;
  'en-US': string;
  'zh-CN': string;
}
export const formatConversion = (list: i18n[] | I18nMap, flag = true): i18n[] | I18nMap => {
  if (flag && !Array.isArray(list)) {
    const data: i18n[] = [];
    for (const type in list) {
      if (Object.prototype.hasOwnProperty.call(list, type)) {
        let obj: any = {};
        for (const key in (list as any)?.[type]) {
          if (Object.prototype.hasOwnProperty.call((list as any)?.[type], key)) {
            const element = (list as any)?.[type][key];
            const idx = data.findIndex((item) => {
              return item.id === key;
            });
            if (idx === -1) {
              obj.id = key;
              obj[type] = element;
              data.push(obj);
              obj = {};
            } else {
              (data[idx] as any)[type] = element;
            }
          }
        }
      }
    }
    return data;
  }
  if (Array.isArray(list)) {
    const data: I18nMap = {
      'zh-CN': {},
      'en-US': {},
    };
    list.forEach((item) => {
      data['zh-CN'][item.id] = item['zh-CN'] || '';
      data['en-US'][item.id] = item['en-US'] || '';
    });
    return data;
  }
  return {};
};

/**
 * 使用indexOf方法实现模糊查询
 * @param  {Array<DataItem>} list 进行查询的数组
 * @param  {String} keyWord 查询的关键词
 * @return {Array<DataItem>} 查询的结果
 */
export function fuzzyQuery(list: i18n[], keyWord: string): Array<i18n> {
  let arr: i18n[] = [];
  arr = list.filter((i) => {
    if (i['zh-CN'].indexOf(keyWord) > -1) {
      return i['zh-CN'].indexOf(keyWord) > -1;
    }
    if (i['en-US'].indexOf(keyWord) > -1) {
      return i['en-US'].indexOf(keyWord) > -1;
    }
    return i.id.indexOf(keyWord) > -1;
  });
  return arr;
}
