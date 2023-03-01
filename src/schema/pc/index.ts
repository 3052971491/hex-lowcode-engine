import type { LowCode } from '/@/types/schema.d';
import { SchemaMap } from '../common/schema';

const BasicComponents: LowCode.Schema[] = [];

const BusinessComponents: LowCode.Schema[] = [];

const LayoutComponents: LowCode.Schema[] = [];

const AdvancedComponents: LowCode.Schema[] = [];
console.log(SchemaMap);
for (const item of SchemaMap) {
  console.log(item[1]);
  if (item[1].tag === 'BASIC') {
    BasicComponents.push(item[1]);
  } else if (item[1].tag === 'BUSINESS') {
    BusinessComponents.push(item[1]);
  } else if (item[1].tag === 'LAYOUT') {
    LayoutComponents.push(item[1]);
  } else if (item[1].tag === 'ADVANCED') {
    AdvancedComponents.push(item[1]);
  }
}

export { BasicComponents, BusinessComponents, LayoutComponents, AdvancedComponents };
