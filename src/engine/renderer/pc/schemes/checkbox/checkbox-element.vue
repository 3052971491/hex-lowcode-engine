<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-checkbox-group ref="__instance__" v-model:value="modelValue" v-bind="prop">
      <a-checkbox v-for="(item, index) in ectype.props.options" :key="index" :value="item.value">
        {{ item.label }}
      </a-checkbox>
    </a-checkbox-group>
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
  schema: PcSchema.CheckboxScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const core = inject(HexCoreInjectionKey);
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.CheckboxScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.CheckboxScheme>(props.schema, dataEngine);

const prop = ectypeProps((obj) => {
  return {
    disabled: obj.behavior === 'disabled',
    size: obj.size,
  };
}, core);
</script>

<script lang="ts">
export default defineComponent({
  name: 'CheckboxElement',
});
</script>