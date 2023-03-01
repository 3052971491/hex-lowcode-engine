<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-select v-model:value="modelValue">
      <a-select-option value="top">top</a-select-option>
      <a-select-option value="middle">middle</a-select-option>
      <a-select-option value="bottom">bottom</a-select-option>
    </a-select>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="RowAlignEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
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
    set(props.attribute, val, schema.value);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});
</script>
