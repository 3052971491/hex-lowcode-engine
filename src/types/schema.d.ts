import type { I18nMap } from './i18n.d';
import type { CompositeValue, JSExpression, JSFunction } from '/@/types/value-type.d';

export namespace LowCode {
  /**
   * Schema 大类
   * @description 基础组件 | 业务组件 | 布局组件 | 高级组件
   */
  export type Category = 'BASIC' | 'FORM' | 'BUSINESS' | 'LAYOUT' | 'ADVANCED';

  /**
   * Schema 设备
   * @description WEB端 | 移动端
   */
  export type Device = 'PC' | 'MOBILE';

  /**
   * Schema 图标类型
   * @description 默认
   */
  export type IconType = 'DEFAULT';

  /**
   * Schema 校验规则类型
   * @description 必填 | 最小值 | 最大值 | 最小长度 | 最大长度 | 自定义
   */
  export type RuleType = 'required' | 'min' | 'max' | 'minlength' | 'maxlength' | 'custom';

  /**
   * Schema 状态
   * @description 正常态 | 只读态 | 禁用态 | 隐藏态
   */
  export type Behavior = 'normal' | 'readonly' | 'disabled' | 'hidden';

  /**
   * Schema 大小
   * @description 小 | 中 | 大
   */
  export type Size = 'small' | 'middle' | 'large' | 'default';

  /**
   * Schema 弹框类型
   * @description 模态框 | 抽屉
   */
  export type DialogType = 'modal' | 'drawer';

  /**
   * 校验规则-子集
   */
  export interface Rule {
    /** 是否启用 */
    enable: boolean;
    /** 类型 */
    type: RuleType;
    /** 名称 */
    label: string;
    /** 值 */
    value: CompositeValue | JSFunction;
    /** 提示信息 */
    message: string | null;
  }

  /**
   * 校验规则集合
   */
  export type RuleMap = Rule[];

  /**
   * 组件节点描述-基类
   */
  export interface NodeSchema {
    /** 显示设备 */
    device: Device;
    /** 组件tag标识 */
    tag: Category;
    /** 描述 */
    description: string;
    /** 组件文档地址 */
    docUrl: string;
    /** 组件名称 */
    componentName: string;
    /** 组件类型 */
    componentType: string;
    /** icon, 配置组件库使用 */
    icon: string;
    /** icon类型, 配置组件库使用 */
    iconType: IconType;
    /** 子集, 仅布局组件使用 */
    children?: NodeSchema[];
    /** 是否可显示, 配置组件库使用 */
    internal?: boolean;
    /** 组件唯一标识 */
    id: string;
    /** 异步数据源配置 */
    dataSource?: any;
    /** 生命周期对象 */
    lifeCycles?: {
      [key: string]: any;
    };

    /** 是否被a-form-item包裹 */
    formItemFlag?: boolean;
    /** 属性 */
    props?: NodeSchemaProps & {
      [key: string]: any;
    };
    /** 事件 */
    events?: {
      [key: string]: any;
    };
    /** 是否渲染 */
    condition: boolean;
    /**
     * 循环数据
     * @description 只有为数组才生效
     */
    loop?: any;
    /**
     * 循环变量名
     * @description 值为数组, 下标0为迭代变量名, 下标1为索引变量名
     */
    loopArgs?: string[];
    /**
     * 是否始终提交
     * @description 1、仅显示时提交数据：当组件隐藏时，默认是不会将数据提交到后台的。2、始终提交：无论组件显示与否，都提交当前字段数据。
     */
    alwaysCommit?: boolean;
    [key: string]: any;
  }

  /**
   * 组件节点描述-Props基类
   */
  export interface NodeSchemaProps extends CompositeValue {
    /** 类名 */
    className: string;
    /** 样式 */
    __style__: string;
  }

  /** 应用描述 */
  export interface ProjectSchema {
    /**
     * 唯一标识
     */
    id?: string;
    /**
     * 应用范围内的全局自定义函数或第三方工具类扩展
     */
    utils: any;
    /**
     * 应用范围内的全局样式
     */
    css?: string;
    /**
     * 当前应用的公共数据源
     */
    dataSource?: any;
    /**
     * 国际化语料
     */
    i18n?: I18nMap;
    /**
     * 当前应用配置信息
     */
    config?: any;
    /**
     * 组件节点树
     */
    componentsTree: Schema[];
    /**
     * 弹框节点树
     */
    dialogComponentsTree: DialogSchema[];
    /** 编译前全量代码 */
    originCode: string;
    /**
     * 应用初始数据
     */
    state?: {
      [key: string]: CompositeValue;
    };
    /**
     * 自定义方法设置
     */
    methods: {
      [key: string]: JSExpression | JSFunction;
    };
    /**
     * 生命周期对象
     */
    lifeCycles?: {
      [key: string]: JSExpression | JSFunction;
    };
  }

  /** 弹出框节点描述 */
  export interface DialogSchema {
    /** 组件唯一标识 */
    id: string;
    /** 类型 */
    type: DialogType;
    /** 弹框名称 */
    name: string;
    /** 组件节点树 */
    componentsTree: Schema[];
  }

  /**
   * 组件节点描述
   */
  export type Schema = NodeSchema;
}
