<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-input v-model:value="modelValue" placeholder="请输入唯一标识"></a-input>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="IdEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/render/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
// import { set, get } from '/@/engine/utils/schema';

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
    schema.value.id = val;
  },
  get() {
    return schema.value.id;
  },
});
</script>
