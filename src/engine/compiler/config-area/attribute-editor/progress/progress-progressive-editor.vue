<template>
  <collapse-item-wrapper
    :label="t('el.property.Progress.progressive')"
    :name="props.attribute"
    :option="option"
    :show-arrow="false"
    collapsible="disabled"
  >
    <a-switch v-model:checked="modelValue"></a-switch>
  </collapse-item-wrapper>
</template>
<script lang="ts" setup name="ProgressProgressiveEditor">
import { inject, computed } from 'vue';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { set, get } from '/@/utils/schema';
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
  set(val: string) {
    set(props.attribute, val, schema.value, core?.state.projectConfig);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});
</script>
