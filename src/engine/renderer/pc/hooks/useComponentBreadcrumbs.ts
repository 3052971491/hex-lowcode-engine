import { ref } from 'vue';
import { LowCode } from '/@/types/schema';
import { cloneDeep } from 'lodash-es';

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
  const breadcrumbs = ref(data ?? []);
  function setBreadcrumbs(val: LowCode.Schema) {
    if (val) {
      breadcrumbs.value.push(val);
    }
  }
  function getBreadcrumbs() {
    return cloneDeep(breadcrumbs.value);
  }

  function resetBreadcrumbs(data: LowCode.Schema[]) {
    breadcrumbs.value = data;
  }
  return {
    breadcrumbs: breadcrumbs.value,
    setBreadcrumbs,
    getBreadcrumbs,
    resetBreadcrumbs,
  };
}
