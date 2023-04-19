<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-switch ref="__instance__" v-model:checked="modelValue" v-bind="prop"></a-switch>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { defineComponent, inject, ref } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { DataEngineInjectionKey, HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElementDataEngine } from '../../hooks/useElementDataEngine';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.SwitchScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const core = inject(HexCoreInjectionKey);
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectypeProps } = useElement<PcSchema.SwitchScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.SwitchScheme>(props.schema, dataEngine);

const prop = ectypeProps((obj) => {
  return {
    disabled: obj.behavior === 'disabled',
    size: obj.size,
    checkedChildren: obj.checkedChildren,
    checkedValue: obj.checkedValue,
    unCheckedChildren: obj.unCheckedChildren,
    unCheckedValue: obj.unCheckedValue,
  };
}, core);
</script>

<script lang="ts">
export default defineComponent({
  name: 'SwitchElement',
});
</script>
