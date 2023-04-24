<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-radio-group ref="__instance__" v-model:value="modelValue" v-bind="prop" :class="[ectype.props.className]">
      <template v-if="ectype.props.optionType === 'button'">
        <a-radio-button v-for="(item, index) in ectype.props.options" :key="index" :value="item.value">
          {{ item.label }}
        </a-radio-button>
      </template>
      <template v-else>
        <a-radio v-for="(item, index) in ectype.props.options" :key="index" :value="item.value">
          {{ item.label }}
        </a-radio>
      </template>
    </a-radio-group>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject, ref } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { DataEngineInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElementDataEngine } from '../../hooks/useElementDataEngine';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.RadioScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.RadioScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.RadioScheme>(props.schema, dataEngine);

const prop = computed(() =>
  ectypeProps((obj) => {
    return {
      buttonStyle: obj.buttonStyle,
      disabled: obj.behavior === 'disabled',
      size: obj.size,
    };
  }),
);
</script>

<script lang="ts">
export default defineComponent({
  name: 'RadioElement',
});
</script>
