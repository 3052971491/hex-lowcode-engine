<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-radio-group v-model:value="modelValue">
      <a-radio-button v-for="(item, index) in source" :key="index" :value="item.key">
        <a-tooltip placement="topRight">
          <template #title>
            <span>{{ item.tips }}</span>
          </template>
          {{ item.name }}
        </a-tooltip>
      </a-radio-button>
    </a-radio-group>
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="BehaviorEditor">
import { inject, computed } from 'vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@lowcode-engine/render/render-inject-key';
import { set, get } from '/@/utils/scheme';
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
  { key: 'NORMAL', name: '普通', tips: 'NORMAL: 控件的基本功能均可操作' },
  { key: 'DISABLED', name: '禁用', tips: 'DISABLED: UI呈现禁用效果的特定样式' },
  { key: 'READONLY', name: '只读', tips: 'READONLY: 仅显示控件的预置数据的内容, 控件不可编辑' },
  {
    key: 'HIDDEN',
    name: '隐藏',
    tips: 'HIDDEN: 运行态时不显示。对应表单数据默认不会提交, 可在高级-数据提交中进行配置',
  },
];
</script>
