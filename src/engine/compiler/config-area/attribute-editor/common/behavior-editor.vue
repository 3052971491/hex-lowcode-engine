<template>
  <form-Item-wrapper :label="t(`el.property.${props.attribute}`)" :name="props.attribute" :option="option">
    <a-radio-group v-model:value="modelValue">
      <a-radio-button v-for="(item, index) in source" :key="index" :value="item.key">
        <a-tooltip placement="topRight">
          <template #title>
            <span>{{ t(`el.tips.${item.key}`) }}</span>
          </template>
          {{ t(`el.${item.key}`) }}
        </a-tooltip>
      </a-radio-button>
    </a-radio-group>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="BehaviorEditor">
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

const source = [
  { key: 'normal', name: '普通' },
  { key: 'disabled', name: '禁用' },
  { key: 'readonly', name: '只读' },
  { key: 'hidden', name: '隐藏' },
];
</script>
