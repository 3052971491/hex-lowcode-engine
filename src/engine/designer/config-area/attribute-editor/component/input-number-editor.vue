<template>
  <form-Item-wrapper v-if="status" :label="props.label" :name="props.attribute" :option="option">
    <a-input-number v-model:value="modelValue" placeholder="请输入" style="width: 100%" />
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="InputNumberEditor">
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

/** 是否显示当前属性编辑器 */
const status = computed<boolean>(() => {
  switch (props.attribute) {
    case 'maxlength':
      return get('showCount', scheme.value);
    default:
      return true;
  }
});
</script>
