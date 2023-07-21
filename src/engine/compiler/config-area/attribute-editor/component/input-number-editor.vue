<template>
  <form-Item-wrapper v-if="status" :label="formatLabel" :name="props.attribute" :option="option">
    <a-input-number v-model:value="modelValue" :placeholder="t('el.placeholder.enter')" style="width: 100%" />
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="InputNumberEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { set, get } from '/@/utils/schema';
import { AttributeItem } from '../../attribute-editor/interface';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
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
    set(props.attribute, val, schema.value, core?.state.projectConfig);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});

/** 是否显示当前属性编辑器 */
const status = computed<boolean>(() => {
  switch (props.attribute) {
    case 'maxlength':
      return get('showCount', schema.value);
    default:
      return true;
  }
});

const formatLabel = computed(() => {
  return t(`el.property.${props.option.type}.${props.attribute}`) !==
    `el.property.${props.option.type}.${props.attribute}`
    ? t(`el.property.${props.option.type}.${props.attribute}`)
    : t(`el.property.${props.attribute}`);
});
</script>
