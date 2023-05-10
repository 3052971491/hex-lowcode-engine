import { I18nData } from '/@/types/i18n';
import { LowCode } from '/@/types/schema';
import { isString } from 'lodash-es';

export function useI18n(projectSchema?: LowCode.ProjectSchema) {
  function getI18n(val: string | I18nData) {
    if (val && !isString(val) && val.type && val.type === 'i18n') {
      return projectSchema?.i18n ? projectSchema.i18n[projectSchema?.config.i18n][val.key] : val;
    }
    return val;
  }
  return {
    getI18n,
  };
}
