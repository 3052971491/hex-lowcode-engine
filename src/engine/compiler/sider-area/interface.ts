import { FunctionalComponent } from 'vue';

export interface IMenuItem {
  /** 名称 */
  label: string;
  /** 对应组件名称 */
  value: string;
  /** 图标 */
  icon: FunctionalComponent;
  /** 组件 */
  component: any;
  /** 是否以抽屉形式展示 */
  drawer?: boolean;
}
