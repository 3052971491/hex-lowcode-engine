<template>
  <form-Item-wrapper :label="t('el.property.Table.api')" :name="props.attribute" :option="option">
    <a-select v-model:value="modelValue" allow-clear>
      <a-select-option v-for="item in options" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
    </a-select>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="TableApiEditor">
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

const options = computed(() => {
  return core?.state.projectConfig?.dataSource?.list.filter((item) => item.protocal === 'REMOTE') ?? [];
});
</script>
