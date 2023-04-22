<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-button ref="__instance__" v-bind="prop">{{ ectype.props.title }}</a-button>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent, inject, ref } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { RedactStateInjectionKey, HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.ButtonSchema;
  parentSchema: PcSchema.ButtonGroupSchema;
  parentSchemaList: PcSchema.ButtonSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.ButtonSchema>(props, __instance__);

const prop = ectypeProps((obj) => {
  return {
    type: obj.type,
    block: obj.block,
    ghost: obj.ghost,
    size: obj.size,
    danger: obj.danger,
    loading: obj.loading,
  };
}, core);

const classMap = computed(() => {
  const arr = [];
  if (!redactState && ectype.value.props.block) {
    arr.push('w-full');
  }
  if (props.indexOfParentList !== props.parentSchemaList.length - 1) {
    arr.push('mr-1');
  }
  return arr;
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'ButtonElement',
});
</script>
