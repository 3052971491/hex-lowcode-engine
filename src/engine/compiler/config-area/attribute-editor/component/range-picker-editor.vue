<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-range-picker
      v-model:value="modelValue"
      :placeholder="['开始日期', '结束日期']"
      allow-clear
      show-time
      class="w-full"
    />
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="RangePickerEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { set, get } from '/@/utils/schema';
import { AttributeItem } from '../../attribute-editor/interface';

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
  set(val) {
    set(props.attribute, val, schema.value);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});
</script>
