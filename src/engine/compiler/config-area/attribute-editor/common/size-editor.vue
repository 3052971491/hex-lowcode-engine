<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
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
    set(props.attribute, val, schema.value);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});

const source = [
  { key: 'small', name: '小', tips: '小号尺寸' },
  { key: 'middle', name: '中', tips: '中号尺寸' },
  { key: 'large', name: '大', tips: '大号尺寸' },
];
</script>
