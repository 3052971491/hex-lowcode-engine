<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-textarea v-model:value="modelValue" v-bind="ectypeProps"></a-textarea>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject } from 'vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';
import { DataEngineInjectionKey } from '/@/engine/renderer/render-inject-key';

interface Props {
  schema: PcSchema.InputScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const dataEngine = inject(DataEngineInjectionKey);
const modelValue = computed({
  set(val) {
    if (dataEngine?.originData) {
      dataEngine.originData[ectype.value.props.field] = val;
    }
  },
  get() {
    if (dataEngine?.originData) {
      return dataEngine.originData[ectype.value.props.field];
    }
    return '';
  },
});
const props = withDefaults(defineProps<Props>(), {});
const { ectype, ElementWrapper } = useElement<PcSchema.InputScheme>(props);

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
</script>

<script lang="ts">
export default defineComponent({
  name: 'TextareaElement',
});
</script>
