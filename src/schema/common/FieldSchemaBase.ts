import type { LowCode } from '/@/types/schema.d';
import type { CompositeValue } from '/@/types/value-type.d';
import { ComponentType, SchemaMap } from './schema';

/** 组件基类 */
export class Scheme<T extends LowCode.NodeSchema> {
  /** 显示设备 */
  device: LowCode.Device = 'PC';

  /** 组件tag标识 */
  tag: LowCode.Category = 'FORM';

  /** 描述 */
  description: string = '';

  /** 组件文档地址 */
  docUrl: string = '';

  /** 组件名称 */
  componentName: string = '';

  /** 组件类型 */
  componentType: string = '';

  /** icon, 配置组件库使用 */
  icon: string = '';

  /** icon类型, 配置组件库使用 */
  iconType: LowCode.IconType = 'DEFAULT';

  /** 子集, 仅布局组件使用 */
  children?: LowCode.NodeSchema[];

  /** 是否可显示, 配置组件库使用 */
  internal?: boolean = true;

  /** 组件唯一标识 */
  id: string = '';

  /** 异步数据源配置 */
  dataSource?: any;

  /** 生命周期对象 */
  lifeCycles?: {
    [key: string]: any;
  };

  /** 是否被a-form-item包裹 */
  formItemFlag?: boolean;

  /** 属性 */
  props!: T['props'];

  /** 事件 */
  events?: {
    [key: string]: any;
  };

  /** 是否渲循环染 */
  condition: boolean = false;

  /**
   * 循环数据
   * @description 只有为数组才生效
   */
  loop?: CompositeValue = null;

  /**
   * 循环变量名
   * @description 值为数组, 下标0为迭代变量名, 下标1为索引变量名
   */
  loopArgs?: string[] = ['item', 'index'];

  /**
   * 是否始终提交
   * @description 1、仅显示时提交数据：当组件隐藏时，默认是不会将数据提交到后台的。2、始终提交：无论组件显示与否，都提交当前字段数据。
   */
  alwaysCommit?: boolean;

  constructor(_data?: T) {
    if (_data) {
      for (const property in _data) {
        if (_data.hasOwnProperty(property)) (<any>this)[property] = (<any>_data)[property];
      }
    }
  }

  init(_data?: T) {
    if (_data) {
      this.device = _data.device;
      this.tag = _data.tag;
      this.description = _data.description;
      this.docUrl = _data.docUrl;
      this.componentName = _data.componentName;
      this.componentType = _data.componentType;
      this.icon = _data.icon;
      this.iconType = _data.iconType;
      this.internal = _data.internal;
      this.props = _data.props;
      if (_data.hasOwnProperty('children')) {
        this.children = _data.children;
      }
      if (_data.hasOwnProperty('internal')) {
        this.internal = _data.internal;
      }
      this.id = _data.id;
      if (_data.hasOwnProperty('dataSource')) {
        this.dataSource = _data.dataSource;
      }
      if (_data.hasOwnProperty('lifeCycles')) {
        this.lifeCycles = _data.lifeCycles;
      }
      if (_data.hasOwnProperty('formItemFlag')) {
        this.formItemFlag = _data.formItemFlag;
      }
      if (_data.hasOwnProperty('events')) {
        this.events = _data.events;
      }
      this.condition = _data.condition;
      if (_data.hasOwnProperty('loop')) {
        this.loop = _data.loop;
      }
      if (_data.hasOwnProperty('loopArgs')) {
        this.loopArgs = _data.loopArgs;
      }
    }
  }

  /**
   * 根据组件类型生成组件实例
   * @param componentType 组件类型
   * @returns
   */
  static create<T extends LowCode.NodeSchema>(componentType: ComponentType): Scheme<T> | undefined {
    let scheme: Scheme<T> | undefined;
    if (SchemaMap.has(componentType)) {
      scheme = SchemaMap.get(componentType);
    }
    return scheme;
  }

  /**
   * 根据组件节点描述生成组件实例
   * @param schema 组件节点描述
   * @returns
   */
  static update<T extends LowCode.NodeSchema>(schema: T): Scheme<T> {
    return new Scheme(schema);
  }

  /**
   * 设置属性值
   * @param property 属性名
   * @param value 属性值
   */
  set(property: string, value: CompositeValue) {
    try {
      if (!property) {
        throw new Error(`请传入属性名`);
      }
      if (this.props) {
        if (!this.props.hasOwnProperty(property)) {
          throw new Error(`该类上上无 ${property} 属性`);
        }
        this.props[property] = value;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 获取Scheme-props 属性值
   * @param property 属性名
   * @returns
   */
  get(property: string): CompositeValue {
    try {
      if (!property) {
        throw new Error(`请传入属性名`);
      }
      if (this.props) {
        if (!this.props.hasOwnProperty(property)) {
          throw new Error(`该类上上无 ${property} 属性`);
        }

        return this.props[property];
      }
    } catch (error) {
      console.error(error);
    }
  }

  getValue() {}

  setValue(...args: any) {}
}
