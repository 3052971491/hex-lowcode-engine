<template>
  <form-Item-wrapper :label="t('el.property.Filter.columnNumber')" :name="props.attribute" :option="option">
    <a-slider v-model:value="modelValue" :marks="marks" :step="null" class="w-full" :max="6" :min="1" />
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="FilterColumnNumberEditor">
import { inject, computed, ref } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
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

const marks = ref<Record<number, any>>({
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 6,
});
</script>
