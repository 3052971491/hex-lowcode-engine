<template>
  <div class="element-wrapper-container">
    <a-form-item v-if="schema?.formItemFlag" :name="getName()" :rules="getRules()">
      <template #label> {{ label }} </template>
      <template v-if="schema.props?.tips" #extra>{{ schema.props?.tips }}</template>
      <!-- <template #help></template> -->
      <slot></slot>
    </a-form-item>

    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, inject } from 'vue';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useFormItem } from '../hooks/useFormItem';
import { useI18n } from '../hooks/useI18n';

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

const { getI18n } = useI18n(core?.state.projectConfig);
const label = computed(() => {
  return getI18n(props.schema.props?.label);
});

const { getRules, getName } = useFormItem(props.schema);
</script>
