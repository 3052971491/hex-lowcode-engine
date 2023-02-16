import { cloneDeep } from 'lodash-es';
import type { LowCodeScheme } from '/@/types/scheme.d';

import { buildUUID } from '/@/utils/common';
import { BasicComponents, BusinessComponents, LayoutComponents, AdvancedComponents } from '/@/scheme/pc';

export function buildElementScheme(element: LowCodeScheme.Scheme): LowCodeScheme.Scheme {
  const newScheme = cloneDeep(element);
  newScheme.id = buildUUID(16);

  if (newScheme.tag === 'LAYOUT') {
    let obj = null;
    switch (newScheme.componentType) {
      case 'Row':
        obj = buildElementSchemeByType('LAYOUT', 'Column');
        if (obj) {
          newScheme.children?.push(obj);
        }
        obj = buildElementSchemeByType('LAYOUT', 'Column');
        if (obj) {
          newScheme.children?.push(obj);
        }
        obj = buildElementSchemeByType('LAYOUT', 'Column');
        if (obj) {
          newScheme.children?.push(obj);
        }
        break;

      default:
        break;
    }
  }
  return newScheme;
}

/**
 * 通过组件类型生成对应组件
 * @param classification 分类
 * @param componentName 组件类型
 * @returns
 */
export function buildElementSchemeByType(
  classification: LowCodeScheme.Category,
  componentName: string,
): LowCodeScheme.Scheme | undefined {
  const newScheme = findElementSchemeByType(classification, componentName);

  if (newScheme) {
    newScheme.id = buildUUID(16);
    return newScheme;
  }
  return undefined;
}

/**
 * 通过组件类型生查照对应组件
 * @param classification 分类
 * @param componentName 组件类型
 * @returns
 */
export function findElementSchemeByType(
  classification: LowCodeScheme.Category,
  componentName: string,
): LowCodeScheme.Scheme | undefined {
  let schema: LowCodeScheme.Scheme | null = null;
  if (classification === 'BASIC') {
    const idx = BasicComponents.findIndex((item) => {
      return item.componentType === componentName;
    });
    if (idx !== -1) {
      schema = BasicComponents[idx];
    }
  } else if (classification === 'BUSINESS') {
    const idx = BusinessComponents.findIndex((item) => {
      return item.componentType === componentName;
    });
    if (idx !== -1) {
      schema = BusinessComponents[idx];
    }
  } else if (classification === 'LAYOUT') {
    const idx = LayoutComponents.findIndex((item) => {
      return item.componentType === componentName;
    });
    if (idx !== -1) {
      schema = LayoutComponents[idx];
    }
  } else if (classification === 'ADVANCED') {
    const idx = AdvancedComponents.findIndex((item) => {
      return item.componentType === componentName;
    });
    if (idx !== -1) {
      schema = AdvancedComponents[idx];
    }
  }
  if (schema) {
    return cloneDeep(schema);
  }
  return undefined;
}
