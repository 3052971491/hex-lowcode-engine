import type { LowCode } from '/@/types/schema.d';

/**
 * 设置组件属性值
 * @param attribute 属性名
 * @param schema 单个组件节点描述
 */
export function set(attribute: string, value: any, schema: LowCode.Schema) {
  if (schema.props.hasOwnProperty(attribute)) {
    schema.props[attribute] = value;
  }
}

/**
 * 获取组件属性值
 * @param attribute 属性名
 * @param schema 单个组件节点描述
 */
export function get(attribute: string, schema: LowCode.Schema) {
  if (schema.props.hasOwnProperty(attribute)) {
    return schema.props[attribute];
  }
  return undefined;
}
