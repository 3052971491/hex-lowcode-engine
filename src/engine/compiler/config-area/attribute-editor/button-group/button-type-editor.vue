<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-select v-model:value="modelValue">
      <a-select-option value="primary">主按钮</a-select-option>
      <a-select-option value="default">次按钮</a-select-option>
      <a-select-option value="dashed">虚线按钮</a-select-option>
      <a-select-option value="link">链接按钮</a-select-option>
      <a-select-option value="text">文本按钮</a-select-option>
    </a-select>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="ButtonTypeEditor">
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
    set(props.attribute, val, schema.value);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});
</script>
