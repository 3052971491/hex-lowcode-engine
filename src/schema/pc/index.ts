import type { LowCode } from '/@/types/schema.d';
import { ComponentType, SchemaMap } from '../common/schema';

const BasicComponents: LowCode.Schema[] = [];
const BusinessComponents: LowCode.Schema[] = [];
const LayoutComponents: LowCode.Schema[] = [];
const AdvancedComponents: LowCode.Schema[] = [];

for (const item of SchemaMap) {
  if (item[1].tag === 'BASIC') {
    BasicComponents.push(item[1]);
  } else if (item[1].tag === 'BUSINESS') {
    BusinessComponents.push(item[1]);
  } else if (item[1].tag === 'LAYOUT') {
    // 表单组件 - 高级容器
    if (item[1].componentType === ComponentType.Form) {
      AdvancedComponents.push(item[1]);
    } else {
      LayoutComponents.push(item[1]);
    }
  } else if (item[1].tag === 'ADVANCED') {
    AdvancedComponents.push(item[1]);
  }
}

export { BasicComponents, BusinessComponents, LayoutComponents, AdvancedComponents };
