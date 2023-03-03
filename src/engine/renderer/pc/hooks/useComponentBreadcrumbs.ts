import { cloneDeep } from 'lodash-es';
import { LowCode } from '/@/types/schema';

export interface IComponentBreadcrumbs {
  breadcrumbs: LowCode.Schema[];
  setBreadcrumbs(val: LowCode.Schema): void;
  getBreadcrumbs(): LowCode.Schema[];
  resetBreadcrumbs(val: LowCode.Schema[]): void;
}

/**
 * 组件面包屑
 */
export function useComponentBreadcrumbs(data?: LowCode.Schema[]): IComponentBreadcrumbs {
  let breadcrumbs = data ?? [];
  function setBreadcrumbs(val: LowCode.Schema) {
    if (val) {
      breadcrumbs.push(val);
    }
  }
  function getBreadcrumbs() {
    return breadcrumbs;
  }

  function resetBreadcrumbs(data: LowCode.Schema[]) {
    breadcrumbs = data;
  }
  return {
    breadcrumbs,
    setBreadcrumbs,
    getBreadcrumbs,
    resetBreadcrumbs,
  };
}
