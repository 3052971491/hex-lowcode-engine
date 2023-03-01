import type { LowCodeSchema } from '/@/types/schema.d';

/**
 * Row 栅格布局
 * 参考地址: https://www.antdv.com/components/grid-cn
 */
const Row: LowCodeSchema.Schema = {
  device: 'PC',
  tag: 'LAYOUT',
  description: '',
  docUrl: 'https://www.antdv.com/components/grid-cn',
  componentName: '栅格',
  componentType: 'Row',
  icon: '',
  iconType: 'DEFAULT',
  formItemFlag: false,
  id: '',
  props: {
    align: 'top',
    justify: 'start',
    wrap: true,
    rowGutter: 0,
    columnGutter: 0,
    __style__: '',
  },
  children: [],
  condition: true,
};

export default Row;
