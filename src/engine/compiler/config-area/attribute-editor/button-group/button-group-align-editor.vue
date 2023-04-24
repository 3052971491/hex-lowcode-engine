<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-radio-group v-model:value="modelValue">
      <a-radio-button value="flex-start">Left</a-radio-button>
      <a-radio-button value="center">Center</a-radio-button>
      <a-radio-button value="flex-end">Right</a-radio-button>
    </a-radio-group>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="ButtonGroupAlignEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../interface';
import { set, get } from '/@/utils/schema';

interface Props {
  label: string;
  attribute: string;
  option: AttributeItem;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  attribute: '',
});

const core = inject(HexCoreInjectionKey);
const schema = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});
const modelValue = computed({
  set(val: string) {
    set(props.attribute, val, schema.value, core?.state.projectConfig);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});
</script>
