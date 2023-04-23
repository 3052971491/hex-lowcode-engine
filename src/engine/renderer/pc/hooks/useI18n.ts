import { I18nData } from '/@/types/i18n';
import { LowCode } from '/@/types/schema';
import { isString } from 'lodash-es';

export function useI18n(projectSchema?: LowCode.ProjectSchema) {
  function getI18n(val: string | I18nData) {
    if (!isString(val) && val.type === 'i18n') {
      return val[projectSchema?.config.i18n ?? 'zh-CN'];
    }
    return val;
  }
  return {
    getI18n,
  };
}
