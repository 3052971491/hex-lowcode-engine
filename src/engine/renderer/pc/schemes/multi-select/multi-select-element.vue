<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-select
      ref="__instance__"
      v-model:value="modelValue"
      mode="multiple"
      v-bind="prop"
      :class="[ectype.props.className]"
      show-search
      :options="ectype.props.options"
      option-filter-prop="label"
    >
    </a-select>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject, onMounted, ref, unref } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { DataEngineInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElementDataEngine } from '../../hooks/useElementDataEngine';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.SelectScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.SelectScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.SelectScheme>(props.schema, dataEngine);

const prop = computed(() =>
  ectypeProps((obj: PcSchema.SelectSchemeProps) => {
    return {
      allowClear: obj.allowClear,
      bordered: obj.bordered,
      disabled: obj.behavior === 'disabled',
      placeholder: obj.placeholder,
      size: obj.size,
    };
  }),
);

onMounted(() => {
  // 替换原型方法
  unref(ectype).getValue = () => {
    return unref(modelValue);
  };
  unref(ectype).setValue = (data: any) => {
    modelValue.value = data;
  };
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'MultiSelectElement',
});
</script>

<style lang="less" scoped>
:deep(.ant-select-selection-item-remove) {
  display: flex;
}
</style>
