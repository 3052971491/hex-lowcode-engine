<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-switch v-model:checked="modelValue"></a-switch>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="SwitchEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@lowcode-engine/render/render-inject-key';
import { set, get } from '/@lowcode-engine/utils/scheme';
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
const scheme = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});

const modelValue = computed({
  set(val) {
    set(props.attribute, val, scheme.value);
  },
  get() {
    return get(props.attribute, scheme.value);
  },
});
</script>
