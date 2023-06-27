<template>
  <collapse-Item-wrapper :label="t(`el.property.${props.attribute}`)" :name="props.attribute" :option="props.option">
    <a-radio-group v-model:value="modelValue" button-style="solid" class="w-full">
      <a-radio-button :value="false" class="w-1/2 text-center">{{ t('el.displayCommit') }}</a-radio-button>
      <a-radio-button :value="true" class="w-1/2 text-center">{{ t('el.alwaysCommit') }}</a-radio-button>
    </a-radio-group>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="AlwaysCommitEditor">
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
    set(props.attribute, val, schema.value, core?.state.projectConfig, false);
  },
  get() {
    return get(props.attribute, schema.value, false);
  },
});
</script>
