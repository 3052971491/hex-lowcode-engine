<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-select v-model:value="modelValue" @change="handleChange">
      <a-select-option value="date">date</a-select-option>
      <a-select-option value="month">month</a-select-option>
      <a-select-option value="year">year</a-select-option>
    </a-select>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="DatePickerPickerEditor">
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

const handleChange = (value: string) => {
  if (value === 'year') {
    set('format', 'YYYY', schema.value, core?.state.projectConfig);
    set('valueFormat', 'YYYY', schema.value, core?.state.projectConfig);
  } else if (value === 'month') {
    set('format', 'MM', schema.value, core?.state.projectConfig);
    set('valueFormat', 'MM', schema.value, core?.state.projectConfig);
  } else if (value === 'date') {
    set('format', 'YYYY-MM-DD', schema.value, core?.state.projectConfig);
    set('valueFormat', 'YYYY-MM-DD', schema.value, core?.state.projectConfig);
  }
};
</script>
