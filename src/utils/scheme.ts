import type { LowCodeScheme } from '/@/types/scheme.d';

/**
 * 设置组件属性值
 * @param prop 属性名
 * @param scheme 单个组件节点描述
 */
export function set(prop: string, value: any, scheme: LowCodeScheme.Scheme) {
  if (scheme.props.hasOwnProperty(prop)) {
    scheme.props[prop] = value;
  }
}

/**
 * 获取组件属性值
 * @param prop 属性名
 * @param scheme 单个组件节点描述
 */
export function get(prop: string, scheme: LowCodeScheme.Scheme) {
  if (scheme.props.hasOwnProperty(prop)) {
    return scheme.props[prop];
  }
  return undefined;
}
