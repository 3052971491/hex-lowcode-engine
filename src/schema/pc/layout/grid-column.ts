import type { LowCodeSchema } from '/@/types/schema.d';

/**
 * Column 栅格布局
 * 参考地址: https://www.antdv.com/components/grid-cn
 */
const Column: LowCodeSchema.Schema = {
  device: 'PC',
  tag: 'LAYOUT',
  description: '',
  docUrl: 'https://www.antdv.com/components/grid-cn',
  componentName: '栅格',
  componentType: 'Column',
  icon: '',
  iconType: 'DEFAULT',
  internal: false,
  formItemFlag: false,
  id: '',
  props: {
    flex: null,
    offset: 0,
    order: 0,
    pull: 0,
    push: 0,
    span: 12,
    xxxl: null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    xxl: null,
    __style__: '',
  },
  children: [],
  condition: true,
};

export default Column;
