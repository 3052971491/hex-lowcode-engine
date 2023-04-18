/**
 * JSON 基本类型
 */
export type JSONValue = boolean | string | number | null | undefined | JSONArray | JSONObject;

export type JSONArray = JSONValue[];

/**
 * 变量表达式
 * 表达式内通过 this 对象获取上下文
 */
export interface JSExpression {
  type: 'JSExpression';
  /**
   * 表达式字符串
   */
  value: string;
  /**
   * 模拟值
   */
  mock?: any;
  /**
   * 源码
   */
  compiled?: string;
}

/**
 * 事件函数类型
 * 保留与原组件属性、生命周期( vue )一致的输入参数，并给所有事件函数 binding 统一一致的上下文（当前组件所在容器结构的 this 对象）
 */
export interface JSFunction {
  type: 'JSFunction';
  /**
   * 函数定义，或直接函数表达式
   */
  value: string;

  /**
   * 源码
   */
  compiled?: string;

  /**
   * 模拟值
   */
  mock?: any;

  /**
   * 额外扩展属性，如 extType、events
   */
  [key: string]: any;
}
export interface JSONObject {
  [key: any]: JSONValue;
}

export type CompositeValue = JSONValue | JSExpression | JSFunction | CompositeObject | CompositeArray;

export interface CompositeObject {
  [key: any]: CompositeValue;
}

export type CompositeArray = CompositeValue[];
export interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
