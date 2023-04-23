<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-rate ref="__instance__" v-model:value="modelValue" v-bind="prop"></a-rate>
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
  schema: PcSchema.SwitchScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectypeProps } = useElement<PcSchema.SwitchScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.SwitchScheme>(props.schema, dataEngine);

const prop = ectypeProps((obj) => {
  return {
    disabled: obj.behavior === 'disabled',
    size: obj.size,
    allowClear: obj.allowClear,
    allowHalf: obj.allowHalf,
    character: obj.character,
    count: obj.count,
  };
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'RateElement',
});
</script>
