<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-input-number
      ref="__instance__"
      v-model:value="modelValue"
      v-bind="prop"
      class="w-full"
      :class="[ectype.props.className]"
    ></a-input-number>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { defineComponent, inject, ref } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { DataEngineInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElementDataEngine } from '../../hooks/useElementDataEngine';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.InputNumberScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.InputNumberScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.InputNumberScheme>(props.schema, dataEngine);

const prop = ectypeProps((obj) => {
  return {
    bordered: obj.bordered,
    disabled: obj.behavior === 'disabled',
    placeholder: obj.placeholder,
    size: obj.size,
    addonBefore: obj.addonBefore,
    addonAfter: obj.addonAfter,
    controls: obj.controls,
    decimalSeparator: obj.decimalSeparator,
    keyboard: obj.keyboard,
    max: obj.max,
    min: obj.min,
    precision: obj.precision,
    step: obj.step,
    stringMode: obj.stringMode,
  };
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'InputNumberElement',
});
</script>
