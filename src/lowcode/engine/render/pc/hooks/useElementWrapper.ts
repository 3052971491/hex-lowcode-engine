import { computed, ComputedRef } from 'vue';
import type { LowCodeScheme } from '/@/types/scheme.d';

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
 * @param scheme 当前组件节点描述
 * @param selectScheme 选中组件节点描述
 * @param redactState 是否编辑器状态
 */
export function useElementWrapper(
  scheme: LowCodeScheme.Scheme,
  selectScheme: LowCodeScheme.Scheme | undefined | null,
  redactState: boolean | undefined = true,
): ElementWrapper {
  const isSelect = computed(() => {
    if (!redactState || !selectScheme) return false;
    return scheme.id === selectScheme.id;
  });

  const isDefault = computed((): boolean => {
    return (
      scheme.props.behavior === 'normal' || scheme.props.behavior === 'disabled' || scheme.props.behavior === 'hidden'
    );
  });

  const isPreview = computed(() => {
    return redactState;
  });

  const isReadonly = computed(() => {
    return scheme.props.behavior === 'readonly';
  });

  const isHidden = computed(() => {
    if (redactState) return false;
    return scheme.props.behavior === 'hidden';
  });

  return { isSelect, isDefault, isPreview, isReadonly, isHidden };
}
