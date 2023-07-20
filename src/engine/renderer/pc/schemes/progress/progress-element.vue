<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-progress
      ref="__instance__"
      v-bind="prop"
      :class="[ectype.props.className]"
      :stroke-color="strokeColor"
    ></a-progress>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema';
import { defineComponent, ref, computed } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.ProgressSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();
const { ectype, ectypeProps } = useElement<PcSchema.ProgressSchema>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj: PcSchema.ProgressSchemaProps) => {
    return {
      size: obj.size,
      type: obj.type,
      percent: obj.percent,
      status: obj.status,
    };
  }),
);

const strokeColor = computed(() => {
  if (!ectype.value.props.progressive) return '';
  if (ectype.value.props.percent <= 30) {
    return '#f55421';
  }
  if (ectype.value.props.percent > 30 && ectype.value.props.percent < 80) {
    return '#ff9200';
  }
  return '#00ae48';
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'ProgressElement',
});
</script>

<style lang="less" scoped>
:deep(.ant-progress-line) {
  display: block;
  width: auto;
}
</style>
