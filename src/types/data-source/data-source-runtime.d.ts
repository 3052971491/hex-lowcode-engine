import type { CustomRequestHandler } from './data-source-handlers.d';
import type { JSFunction, JSExpression } from '../value-type.d';
/**
 * 数据源对象--运行时渲染
 */
export interface RuntimeDataSource {
  /** 数据源列表 */
  list: RuntimeDataSourceConfig[];
  /** 所有请求数据的处理函数 */
  dataHandler: JSFunction | undefined;
}

/** 数据源对象 */
export interface RuntimeDataSourceConfig {
  /** 数据请求 ID 标识 */
  id: string;
  /**
   * 是否为初始数据
   * @description 支持变量; 值为 true 时，将在组件初始化渲染时自动发送当前数据请求
   */
  isInit: boolean;
  /**
   * 是否需要串行执行
   * @description 支持变量; 值为 true 时，当前请求将被串行执行
   */
  isSync: boolean;
  /**
   * 数据请求类型
   * @description 支持四种类型：fetch/mtop/jsonp/custom
   */
  type: string;
  /** 本次请求是否可以正常请求 */
  shouldFetch: (options: RuntimeOptionsConfig) => boolean;
  /** 单个数据结果请求参数处理函数 */
  willFetch: WillFetch;
  /**
   * 自定义扩展的外部请求处理器
   * @description 仅 type='custom' 时生效
   */
  requestHandler: CustomRequestHandler;
  /**
   * request 成功后的回调函数
   * @description 参数：请求成功后 promise 的 value 值
   */
  dataHandler: DataHandler;
  /**
   * request 失败后的回调函数
   * @description 参数：请求出错 promise 的 error 内容
   */
  errorHandler: ErrorHandler;
  /** 请求参数 */
  options: RuntimeOptionsConfig;
  [otherKey: string]: any;
}
export type WillFetch = (options: RuntimeOptionsConfig) => Promise<RuntimeOptionsConfig> | RuntimeOptionsConfig;

export type DataHandler = <T>(response: { data: T; [index: string]: unknown }) => Promise<T | undefined>;

export type ErrorHandler = (err: unknown) => Promise<any>;

export interface RuntimeOptionsConfig {
  /**
   * 请求地址
   * @description 支持变量
   */
  api?: string;
  /**
   * 请求参数
   * @description 支持变量
   */
  params?: Record<string, unknown>;
  /**
   * 请求方法
   * @description 支持变量
   */
  method?: string;
  /**
   * 是否支持跨域
   * @description 支持变量
   */
  isCors?: boolean;
  /**
   * 超时时长
   * @description 支持变量
   */
  timeout?: number;
  /**
   * 请求头信息
   * @description 支持变量, 自定义请求头
   */
  headers?: Record<string, unknown>;
  [option: string]: unknown;
}
