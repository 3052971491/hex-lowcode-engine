<template>
  <template v-if="isPreview">
    <ElementEditWrapper :schema="schema">
      <slot></slot>
    </ElementEditWrapper>
  </template>
  <template v-else>
    <ElementViewWrapper :schema="schema">
      <template v-if="isDefault">
        <div v-show="!isHidden">
          <slot></slot>
        </div>
      </template>
      <template v-else-if="isReadonly"> 只读状态(待完善) </template>
    </ElementViewWrapper>
  </template>
</template>

<script lang="ts" setup>
import type { LowCodeSchema } from '/@/types/schema.d';
import { computed, inject } from 'vue';
import ElementEditWrapper from './element-edit-wrapper.vue';
import ElementViewWrapper from './element-view-wrapper.vue';
import { useElementWrapper } from '../hooks/useElementWrapper';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';

interface Props {
  schema: LowCodeSchema.Schema;
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
});

const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});

const { isSelect, isDefault, isPreview, isReadonly, isHidden } = useElementWrapper(
  props.schema,
  selectedScheme.value,
  redactState,
);
</script>
