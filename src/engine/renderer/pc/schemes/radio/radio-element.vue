<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-radio-group ref="__instance__" v-model:value="modelValue" v-bind="prop">
      <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button value="b">Shanghai</a-radio-button>
      <a-radio-button value="c">Beijing</a-radio-button>
      <a-radio-button value="d">Chengdu</a-radio-button>
    </a-radio-group>
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
  schema: PcSchema.InputScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const core = inject(HexCoreInjectionKey);
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectypeProps } = useElement<PcSchema.InputScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.InputScheme>(props.schema, dataEngine);

const prop = ectypeProps((obj) => {
  return {
    buttonStyle: obj.buttonStyle,
    optionType: obj.optionType,
    disabled: obj.behavior === 'disabled',
    size: obj.size,
  };
}, core);
</script>

<script lang="ts">
export default defineComponent({
  name: 'RadioElement',
});
</script>
