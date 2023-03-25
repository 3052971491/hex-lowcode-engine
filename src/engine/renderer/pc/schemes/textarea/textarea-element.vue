<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-textarea ref="__instance__" v-model:value="modelValue" v-bind="ectypeProps"></a-textarea>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';
import { DataEngineInjectionKey, ElementInstanceInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useElementDataEngine } from '../../hooks/useElementDataEngine';

interface Props {
  schema: PcSchema.InputScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();
const { ectype, ElementWrapper, autofocus } = useElement<PcSchema.InputScheme>(props);
const { modelValue } = useElementDataEngine<PcSchema.InputScheme>(props.schema, dataEngine);
const ectypeProps = computed(() => {
  const obj = ectype.value.props;
  if (!obj) return {};
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
});
onMounted(() => {
  autofocus(__instance__);
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'TextareaElement',
});
</script>
