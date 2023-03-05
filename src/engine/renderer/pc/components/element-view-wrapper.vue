<template>
  <template v-if="schema?.formItemFlag">
    <a-form-item :rules="getRules()">
      <template #label> {{ schema.props?.label }} </template>
      <template #extra>{{ schema.props?.tips }}</template>
      <template #help></template>
      <slot></slot>
    </a-form-item>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, inject } from 'vue';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useFormItem } from '../hooks/useFormItem';

interface Props {
  schema: LowCode.Schema;
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
});
const core = inject(HexCoreInjectionKey);

const redactState = inject(RedactStateInjectionKey);

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});

const { getRules } = useFormItem(props.schema);
</script>
