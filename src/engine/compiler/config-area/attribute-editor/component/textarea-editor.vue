<template>
  <form-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <a-textarea v-model:value="modelValue" placeholder="请输入" :auto-size="{ minRows: 2, maxRows: 6 }" />
  </form-Item-wrapper>
</template>
<script lang="ts" setup name="TextareaEditor">
import { inject, computed } from 'vue';
import { isNil } from 'lodash-es';
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
    if (
      !schema.value.props ||
      isNil(schema.value.props[props.attribute]) ||
      Object.prototype.toString.call(schema.value.props[props.attribute]) === '[object String]'
    ) {
      set(props.attribute, val, schema.value);
      return;
    }
    if (props.option.i18n) {
      const obj = get(props.attribute, schema.value) as any;
      // 获取当前语种
      obj['zh-CN'] = val;
      set(props.attribute, obj, schema.value);
      return;
    }
    set(props.attribute, val, schema.value);
  },
  get() {
    const val: any = get(props.attribute, schema.value);
    if (
      !schema.value.props ||
      isNil(schema.value.props[props.attribute]) ||
      Object.prototype.toString.call(schema.value.props[props.attribute]) === '[object String]'
    ) {
      return val;
    }
    if (isNil(val)) return '';
    if (props.option.i18n) {
      return val['zh-CN'];
    }
    return val;
  },
});
</script>