import { computed, ComputedRef } from 'vue';
import type { LowCode } from '/@/types/schema.d';

interface ElementWrapper {
  /**
   * 是否选中当前组件
   * @description 编辑模式下生效
   */
  isSelect: ComputedRef<boolean>;
  /**
   * 是否普通模式
   */
  isDefault: ComputedRef<boolean>;
  /**
   * 是否预览模式
   */
  isPreview: ComputedRef<boolean>;
  /**
   * 是否只读模式
   */
  isReadonly: ComputedRef<boolean>;
  /**
   * 是否隐藏模式
   */
  isHidden: ComputedRef<boolean>;
}

/**
 * 组件包裹根容器-Hooks
 * @param schema 当前组件节点描述
 * @param selectScheme 选中组件节点描述
 * @param redactState 是否编辑器状态
 */
export function useElementWrapper(
  schema: LowCode.Schema,
  selectScheme: LowCode.Schema | undefined | null,
  redactState: boolean | undefined = true,
): ElementWrapper {
  const isSelect = computed(() => {
    if (!redactState || !selectScheme) return false;
    return schema.id === selectScheme.id;
  });

  const isDefault = computed((): boolean => {
    return (
      schema.props.behavior === 'normal' || schema.props.behavior === 'disabled' || schema.props.behavior === 'hidden'
    );
  });

  const isPreview = computed(() => {
    return redactState;
  });

  const isReadonly = computed(() => {
    return schema.props.behavior === 'readonly';
  });

  const isHidden = computed(() => {
    if (redactState) return false;
    return schema.props.behavior === 'hidden';
  });

  return { isSelect, isDefault, isPreview, isReadonly, isHidden };
}
