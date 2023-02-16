<template>
  <!-- 是否a-form-item包裹 -->
  <template v-if="scheme?.formItemFlag">
    <a-form-item :rules="getRules()" :extra="scheme.props.tips">
      <template #label>
        {{ scheme.props.label }}
      </template>
      <!-- <template #extra>{{ scheme.props.tips }}</template> -->
      <slot></slot>
    </a-form-item>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script lang="ts" setup>
import type { LowCodeScheme } from '/@/types/scheme.d';
import { computed, inject } from 'vue';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@lowcode-engine/render/render-inject-key';
import { useFormItem } from '../hooks/useFormItem';

interface Props {
  scheme: LowCodeScheme.Scheme;
}

const props = withDefaults(defineProps<Props>(), {
  scheme: undefined,
});
const core = inject(HexCoreInjectionKey);

const redactState = inject(RedactStateInjectionKey);

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});

const { getRules } = useFormItem(props.scheme);
</script>
