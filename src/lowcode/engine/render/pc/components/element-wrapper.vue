<template>
  <template v-if="isPreview">
    <ElementEditWrapper :scheme="scheme">
      <slot></slot>
    </ElementEditWrapper>
  </template>
  <template v-else>
    <ElementViewWrapper :scheme="scheme">
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
import type { LowCodeScheme } from '/@/types/scheme.d';
import { computed, inject } from 'vue';
import ElementEditWrapper from './element-edit-wrapper.vue';
import ElementViewWrapper from './element-view-wrapper.vue';
import { useElementWrapper } from '../hooks/useElementWrapper';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@lowcode-engine/render/render-inject-key';

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

const { isSelect, isDefault, isPreview, isReadonly, isHidden } = useElementWrapper(
  props.scheme,
  selectedScheme.value,
  redactState,
);
</script>
