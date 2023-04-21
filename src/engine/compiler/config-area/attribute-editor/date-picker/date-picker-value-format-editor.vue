<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-select v-model:value="modelValue" mode="tags" @change="handleChange">
      <a-select-option value="YYYY">YYYY</a-select-option>
      <a-select-option value="YYYY-MM">YYYY-MM</a-select-option>
      <a-select-option value="YYYY-MM-DD">YYYY-MM-DD</a-select-option>
      <a-select-option value="YYYY-MM-DD HH:mm">YYYY-MM-DD HH:mm</a-select-option>
      <a-select-option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</a-select-option>
    </a-select>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="DatePickerValueFormatEditor">
import { inject, computed } from 'vue';
import { isArray } from 'lodash-es';
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
    if (isArray(get(props.attribute, schema.value))) {
      return get(props.attribute, schema.value);
    }
    if (get(props.attribute, schema.value)) {
      return [get(props.attribute, schema.value)];
    }
    return [];
  },
});

const handleChange = (value: string[]) => {
  modelValue.value = value.length > 0 ? value[value.length - 1] : 'YYYY-MM-DD';
};
</script>
