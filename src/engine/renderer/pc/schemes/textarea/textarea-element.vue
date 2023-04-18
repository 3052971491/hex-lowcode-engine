<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-textarea ref="__instance__" v-model:value="modelValue" v-bind="prop"></a-textarea>
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
    allowClear: obj.allowClear,
    bordered: obj.bordered,
    disabled: obj.behavior === 'disabled',
    placeholder: obj.placeholder,
    size: obj.size,
    maxlength: obj.maxlength,
    showCount: obj.showCount,
    addonBefore: obj.addonBefore,
    addonAfter: obj.addonAfter,
  };
}, core);
</script>

<script lang="ts">
export default defineComponent({
  name: 'TextareaElement',
});
</script>
