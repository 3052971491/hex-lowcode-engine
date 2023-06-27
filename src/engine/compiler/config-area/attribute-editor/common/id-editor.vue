<template>
  <form-Item-wrapper :label="t(`el.property.${props.attribute}`)" :name="props.attribute" :option="option">
    <a-input v-model:value="modelValue" :placeholder="t('el.placeholder.enter')"></a-input>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="IdEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
// import { set, get } from '/@/engine/utils/schema';
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
    schema.value.id = val;
  },
  get() {
    return schema.value.id;
  },
});
</script>
