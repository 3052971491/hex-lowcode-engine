import { cloneDeep } from 'lodash-es';
import type { LowCode } from '/@/types/schema.d';

import { buildUUID } from '/@/utils/common';
import {
  BasicComponents,
  BusinessComponents,
  LayoutComponents,
  AdvancedComponents,
  FormComponents,
} from '/@/schema/pc';
import { BasicColumnDto } from '/@/schema/common/schema';
import { BasicColumn } from '/@/components/hex-table';
import { useData } from '/@/components/hex-cell/useData';

export function buildElementSchema(element: LowCode.Schema): LowCode.Schema {
  const newSchema = cloneDeep(element);
  newSchema.id = `${newSchema.componentType}_${buildUUID(8)}`;
  if (newSchema.props) {
    newSchema.props.className = `${newSchema.componentType.toLowerCase()}_${buildUUID(8).toLowerCase()}`;

    if (newSchema.props.hasOwnProperty('field')) {
      newSchema.props.field = `Field_${buildUUID()}`;
    }

    if (newSchema.props.hasOwnProperty('model')) {
      newSchema.props.model = `Model_${buildUUID()}`;
    }
  }

  if (newSchema.tag === 'LAYOUT') {
    let obj = null;
    const { build } = useData();
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
        break;
      case 'Collapse':
        obj = buildElementSchemaByType('LAYOUT', 'CollapsePanel');

        if (obj && obj.props) {
          obj.props.header = 'This is panel header 1';
          obj.props.key = '1';
          if (newSchema?.props) {
            newSchema.props.defaultValue = obj.props.key;
          }
          newSchema.children?.push(obj);
        }
        obj = buildElementSchemaByType('LAYOUT', 'CollapsePanel');
        if (obj && obj.props) {
          obj.props.header = 'This is panel header 2';
          obj.props.key = '2';
          newSchema.children?.push(obj);
        }
        break;
      case 'Tabs':
        obj = buildElementSchemaByType('LAYOUT', 'TabPane');

        if (obj && obj.props) {
          obj.props.tab = 'Tab  1';
          obj.props.value = '1';
          if (newSchema?.props) {
            newSchema.props.defaultValue = obj.props.value;
          }
          newSchema.children?.push(obj);
        }
        obj = buildElementSchemaByType('LAYOUT', 'TabPane');
        if (obj && obj.props) {
          obj.props.tab = 'Tab  2';
          obj.props.value = '2';
          newSchema.children?.push(obj);
        }
        break;
      case 'Grid':
        newSchema.children = build(1, 1);
        break;
      default:
        break;
    }
  } else if (newSchema.tag === 'BASIC') {
    let obj = null;
    switch (newSchema.componentType) {
      case 'ButtonGroup':
        obj = buildElementSchemaByType('BASIC', 'Button');
        if (obj?.props) {
          obj.props.title = 'Default Button';
          newSchema.children?.push(obj);
        }
        break;
      default:
        break;
    }
  } else if (newSchema.tag === 'FORM') {
    if (newSchema.componentType === 'SubForm') {
      // 操作栏
      const indexElement = new BasicColumnDto({
        title: '序号',
        dataIndex: 'no',
        align: 'center',
        width: 80,
      }) as BasicColumn;
      const actionElement = new BasicColumnDto({
        title: '操作栏',
        fixed: 'right',
        dataIndex: 'action',
        align: 'center',
      }) as BasicColumn;
      newSchema.props?.columns.push(indexElement);
      newSchema.props?.columns.push(actionElement);
    }
  }
  return newSchema;
}
export function copyElementSchema(element: LowCode.Schema): LowCode.Schema {
  const newSchema = cloneDeep(element);
  newSchema.id = `${newSchema.componentType}_${buildUUID(8)}`;
  if (newSchema.props) {
    newSchema.props.className = `${newSchema.componentType.toLowerCase()}_${buildUUID(8).toLowerCase()}`;

    if (newSchema.props.hasOwnProperty('field')) {
      newSchema.props.field = `Field_${buildUUID()}`;
    }

    if (newSchema.props.hasOwnProperty('model')) {
      newSchema.props.model = `Model_${buildUUID()}`;
    }
  }

  if (newSchema.tag === 'LAYOUT') {
    newSchema.children = [];
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
    if (newSchema.props) {
      newSchema.props.className = `${newSchema.componentType.toLowerCase()}_${buildUUID(8).toLowerCase()}`;

      if (newSchema.props.hasOwnProperty('field')) {
        newSchema.props.field = `Field_${buildUUID()}`;
      }

      if (newSchema.props.hasOwnProperty('model')) {
        newSchema.props.model = `Model_${buildUUID()}`;
      }
    }
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
  } else if (classification === 'FORM') {
    const idx = FormComponents.findIndex((item) => {
      return item.componentType === componentName;
    });
    if (idx !== -1) {
      schema = FormComponents[idx];
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
