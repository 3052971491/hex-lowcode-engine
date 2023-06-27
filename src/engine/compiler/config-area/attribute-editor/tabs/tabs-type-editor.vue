<template>
  <form-Item-wrapper :label="t('el.tabBasicStyle')" :name="props.attribute" :option="option">
    <a-radio-group v-model:value="modelValue">
      <a-radio-button value="line">{{ t('el.lineType') }}</a-radio-button>
      <a-radio-button value="card">{{ t('el.cardType') }}</a-radio-button>
    </a-radio-group>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="TabsTypeEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../interface';
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
