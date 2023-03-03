import { InjectionKey } from 'vue';
import { HexCoreFactory } from './central/useHexCore';
import { LowCode } from '/@/types/schema';
import { IComponentBreadcrumbs } from './pc/hooks/useComponentBreadcrumbs';
/**
 * 当前渲染器是否是编辑状态
 * @description 状态为true时可拖拽
 */
export const RedactStateInjectionKey = Symbol('redact-state') as InjectionKey<boolean>;

/**
 * 渲染器-海克斯核心
 * @description 编辑状态下: 当前应用配置, 历史进度, 选中节点, 及其操作方法
 * @description 渲染状态下: 当前应用配置, 及其操作方法
 */
export const HexCoreInjectionKey = Symbol('hex-core') as InjectionKey<HexCoreFactory>;

/**
 * 渲染器-数据引擎
 * @description 页面存储数据, 以及及操作方法
 */
export const DataEngineInjectionKey = Symbol('data-engine') as InjectionKey<any>;

/**
 * 渲染器-组件节点面包屑
 * @description
 */
export const ComponentBreadcrumbs = Symbol('component-breadcrumbs') as InjectionKey<IComponentBreadcrumbs>;
