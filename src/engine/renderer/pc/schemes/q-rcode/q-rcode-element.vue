<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-qrcode ref="__instance__" v-bind="prop" :class="[ectype.props.className]" />
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema';
import { defineComponent, ref, computed } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.QRcodeSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.QRcodeSchema>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj: PcSchema.QRcodeSchemaProps) => {
    return {
      value: obj.content,
      type: obj.type,
      icon: obj.icon,
      size: obj.size,
      iconSize: obj.iconSize,
      color: obj.color,
      bgColor: obj.bgColor,
      bordered: obj.bordered,
      errorLevel: obj.errorLevel,
      status: obj.status,
    };
  }),
);
</script>

<script lang="ts">
export default defineComponent({
  name: 'QRcodeElement',
});
</script>
