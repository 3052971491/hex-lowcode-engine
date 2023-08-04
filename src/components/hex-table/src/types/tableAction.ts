import { ButtonProps, Popconfirm } from 'ant-design-vue';
import { Fn } from './index';

export interface ActionItem extends ButtonProps {
  onClick?: Fn;
  label?: string;
  color?: 'success' | 'error' | 'warning';
  icon?: string;
  popConfirm?: InstanceType<typeof Popconfirm>['$props'];
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  // auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
  tooltip?: string;
}
