import type { LowCodeSchema } from '/@/types/schema.d';

const basic: any = import.meta.globEager('../pc/basic/*.ts');
const business: any = import.meta.globEager('../pc/business/*.ts');
const layout: any = import.meta.globEager('../pc/layout/*.ts');
const advanced: any = import.meta.globEager('../pc/advanced/*.ts');

const BasicComponents: LowCodeSchema.Schema[] = [];
Object.keys(basic).forEach(async (key) => {
  const mod = basic[key].default;
  BasicComponents.push(mod);
});

const BusinessComponents: LowCodeSchema.Schema[] = [];
Object.keys(business).forEach(async (key) => {
  const mod = business[key].default;
  BusinessComponents.push(mod);
});

const LayoutComponents: LowCodeSchema.Schema[] = [];
Object.keys(layout).forEach((key) => {
  const mod = layout[key].default;
  LayoutComponents.push(mod);
});

const AdvancedComponents: LowCodeSchema.Schema[] = [];
Object.keys(advanced).forEach((key) => {
  const mod = advanced[key].default;
  AdvancedComponents.push(mod);
});

export { BasicComponents, BusinessComponents, LayoutComponents, AdvancedComponents };
