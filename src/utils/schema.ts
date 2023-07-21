import type { LowCode } from '/@/types/schema.d';

/**
 * 设置组件属性值
 * @param attribute 属性名
 * @param schema 单个组件节点描述
 * @param projectSchema
 * @param isProps 是否是props层, 否则就默认层
 */
export function set(
  attribute: string,
  value: any,
  schema: LowCode.Schema,
  projectSchema: LowCode.ProjectSchema | undefined,
  isProps = true,
) {
  const { i18n, config } = projectSchema!;
  if (isProps) {
    if (schema.props?.hasOwnProperty(attribute)) {
      if (schema.props[attribute]?.type && schema.props[attribute].type === 'i18n') {
        schema.props[attribute][config.i18n] = value;
        if (i18n) {
          i18n[config.i18n][schema.props[attribute].key] = value;
        }
      } else {
        schema.props[attribute] = value;
      }
    }
    return;
  }
  if (schema.hasOwnProperty(attribute)) {
    if (schema[attribute]?.type && schema[attribute].type === 'i18n') {
      schema[attribute][config.i18n] = value;
    } else {
      schema[attribute] = value;
    }
  }
}

/**
 * 获取组件属性值
 * @param attribute 属性名
 * @param schema 单个组件节点描述
 * @param isProps 是否是props层, 否则就默认层
 */
export function get(attribute: string, schema: LowCode.Schema, isProps = true) {
  if (isProps) {
    if (schema.props?.hasOwnProperty(attribute)) {
      return schema.props[attribute];
    }
    return undefined;
  }
  if (schema?.hasOwnProperty(attribute)) {
    return schema[attribute];
  }
  return undefined;
}
