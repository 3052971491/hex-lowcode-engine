<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-input ref="__instance__" v-model:value="modelValue" v-bind="ectypeProps"></a-input>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject, onMounted, ref, unref } from 'vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';
import { DataEngineInjectionKey, HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useElementDataEngine } from '../../hooks/useElementDataEngine';

interface Props {
  schema: PcSchema.InputScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const core = inject(HexCoreInjectionKey);
const dataEngine = inject(DataEngineInjectionKey);
/** 当前组件实例 */
const __instance__ = ref<any>();
const { ectype, ElementWrapper, autofocus } = useElement<PcSchema.InputScheme>(props);
const { modelValue } = useElementDataEngine<PcSchema.InputScheme>(props.schema, dataEngine);
const ectypeProps = computed(() => {
  const obj = ectype.value.props;
  if (!obj) return {};
  const opt: any = {};
  if (ectype.value.events) {
    for (const key in unref(ectype).events) {
      if (Object.prototype.hasOwnProperty.call(unref(ectype).events, key)) {
        const element = ectype.value.events[key];
        if (element.events.length > 0) {
          element.events.forEach(({ name }: { name: string }) => {
            if (core?.state.__js__[name]) {
              opt.onChange[key] = core.state.__js__[name];
            }
          });
        }
      }
    }
  }
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
    ...opt,
  };
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'InputElement',
});
</script>
