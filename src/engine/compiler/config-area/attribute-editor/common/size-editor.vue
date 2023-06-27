<template>
  <form-Item-wrapper :label="t(`el.property.${props.attribute}`)" :name="props.attribute" :option="option">
    <a-radio-group v-model:value="modelValue">
      <a-radio-button v-for="(item, index) in source" :key="index" :value="item.key">
        <a-tooltip placement="top">
          <template #title>
            <span>{{ item.tips }}</span>
          </template>
          {{ item.name }}
        </a-tooltip>
      </a-radio-button>
    </a-radio-group>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="SizeEditor">
import { ref, inject, onMounted, computed } from 'vue';
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
  { key: 'small', name: t('el.common.small'), tips: t('el.smallSize') },
  { key: 'middle', name: t('el.common.middle'), tips: t('el.middleSize') },
  { key: 'large', name: t('el.common.large'), tips: t('el.largeSize') },
  { key: 'default', name: t('el.common.default'), tips: t('el.defaultSize') },
];
</script>
