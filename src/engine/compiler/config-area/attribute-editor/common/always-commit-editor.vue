<template>
  <collapse-Item-wrapper label="数据提交" :name="props.attribute" :option="props.option">
    <a-radio-group v-model:value="modelValue" button-style="solid" class="w-full">
      <a-radio-button :value="false" class="w-1/2 text-center">仅显示时提交</a-radio-button>
      <a-radio-button :value="true" class="w-1/2 text-center">始终提交</a-radio-button>
    </a-radio-group>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="AlwaysCommitEditor">
import { inject, computed } from 'vue';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { set, get } from '/@/utils/schema';

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
