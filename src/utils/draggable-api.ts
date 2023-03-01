import { cloneDeep } from 'lodash-es';
import type { LowCode } from '/@/types/schema.d';

import { buildUUID } from '/@/utils/common';
import { BasicComponents, BusinessComponents, LayoutComponents, AdvancedComponents } from '/@/schema/pc';

export function buildElementSchema(element: LowCode.Schema): LowCode.Schema {
  const newSchema = cloneDeep(element);
  newSchema.id = `${newSchema.componentType}_${buildUUID(8)}`;

  if (newSchema.tag === 'LAYOUT') {
    let obj = null;
    switch (newSchema.componentType) {
      case 'Row':
        obj = buildElementSchemaByType('LAYOUT', 'Column');
        if (obj) {
          newSchema.children?.push(obj);
        }
        obj = buildElementSchemaByType('LAYOUT', 'Column');
        if (obj) {
          newSchema.children?.push(obj);
        }
        obj = buildElementSchemaByType('LAYOUT', 'Column');
        if (obj) {
          newSchema.children?.push(obj);
        }
        break;

      default:
        break;
    }
  }
  return newSchema;
}

/**
 * 通过组件类型生成对应组件
 * @param classification 分类
 * @param componentName 组件类型
 * @returns
 */
export function buildElementSchemaByType(
  classification: LowCode.Category,
  componentName: string,
): LowCode.Schema | undefined {
  const newSchema = findElementSchemaByType(classification, componentName);

  if (newSchema) {
    newSchema.id = `${newSchema.componentType}_${buildUUID(8)}`;
    return newSchema;
  }
  return undefined;
}

/**
 * 通过组件类型生查照对应组件
 * @param classification 分类
 * @param componentName 组件类型
 * @returns
 */
export function findElementSchemaByType(
  classification: LowCode.Category,
  componentName: string,
): LowCode.Schema | undefined {
  let schema: LowCode.Schema | null = null;
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
