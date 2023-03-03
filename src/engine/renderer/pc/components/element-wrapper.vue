<template>
  <div class="element-wrapper">
    <template v-if="isPreview">
      <ElementEditWrapper v-if="schema?.tag !== 'LAYOUT'" :schema="schema">
        <slot></slot>
      </ElementEditWrapper>
      <ContainerEditWrapper v-else :schema="schema">
        <slot></slot>
      </ContainerEditWrapper>
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
  </div>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, inject } from 'vue';
import ElementEditWrapper from './element-edit-wrapper.vue';
import ContainerEditWrapper from './container-edit-wrapper.vue';
import ElementViewWrapper from './element-view-wrapper.vue';
import { useElementWrapper } from '../hooks/useElementWrapper';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';

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

const { isSelect, isDefault, isPreview, isReadonly, isHidden } = useElementWrapper(
  props.schema,
  selectedScheme.value,
  redactState,
);
</script>
