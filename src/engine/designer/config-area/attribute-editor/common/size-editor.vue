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
import { HexCoreInjectionKey } from '/@lowcode-engine/render/render-inject-key';
import { set, get } from '/@lowcode-engine/utils/scheme';
import { Size } from '/@lowcode-engine/enum/element-option-enum';
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
const scheme = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});
const modelValue = computed({
  set(val) {
    set(props.attribute, val, scheme.value);
  },
  get() {
    return get(props.attribute, scheme.value);
  },
});

const source = [
  { key: Size.SMALL, name: '小', tips: '小号尺寸' },
  { key: Size.MIDDLE, name: '中', tips: '中号尺寸' },
  { key: Size.LARGE, name: '大', tips: '大号尺寸' },
];
</script>
